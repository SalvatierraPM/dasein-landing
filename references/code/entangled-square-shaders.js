import {hash12, cnoise4} from './glslNoise.js';
import {PI} from './glslUtils.js';

// Position Target - SQUARE SHAPE
function createPosTargetShader() {
    return `
        ${PI}
        ${hash12}

        uniform float time;

        void main() {
            float nPoints = resolution.x * resolution.y;
            float i = (gl_FragCoord.y * resolution.x) + gl_FragCoord.x;
            vec2 uv = gl_FragCoord.xy / resolution.xy;

            vec3 pos = vec3(0.0);

            // Distribute particles along four edges of a square
            float t = i / nPoints;
            float rad = 80.0 + hash12(vec2(i * 0.123, i * 3.453)) * 80.0;

            // Four vertices of a square
            vec2 v1 = vec2(-1.0, 1.0);   // Top left
            vec2 v2 = vec2(1.0, 1.0);    // Top right
            vec2 v3 = vec2(1.0, -1.0);   // Bottom right
            vec2 v4 = vec2(-1.0, -1.0);  // Bottom left

            vec2 p2d;

            // Distribute along four edges
            if (t < 0.25) {
                // Edge 1: v1 to v2 (top)
                float edgeT = t / 0.25;
                p2d = mix(v1, v2, edgeT);
            } else if (t < 0.5) {
                // Edge 2: v2 to v3 (right)
                float edgeT = (t - 0.25) / 0.25;
                p2d = mix(v2, v3, edgeT);
            } else if (t < 0.75) {
                // Edge 3: v3 to v4 (bottom)
                float edgeT = (t - 0.5) / 0.25;
                p2d = mix(v3, v4, edgeT);
            } else {
                // Edge 4: v4 to v1 (left)
                float edgeT = (t - 0.75) / 0.25;
                p2d = mix(v4, v1, edgeT);
            }

            pos.x = p2d.x * rad;
            pos.y = p2d.y * rad;
            float depthSeed = hash12(vec2(i * 1.173, p2d.x + p2d.y));
            float ridge = sin(length(p2d) * 3.0 + time * 0.0002);
            pos.z = (depthSeed - 0.5) * 140.0 + ridge * 50.0;

            gl_FragColor = vec4(pos, 1.0);
        }
    `;
}

// Acceleration - Same as original with entanglement
function createAccShader() {
    return `
        ${PI}
        ${cnoise4}
        ${hash12}

        uniform float time;
        uniform float syncIntensity;

        void main() {
            float nPoints = resolution.x * resolution.y;
            float i = (gl_FragCoord.y * resolution.x) + gl_FragCoord.x;
            vec2 uv = gl_FragCoord.xy / resolution.xy;

            vec3 a = vec3(0.0);
            vec4 p = texture2D(pos, uv);
            vec4 tar = texture2D(posTarget, uv);

            vec3 turb;
            float t = time * 0.0001;
            float n = hash12(uv * 0.02 + i);
            float s = .2;

            turb.x = cnoise(vec4(p.xyz * 0.006 + n * 35.4, t));
            turb.y = cnoise(vec4(p.xyz * 0.007 + n * 32.3, t));
            turb.z = cnoise(vec4(p.xyz * 0.006 + n * 43.3, t));
            turb *= pow(cnoise(vec4(p.xyz * 0.01, time * 0.0003)), 3.0) * s * 20.0;

            // Entanglement coupling
            if (syncIntensity > 0.01) {
                turb *= (1.0 + syncIntensity * 0.5);
            }

            a += turb;

            vec3 back = tar.xyz - p.xyz;
            back *= ((1.0 + pow(cnoise(vec4(tar.xyz * 0.002, time * 0.0001) ), 1.0)) / 2.0) * 0.003;
            a += back;

            vec3 collect;
            collect = p.xyz * -.0003;

            gl_FragColor = vec4(a, 1.0);
        }
    `;
}

// Velocity - Same as original
function createVelShader() {
    return `
        ${PI}

        uniform float time;

        void main() {
            float nPoints = resolution.x * resolution.y;
            float i = (gl_FragCoord.y * resolution.x) + gl_FragCoord.x;
            vec2 uv = gl_FragCoord.xy / resolution.xy;

            vec4 a = texture2D(acc, uv);
            vec4 v = texture2D(vel, uv);
            v += a;
            v *= .97;

            gl_FragColor = vec4(v.xyz, 1.0);
        }
    `;
}

// Position - Same as original
function createPosShader() {
    return `
        ${PI}

        uniform float time;
        uniform int frame;

        void main() {
            float nPoints = resolution.x * resolution.y;
            float i = (gl_FragCoord.y * resolution.x) + gl_FragCoord.x;
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

export {createPosTargetShader, createAccShader, createVelShader, createPosShader};
