import { MATH, SHADER } from 'base';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
const merge = ( o1, o2 ) => ( { ...o1, ...o2 } );

/** @private */
const createUniforms = ( THREE, uniforms ) => 
  Object.keys( { ...uniforms } ).reduce( ( result, key ) => {
    
    let uniform = uniforms[ key ];

    if ( MATH.TYPES.includes( uniform.type ) ) {

      const { type, value } = uniform;
      const name = MATH.PRIMITIVES[ type ];
    
      uniform.value = new THREE[ name ]();
    
      if ( value.length > 0 ) uniform.value.set( ...value );

    }

    return {
      ...result,
      [ key ]: uniform
    };
  
  }, {} );

/** @public */
const compile = shade => {

  Object.keys( SHADER.TYPE ).forEach( key => {

    const core = SHADER.TYPE[ key ];
    let current = shade[ `${ core.type }Shader` ];

    current = current.includes( core.name ) ? current.replace( core.name, core.template ) : current;

  } );

  return shade;

};

/**
 * shade
 * @public
 */

export const Shade = function ( THREE, option ) {

  this.uniforms = createUniforms( THREE, merge( SHADER.UNIFORMS, option.uniforms ) );
  this.fragmentShader = option.fragment;
  this.vertexShader = option.vertex;

  return Object.assign( this, compile( this ) );

};