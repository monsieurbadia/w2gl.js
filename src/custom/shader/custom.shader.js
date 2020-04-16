import { Shade } from 'core';
import { onmousemove, onrender, onresize } from 'event';
import { reducer } from 'u3s';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @private */
const customShader = ( THREE, option ) => {

  const shade = new Shade( THREE, option );
  const material = new THREE.ShaderMaterial( shade );
  const geometry = new THREE.PlaneBufferGeometry( 2, 2 );
  const mesh = new THREE.Mesh( geometry, material );

  return Object.assign( mesh, {
    onmousemove,
    onresize,
    onrender
  } );

};

/**
 * create custom shader
 * @public
 */

export const createCustomShader = payload => ( {
  ...payload,
  shader: reducer( payload.shader, o => customShader( payload.THREE, o ) )
} );
