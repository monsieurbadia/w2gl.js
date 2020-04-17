import { is, pipe } from 'u3s';
import { Events, Mouse, Screen } from 'core';
import { createCustomCamera, createCustomShader, createCustomScene, createCustomRendererWebGL } from 'custom';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

const w2gl = Object.freeze( {

  init ( payload, f ) {

    if ( !payload.THREE ) is.required = 'required THREE instance';;

    const operations = [
      createCustomScene,
      createCustomCamera,
      createCustomRendererWebGL,
      createCustomShader,
    ];

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
      starter.scene?.current.init( starter.scene.current, [ starter.shader[ key ] ] );
    } );

    starter.events?.init();
    starter.camera?.current.init( starter.camera.current, [ 0, 0, -1 ] );
    starter.renderer?.current.init( starter.renderer.current, starter.scene.current, starter.camera.current );

    return f ? f( starter ) : starter;

  }

} );

export default w2gl;
module.exports = w2gl;
