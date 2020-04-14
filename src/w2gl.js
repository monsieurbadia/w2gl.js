import { Events, Mouse, Screen } from 'core';
import { createCustomCamera, createCustomShader, createCustomScene, createCustomRendererWebGL } from 'custom';
import { pipe } from 'util';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

const w2gl = Object.freeze( {

  init ( payload, f ) {

    const operations = [
      createCustomScene,
      createCustomCamera,
      createCustomRendererWebGL,
      createCustomShader,
    ];

    if ( !payload.THREE ) throw new Error( 'required THREE instance' );

    const prepare = pipe( ...operations );
    const starter = Object.assign(
      prepare( payload ),
      {
        events: new Events(),
        mouse: new Mouse(),
        screen: new Screen(),
      }
    );

    Object.keys( starter.shader ).forEach( key => {
      starter.scene?.current.init( starter.scene?.current, [ starter.shader[ key ] ] );
    } );

    starter.events?.init();
    starter.camera?.current.init( starter.camera.current, [ 0, 0, -1 ] );
    starter.renderer?.current.init( starter.renderer?.current, starter.scene.current, starter.camera.current );

    return f ? f( starter ) : starter;

  }

} );

export default w2gl;
module.exports = w2gl;