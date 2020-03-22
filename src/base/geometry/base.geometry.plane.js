import { Geometry } from '../../core/core.geometry';
import { reducerLoopObject } from '../../reducer/reducer.object';

export class GeometryPlane extends Geometry {

  constructor ( options ) {


  }

}

export const createGeometry = options => ( {
  ...options,
  geometry: reducerLoopObject( options.geometry, ( option ) => new GeometryPlane( option ) )
} );
