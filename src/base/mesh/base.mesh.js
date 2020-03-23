import {
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial
} from 'three';

import { BASE_CONSTANT } from '../constant/base.constant';
import { reducerLoopObject } from '../../reducer/reducer.object';
import { Shader } from '../../shader/shader';

export class BaseMesh extends Mesh {

  constructor ( _options ) {
    
    const geometry = new PlaneBufferGeometry( ..._options.geometry.options );
    const material = new ShaderMaterial( new Shader( _options.shader ) );

    super( geometry, material );

  }

  onmousemove ( mousemove ) {

    BASE_CONSTANT.mousemoveList.push( mousemove );

  }

  onresize ( resize ) {

    BASE_CONSTANT.resizeList.push( resize );

  }

  onrender ( update ) {

    BASE_CONSTANT.renderList.push( update );

  } 

};

export const createBaseMesh = options => ( {
  ...options,
  mesh: reducerLoopObject( options.mesh, ( option ) => new BaseMesh( option ) )
} );
