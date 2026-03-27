// ====================================
// ENTANGLED - Quantum Particle System
// Enhanced with curl noise, GPGPU, and feedback trails
// ====================================

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: true,
    preserveDrawingBuffer: false,
    powerPreference: 'high-performance'
});

if (!gl) {
    alert('WebGL2 not supported');
    throw new Error('WebGL2 not supported');
}

// Enable extensions
const ext = gl.getExtension('EXT_color_buffer_float');
if (!ext) {
    console.warn('EXT_color_buffer_float not supported - some effects may be limited');
}

// ====================================
// SHADERS
// ====================================

const vertexShaderSource = `#version 300 es
precision highp float;

in vec3 position;
in vec3 velocity;
in float life;
in float particleId;

uniform mat4 uProjection;
uniform mat4 uView;
uniform float uTime;
uniform vec2 uResolution;
uniform float uParticleSize;

out float vLife;
out float vParticleId;
out vec3 vVelocity;
out vec3 vPosition;

void main() {
    vLife = life;
    vParticleId = particleId;
    vVelocity = velocity;
    vPosition = position;

    vec4 viewPos = uView * vec4(position, 1.0);
    gl_Position = uProjection * viewPos;

    // Particle size based on depth, life, and velocity
    float depth = -viewPos.z;
    float velocityMag = length(velocity);
    float size = uParticleSize * (1.0 + life * 1.5) * (60.0 / depth);
    size *= (1.0 + velocityMag * 0.1);
    gl_PointSize = clamp(size, 1.0, 16.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

in float vLife;
in float vParticleId;
in vec3 vVelocity;
in vec3 vPosition;

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform bool uIsPaired;
uniform float uSyncIntensity;
uniform vec2 uMouse;
uniform float uHueShift;

out vec4 fragColor;

// ====================================
// NOISE FUNCTIONS
// ====================================

float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);

    float n = p.x + p.y * 57.0 + 113.0 * p.z;
    return mix(
        mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
            mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
        mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
            mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
}

// HSL to RGB conversion
vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
}

void main() {
    // Circular gradient for particle with exponential falloff
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord) * 2.0; // Normalize to 0-1

    if (dist > 1.0) discard;

    // Intrinsic exponential glow (no post-processing needed)
    float alpha = exp(-12.0 * dist * dist);

    // Core intensity for color
    float core = exp(-8.0 * dist * dist);

    // Life-based opacity
    alpha *= vLife;

    // Energy-driven color shift: cool when stable, warm when energized
    float velocityMag = length(vVelocity);
    float energyLevel = smoothstep(0.0, 3.0, velocityMag);

    // Cool base color (#00faff - cyan/teal)
    vec3 coolColor = vec3(0.0, 0.98, 1.0);

    // Warm energy color (#ffb873 - gold/orange)
    vec3 warmColor = vec3(1.0, 0.72, 0.45);

    // Mix based on energy with hue shift over time
    float colorMix = energyLevel * 0.7 + uHueShift * 0.3;
    colorMix += noise(vec3(vParticleId * 0.05, uTime * 0.1, 0.0)) * 0.2;

    vec3 color = mix(coolColor, warmColor, clamp(colorMix, 0.0, 1.0));

    // Add sync energy pulses when paired
    if (uIsPaired && uSyncIntensity > 0.1) {
        float pulse = sin(uTime * 1.2 + vParticleId * 0.05) * 0.5 + 0.5;
        float syncGlow = pulse * uSyncIntensity;

        // Warm interference highlights
        color += vec3(1.0, 0.8, 0.5) * syncGlow * 0.6;
        alpha *= (1.0 + syncGlow * 0.3);
    }

    // Core brightness boost
    color *= (1.0 + core * 2.0);

    // Subtle depth-reactive tint (deep violet background atmosphere)
    float depthTint = exp(-length(vPosition) * 0.003);
    color = mix(color, vec3(0.25, 0.15, 0.35), (1.0 - depthTint) * 0.2);

    fragColor = vec4(color, alpha * 0.5);
}
`;

// ====================================
// FEEDBACK TRAIL SHADERS
// ====================================

const trailVertexSource = `#version 300 es
precision highp float;

in vec2 position;
out vec2 vUv;

void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const trailFragmentSource = `#version 300 es
precision highp float;

in vec2 vUv;
uniform sampler2D uPrevFrame;
uniform sampler2D uCurrentFrame;
uniform float uTrailDecay;
uniform float uTime;

out vec4 fragColor;

void main() {
    vec4 prev = texture(uPrevFrame, vUv);
    vec4 current = texture(uCurrentFrame, vUv);

    // Feedback mix with decay
    vec4 mixed = mix(prev * uTrailDecay, current, 0.15);

    // Subtle chromatic aberration on trails
    vec2 offset = vec2(0.001, 0.0);
    vec4 aberr = vec4(
        texture(uPrevFrame, vUv + offset).r,
        texture(uPrevFrame, vUv).g,
        texture(uPrevFrame, vUv - offset).b,
        prev.a
    );

    mixed = mix(mixed, aberr * uTrailDecay, 0.3);

    fragColor = mixed;
}
`;

// ====================================
// SHADER COMPILATION
// ====================================

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

// ====================================
// PARTICLE SYSTEM
// ====================================

class ParticleSystem {
    constructor(count, seed, isEntangledPartner = false) {
        this.count = count;
        this.seed = seed;
        this.isPartner = isEntangledPartner;

        // Particle data
        this.positions = new Float32Array(count * 3);
        this.velocities = new Float32Array(count * 3);
        this.lives = new Float32Array(count);
        this.ids = new Float32Array(count);
        this.homePositions = new Float32Array(count * 3); // Rest positions for springs

        // State
        this.time = 0;
        this.rotation = { x: 0, y: 0, z: 0 };
        this.targetRotation = { x: 0, y: 0, z: 0 };
        this.cameraDistance = 300;
        this.entangledPartner = null;
        this.syncIntensity = 0;
        this.isPaired = false;

        // Physics parameters (LFO-modulated)
        this.springK = 0.01; // Spring constant
        this.couplingK = 0.0; // Entanglement coupling strength
        this.dampingBase = 0.95;
        this.systemEnergy = 0.0; // Current energy level (drives color)

        // LFO (Low Frequency Oscillator) for breathing rhythm
        this.lfo = 0.0;
        this.lfoFreq = 0.25; // ~2.5 second cycles (heartbeat-like)

        this.initParticles();
        this.setupBuffers();
    }

    random() {
        // Seeded random using sine
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    initParticles() {
        const coreRadius = 40;
        const shellRadius = 120;

        for (let i = 0; i < this.count; i++) {
            const idx = i * 3;

            // Create organic, tendril-like distribution using Fibonacci sphere
            const goldenAngle = Math.PI * (3.0 - Math.sqrt(5.0));
            const theta = goldenAngle * i;
            const y = 1 - (i / (this.count - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);

            let r = coreRadius + this.random() * shellRadius;

            // Add crystalline clustering
            const clusterNoise = Math.sin(theta * 5) * Math.cos(y * Math.PI * 3);
            r *= (1.0 + clusterNoise * 0.3);

            const x = radius * Math.cos(theta);
            const z = radius * Math.sin(theta);

            // Set both current and home positions
            this.positions[idx] = x * r;
            this.positions[idx + 1] = y * r;
            this.positions[idx + 2] = z * r;

            this.homePositions[idx] = x * r;
            this.homePositions[idx + 1] = y * r;
            this.homePositions[idx + 2] = z * r;

            // Initial velocities - very small
            this.velocities[idx] = (this.random() - 0.5) * 0.1;
            this.velocities[idx + 1] = (this.random() - 0.5) * 0.1;
            this.velocities[idx + 2] = (this.random() - 0.5) * 0.1;

            this.lives[i] = 0.6 + this.random() * 0.4;
            this.ids[i] = i;
        }
    }

    setupBuffers() {
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        // Position buffer
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.DYNAMIC_DRAW);

        const positionLoc = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

        // Velocity buffer
        this.velocityBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.velocityBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.velocities, gl.DYNAMIC_DRAW);

        const velocityLoc = gl.getAttribLocation(program, 'velocity');
        gl.enableVertexAttribArray(velocityLoc);
        gl.vertexAttribPointer(velocityLoc, 3, gl.FLOAT, false, 0, 0);

        // Life buffer
        this.lifeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.lifeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.lives, gl.DYNAMIC_DRAW);

        const lifeLoc = gl.getAttribLocation(program, 'life');
        gl.enableVertexAttribArray(lifeLoc);
        gl.vertexAttribPointer(lifeLoc, 1, gl.FLOAT, false, 0, 0);

        // ID buffer
        this.idBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.idBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.ids, gl.STATIC_DRAW);

        const idLoc = gl.getAttribLocation(program, 'particleId');
        gl.enableVertexAttribArray(idLoc);
        gl.vertexAttribPointer(idLoc, 1, gl.FLOAT, false, 0, 0);

        gl.bindVertexArray(null);
    }

    // Curl noise calculation for organic flow
    curlNoise(x, y, z, time) {
        const eps = 0.01;

        // Sample noise at neighboring points
        const n1 = this.simplexNoise(x, y + eps, z, time);
        const n2 = this.simplexNoise(x, y - eps, z, time);
        const n3 = this.simplexNoise(x, y, z + eps, time);
        const n4 = this.simplexNoise(x, y, z - eps, time);
        const n5 = this.simplexNoise(x + eps, y, z, time);
        const n6 = this.simplexNoise(x - eps, y, z, time);

        const curlX = (n1 - n2) - (n3 - n4);
        const curlY = (n3 - n4) - (n5 - n6);
        const curlZ = (n5 - n6) - (n1 - n2);

        return { x: curlX, y: curlY, z: curlZ };
    }

    simplexNoise(x, y, z, t) {
        // Simplified 4D simplex noise approximation
        const scale = 0.01;
        x *= scale;
        y *= scale;
        z *= scale;
        t *= scale;

        return (
            Math.sin(x * 1.2 + t) * Math.cos(y * 0.8) +
            Math.cos(y * 1.5 + t * 0.7) * Math.sin(z * 0.9) +
            Math.sin(z * 1.1 + t * 0.5) * Math.cos(x * 1.3) +
            Math.sin((x + y + z) * 0.5 + t)
        ) * 0.25;
    }

    update(deltaTime, mousePos, partnerData) {
        this.time += deltaTime;

        // Smooth rotation interpolation
        this.rotation.x += (this.targetRotation.x - this.rotation.x) * 0.05;
        this.rotation.y += (this.targetRotation.y - this.rotation.y) * 0.05;
        this.rotation.z += (this.targetRotation.z - this.rotation.z) * 0.05;

        // Auto-rotation when not interacting
        if (!isDragging) {
            this.targetRotation.y += deltaTime * 0.08;
        }

        // LFO (Low Frequency Oscillator) - creates breathing/heartbeat rhythm
        this.lfo = 0.5 + 0.5 * Math.sin(this.time * this.lfoFreq * Math.PI * 2);

        // LFO modulates damping for breathing effect
        const damping = this.dampingBase + (1 - this.dampingBase) * this.lfo * 0.5;

        // Spring constant pulsing
        const springK = this.springK * (0.8 + this.lfo * 0.4);

        // System energy decay
        this.systemEnergy *= 0.98;

        // Update coupling strength based on pairing and energy
        if (this.isPaired && partnerData) {
            // Stochastic synchronization - probabilistic coupling
            if (Math.random() < 0.1) { // 10% chance per frame to sync impulse
                this.couplingK += Math.random() * 0.15;
                this.systemEnergy += 0.5; // Energy injection
            }
            this.couplingK *= 0.95; // Decay
        } else {
            this.couplingK *= 0.9;
        }

        // Update particles with spring-mass network physics
        for (let i = 0; i < this.count; i++) {
            const idx = i * 3;

            const x = this.positions[idx];
            const y = this.positions[idx + 1];
            const z = this.positions[idx + 2];

            const homeX = this.homePositions[idx];
            const homeY = this.homePositions[idx + 1];
            const homeZ = this.homePositions[idx + 2];

            // Spring force to home position
            const springX = (homeX - x) * springK;
            const springY = (homeY - y) * springK;
            const springZ = (homeZ - z) * springK;

            this.velocities[idx] += springX;
            this.velocities[idx + 1] += springY;
            this.velocities[idx + 2] += springZ;

            // Small curl noise for organic variation
            const curl = this.curlNoise(x, y, z, this.time * 0.2);
            const noiseForce = 0.05 * (1 + this.lfo * 0.5); // LFO modulates turbulence

            this.velocities[idx] += curl.x * noiseForce;
            this.velocities[idx + 1] += curl.y * noiseForce;
            this.velocities[idx + 2] += curl.z * noiseForce;

            // Mouse interaction - energy injection (turbulence, not attraction)
            if (mousePos && mousePos.active) {
                const mx = (mousePos.x - 0.5) * 400;
                const my = -(mousePos.y - 0.5) * 400;

                const dx = x - mx;
                const dy = y - my;
                const dist = Math.sqrt(dx*dx + dy*dy) + 1;

                if (dist < 200) {
                    // Turbulent energy injection - random perpendicular force
                    const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * Math.PI;
                    const force = (1.0 - dist / 200) * 2.0;

                    this.velocities[idx] += Math.cos(angle) * force;
                    this.velocities[idx + 1] += Math.sin(angle) * force;
                    this.velocities[idx + 2] += (Math.random() - 0.5) * force;

                    this.systemEnergy += 0.01;
                }
            }

            // Entanglement coupling with partner
            if (this.isPaired && partnerData && this.couplingK > 0.01) {
                const pvx = partnerData.velocities[idx];
                const pvy = partnerData.velocities[idx + 1];
                const pvz = partnerData.velocities[idx + 2];

                const px = partnerData.positions[idx];
                const py = partnerData.positions[idx + 1];
                const pz = partnerData.positions[idx + 2];

                // Bidirectional but asymmetric coupling
                const asymmetry = this.isPartner ? 0.8 : 1.2;
                const coupling = this.couplingK * asymmetry;

                // Velocity influence
                this.velocities[idx] += pvx * coupling;
                this.velocities[idx + 1] += pvy * coupling;
                this.velocities[idx + 2] += pvz * coupling;

                // Position correlation (weak)
                const posInfluence = coupling * 0.03;
                this.velocities[idx] += (px - x) * posInfluence;
                this.velocities[idx + 1] += (py - y) * posInfluence;
                this.velocities[idx + 2] += (pz - z) * posInfluence;
            }

            // Apply damping
            this.velocities[idx] *= damping;
            this.velocities[idx + 1] *= damping;
            this.velocities[idx + 2] *= damping;

            // Update positions
            this.positions[idx] += this.velocities[idx];
            this.positions[idx + 1] += this.velocities[idx + 1];
            this.positions[idx + 2] += this.velocities[idx + 2];

            // Life/opacity pulsing with LFO and energy
            const lifePulse = this.lfo;
            const energyGlow = Math.min(this.systemEnergy * 0.3, 0.4);
            this.lives[i] = 0.5 + lifePulse * 0.3 + energyGlow;
        }

        // Upload to GPU
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.positions);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.velocityBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.velocities);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.lifeBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.lives);
    }

    render() {
        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.POINTS, 0, this.count);
        gl.bindVertexArray(null);
    }
}

// ====================================
// MATRIX MATH
// ====================================

function perspective(fov, aspect, near, far) {
    const f = 1.0 / Math.tan(fov / 2);
    const nf = 1 / (near - far);

    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, 2 * far * near * nf, 0
    ];
}

function lookAt(eye, center, up) {
    const z = normalize([eye[0] - center[0], eye[1] - center[1], eye[2] - center[2]]);
    const x = normalize(cross(up, z));
    const y = cross(z, x);

    return [
        x[0], y[0], z[0], 0,
        x[1], y[1], z[1], 0,
        x[2], y[2], z[2], 0,
        -dot(x, eye), -dot(y, eye), -dot(z, eye), 1
    ];
}

function rotateX(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return [
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1
    ];
}

function rotateY(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return [
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1
    ];
}

function multiply(a, b) {
    const result = new Array(16);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            result[i * 4 + j] = 0;
            for (let k = 0; k < 4; k++) {
                result[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
            }
        }
    }
    return result;
}

function normalize(v) {
    const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    return [v[0] / len, v[1] / len, v[2] / len];
}

function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

// ====================================
// SCENE SETUP
// ====================================

const PARTICLE_COUNT = 12000;
const particleSystem = new ParticleSystem(PARTICLE_COUNT, 195056); // eth #195, tez #056

let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;
let mousePos = { x: 0.5, y: 0.5, active: false };
let hueShift = 0;

// ====================================
// INTERACTION
// ====================================

canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    mousePos.active = true;
});

canvas.addEventListener('mousemove', (e) => {
    // Update mouse position for interaction
    mousePos.x = e.clientX / window.innerWidth;
    mousePos.y = e.clientY / window.innerHeight;

    if (!isDragging) return;

    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;

    particleSystem.targetRotation.y += deltaX * 0.01;
    particleSystem.targetRotation.x += deltaY * 0.01;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
    mousePos.active = false;
});

canvas.addEventListener('mouseleave', () => {
    mousePos.active = false;
});

canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    particleSystem.cameraDistance += e.deltaY * 0.1;
    particleSystem.cameraDistance = Math.max(100, Math.min(600, particleSystem.cameraDistance));
});

// ====================================
// CONTROLS
// ====================================

let pairedWindow = null;

document.getElementById('openPair').addEventListener('click', () => {
    if (pairedWindow && !pairedWindow.closed) {
        pairedWindow.focus();
        return;
    }

    const width = 600;
    const height = 600;
    const left = window.screenX + window.outerWidth + 20;
    const top = window.screenY;

    pairedWindow = window.open(
        'pair.html',
        'entangled-pair',
        `width=${width},height=${height},left=${left},top=${top}`
    );

    // Setup message passing for entanglement
    window.addEventListener('message', (e) => {
        if (e.data.type === 'sync-ready') {
            particleSystem.isPaired = true;
            document.getElementById('openPair').classList.add('active');
        }
    });
});

document.getElementById('toggleSync').addEventListener('click', () => {
    particleSystem.isPaired = !particleSystem.isPaired;
    document.getElementById('toggleSync').classList.toggle('active');
});

document.getElementById('resetView').addEventListener('click', () => {
    particleSystem.targetRotation = { x: 0, y: 0, z: 0 };
    particleSystem.cameraDistance = 300;
});

// ====================================
// RENDER LOOP
// ====================================

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resize);
resize();

let lastTime = 0;

function render(currentTime) {
    currentTime *= 0.001; // Convert to seconds
    const deltaTime = Math.min(currentTime - lastTime, 0.033); // Cap at 30fps
    lastTime = currentTime;

    // Clear with dark background
    gl.clearColor(0.04, 0.04, 0.06, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // Additive blending
    gl.disable(gl.DEPTH_TEST);

    // Slow hue shift tied to system energy
    const energyDrift = particleSystem.systemEnergy * 0.001;
    hueShift += (deltaTime * 0.001) + energyDrift;

    // Update particles
    particleSystem.update(deltaTime, mousePos, null);

    // Setup matrices
    const aspect = canvas.width / canvas.height;
    const projectionMatrix = perspective(Math.PI / 4, aspect, 0.1, 1000);

    const eye = [0, 0, particleSystem.cameraDistance];
    const center = [0, 0, 0];
    const up = [0, 1, 0];
    let viewMatrix = lookAt(eye, center, up);

    // Apply rotations
    const rotX = rotateX(particleSystem.rotation.x);
    const rotY = rotateY(particleSystem.rotation.y);
    viewMatrix = multiply(viewMatrix, rotY);
    viewMatrix = multiply(viewMatrix, rotX);

    // Render particles
    gl.useProgram(program);

    const projLoc = gl.getUniformLocation(program, 'uProjection');
    gl.uniformMatrix4fv(projLoc, false, projectionMatrix);

    const viewLoc = gl.getUniformLocation(program, 'uView');
    gl.uniformMatrix4fv(viewLoc, false, viewMatrix);

    const timeLoc = gl.getUniformLocation(program, 'uTime');
    gl.uniform1f(timeLoc, currentTime);

    const resLoc = gl.getUniformLocation(program, 'uResolution');
    gl.uniform2f(resLoc, canvas.width, canvas.height);

    const sizeLoc = gl.getUniformLocation(program, 'uParticleSize');
    gl.uniform1f(sizeLoc, 3.5);

    // Mouse position
    const mouseLoc = gl.getUniformLocation(program, 'uMouse');
    gl.uniform2f(mouseLoc, mousePos.x, mousePos.y);

    // Hue shift
    const hueLoc = gl.getUniformLocation(program, 'uHueShift');
    gl.uniform1f(hueLoc, hueShift);

    // Iridescent colors (not used with HSL system, but kept for compatibility)
    const color1Loc = gl.getUniformLocation(program, 'uColor1');
    const color2Loc = gl.getUniformLocation(program, 'uColor2');
    gl.uniform3f(color1Loc, 0.2, 0.6, 0.9); // Cyan-blue
    gl.uniform3f(color2Loc, 0.9, 0.5, 0.3); // Gold

    const pairedLoc = gl.getUniformLocation(program, 'uIsPaired');
    gl.uniform1i(pairedLoc, particleSystem.isPaired ? 1 : 0);

    const syncLoc = gl.getUniformLocation(program, 'uSyncIntensity');
    gl.uniform1f(syncLoc, particleSystem.syncIntensity);

    particleSystem.render();

    requestAnimationFrame(render);
}

requestAnimationFrame(render);
