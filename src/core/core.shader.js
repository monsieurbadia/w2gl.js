import { Base } from 'base';

export class Shader {

  constructor ( option ) {

    if ( !option ) return;

    this.uniforms = this.createUniforms( option.uniforms );
    this.vertexShader = option.vertex;
    this.fragmentShader = option.fragment;

  }

  createUniforms ( uniforms = {} ) {

    return Object.keys( uniforms ).reduce( ( result, key ) => {

      const uniform = uniforms[ key ];

      const parseUniform = uniform => {

        const { type, value } = uniform;

        uniform.value = Base.MATH.PRIMITIVES[ type ];

        if ( value.length > 0 ) {
          
          uniform.value.set( ...value );

        }
        
        console.log( uniform.value, value )
        return uniform;

      }

      return {
        ...result,
        [ key ]: Base.MATH.TYPES.includes( uniform.type ) ? parseUniform( uniform ) : uniform
      };

    }, {} );

  }

}
