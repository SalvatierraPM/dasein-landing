export const PI = "#define PI 3.1415926538";

export const uvFromIndex = `
vec2 uvFromIndex (int i, ivec2 s) {
  float y = floor(float(i) / float(s.x));
  float x = float(i) - (y * float(s.x));
  vec2 uv = vec2(x, y) / vec2(s);
  return uv;
}`;
