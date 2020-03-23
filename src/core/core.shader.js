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

        uniform.value = Base.VECTOR.PRIMITIVES[ type ];
        uniform.value.set( ...value );

        return uniform;

      }

      return {
        ...result,
        [ key ]: Base.VECTOR.TYPES.includes( uniform.type ) ? parseUniform( uniform ) : uniform
      };

    }, {} );

  }

}
