#version 440
uniform samplerCube tex;
 
layout (location = 0) out vec4 colour;
layout (location = 0)in vec3 tex_coord;

void main()
{
	
	colour = texture ( tex , tex_coord ) ;
}