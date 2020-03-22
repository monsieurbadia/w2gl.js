import { CoreContext } from '../core/core.context';
import { reducerLoopObject } from '../reducer/reducer.object';

export function Shader ( options ) {

  CoreContext.call( this );

  this.name = options.name;
  this.fragment = options.fragment;
  this.vertex = options.vertex;

  const _gl = this.context;

  this.create = create;
  this.createShader = createShader;
  this.createProgram = createProgram;

  function create ( geometry, vertex, fragment ) {

    const vertexShader = this.createShader( 'vertex', vertex );
    const fragmentShader = this.createShader( 'fragment', fragment );

    // Create a shader program object to store combined shader program
    const _program = this.createProgram( vertexShader, fragmentShader );

    // Bind vertex buffer object
    _gl.bindBuffer(
      _gl.ARRAY_BUFFER,
      geometry.buffer.vertex
    );

    // Bind index buffer object
    _gl.bindBuffer(
      _gl.ELEMENT_ARRAY_BUFFER,
      geometry.buffer.index
    );

    // Get the attribute location
    const _coordinates = _gl.getAttribLocation( _program, 'coordinates' );

    // point an attribute to the currently bound VBO
    _gl.vertexAttribPointer( _coordinates, 3, _gl.FLOAT, false, 0, 0 );

    // Enable the attribute
    _gl.enableVertexAttribArray( _coordinates );

  }

  function createShader ( name, source ) {
    
    const type = {
      fragment: _gl.FRAGMENT_SHADER,
      vertex: _gl.VERTEX_SHADER,
    };

    const _shader = _gl.createShader( type[ name ] );

    _gl.shaderSource( _shader, source );
    _gl.compileShader( _shader );

    const success = _gl.getShaderParameter( _shader, _gl.COMPILE_STATUS );

    if ( success ) {
      return _shader;
    }

    console.log( _gl.getShaderInfoLog( _shader ) );

    _gl.deleteShader( _shader );

  }

  function createProgram ( vertexShader, fragmentShader ) {
    
    const _program = _gl.createProgram();
    
    _gl.attachShader( _program, vertexShader );
    _gl.attachShader( _program, fragmentShader );

    _gl.linkProgram( _program );

    const success = _gl.getProgramParameter( _program, _gl.LINK_STATUS );

    if ( success ) {

      _gl.useProgram( _program );

      return _program;
    }
  
    console.log( _gl.getProgramInfoLog( _program ) );

    _gl.deleteProgram( _program );

  }

};

Shader.prototype = Object.assign( CoreContext.prototype, {

  constructor: Shader,

} );

export const createShader = ( options ) => ( {
  ...options,
  shader: reducerLoopObject( options.shader, ( option ) => new Shader( option ) )
} );
