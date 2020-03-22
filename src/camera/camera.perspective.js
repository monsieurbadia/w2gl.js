import { reducerLoopObject } from '../reducer/reducer.object';

export const PerspectiveCamera = options => options;

export const createCamera = options => ( {
  ...options,
  camera: reducerLoopObject( options.camera, ( option ) => PerspectiveCamera( option ) )
} );
