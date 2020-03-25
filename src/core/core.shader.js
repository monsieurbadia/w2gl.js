import { Base } from 'base';

export class Shader {

  constructor ( option ) {

    if ( !option ) return;

    const _uniform = option.uniforms !== undefined
      ? Object.assign( Base.SHADER.UNIFORMS, option.uniforms )
      : Base.SHADER.UNIFORMS;

    this.uniforms = this.createUniforms( _uniform );
    this.vertexShader = option.vertex;
    this.fragmentShader = option.fragment;

    this.onbeforecompile( this.compile );

  }

  onbeforecompile ( f ) { return f( this ); }

  createUniforms ( uniforms = {} ) {

    return Object.keys( uniforms ).reduce( ( result, key ) => {

      const uniform = uniforms[ key ];

      const parseUniform = uniform => {

        const { type, value } = uniform;

        uniform.value = Base.MATH.PRIMITIVES[ type ];

        if ( value.length > 0 ) {
          
          uniform.value.set( ...value );

        }
        
        return uniform;

      }

      return {
        ...result,
        [ key ]: Base.MATH.TYPES.includes( uniform.type ) ? parseUniform( uniform ) : uniform
      };

    }, {} );

  }

  compile ( shader ) {

    Object.keys( Base.SHADER.CORE ).forEach( key => {

      const core = Base.SHADER.CORE[ key ];

      switch ( core.type ) {

        case 'vertex':

          shader.vertexShader = shader.vertexShader.replace( core.name, core.template );

          break;

        case 'fragment':

          shader.fragmentShader = shader.fragmentShader.replace( core.name, core.template );

          break;

        default:

          return;

      }

    } );

  }

}
