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

          #include <core_vertex>
          
          uniform vec2 resolution;

          varying vec2 vUv;

          void main () {

            vUv = uv;
            vUv = position.xy;
            vUv.x *= resolution.x / resolution.y;

            gl_Position = vec4( position.xy, 0.0, 1.0 );

          }

        `,
        fragment: `

          #ifdef GL_ES
          precision mediump float;
          #endif

          uniform vec2 resolution;
          uniform vec2 mouse;
          uniform float time;

          varying vec2 vUv;

          void main () {

            vec2 pos = gl_FragCoord.xy/resolution;

            gl_FragColor = vec4(vUv,0.0,1.0);
            
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

use listeners to update things, for example each mesh/renderer attach listener methods

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

##### event

##### glsl

##### mouse

##### screen

##### shader

  - include core

  ```c
    #include <core_vertex>
    #include <core_fragment>
    #include <core_color>
  ```

##### timer

## TODO

- ~~reduce my project bundle size by removing threejs~~ (v0)
- improve javascript/WebGL performance (v0)
- create keyboard control (v1)
- ~~glsl files support (create plugin)~~ (v0)
- create documentation (v0)
- ~~include colors vec3~~ (v0)
- ~~add option mode by default~~ (v0)
- create live editor mode (v1)
- ~~create GLSL debugger~~ (v0)
  - ~~with web components~~ (v0)
  - ~~create dark/light theme mode~~ (v0)
  - improve ui (v0)

## SOURCE

@see https://github.com/wsmind/webglparis2015-raymarching
@see http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl
@see https://www.clicktorelease.com/blog/using-hooks-for-easier-development-webgl-glsl
@see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
