import { Mesh } from 'three';
import { Base } from 'base';
import { Shader } from 'core';
import { reducer } from 'util';

export class CustomMesh extends Mesh {

  constructor ( options ) {
    
    const shader = new Shader( options.shader );
    const geometry = new Base.GEOMETRY[ 'plane' ]( ...options.geometry.options );
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

export const createCustomMesh = options => ( {
  ...options,
  mesh: reducer( options.mesh, option => new CustomMesh( option ) )
} );
