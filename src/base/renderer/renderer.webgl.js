import { WebGLRenderer } from 'three';
import { BASE_CONSTANT } from '../constant/base.constant';
import { reducerLoopObject } from '../../reducer/reducer.object';

export class BaseRendererWebGL extends WebGLRenderer {

  constructor ( options ) {

    super( {
      antialias: true
    } );

    this.init( options );
    this.add( this.domElement );

    // create timer class

    this.timer = {
      time: 0,
      speed: 0.05
    };

  }

  add ( element ) {

    window.document.body.appendChild( element );

  }

  create ( scene, camera ) {

    this.current = {
      camera,
      scene,
    };

  }

  init ( options ) {

    this.setClearColor( 0x000000 );
    this.setPixelRatio( window.devicePixelRatio );
    this.setSize( ...options.options.size, true );

  }

  setTimerAnimationLoop ( callback ) {


    this.setAnimationLoop( callback !== null ? _ => {

      this.timer.time += this.timer.speed;
  
      BASE_CONSTANT.renderList.forEach( ( render ) => render( this.timer ) );
  
      if ( callback ) callback( this.timer );
  
      this.render( this.current.scene, this.current.camera );

    } : null );

  }

};

export const createBaseRendererWebGL = ( options ) => ( {
  ...options,
  renderer: reducerLoopObject( options.renderer, ( option ) => new BaseRendererWebGL( option ) )
} );
