#version 440

// Point light information
struct point_light {
  vec4 light_colour;
  vec3 position;
  float constant;
  float linear;
  float quadratic;
};

// Material information
struct material {
  vec4 emissive;
  vec4 diffuse_reflection;
  vec4 specular_reflection;
  float shininess;
};

// Point light for the scene
uniform point_light point;
// Material for the object
uniform material mat;
// Eye position
uniform vec3 eye_pos;
// Texture
uniform sampler2D tex;

// Incoming position
layout(location = 0) in vec3 position;
// Incoming normal
layout(location = 1) in vec3 normal;
// Incoming texture coordinate
layout(location = 2) in vec2 tex_coord;

// Outgoing colour
layout(location = 0) out vec4 colour;

void main() {
  // *********************************
  // Get distance between point light and vertex
  float d = light.position(vec3 x, vec3 y);

  // Calculate attenuation factor
  float A = light.constant + (light.linear * light.position) + (light.quadratic * (light.position * light.position));

  // Calculate light colour
  colour = light.light_colour(1.0 / A);

  // Calculate light dir
  vec3 light_dir = normalize(eye_pos - position);

  // Now use standard phong shading but using calculated light colour and direction
  // - note no ambient

  vec4 diffuse = K * (mat.diffuse_reflection * light.light_colour);

  vec3 view_dir = normalize(eye_pos - world_position);

  vec3 half_vector = normalize(light.light_dir + view_dir);

  vec4 specular = K * mat.specular_reflection * light.light_colour;

  vec4 tex_colour = texture(tex, tex_coord);

  vec4 primary = mat.emissive + diffuse;

  colour = primary * tex_colour + specular; 

  colour.a = 1.0;

  
  // *********************************
}