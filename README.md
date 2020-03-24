# w2gl.js

A WebGL micro-library based on three.js

## usage

*option schema :*

```js
const option = {
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
          mouse: { type: 'v2', value: [] },
          resolution: { type: 'v2', value: [] },
          time: { type: 'f', value: 1.0 }
        },
        vertex: `

          #ifdef GL_ES
          precision mediump float;
          #endif

          void main () {

            gl_Position = vec4( position, 1.0 );

          }

        `,
        fragment: `

          #ifdef GL_ES
          precision mediump float;
          #endif

          uniform vec2 resolution;
          uniform vec2 mouse;
          uniform float time;

          void main () {

            vec2 st = gl_FragCoord.xy/resolution;
            gl_FragColor = vec4(st.x,st.y,0.0,1.0);
            
          }

        `
      }
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
};
```

*create option :*

```js
const option = { /* ... */ }; // create option
const starter = W2GL.init( option ); // init option

console.log( starter ); // webgl starter object 
```

*create scene :*

to create a scene a director cut need 3 things : a scene, a camera and a monitor. it's the same in 
3D so to create a scene init them :

```js
// 1. init scene
starter.scene.scene1.init( [ starter.mesh.plane ] );

// 2. init camera
starter.camera.camera1.init( [ 0, 0, 1 ] );

// 3. init renderer
starter.renderer.renderer1.init( starter.scene.scene1, starter.camera.camera1 );
```

## listeners

used listeners to doing things, for example each mesh/renderer attach listener methods

##### onrender

```js
// update plane mesh
starter.mesh.plane.onrender( timer => {

  starter.mesh.plane.material.uniforms.u_time.value += 0.05;

} );
```

##### onresize

```js
starter.renderer.renderer1.onresize( event => {

  starter.renderer.renderer1.setSize( event.target.innerWidth, event.target.innerHeight );

} );
```

##### onmousemove

```js
starter.mesh.plane.onmousemove( event => {

  starter.mesh.plane.material.uniforms.u_mouse.value.x = event.clientX;
  starter.mesh.plane.material.uniforms.u_mouse.value.y = event.clientY;

} );
```

## core

##### browser

to detect WebGL Support

##### event

##### mouse

##### screen

##### shader

##### timer

## TODO

how to reduced my bundle main size by spliting threejs depencies ?
improve javascript performance