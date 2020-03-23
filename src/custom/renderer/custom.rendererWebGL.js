import { WebGLRenderer } from 'three';
import { Base } from 'base';
import { Timer } from 'core';
import { reducer } from 'util';

export class CustomRendererWebGL extends WebGLRenderer {

  constructor ( options ) {

    super( { antialias: true } );

    this.create( options );
    this.add( this.domElement );

    this.timer = new Timer();
  
    // that method is used into a listener
    this.onresize = this.onresize.bind( this );

  }

  add ( element ) {

    window.document.body.appendChild( element );

  }

  init ( scene, camera ) {

    this.current = {
      camera,
      scene,
    };

    this.setTimerAnimationLoop();

  }

  create ( options ) {

    this.setClearColor( 0x000000 );
    this.setPixelRatio( window.devicePixelRatio );
    this.setSize( ...options.options.size, true );

  }

  onresize ( resize ) {

    Base.DEFAULT.resizeList.push( resize );

  }

  setTimerAnimationLoop ( callback ) {

    this.setAnimationLoop( callback !== null ? _ => {

      this.timer.render();
  
      Base.DEFAULT.renderList.forEach( render => render( this.timer ) );
  
      if ( callback ) callback( this.timer );
  
      this.render( this.current.scene, this.current.camera );

    } : null );

  }

};

export const createCustomRendererWebGL = options => ( {
  ...options,
  renderer: reducer( options.renderer, option => new CustomRendererWebGL( option ) )
} );
