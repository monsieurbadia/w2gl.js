import { Mesh } from 'three';
import { Base } from 'base';
import { Shader } from 'core';
import { reducer } from 'util';

export class CustomMesh extends Mesh {

  constructor ( option ) {

    const shader = new Shader( option.shader );
    const geometry = new Base.GEOMETRY[ 'plane' ]( ...option.geometry.option );
    const material = new Base.MATERIAL[ 'shader' ]( shader );

    super( geometry, material );

  }

  onmousemove ( mousemove ) {

    Base.DEFAULT.mousemoveList.push( mousemove );

  }

  onresize ( resize ) {

    Base.DEFAULT.resizeList.push( resize );

  }

  onrender ( update ) {

    Base.DEFAULT.renderList.push( update );

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
    mesh: reducer( _option, o => new CustomMesh( o ) )
  };

};
