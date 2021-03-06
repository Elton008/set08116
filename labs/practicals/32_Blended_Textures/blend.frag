#version 440

// Main textures
uniform sampler2D tex[2];
// Blend map
uniform sampler2D blend;

// Incoming texture coordinate
layout(location = 0) in vec2 tex_coord;
// Outgoing fragment colour
layout(location = 0) out vec4 colour;

void main() {
  // *********************************
  // Sample the two main textures
  // Sample the blend texture
  // Mix the main samples using r component from blend value
 vec4 col1 = texture(tex[0], tex_coord);
  vec4 col2 = texture(tex[1], tex_coord);
  vec4 blender = texture(blend, tex_coord);
  colour = mix(col1, col2, blender.r);
  // *********************************
}

