import {
  Vector2,
  Vector3,
  Vector4
} from 'three';

const types = [
  'v2',
  'v3',
  'v4'
];

const BASE_TYPE = {
  v2: new Vector2(),
  v3: new Vector3(),
  v4: new Vector4()
};

export class Shader {

  constructor ( options ) {

    this.uniforms = this.createUniforms( options.uniforms );
    this.vertexShader = options.vertex;
    this.fragmentShader = options.fragment;
    
  }

  createUniforms ( uniforms = {} ) {

    return Object.keys( { ...uniforms } ).reduce( ( result, key ) => {

      let uniform = uniforms[ key ];

      const parseUniform = uniform => {

        const { type, value } = uniform;

        uniform.value = BASE_TYPE[ type ];
        uniform.value.set( ...value );

        return uniform;

      }

      return {
        ...result,
        [ key ]: types.includes( uniform.type ) ? parseUniform( uniform ) : uniform
      };

    }, {} );

  }
}

