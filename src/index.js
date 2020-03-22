import { createBaseCamera } from './base/camera/base.camera';
import { createBaseMesh } from './base/mesh/base.mesh';
import { createBaseScene } from './base/scene/base.scene';
import { createBaseRendererWebGL } from './base/renderer/renderer.webgl';
import { pipe } from './util/util.pipe';

// main

export const W2GL = {

  init ( options, callback ) {

    const _options = { ...options };

    const _operations = [
      createBaseCamera,
      createBaseScene,
      createBaseMesh,
      createBaseRendererWebGL,
    ];

    const prepare = pipe( ..._operations );
    const compute = prepare( _options );

    return callback === undefined
      ? compute
      : callback( compute );

  }

};

// *** run project *** //

document.addEventListener( 'DOMContentLoaded', _ => {

  // W2GL test implementation

  W2GL.init( {

    scene: {
      scene1: {}
    },
    camera: {
      camera1: {
        size: [ window.innerWidth, window.innerHeight ],
        type: 'perspective'
      }
    },
    mesh: {
      plane: {
        geometry: {
          buffer: true,
          options: [ 2, 2 ],
          specific: 'plane'
        },
        material: {
          options: {
            transparent: true
          },
          specific: 'normal'
        },
        shader: {
          uniforms: {
            u_time: { type: 'f', value: 1.0 },
            u_resolution: { type: 'v2', value: [] },
            u_mouse: { type: 'v2', value: [] }
          },
          vertex: `
  
            void main () {
  
              gl_Position = vec4( position, 1.0 );
  
            }
  
          `,
          fragment: `
  
            uniform vec2 u_resolution;
            uniform float u_time;
  
            void main () {
  
              gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );

              // vec2 st = gl_FragCoord.xy/u_resolution.xy;
              // gl_FragColor = vec4( st.x, st.y, 0.0, 1.0 );
  
            }
  
          `
        },
        scene: 'scene1'
      }
    },
    renderer: {
      renderer1: {
        options: {
          antialias: true,
          pixelRatio: window.devicePixelRatio,
          size: [ window.innerWidth, window.innerHeight ],
        }
      }
    }

  }, ( starter ) => {

    console.log( starter );

    // init events => event.onresize

    // 1. init scene
    starter.scene.scene1.init( [ starter.mesh.plane ] );

    // 2. init camera
    starter.camera.camera1.init( [ 0, 0, 1 ] );
  
    // 3. init renderer
    starter.renderer.renderer1.init( starter.scene.scene1, starter.camera.camera1 );
  
    // 4. update mesh
    // starter.mesh.plane.update( ( timer ) => {
    //   console.log( timer );
    // } );

    // 5. resize mesh => mesh.onresize

    // 6. click mesh => mesh.onclick

  } );

}, false );
