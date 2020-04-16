import { reducer } from 'u3s';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @private */
const option = {
  current: {
    size: [ window.innerWidth, window.innerHeight ],
    type: 'perspective'
  }
};

/** @public */
const init = ( camera, positions ) => positions?.length > 0 && camera.position.set( ...positions );

/** @private */
const customCamera = THREE => Object.assign( new THREE.Camera(), { init } );

/**
 * create custom camera
 * @public
 */

export const createCustomCamera = payload => ( {
  ...payload,
  camera: reducer( option, o => customCamera( payload.THREE, o ) )
} );
