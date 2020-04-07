import { Base } from 'base';

import {
  createCustomCamera,
  createCustomShader,
  createCustomScene,
  createCustomRendererWebGL
} from 'custom';

import { pipe } from 'util';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

const w2gl = Object.freeze( {

  init ( option, callback ) {

    const _operations = [
      createCustomScene,
      createCustomCamera,
      createCustomRendererWebGL,
      createCustomShader,
    ];

    const _option = Base.CORE.LIST.reduce( ( result, coreType ) => ( {
      ...result,
      [ coreType ]: Base.CORE[ coreType.toUpperCase() ]
    } ), Object.assign( {}, { ...option } ) );

    // check THREE instance option

    const _prepare = pipe( ..._operations );
    const _starter = _prepare( _option );

    if ( !_starter.browser.run.webgl() ) return;

    Object.keys( _starter.shader ).forEach( key => {
      _starter.scene.current.init( [ _starter.shader[ key ] ] );
    } );

    _starter.camera.current.init( [ 0, 0, -1 ] );
    _starter.renderer.current.init( _starter.scene.current, _starter.camera.current );

    return callback === undefined
      ? _starter
      : callback( _starter );

  }

} );

// es6 exports w2gl
export default w2gl;

// commonjs exports w2gl
module.exports = w2gl;
