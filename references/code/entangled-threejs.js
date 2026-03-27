import WindowManager from './WindowManager.js';
import GPUComputationRenderer from './GPUComputationRenderer.js';
import {cnoise4, hash12} from './glslNoise.js';
import {PI, uvFromIndex} from './glslUtils.js';

// ====================================
// ENTANGLED - Three.js GPGPU Implementation
// Based on Bjørn Staal's architecture
// ====================================

const NUM_POINTS = 50000; // 50K particles for performance
const NUM_X = Math.ceil(Math.sqrt(NUM_POINTS));
const NUM_Y = NUM_X;

const t = THREE;
let camera, scene, renderer, world;
let points, pointsMaterial;
let pixR = window.devicePixelRatio ? window.devicePixelRatio : 1;
let time = new Date().getTime();
let frame = 0;
let internalTime = 0;

// GPU Computation
let gpu;
let posTargetTex, posTargetVar;
let accTex, accVar;
let velTex, velVar;
let posTex, posVar;

// Window Management & Entanglement
let windowManager;
let initialized = false;
let isPaired = false;
let syncIntensity = 0;
let systemEnergy = 0;
let lfo = 0;

// Mouse interaction
let mouse = {x: 0, y: 0, active: false};

// Stats
let lastFPSUpdate = 0;
let fpsFrames = 0;

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState != 'hidden' && !initialized) {
        init();
    }
});

window.onload = () => {
    if (document.visibilityState != 'hidden') {
        init();
    }
};

function init() {
    initialized = true;

    setTimeout(() => {
        setupScene();
        setupWindowManager();
        createPoints();
        setupGpuComputation();
        setupInteraction();
        render();
        window.addEventListener('resize', resize);
    }, 500);
}

function setupScene() {
    camera = new t.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 500;

    scene = new t.Scene();
    scene.background = new t.Color(0x0a0a0f);
    scene.add(camera);

    renderer = new t.WebGLRenderer({antialias: true, alpha: false});
    renderer.setPixelRatio(pixR);
    renderer.setSize(window.innerWidth, window.innerHeight);

    world = new t.Object3D();
    scene.add(world);

    renderer.domElement.setAttribute("id", "scene");
    document.querySelector('#canvas').appendChild(renderer.domElement);
}

function setupWindowManager() {
    windowManager = new WindowManager();

    // Metadata for this window
    let metaData = {
        type: 'entangled',
        seed: Math.floor(Math.random() * 100000),
        iteration: '#195(eth)'
    };

    windowManager.init(metaData);
    windowManager.setWinChangeCallback(onWindowsUpdated);
}

function onWindowsUpdated() {
    let wins = windowManager.getWindows();
    isPaired = wins.length > 1;

    console.log('Windows updated:', wins.length, 'paired:', isPaired);
}

// ====================================
// PARTICLES
// ====================================

function createPoints() {
    let geometry = new THREE.BufferGeometry();
    let verts = [];
    let s = 200;

    for (let i = 0; i < NUM_POINTS; i++) {
        verts.push(
            s * -.5 + Math.random() * s,
            s * -.5 + Math.random() * s,
            s * -.5 + Math.random() * s
        );
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));

    pointsMaterial = createPointsMaterial();
    points = new THREE.Points(geometry, pointsMaterial);

    world.add(points);

    // Update particle count display
    document.getElementById('particles').textContent = NUM_POINTS.toLocaleString();
}

function createPointsMaterial() {
    let vert = `
        ${hash12}
        ${uvFromIndex}

        uniform sampler2D posTarget;
        uniform sampler2D acc;
        uniform sampler2D vel;
        uniform sampler2D pos;
        uniform float time;
        uniform float energy;
        uniform float lfo;

        varying float alpha;
        varying vec3 col;

        void main() {
            int i = gl_VertexID;
            ivec2 size = ivec2(${NUM_X}, ${NUM_Y});
            vec2 uv = uvFromIndex(i, size);

            vec4 posTarget = texture2D(posTarget, uv);
            vec4 pos = texture2D(pos, uv);
            vec4 v = texture2D(vel, uv);

            vec3 p = pos.xyz;

            // Particle size based on ID and velocity
            float n = hash12(vec2(float(i), 0.0));
            float ps = pow(n, 2.0) * 2.5;

            // Life/opacity with LFO breathing
            alpha = 0.3 + pow(n, 15.0) * 0.4;
            alpha *= (0.7 + lfo * 0.3);

            // Highlight special particles
            if (n > 0.998) {
                ps *= 1.5;
                alpha *= 2.0;
            }

            // Energy-driven color (cyan -> gold)
            vec3 coolColor = vec3(0.0, 0.98, 1.0);  // Cyan
            vec3 warmColor = vec3(1.0, 0.72, 0.45); // Gold

            float velocityMag = length(v.xyz);
            float energyLevel = pow(velocityMag / 2.0, 3.0);
            energyLevel = clamp(energyLevel + energy * 0.3, 0.0, 1.0);

            col = mix(coolColor, warmColor, energyLevel);

            gl_PointSize = ps;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
    `;

    let frag = `
        uniform float time;
        varying float alpha;
        varying vec3 col;

        void main() {
            // Exponential falloff for intrinsic glow
            vec2 coord = gl_PointCoord - vec2(0.5);
            float dist = length(coord) * 2.0;

            if (dist > 1.0) discard;

            float glow = exp(-12.0 * dist * dist);
            float core = exp(-8.0 * dist * dist);

            vec3 finalCol = col * (1.0 + core * 2.0);

            gl_FragColor = vec4(finalCol, alpha * glow * 0.6);
        }
    `;

    return new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            energy: { value: 0.0 },
            lfo: { value: 0.0 },
            posTarget: { value: null },
            acc: { value: null },
            vel: { value: null },
            pos: { value: null }
        },
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending
    });
}

// ====================================
// GPU COMPUTATION SHADERS
// ====================================

function createPosTargetShader() {
    return `
        ${PI}
        ${hash12}

        uniform float time;

        void main() {
            float nPoints = resolution.x * resolution.y;
            float i = (gl_FragCoord.y * resolution.x) + gl_FragCoord.x;
            vec2 uv = gl_FragCoord.xy / resolution.xy;

            // Fibonacci sphere distribution for crystalline structure
            float goldenAngle = PI * (3.0 - sqrt(5.0));
            float theta = goldenAngle * i;
            float y = 1.0 - (i / nPoints) * 2.0;
            float radius = sqrt(1.0 - y * y);

            float r = 60.0 + hash12(vec2(i * 0.1, i * 0.3)) * 100.0;

            // Add clustering noise
            float cluster = sin(theta * 5.0) * cos(y * PI * 3.0);
            r *= (1.0 + cluster * 0.3);

            vec3 pos;
            pos.x = cos(theta) * radius * r;
            pos.y = y * r;
            pos.z = sin(theta) * radius * r;

            gl_FragColor = vec4(pos, 1.0);
        }
    `;
}

function createAccShader() {
    return `
        ${PI}
        ${cnoise4}
        ${hash12}

        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        uniform bool mouseActive;
        uniform float syncIntensity;

        void main() {
            float nPoints = resolution.x * resolution.y;
            float i = (gl_FragCoord.y * resolution.x) + gl_FragCoord.x;
            vec2 uv = gl_FragCoord.xy / resolution.xy;

            vec3 a = vec3(0.0);
            vec4 p = texture2D(pos, uv);
            vec4 tar = texture2D(posTarget, uv);

            // Curl noise turbulence
            vec3 turb;
            float t = time * 0.0001;
            float n = hash12(vec2(i * 0.01, uv.x * 0.02));

            turb.x = cnoise(vec4(p.xyz * 0.006 + n * 35.4, t));
            turb.y = cnoise(vec4(p.xyz * 0.007 + n * 32.3, t));
            turb.z = cnoise(vec4(p.xyz * 0.006 + n * 43.3, t));

            // LFO modulation
            float lfo = 0.5 + 0.5 * sin(time * 0.00025 * PI * 2.0);
            turb *= pow(cnoise(vec4(p.xyz * 0.01, time * 0.0003)), 3.0) * 0.15 * (1.0 + lfo * 0.5);
            a += turb;

            // Spring force back to home position
            vec3 spring = tar.xyz - p.xyz;
            float springK = 0.003 * (0.8 + lfo * 0.4);
            spring *= springK;
            a += spring;

            // Mouse interaction - turbulent energy injection
            if (mouseActive) {
                vec2 mousePos = vec2(mouseX, mouseY);
                vec2 pPos = vec2(p.x, p.y);
                float dist = length(mousePos - pPos);

                if (dist < 200.0) {
                    vec2 dir = normalize(pPos - mousePos);
                    float angle = atan(dir.y, dir.x) + (n - 0.5) * PI;
                    float force = (1.0 - dist / 200.0) * 1.5;

                    a.x += cos(angle) * force;
                    a.y += sin(angle) * force;
                    a.z += (n - 0.5) * force;
                }
            }

            // Sync effects when paired
            if (syncIntensity > 0.01) {
                // Stochastic coupling creates energy bursts
                a *= (1.0 + syncIntensity * 0.5);
            }

            gl_FragColor = vec4(a, 1.0);
        }
    `;
}

function createVelShader() {
    return `
        ${PI}

        uniform float time;

        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;

            vec4 a = texture2D(acc, uv);
            vec4 v = texture2D(vel, uv);

            v += a;

            // LFO-modulated damping
            float lfo = 0.5 + 0.5 * sin(time * 0.00025 * PI * 2.0);
            float damping = 0.95 + (1.0 - 0.95) * lfo * 0.5;
            v *= damping;

            gl_FragColor = vec4(v.xyz, 1.0);
        }
    `;
}

function createPosShader() {
    return `
        ${PI}

        uniform float time;
        uniform int frame;

        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;

            vec4 p;

            if (frame < 2) {
                p = texture2D(posTarget, uv);
            } else {
                p = texture2D(pos, uv);
                p += texture2D(vel, uv);
            }

            gl_FragColor = vec4(p.xyz, 1.0);
        }
    `;
}

// ====================================
// GPU COMPUTATION SETUP
// ====================================

function setupGpuComputation() {
    gpu = new GPUComputationRenderer(NUM_X, NUM_Y, renderer);

    // Create variables
    posTargetTex = gpu.createTexture();
    posTargetVar = gpu.addVariable("posTarget", createPosTargetShader(), posTargetTex);

    accTex = gpu.createTexture();
    accVar = gpu.addVariable("acc", createAccShader(), accTex);

    velTex = gpu.createTexture();
    velVar = gpu.addVariable("vel", createVelShader(), velTex);

    posTex = gpu.createTexture();
    posVar = gpu.addVariable("pos", createPosShader(), posTex);

    // Set dependencies
    gpu.setVariableDependencies(accVar, [posTargetVar, posVar, accVar]);
    gpu.setVariableDependencies(velVar, [accVar, velVar]);
    gpu.setVariableDependencies(posVar, [accVar, velVar, posVar, posTargetVar]);

    // Initialize
    const error = gpu.init();
    if (error !== null) {
        console.error('GPU Computation error:', error);
    }

    console.log('GPU computation initialized');
}

// ====================================
// INTERACTION
// ====================================

function setupInteraction() {
    // Mouse tracking
    window.addEventListener('mousemove', (e) => {
        // Convert to world coordinates
        mouse.x = (e.clientX - window.innerWidth / 2);
        mouse.y = -(e.clientY - window.innerHeight / 2);
    });

    window.addEventListener('mousedown', () => {
        mouse.active = true;
    });

    window.addEventListener('mouseup', () => {
        mouse.active = false;
    });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
    });

    // Controls
    document.getElementById('toggleSync').addEventListener('click', () => {
        isPaired = !isPaired;
        document.getElementById('toggleSync').classList.toggle('active');
    });

    document.getElementById('resetView').addEventListener('click', () => {
        world.rotation.set(0, 0, 0);
        camera.position.z = 500;
    });

    document.getElementById('openPair').addEventListener('click', () => {
        const width = 800;
        const height = 800;
        const left = window.screenX + window.outerWidth + 20;
        const top = window.screenY;

        window.open(
            'entangled-threejs.html',
            'entangled-pair',
            `width=${width},height=${height},left=${left},top=${top}`
        );
    });
}

// ====================================
// RENDER LOOP
// ====================================

function render() {
    const t = new Date().getTime();
    const delta = t - time;
    internalTime += delta;
    time = t;

    // Update window manager
    if (windowManager) {
        windowManager.update();
    }

    // LFO (breathing rhythm)
    lfo = 0.5 + 0.5 * Math.sin(internalTime * 0.00025 * Math.PI * 2);

    // System energy decay
    systemEnergy *= 0.98;

    // Stochastic sync when paired
    if (isPaired) {
        if (Math.random() < 0.1) { // 10% probability
            syncIntensity += Math.random() * 0.15;
            systemEnergy += 0.5;
        }
        syncIntensity *= 0.95;
    } else {
        syncIntensity *= 0.9;
    }

    // Mouse energy injection
    if (mouse.active) {
        systemEnergy += 0.01;
    }

    // Update GPU uniforms
    let u = posTargetVar.material.uniforms;
    u.time = {value: internalTime};

    u = accVar.material.uniforms;
    u.time = {value: internalTime};
    u.mouseX = {value: mouse.x};
    u.mouseY = {value: mouse.y};
    u.mouseActive = {value: mouse.active};
    u.syncIntensity = {value: syncIntensity};

    u = velVar.material.uniforms;
    u.time = {value: internalTime};

    u = posVar.material.uniforms;
    u.time = {value: internalTime};
    u.frame = {value: frame};

    // Compute
    gpu.compute();

    // Update points material
    let pu = pointsMaterial.uniforms;
    pu.time.value = internalTime;
    pu.energy.value = systemEnergy;
    pu.lfo.value = lfo;
    pu.posTarget.value = gpu.getCurrentRenderTarget(posTargetVar).texture;
    pu.acc.value = gpu.getCurrentRenderTarget(accVar).texture;
    pu.vel.value = gpu.getCurrentRenderTarget(velVar).texture;
    pu.pos.value = gpu.getCurrentRenderTarget(posVar).texture;

    // Gentle auto-rotation
    world.rotation.y += 0.002;
    world.rotation.x += 0.001;

    // Render
    renderer.render(scene, camera);

    // Update stats
    fpsFrames++;
    if (internalTime - lastFPSUpdate > 1000) {
        document.getElementById('fps').textContent = fpsFrames;
        document.getElementById('energy').textContent = systemEnergy.toFixed(2);
        fpsFrames = 0;
        lastFPSUpdate = internalTime;
    }

    requestAnimationFrame(render);
    frame++;
}

function resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, true);
}
