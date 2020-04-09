import { reducer } from 'util';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
const init = ( camera, positions ) => positions?.length > 0 && camera.position.set( ...positions );

/** @private */
export const customCamera = THREE => Object.assign( new THREE.Camera(), { init } );

/**
 * create custom camera
 * @public
 */

export const createCustomCamera = payload => {
  
  const option = {
    current: {
      size: [ window.innerWidth, window.innerHeight ],
      type: 'perspective'
    }
  };

  return {
  ...payload,
  camera: reducer( option, o => customCamera( payload.THREE, o ) )
  };

};
