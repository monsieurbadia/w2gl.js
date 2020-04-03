<p align="center" style="font-size: 100px">💻<p>

# w2gl.js [![NPM Package][npm]][npm-url] [![Build Size][build-size]][build-size-url] [![NPM Downloads][npm-downloads]][npmtrends-url] [![Dev Dependencies][dev-dependencies]][dev-dependencies-url]

> **w2gl** is a WebGL micro-library based on [three.js](https://threejs.org) that will helping you create 3d primitives and shader quickly.

## Problem❓

*using the WebGL API natively is not easy to use or  to maintain a clean code. Some libraries already resolve this issue. Thank God ! Even if now it's more simple to create a 3D scene in WebGL. We still have to create all primitives manually before playing with them.*

### three.js

actually display something into your screen you have to follow this code snippet

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();
```

### Solution❓

*w2gl is a javascript micro-layer based on the 3D engine libraries which will allow you to quickly initialize your primitives or to have fun quickly with the obscure universe of shaders. w2gl do not replace the perfect role that the 3D engine libraries allow, it just there to prepare a scene for you.*

### w2gl.js

```js
// es6 snippets

// first way : the w2gl starter is ready to play with shader
const starter = w2gl.init( { shader: { vertex, fragment } } );

// second way : the w2gl starter is ready to create an entire 3D world
const starter = w2gl.init( { 
  mesh: {
    mesh1Name: {
      geometry: {
        buffer: true,
        options: [ 2, 2 ],
        specific: 'plane'
      },
      material: {
        options: {
          transparent: true
        },
        specific: 'basic'
      }
    },
    mesh2Name: {
      geometry: {
        buffer: true,
        options: [ 2, 2 ],
        specific: 'sphere'
      },
      material: {
        options: {
          transparent: true
        },
        specific: 'normal'
      }
    }
  }
 } );
```

## 📦 Install dependencies

### 1. npm

```sh
npm i w2gl
```

### 2. yarn

```sh
yarn add w2gl
```

## 🚀 Start project

### 1. es6

```js
// es6
import * as THREE from 'three';
import w2gl from 'w2gl';
import vertex from './shader/vertex.fs';
import fragment from './shader/fragment.fs';

// 1. first way
// get the starter object from the init return function
const starter = w2gl.init( { shader: { vertex, fragment } } );
console.log( starter ); // w2gl is set in the starter constant

// 2. second way
// get the starter object from the init callback
w2gl.init( { shader: { vertex, fragment } }, starter => {
  console.log( starter ); // w2gl is ready in the callback scope only
} );
```

### 2. html/javascript

```html
<!-- html -->
<script src="./src/three.js"></script>
<script src="./src/w2gl.js"></script>
<script id="vertexShader" type="x-shader/x-vertex">
  attribute vec2 position;

  void main () {

    gl_Position = vec4( position, 1.0 );

  }
</script>
<script id="fragmentShader" type="x-shader/x-fragment">
  attribute vec2 position;

  void main () {

    gl_FragColor = vec4( position, 1.0 );

  }
</script>
<script>
  // 1. first way
  // get the starter object from the init return function
  var starter = w2gl.init( { shader: { vertex: vertexShader, fragment: fragmentShader } } );
  console.log( starter ); // w2gl is set in the starter constant

  // 2. second way
  // get the starter object from the init callback
  w2gl.init( { shader: { vertex: vertexShader, fragment: fragmentShader } }, starter => {
    console.log( starter ); // w2gl is ready in the callback scope only
  } );
</script>
```

## 📖 Usage

### 1. option [`object`]

the `init` function takes option param. `option` object define your scene `starter`. this is the valid schema object you must follow to init your scene or shader scene properly

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

create scene : to create a scene a director cut need 3 things : a scene, a camera and a monitor. it's the same in 3D so to create a scene init them

wanted to initialize shaders quickly ? try this

```js
// first initialize w2gl
const starter = w2gl.init( { shader: { vertex, fragment } } );

// THEN 

// 1. init scene
starter.scene.current.init( [ starter.mesh.plane ] );

// 2. init camera
starter.camera.current.init( [ 0, 0, 1 ] );

// 3. init renderer
starter.renderer.renderer1.init( starter.scene.current, starter.camera.current );
```

### 2. listeners [`callback`]

use listeners to update things, for example each mesh/renderer attach listener methods

#### • `onrender`

```js
// update plane mesh
starter.mesh.plane.onrender( timer => {

  starter.mesh.plane.material.uniforms.u_time.value += 0.05;

} );
```

#### • `onresize`

```js
starter.renderer.renderer1.onresize( event => {

  starter.renderer.renderer1.setSize( event.target.innerWidth, event.target.innerHeight );

} );
```

#### • `onmousemove`

```js
starter.mesh.plane.onmousemove( event => {

  starter.mesh.plane.material.uniforms.u_mouse.value.x = event.clientX;
  starter.mesh.plane.material.uniforms.u_mouse.value.y = event.clientY;

} );
```

### 3. starter [`object`]

#### • `event`

#### • `mouse`

#### • `screen`

#### • `timer`

## 📝 Todo

- ~~glsl files support (create plugin)~~
- supports more primitives
- create keyboard control
- create documentation
- add option mode by default

## 📁 Source

- @see [how to write portable webgl](http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl)
- @see [using hooks for easier development webgl glsl](https://www.clicktorelease.com/blog/using-hooks-for-easier-development-webgl-glsl)
- @see [WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)

## ©️ License

Copyright ©️ 2019 monsieurbadia

Released under the [MIT](https://github.com/monsieurbadia/glsl-reports/blob/master/LICENSE.md) license

[npm]: https://img.shields.io/npm/v/w2gl
[npm-url]: https://www.npmjs.com/package/w2gl
[build-size]: https://badgen.net/bundlephobia/minzip/w2gl
[build-size-url]: https://bundlephobia.com/result?p=w2gl
[npm-downloads]: https://img.shields.io/npm/dw/w2gl
[npmtrends-url]: https://www.npmtrends.com/w2gl
[dev-dependencies]: https://img.shields.io/david/dev/monsieurbadia/w2gl.js
[dev-dependencies-url]: https://david-dm.org/monsieurbadia/w2gl.js#info=devDependencies