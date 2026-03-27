import {hash12, cnoise4} from './glslNoise.js';
import {PI} from './glslUtils.js';

function createPosTargetShader() {
    return `
        ${PI}
        ${hash12}

        uniform float time;

        vec3 sampleCubeEdge(float seed, float scale) {
            vec3 corner = vec3(
                fract(seed * 12.321) > 0.5 ? 1.0 : -1.0,
                fract(seed * 23.432) > 0.5 ? 1.0 : -1.0,
                fract(seed * 34.543) > 0.5 ? 1.0 : -1.0
            );

            float axisSeed = fract(seed * 45.654);
            int axis = int(floor(axisSeed * 3.0));
            float along = fract(seed * 56.765) * 2.0 - 1.0;

            vec3 p = corner;
            if (axis == 0) {
                p.x = along;
            } else if (axis == 1) {
                p.y = along;
            } else {
                p.z = along;
            }

            return p * scale;
        }

        vec4 sampleConnector(float seed, float innerScale, float outerScale) {
            vec3 corner = vec3(
                fract(seed * 12.321) > 0.5 ? 1.0 : -1.0,
                fract(seed * 23.432) > 0.5 ? 1.0 : -1.0,
                fract(seed * 34.543) > 0.5 ? 1.0 : -1.0
            );

            float edgeT = fract(seed * 78.987);
            float scaled = mix(innerScale, outerScale, edgeT);
            float w = mix(-1.0, 1.0, edgeT);

            return vec4(corner * scaled, w);
        }

        vec3 projectTesseract(vec4 p4, float time) {
            // Rotate XW plane
            float r1 = time * 0.00012;
            float c1 = cos(r1);
            float s1 = sin(r1);
            vec4 r = p4;
            float x = r.x * c1 - r.w * s1;
            float w = r.x * s1 + r.w * c1;
            r.x = x;
            r.w = w;

            // Rotate YZ plane
            float r2 = time * 0.00009;
            float c2 = cos(r2);
            float s2 = sin(r2);
            float y = r.y * c2 - r.z * s2;
            float z = r.y * s2 + r.z * c2;
            r.y = y;
            r.z = z;

            // Rotate ZW plane
            float r3 = time * 0.00005;
            float c3 = cos(r3);
            float s3 = sin(r3);
            z = r.z * c3 - r.w * s3;
            w = r.z * s3 + r.w * c3;
            r.z = z;
            r.w = w;

            float perspective = 1.0 / (1.8 - r.w);
            return r.xyz * perspective * 140.0;
        }

        void main() {
            float nPoints = resolution.x * resolution.y;
            float i = (gl_FragCoord.y * resolution.x) + gl_FragCoord.x;
            vec2 uv = gl_FragCoord.xy / resolution.xy;

            float hashA = hash12(vec2(i * 0.013, uv.x * 7.13));
            float hashB = hash12(vec2(i * 0.071, uv.y * 3.73));
            float choice = fract(hashA * 3.7);

            float outerScale = 1.5;
            float innerScale = 0.6;

            vec3 pos;
            if (choice < 0.33) {
                vec3 edge = sampleCubeEdge(hashB * 17.37, outerScale);
                vec4 p4 = vec4(edge, 1.0);
                pos = projectTesseract(p4, time);
            } else if (choice < 0.66) {
                vec3 edge = sampleCubeEdge(hashB * 43.21, innerScale);
                vec4 p4 = vec4(edge, -1.0);
                pos = projectTesseract(p4, time);
            } else {
                vec4 connector = sampleConnector(hashB * 91.73, innerScale, outerScale);
                pos = projectTesseract(connector, time);
            }

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

            if (syncIntensity > 0.01) {
                turb *= (1.0 + syncIntensity * 0.5);
            }

            a += turb;

            vec3 back = tar.xyz - p.xyz;
            back *= ((1.0 + pow(cnoise(vec4(tar.xyz * 0.002, time * 0.0001)), 1.0)) / 2.0) * 0.003;
            a += back;

            vec3 collect;
            collect = p.xyz * -.0003;

            gl_FragColor = vec4(a, 1.0);
        }
    `;
}

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
