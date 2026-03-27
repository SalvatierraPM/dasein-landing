import * as THREE from "three";

interface GPUVariable {
  name: string;
  initialValueTexture: THREE.DataTexture;
  material: THREE.ShaderMaterial;
  dependencies: GPUVariable[] | null;
  renderTargets: THREE.WebGLRenderTarget[];
  wrapS: THREE.Wrapping | null;
  wrapT: THREE.Wrapping | null;
  minFilter: THREE.MinificationTextureFilter;
  magFilter: THREE.MagnificationTextureFilter;
}

export class GPUComputationRenderer {
  private variables: GPUVariable[] = [];
  private currentTextureIndex = 0;
  private dataType: THREE.TextureDataType = THREE.FloatType;
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private passThruUniforms: { passThruTexture: { value: THREE.Texture | null } };
  private passThruShader: THREE.ShaderMaterial;
  private mesh: THREE.Mesh;
  private renderer: THREE.WebGLRenderer;
  private sizeX: number;
  private sizeY: number;

  constructor(sizeX: number, sizeY: number, renderer: THREE.WebGLRenderer) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();
    this.camera.position.z = 1;
    this.passThruUniforms = { passThruTexture: { value: null } };
    this.passThruShader = this.createShaderMaterial(
      "uniform sampler2D passThruTexture;\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  gl_FragColor = texture2D( passThruTexture, uv );\n}\n",
      this.passThruUniforms,
    );
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.passThruShader);
    this.scene.add(this.mesh);
  }

  addVariable(name: string, shader: string, tex: THREE.DataTexture): GPUVariable {
    const material = this.createShaderMaterial(shader);
    const v: GPUVariable = {
      name, initialValueTexture: tex, material,
      dependencies: null, renderTargets: [],
      wrapS: null, wrapT: null,
      minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter,
    };
    this.variables.push(v);
    return v;
  }

  setVariableDependencies(v: GPUVariable, deps: GPUVariable[]) { v.dependencies = deps; }

  init(): string | null {
    if (!this.renderer.capabilities.isWebGL2 && !this.renderer.extensions.has("OES_texture_float"))
      return "No OES_texture_float support.";
    if (this.renderer.capabilities.maxVertexTextures === 0)
      return "No vertex shader textures.";

    for (const v of this.variables) {
      v.renderTargets[0] = this.createRT(v.wrapS, v.wrapT, v.minFilter, v.magFilter);
      v.renderTargets[1] = this.createRT(v.wrapS, v.wrapT, v.minFilter, v.magFilter);
      this.renderTexture(v.initialValueTexture, v.renderTargets[0]!);
      this.renderTexture(v.initialValueTexture, v.renderTargets[1]!);

      if (v.dependencies) {
        for (const dep of v.dependencies) {
          if (dep.name !== v.name) {
            if (!this.variables.some(x => x.name === dep.name))
              return `Dependency not found: ${dep.name}`;
          }
          v.material.uniforms[dep.name] = { value: null };
          v.material.fragmentShader = `\nuniform sampler2D ${dep.name};\n` + v.material.fragmentShader;
        }
      }
    }
    this.currentTextureIndex = 0;
    return null;
  }

  compute() {
    const cur = this.currentTextureIndex;
    const nxt = cur === 0 ? 1 : 0;
    for (const v of this.variables) {
      if (v.dependencies) {
        for (const dep of v.dependencies) {
          v.material.uniforms[dep.name]!.value = dep.renderTargets[cur]!.texture;
        }
      }
      this.doRenderTarget(v.material, v.renderTargets[nxt]!);
    }
    this.currentTextureIndex = nxt;
  }

  getCurrentRenderTarget(v: GPUVariable) { return v.renderTargets[this.currentTextureIndex]!; }

  createShaderMaterial(frag: string, uniforms?: Record<string, THREE.IUniform>) {
    const m = new THREE.ShaderMaterial({
      uniforms: uniforms ?? {},
      vertexShader: "void main() { gl_Position = vec4( position, 1.0 ); }",
      fragmentShader: frag,
    });
    m.defines["resolution"] = `vec2( ${this.sizeX.toFixed(1)}, ${this.sizeY.toFixed(1)} )`;
    return m;
  }

  createTexture() {
    return new THREE.DataTexture(
      new Float32Array(this.sizeX * this.sizeY * 4),
      this.sizeX, this.sizeY, THREE.RGBAFormat, THREE.FloatType,
    );
  }

  private createRT(
    wrapS?: THREE.Wrapping | null, wrapT?: THREE.Wrapping | null,
    minF?: THREE.MinificationTextureFilter, magF?: THREE.MagnificationTextureFilter,
  ) {
    return new THREE.WebGLRenderTarget(this.sizeX, this.sizeY, {
      wrapS: wrapS ?? THREE.ClampToEdgeWrapping,
      wrapT: wrapT ?? THREE.ClampToEdgeWrapping,
      minFilter: minF ?? THREE.NearestFilter,
      magFilter: magF ?? THREE.NearestFilter,
      format: THREE.RGBAFormat, type: this.dataType, depthBuffer: false,
    });
  }

  private renderTexture(input: THREE.Texture, output: THREE.WebGLRenderTarget) {
    this.passThruUniforms.passThruTexture.value = input;
    this.doRenderTarget(this.passThruShader, output);
    this.passThruUniforms.passThruTexture.value = null;
  }

  private doRenderTarget(mat: THREE.ShaderMaterial, output: THREE.WebGLRenderTarget) {
    const prev = this.renderer.getRenderTarget();
    this.mesh.material = mat;
    this.renderer.setRenderTarget(output);
    this.renderer.render(this.scene, this.camera);
    this.mesh.material = this.passThruShader;
    this.renderer.setRenderTarget(prev);
  }

  dispose() {
    for (const v of this.variables) {
      v.renderTargets[0]?.dispose();
      v.renderTargets[1]?.dispose();
      v.material.dispose();
    }
    this.passThruShader.dispose();
    this.variables = [];
  }
}
