import { Geometry } from '../core/core.geometry';
import { reducerLoopObject } from '../reducer/reducer.object';

export class GeometryPlane extends Geometry {

  constructor ( options ) {

    super();

    this.name = 'geometry-plane';

    const _gl = this.context;

    console.log( _gl );

    // plane
    const _vertices = [
      -0.5, 0.5, 0.0, // vertex 1
      -0.5, -0.5, 0.0, // vertex 2
      0.5, -0.5, 0.0, // vertex 3
      0.5, 0.5, 0.0 // vertex 4
    ];
  
    // indexes
    const _indices = [ 3, 2, 1, 3, 1, 0 ];

    // Create an empty buffer object to store vertex buffer
    const bufferVertex = _gl.createBuffer();
    
    // // Bind appropriate array buffer to it
    _gl.bindBuffer(
      _gl.ARRAY_BUFFER,
      bufferVertex
    );
         
    // // Pass the vertices data to the buffer
    _gl.bufferData(
      _gl.ARRAY_BUFFER,
      new Float32Array( _vertices ),
      _gl.STATIC_DRAW
    );

    // // Unbind the buffer
    _gl.bindBuffer( _gl.ARRAY_BUFFER, null );
    
    // // Create an empty buffer object to store Index buffer
    const bufferIndex = _gl.createBuffer();

    // // Bind appropriate array buffer to it
    _gl.bindBuffer(
      _gl.ELEMENT_ARRAY_BUFFER,
      bufferIndex
    );
         
    // // Pass the vertex data to the buffer
    _gl.bufferData(
      _gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array( _indices ),
      _gl.STATIC_DRAW
    );

    // // Unbind the buffer
    _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, null );

    this.indices = _indices;
    this.buffer = {
      vertex: bufferVertex,
      index: bufferIndex
    };

  }

}

export const createGeometry = options => ( {
  ...options,
  geometry: reducerLoopObject( options.geometry, ( option ) => new GeometryPlane( option ) )
} );
