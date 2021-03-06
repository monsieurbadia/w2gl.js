import { reducer } from 'u3s';
import { EVENT } from 'base';
import { Timer } from 'core';
import { onresize } from 'event';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @private */
const option = {
  current: {
    option: {
      antialias: true,
      pixelRatio: window.devicePixelRatio,
      size: [ window.innerWidth, window.innerHeight ],
    }
  }
};

/** @public */
const init = ( renderer, scene, camera ) => {

  renderer.current = { camera, scene };

  setTimerAnimationLoop( renderer );

};

/** @public */
const setTimerAnimationLoop = ( renderer, start ) => renderer.setAnimationLoop( start !== null ? _ => {

  renderer.timer.render();

  EVENT.LIST.renderList.forEach( render => render( renderer.timer ) );

  renderer.render( renderer.current.scene, renderer.current.camera );

} : null );

/** @private */
const customRendererWebGL = ( THREE, payload ) => {

  const rendererWebGL = new THREE.WebGLRenderer( { antialias: true } );

  rendererWebGL.setClearColor( 0x000000 );
  rendererWebGL.setPixelRatio( window.devicePixelRatio );
  rendererWebGL.setSize( ...payload.option.size, true );
  rendererWebGL.timer = new Timer();

  window.document.body.appendChild( rendererWebGL.domElement );

  return Object.assign( rendererWebGL, {
    onresize,
    init,
    setTimerAnimationLoop
  } );

};

/**
 * create custom renderer webgl 
 * @public
 */

export const createCustomRendererWebGL = payload => ( {
  ...payload,
  renderer: reducer( option, o => customRendererWebGL( payload.THREE, o ) )
} );
