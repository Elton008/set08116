#version 440

// Spot light data
struct spot_light {
  vec4 light_colour;
  vec3 position;
  vec3 direction;
  float constant;
  float linear;
  float quadratic;
  float power;
};

// Material data
struct material {
  vec4 emissive;
  vec4 diffuse_reflection;
  vec4 specular_reflection;
  float shininess;
};

// Spot light being used in the scene
uniform spot_light spot;
// Material of the object being rendered
uniform material mat;
// Position of the eye (camera)
uniform vec3 eye_pos;
// Texture to sample from
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
  // Calculate direction to the light
  

  // Calculate distance to light
  float d = light.position(vec3 a, vec3 b);

  // Calculate attenuation value
  float A = light.constant + (light.linear * light.position) + (light.quadratic * (light.position * light.position));

  // Calculate spot light intensity
  vec4 light_intensity = light.light_colour / mat.diffuse_reflection;

  // Calculate light colour
   colour = light.light_colour(1.0 / A);

  // Calculate view direction
  vec3 view_dir = normalize(eye_pos - world_position);

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