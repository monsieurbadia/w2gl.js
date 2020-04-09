import { reducer } from 'util';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
const init = ( scene, meshes ) => meshes.forEach( mesh => scene.add( mesh ) );

/** @private */
export const customScene = THREE => Object.assign( new THREE.Scene(), { init } );

/**
 * create custom scene
 * @public
 */

 export const createCustomScene = payload => {

  const option = { current: {} };

  return {
    ...payload,
    scene: reducer( option, o => customScene( payload.THREE, o ) )
  };

};
