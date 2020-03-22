import { createCamera } from './camera/camera.perspective';
import { createGeometry } from './geometry/geometry.plane';
import { createRenderer } from './renderer/renderer.webgl';
import { createShader } from './shader/shader.basic';
import { pipe } from './util/util.pipe';

// main

export const w2gl = {

  async init ( options ) {

    const _options = { ...options };

    const _operations = [
      createRenderer,
      createCamera,
      createShader,
      createGeometry,
    ];

    const prepare = pipe( ..._operations );
    const compute = prepare( _options );

    return compute;

  }

};

// *** run project *** //

document.addEventListener( 'DOMContentLoaded', _ => {

  // w2gl test implementation

  w2gl.init( {

    camera: {
      camera1: {
        size: [ window.innerWidth, window.innerHeight ],
        type: 'perspective'
      }
    },
    geometry: {
      plane: null
    },
    renderer: {
      renderer1: {
        // canvas: document.createElement( 'canvas' )
      }
    },
    shader: {
      shader1: {
        vertex: `

          attribute vec2 coordinates;
          attribute vec2 mouse;
        
          void main( void ) {
    
            gl_Position = vec4( coordinates, 0.0, 1.0 );
    
          }

        `,
        fragment: `

          void main() {
    
            gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
    
          }

        `
      },
      shader2: {
        fragment: `1`,
        vertex: `1`
      }
    }

  } ).then( starter => {
  
    console.log( starter );

    starter.shader.shader1.create(
      starter.geometry.plane,
      starter.shader.shader1.vertex,
      starter.shader.shader1.fragment
    );
    
    starter.renderer.renderer1.render( starter.geometry.plane.indices.length );

  } );

}, false );
