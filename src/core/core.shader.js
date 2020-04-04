import { Base } from 'base';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

export class Shader {

  constructor ( THREE, option ) {

    if ( !option ) return;

    const shader = {};

    const _uniform = option.uniforms !== undefined
      ? Object.assign( Base.SHADER.UNIFORMS, option.uniforms )
      : Base.SHADER.UNIFORMS;

    shader.uniforms = createUniforms( _uniform );
    shader.vertexShader = option.vertex;
    shader.fragmentShader = option.fragment;

    onbeforecompile( compile );

    function onbeforecompile ( f ) { return f( shader ); }

    function createUniforms ( uniforms = {} ) {
  
      return Object.keys( uniforms ).reduce( ( result, key ) => {
  
        const uniform = uniforms[ key ];
  
        const parseUniform = uniform => {
  
          const { type, value } = uniform;
  
          const name = Base.MATH.PRIMITIVES[ type ];

          uniform.value = new THREE[ name ]();
  
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
  
    function compile ( shader ) {
  
      Object.keys( Base.SHADER.CORE ).forEach( key => {
  
        const core = Base.SHADER.CORE[ key ];
  
        switch ( core.type ) {
  
          case 'vertex':
  
            shader.vertexShader = shader.vertexShader.includes( core.name ) ? shader.vertexShader.replace( core.name, core.template ) : shader.vertexShader;
  
            break;
  
          case 'fragment':
  
            shader.fragmentShader = shader.fragmentShader.includes( core.name ) ? shader.fragmentShader.replace( core.name, core.template ) : shader.fragmentShader;
  
            break;
  
          default:
  
            return;
  
        }
  
      } );
  
    }

    return shader;

  }

}
