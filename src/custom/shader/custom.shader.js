import { Base } from 'base';
import { Shader } from 'core';
import { reducer } from 'util';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

export class CustomShader {

  constructor ( THREE, option ) {

    const shader = Object.keys( option.shader ).map( key => { 

      const shaderCurrent = new Shader( THREE, option.shader[ key ] );
      const material = new THREE[ 'ShaderMaterial' ]( shaderCurrent );
      const geometry = new THREE[ `PlaneBufferGeometry` ]( ...option.geometry.option );

      return new THREE.Mesh( geometry, material );
    
    } )[ 0 ];

    const onmousemove = mousemove => Base.DEFAULT.mousemoveList.push( mousemove );
  
    const onresize = resize => Base.DEFAULT.resizeList.push( resize );
  
    const onrender = update => Base.DEFAULT.renderList.push( update );

    return Object.assign( shader, {
      onmousemove,
      onresize,
      onrender
    } );

  }

};

export const createCustomShader = option => {
  
  let _option;

  if ( option.shader ) {

    _option = Object.assign( {}, {
      current: {
        geometry: {
          buffer: true,
          option: [ 2, 2 ],
          specific: 'plane'
        },
        material: {
          option: {},
          specific: 'normal'
        },
        shader: option.shader
      }
    } );

  } else {

    if ( option.mesh && option.mesh.shader ) {

      _option = option.mesh;

    }

  }

  return {
    ...option,
    shader: reducer( _option, o => new CustomShader( option.THREE, o ) )
  };

};
