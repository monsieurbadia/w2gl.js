// import { CoreContext } from '../core/core.context';
import { reducerLoopObject } from '../reducer/reducer.object';
import { CoreContext } from '../core/core.context';

export class RendererWebGL extends CoreContext {

  constructor ( options ) {

    super();

    this._canvas = options.canvas !== undefined
      ? options.canvas
      : window.document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );

    this._gl = this.setContext( this._canvas );

    this._timer = 0;

    if ( !this._gl ) {
      return;
    }

    this.init();

  }

  init () {

    this.setSize( window.innerWidth, window.innerHeight );

    // Clear the canvas
    this._gl.clearColor( 0.0, 0.0, 0.5, 0.9 );

    // Enable the depth test
    this._gl.enable( this._gl.DEPTH_TEST ); 
    
    // Clear the color buffer bit
    this._gl.clear( this._gl.COLOR_BUFFER_BIT );

    // Set the view port
    this._gl.viewport( 0,0, this._gl.canvas.width, this._gl.canvas.height );

    window.document.body.appendChild( this._canvas );

  }

  setSize ( width, height ) {

    this._canvas.width = width;
    this._canvas.height = height;

    this._canvas.style.width = `${ width }px`;
    this._canvas.style.height = `${ height }px`;

  };

  render ( indexes ) {

    this._gl.drawElements(
      this._gl.TRIANGLES,
      indexes,
      this._gl.UNSIGNED_SHORT,
      0,
    );

  }

  setTimerAnimation ( callback ) {

    callback( _timer );

  }

  // return this;

};

export const createRenderer = ( options ) => ( {
  ...options,
  renderer: reducerLoopObject( options.renderer, ( option ) => new RendererWebGL( option ) )
} );
