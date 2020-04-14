import { reducer } from 'util';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @private */
const option = { current: {} };

/** @public */
const init = ( scene, meshes ) => meshes.forEach( mesh => scene.add( mesh ) );

/** @private */
const customScene = THREE => Object.assign( new THREE.Scene(), { init } );

/**
 * create custom scene
 * @public
 */

export const createCustomScene = payload => ( {
  ...payload,
  scene: reducer( option, o => customScene( payload.THREE, o ) )
} );
