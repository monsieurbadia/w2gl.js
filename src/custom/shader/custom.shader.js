import { Shade } from 'core';
import { reducer } from 'util';
import { onmousemove, onrender, onresize } from 'event';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @private */
export class CustomShader {

  constructor ( THREE, option ) {

    const shade = new Shade( THREE, option );
    const material = new THREE[ 'ShaderMaterial' ]( shade );
    const geometry = new THREE[ 'PlaneBufferGeometry' ]( 2, 2 );
    const mesh = new THREE.Mesh( geometry, material );

    return Object.assign( mesh, {
      onmousemove,
      onresize,
      onrender
    } );

  }

};

/** @public */
export const createCustomShader = option => {

  return {
    ...option,
    shader: reducer( option.shader, o => new CustomShader( option.THREE, o ) )
  };

};
