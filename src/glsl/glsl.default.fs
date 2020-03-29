float box (vec3 pos, vec3 size) {
  return length(max(abs(pos) - size, 0.0));
}

float roundedBox(vec3 pos, vec3 size, float radius) {
  return length(max(abs(pos) - size, 0.0)) - radius;
}

float plane (vec3 pos) {
  return pos.y;
}

float sphere (vec3 pos, float radius) {
  return length(pos) * 2.0 - radius;
}

float intersectPlane(vec3 pos, vec3 dir) {
  return -pos.y / dir.y;
}

vec2 repeat(inout vec2 pos, vec2 period) {

  vec2 off = pos + period * 0.5;
  vec2 idx = floor(off / period);
  pos = mod(off, period) - period * 0.5;
    
  return idx;

}

// LIGHT

vec3 sunDirection = normalize(vec3(0.0, 0.0, 0.0));

float diffuse(vec3 normal) {
  
  return clamp(dot(normal, sunDirection), 0.0, 1.0);

}

float specular(vec3 normal, vec3 dir) {
  
  vec3 h = normalize(sunDirection - dir);

  return pow(clamp(dot(h, normal), 0.0, 1.0), 8.0);

}

// TRANSLATE

vec2 rotate (vec2 v, float angle) {

  float c = cos(angle);
  float s = sin(angle);

  return mat2(c, s, -s, c) * v;

}
