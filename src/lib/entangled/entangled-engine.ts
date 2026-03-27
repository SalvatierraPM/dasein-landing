import * as THREE from "three";
import { GPUComputationRenderer } from "./gpu-computation-renderer";
import { cnoise4, hash12 } from "./glsl-noise";
import { PI, uvFromIndex } from "./glsl-utils";

const NUM_POINTS = 30000;
const NUM_X = Math.ceil(Math.sqrt(NUM_POINTS));
const NUM_Y = NUM_X;

export interface HotZone {
  x: number;
  y: number;
  radius: number;
  intensity: number;
}

export interface EntangledState {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  world: THREE.Object3D;
  pointsMaterial: THREE.ShaderMaterial;
  gpu: GPUComputationRenderer;
  posTargetVar: ReturnType<GPUComputationRenderer["addVariable"]>;
  accVar: ReturnType<GPUComputationRenderer["addVariable"]>;
  velVar: ReturnType<GPUComputationRenderer["addVariable"]>;
  posVar: ReturnType<GPUComputationRenderer["addVariable"]>;
  mouse: { x: number; y: number; active: boolean };
  hotZones: HotZone[];
  internalTime: number;
  frame: number;
  systemEnergy: number;
  lfo: number;
  scrollProgress: number;
  disposed: boolean;
  animationId: number | null;
  lastTime: number;
}

function createPosTargetShader(): string {
  return `
    ${PI}
    ${hash12}
    uniform float time;
    void main() {
      float nPoints = resolution.x * resolution.y;
      float i = (gl_FragCoord.y * resolution.x) + gl_FragCoord.x;
      float goldenAngle = PI * (3.0 - sqrt(5.0));
      float theta = goldenAngle * i;
      float y = 1.0 - (i / nPoints) * 2.0;
      float radius = sqrt(1.0 - y * y);
      float r = 50.0 + hash12(vec2(i * 0.1, i * 0.3)) * 120.0;
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

function createAccShader(): string {
  return `
    ${PI}
    ${cnoise4}
    ${hash12}
    uniform float time;
    uniform float mouseX;
    uniform float mouseY;
    uniform bool mouseActive;
    uniform float hotZone0X;
    uniform float hotZone0Y;
    uniform float hotZone0Radius;
    uniform float hotZone0Intensity;
    uniform float hotZone1X;
    uniform float hotZone1Y;
    uniform float hotZone1Radius;
    uniform float hotZone1Intensity;
    uniform float scrollProgress;

    void main() {
      float i = (gl_FragCoord.y * resolution.x) + gl_FragCoord.x;
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec3 a = vec3(0.0);
      vec4 p = texture2D(pos, uv);
      vec4 tar = texture2D(posTarget, uv);
      float t = time * 0.0001;
      float n = hash12(vec2(i * 0.01, uv.x * 0.02));

      // Curl noise turbulence — more energy as user scrolls deeper
      vec3 turb;
      turb.x = cnoise(vec4(p.xyz * 0.006 + n * 35.4, t));
      turb.y = cnoise(vec4(p.xyz * 0.007 + n * 32.3, t));
      turb.z = cnoise(vec4(p.xyz * 0.006 + n * 43.3, t));
      float lfo = 0.5 + 0.5 * sin(time * 0.00025 * PI * 2.0);
      float turbMult = 0.10 + scrollProgress * 0.08;
      turb *= pow(cnoise(vec4(p.xyz * 0.01, time * 0.0003)), 3.0) * turbMult * (1.0 + lfo * 0.5);
      a += turb;

      // Spring force
      vec3 spring = tar.xyz - p.xyz;
      float springK = 0.003 * (0.8 + lfo * 0.4);
      a += spring * springK;

      // Mouse — particles scatter from cursor
      if (mouseActive) {
        vec2 mousePos = vec2(mouseX, mouseY);
        vec2 pPos = vec2(p.x, p.y);
        float dist = length(mousePos - pPos);
        if (dist < 180.0) {
          vec2 dir = normalize(pPos - mousePos);
          float angle = atan(dir.y, dir.x) + (n - 0.5) * PI;
          float force = (1.0 - dist / 180.0) * 1.2;
          a.x += cos(angle) * force;
          a.y += sin(angle) * force;
          a.z += (n - 0.5) * force * 0.8;
        }
      }

      // Hot zone 0 — CTA proximity burst
      if (hotZone0Intensity > 0.01) {
        vec2 hz = vec2(hotZone0X, hotZone0Y);
        float dist = length(vec2(p.x, p.y) - hz);
        if (dist < hotZone0Radius) {
          vec2 dir = normalize(vec2(p.x, p.y) - hz);
          float f = (1.0 - dist / hotZone0Radius) * hotZone0Intensity * 2.5;
          float angle = atan(dir.y, dir.x) + (n - 0.5) * PI * 1.5;
          a.x += cos(angle) * f;
          a.y += sin(angle) * f;
          a.z += (n - 0.5) * f * 1.2;
        }
      }

      // Hot zone 1
      if (hotZone1Intensity > 0.01) {
        vec2 hz = vec2(hotZone1X, hotZone1Y);
        float dist = length(vec2(p.x, p.y) - hz);
        if (dist < hotZone1Radius) {
          vec2 dir = normalize(vec2(p.x, p.y) - hz);
          float f = (1.0 - dist / hotZone1Radius) * hotZone1Intensity * 2.5;
          float angle = atan(dir.y, dir.x) + (n - 0.5) * PI * 1.5;
          a.x += cos(angle) * f;
          a.y += sin(angle) * f;
          a.z += (n - 0.5) * f * 1.2;
        }
      }

      gl_FragColor = vec4(a, 1.0);
    }
  `;
}

function createVelShader(): string {
  return `
    ${PI}
    uniform float time;
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec4 a = texture2D(acc, uv);
      vec4 v = texture2D(vel, uv);
      v += a;
      float lfo = 0.5 + 0.5 * sin(time * 0.00025 * PI * 2.0);
      float damping = 0.95 + 0.05 * lfo * 0.5;
      v *= damping;
      gl_FragColor = vec4(v.xyz, 1.0);
    }
  `;
}

function createPosShader(): string {
  return `
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

function createPointsMaterial(): THREE.ShaderMaterial {
  const vert = `
    ${hash12}
    ${uvFromIndex}
    uniform sampler2D posTarget;
    uniform sampler2D acc;
    uniform sampler2D vel;
    uniform sampler2D pos;
    uniform float time;
    uniform float energy;
    uniform float lfo;
    uniform float scrollProgress;
    varying float alpha;
    varying vec3 col;

    void main() {
      int i = gl_VertexID;
      ivec2 size = ivec2(${NUM_X}, ${NUM_Y});
      vec2 uv = uvFromIndex(i, size);
      vec4 pos = texture2D(pos, uv);
      vec4 v = texture2D(vel, uv);
      vec3 p = pos.xyz;

      float n = hash12(vec2(float(i), 0.0));
      float ps = pow(n, 2.0) * 3.5;

      alpha = 0.35 + pow(n, 10.0) * 0.45;
      alpha *= (0.75 + lfo * 0.25);

      if (n > 0.997) {
        ps *= 1.8;
        alpha = min(alpha * 2.2, 1.0);
      }

      // Dasein palette for light background — signal-blue → horizon-violet → signal-red
      vec3 coolColor = vec3(0.282, 0.396, 1.0);    // signal-blue #4865ff
      vec3 midColor  = vec3(0.478, 0.412, 0.839);   // horizon-violet #7a68d6
      vec3 warmColor = vec3(1.0, 0.36, 0.22);       // signal-red #ff5c38

      float velocityMag = length(v.xyz);
      float energyLevel = pow(velocityMag / 2.0, 3.0);
      energyLevel = clamp(energyLevel + energy * 0.3, 0.0, 1.0);

      float scrollWarmth = scrollProgress * 0.4;
      vec3 baseColor = mix(coolColor, midColor, scrollWarmth);
      col = mix(baseColor, warmColor, energyLevel);

      gl_PointSize = ps;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `;

  const frag = `
    varying float alpha;
    varying vec3 col;
    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord) * 2.0;
      if (dist > 1.0) discard;
      float glow = exp(-12.0 * dist * dist);
      float core = exp(-8.0 * dist * dist);
      vec3 finalCol = col * (1.0 + core * 2.0);
      gl_FragColor = vec4(finalCol, alpha * glow * 0.7);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }, energy: { value: 0 }, lfo: { value: 0 }, scrollProgress: { value: 0 },
      posTarget: { value: null }, acc: { value: null }, vel: { value: null }, pos: { value: null },
    },
    vertexShader: vert,
    fragmentShader: frag,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.NormalBlending,
  });
}

export function createEntangled(canvas: HTMLCanvasElement): EntangledState {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const pixR = Math.min(window.devicePixelRatio, 2);

  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
  camera.position.z = 500;

  const scene = new THREE.Scene();
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(pixR);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  const world = new THREE.Object3D();
  scene.add(world);

  const geometry = new THREE.BufferGeometry();
  const verts: number[] = [];
  const s = 200;
  for (let i = 0; i < NUM_POINTS; i++) {
    verts.push(s * -0.5 + Math.random() * s, s * -0.5 + Math.random() * s, s * -0.5 + Math.random() * s);
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(verts), 3));

  const pointsMaterial = createPointsMaterial();
  world.add(new THREE.Points(geometry, pointsMaterial));

  const gpu = new GPUComputationRenderer(NUM_X, NUM_Y, renderer);
  const posTargetVar = gpu.addVariable("posTarget", createPosTargetShader(), gpu.createTexture());
  const accVar = gpu.addVariable("acc", createAccShader(), gpu.createTexture());
  const velVar = gpu.addVariable("vel", createVelShader(), gpu.createTexture());
  const posVar = gpu.addVariable("pos", createPosShader(), gpu.createTexture());

  gpu.setVariableDependencies(accVar, [posTargetVar, posVar, accVar]);
  gpu.setVariableDependencies(velVar, [accVar, velVar]);
  gpu.setVariableDependencies(posVar, [accVar, velVar, posVar, posTargetVar]);

  const error = gpu.init();
  if (error) throw new Error(`GPU init failed: ${error}`);

  return {
    camera, scene, renderer, world, pointsMaterial, gpu,
    posTargetVar, accVar, velVar, posVar,
    mouse: { x: 0, y: 0, active: false },
    hotZones: [],
    internalTime: 0, frame: 0, systemEnergy: 0, lfo: 0, scrollProgress: 0,
    disposed: false, animationId: null, lastTime: performance.now(),
  };
}

export function startRenderLoop(state: EntangledState): void {
  function render(): void {
    if (state.disposed) return;
    state.animationId = requestAnimationFrame(render);

    const now = performance.now();
    state.internalTime += now - state.lastTime;
    state.lastTime = now;

    state.lfo = 0.5 + 0.5 * Math.sin(state.internalTime * 0.00025 * Math.PI * 2);
    state.systemEnergy *= 0.98;
    if (state.mouse.active) state.systemEnergy += 0.008;
    for (const hz of state.hotZones) {
      if (hz.intensity > 0.01) state.systemEnergy += hz.intensity * 0.004;
    }

    const ptU = state.posTargetVar.material.uniforms;
    ptU["time"] = { value: state.internalTime };

    const accU = state.accVar.material.uniforms;
    accU["time"] = { value: state.internalTime };
    accU["mouseX"] = { value: state.mouse.x };
    accU["mouseY"] = { value: state.mouse.y };
    accU["mouseActive"] = { value: state.mouse.active };
    accU["scrollProgress"] = { value: state.scrollProgress };
    const hz0 = state.hotZones[0];
    const hz1 = state.hotZones[1];
    accU["hotZone0X"] = { value: hz0?.x ?? 0 };
    accU["hotZone0Y"] = { value: hz0?.y ?? 0 };
    accU["hotZone0Radius"] = { value: hz0?.radius ?? 0 };
    accU["hotZone0Intensity"] = { value: hz0?.intensity ?? 0 };
    accU["hotZone1X"] = { value: hz1?.x ?? 0 };
    accU["hotZone1Y"] = { value: hz1?.y ?? 0 };
    accU["hotZone1Radius"] = { value: hz1?.radius ?? 0 };
    accU["hotZone1Intensity"] = { value: hz1?.intensity ?? 0 };

    state.velVar.material.uniforms["time"] = { value: state.internalTime };
    state.posVar.material.uniforms["time"] = { value: state.internalTime };
    state.posVar.material.uniforms["frame"] = { value: state.frame };

    state.gpu.compute();

    const pu = state.pointsMaterial.uniforms;
    pu["time"]!.value = state.internalTime;
    pu["energy"]!.value = state.systemEnergy;
    pu["lfo"]!.value = state.lfo;
    pu["scrollProgress"]!.value = state.scrollProgress;
    pu["posTarget"]!.value = state.gpu.getCurrentRenderTarget(state.posTargetVar).texture;
    pu["acc"]!.value = state.gpu.getCurrentRenderTarget(state.accVar).texture;
    pu["vel"]!.value = state.gpu.getCurrentRenderTarget(state.velVar).texture;
    pu["pos"]!.value = state.gpu.getCurrentRenderTarget(state.posVar).texture;

    state.world.rotation.y += 0.0015;
    state.world.rotation.x += 0.0008;

    state.renderer.render(state.scene, state.camera);
    state.frame++;
  }
  render();
}

export function resizeEntangled(state: EntangledState, w: number, h: number): void {
  state.camera.aspect = w / h;
  state.camera.updateProjectionMatrix();
  state.renderer.setSize(w, h);
}

export function disposeEntangled(state: EntangledState): void {
  state.disposed = true;
  if (state.animationId !== null) cancelAnimationFrame(state.animationId);
  state.gpu.dispose();
  state.renderer.dispose();
  state.pointsMaterial.dispose();
}

export function domToWorld(
  state: EntangledState, clientX: number, clientY: number, rect: DOMRect,
): { x: number; y: number } {
  return {
    x: clientX - rect.left - rect.width / 2,
    y: -(clientY - rect.top - rect.height / 2),
  };
}
