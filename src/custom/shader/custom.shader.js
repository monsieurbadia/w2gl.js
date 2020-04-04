import { Base } from 'base';
import { Shader } from 'core';
import { reducer } from 'util';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

export class CustomShader {

  constructor ( THREE, option ) {

    Object.assign( option, {
      geometry: {
        parameter: [ 2, 2 ],
      }
    } );

    const shader = new Shader( THREE, option );
    const material = new THREE[ 'ShaderMaterial' ]( shader );
    const geometry = new THREE[ `PlaneBufferGeometry` ]( ...option.geometry.parameter );
    const mesh = new THREE.Mesh( geometry, material );

    const onmousemove = mousemove => Base.DEFAULT.mousemoveList.push( mousemove );
    const onresize = resize => Base.DEFAULT.resizeList.push( resize );
    const onrender = update => Base.DEFAULT.renderList.push( update );

    return Object.assign( mesh, {
      onmousemove,
      onresize,
      onrender
    } );

  }

};

export const createCustomShader = option => {

  return {
    ...option,
    shader: reducer( option.shader, o => new CustomShader( option.THREE, o ) )
  };

};
