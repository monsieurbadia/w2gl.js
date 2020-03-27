import { Base } from 'base';
import { Shader } from 'core';
import { reducer } from 'util';

export class CustomMesh {

  constructor ( THREE, option ) {

    const shader = new Shader( THREE, option.shader );
    const geometry = new THREE[ `PlaneBufferGeometry` ]( ...option.geometry.option );
    const material = new THREE[ 'ShaderMaterial' ]( shader );
    const mesh = new THREE.Mesh( geometry, material );

    function onmousemove ( mousemove ) {

      Base.DEFAULT.mousemoveList.push( mousemove );
  
    }
  
    function onresize ( resize ) {
  
      Base.DEFAULT.resizeList.push( resize );
  
    }
  
    function onrender ( update ) {
  
      Base.DEFAULT.renderList.push( update );
  
    } 

    return Object.assign( mesh, {
      onmousemove,
      onresize,
      onrender
    } );

  }

};

export const createCustomMesh = option => {
  
  let _option;

  if ( option.shader ) {

    _option = Object.assign( {}, {
      default: {
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
    mesh: reducer( _option, o => new CustomMesh( option.THREE, o ) )
  };

};
