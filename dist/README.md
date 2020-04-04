<img src="./w2gl-logo-standard.png">

# w2gl.js [![NPM Package][npm]][npm-url] [![Build Size][build-size]][build-size-url] [![NPM Downloads][npm-downloads]][npmtrends-url] [![Dev Dependencies][dev-dependencies]][dev-dependencies-url]

> A **WebGL** micro-library based on [three.js](https://threejs.org) that will helping you initialize your  3D scene more quickly.

## Problem❓

*to create a scene a director cut need 3 things : a scene, a camera and a monitor. it's the same in the shader universe. but using the **WebGL API** natively is not easy to use or to maintain a clean code. Some libraries already resolve this issue. Thank God ! Even if now it's more simple to create a shaders in **WebGL.** We still have to create declare several instructions manually before playing with shaders. it can be annoying when like me you like to play with the **WebGL** technology*

### three.js

```html
<!-- source @see https://thebookofshaders.com/04/ -->
<body>
  <div id="container"></div>
  <script src="js/three.min.js"></script>
  <script id="vertexShader" type="x-shader/x-vertex">
      void main () {
        gl_Position = vec4( position, 1.0 );
      }
  </script>
  <script id="fragmentShader" type="x-shader/x-fragment">
      uniform vec2 u_resolution;
      uniform float u_time;

      void main () {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        gl_FragColor=vec4( st.x, st.y, 0.0, 1.0 );
      }
  </script>
  <script>
      var container;
      var camera, scene, renderer;
      var uniforms;

      init();
      animate();

      function init() {
          container = document.getElementById( 'container' );

          camera = new THREE.Camera();
          camera.position.z = 1;

          scene = new THREE.Scene();

          var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

          uniforms = {
              u_time: { type: "f", value: 1.0 },
              u_resolution: { type: "v2", value: new THREE.Vector2() },
              u_mouse: { type: "v2", value: new THREE.Vector2() }
          };

          var material = new THREE.ShaderMaterial( {
              uniforms: uniforms,
              vertexShader: document.getElementById( 'vertexShader' ).textContent,
              fragmentShader: document.getElementById( 'fragmentShader' ).textContent
          } );

          var mesh = new THREE.Mesh( geometry, material );
          scene.add( mesh );

          renderer = new THREE.WebGLRenderer();
          renderer.setPixelRatio( window.devicePixelRatio );

          container.appendChild( renderer.domElement );

          onWindowResize();
          window.addEventListener( 'resize', onWindowResize, false );

          document.onmousemove = function(e){
            uniforms.u_mouse.value.x = e.pageX
            uniforms.u_mouse.value.y = e.pageY
          }
      }

      function onWindowResize( event ) {
          renderer.setSize( window.innerWidth, window.innerHeight );
          uniforms.u_resolution.value.x = renderer.domElement.width;
          uniforms.u_resolution.value.y = renderer.domElement.height;
      }

      function animate() {
          requestAnimationFrame( animate );
          render();
      }

      function render() {
          uniforms.u_time.value += 0.05;
          renderer.render( scene, camera );
      }
```

### Solution❓

*As a director cut you need some assistance, a you need this guy who gets your back all the time, it will do the annoying tasks for you. you know what i mean! but more seriously, **w2gl** is a javascript micro-layer based on the 3D engine libraries which will allow you to quickly to have fun quickly with the obscure universe of shaders. **w2gl** do not replace the perfect role that the 3D engine libraries allow, it just there to prepare a scene for you.*

### w2gl.js

```js
// es6 snippet
const starter = w2gl.init( { THREE, shader: { myShaderName : { vertex, fragment } } } );

starter.event.onresize( starter.screen.resize );
starter.event.onmousemove( starter.mouse.mousemove );

starter.shader.current.onresize( event => {

  starter.shader.current.material.uniforms.resolution.value.x = event.target.innerWidth;
  starter.shader.current.material.uniforms.resolution.value.y = event.target.innerHeight;

} );

starter.starter.shader.current.onrender( timer => starter.shader.current.material.uniforms.time.value = timer.time );
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

Are you wanted to initialize your scene quickly? try this!

### 1. es6

```js
// es6 snippet
import * as THREE from 'three';
import w2gl from 'w2gl';
import vertex from './shader/vertex.fs';
import fragment from './shader/fragment.fs';

// 1. first way, gets the starter object provide by the init function result
const starter = w2gl.init( { THREE, shader: { myShaderName : { vertex, fragment } } } );

console.log( starter ); // <-- w2gl is set in the starter constant

// 2. second way, gets the starter object provide by the init callback function
w2gl.init( { THREE, shader: { myShaderName : { vertex, fragment } } }, starter => {

  console.log( starter ); // <-- w2gl is ready in the callback scope only

} );
```

### 2. html/javascript

```html
<!-- add three -->

<script src="./src/three.js"></script>
<script src="./src/w2gl.js"></script>

<script id="vertexShader" type="x-shader/x-vertex">
  void main () {
    gl_Position = vec4( position, 1.0 );
  }
</script>

<script id="fragmentShader" type="x-shader/x-fragment">
  uniform vec2 u_resolution;
  uniform float u_time;

  void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    gl_FragColor=vec4( st.x, st.y, 0.0, 1.0 );
  }
</script>

<script>
  // 1. first way, get the starter object from the init return function
  var starter = w2gl.init( {
    THREE,
    shader: {
      vertex: vertexShader,
      fragment: fragmentShader
    }
  } );

  console.log( starter ); // w2gl is set in the starter constant

  // 2. second way, get the starter object from the init callback
  w2gl.init( {
    THREE,
    shader: {
      vertex: vertexShader,
      fragment: fragmentShader
    } 
  }, starter => {
  
    console.log( starter ); // w2gl is ready in the callback scope only
  
  } );
</script>
```

## 📖 Documentation

### 1. option [`object`]

the `init` function takes option param. `option` object define your scene `starter`. this is the valid schema object you must follow to init your scene or shader scene properly

```js
const option = {
  scene: {
    mySceneName: {}
  },
  camera: {
    myCameraName: {
      size: [ window.innerWidth, window.innerHeight ],
      type: 'perspective'
    }
  },
  renderer: {
    myRendererName: {
      options: {
        antialias: true,
        pixelRatio: window.devicePixelRatio,
        size: [ window.innerWidth, window.innerHeight ],
      }
    }
  },
  shader: {
    myShaderName: {
      fragment: `
        void main () {
          gl_Position = vec4( position, 1.0 );
        }
      `,
      vertex: `
        uniform vec2 u_resolution;
        uniform float u_time;
  
        void main () {
          vec2 st = gl_FragCoord.xy/u_resolution.xy;
          gl_FragColor=vec4( st.x, st.y, 0.0, 1.0 );
        }
      `
    }
  }
};
```

### 2. listeners [`callback`]

use the events listener to update your scene, for example each shader and render got to himself several listeners

#### • `onrender`

```js
// update plane mesh
starter.shader.myShaderName.onrender( timer => {

  starter.shader.myShaderName.material.uniforms.u_time.value += 0.05;

} );
```

#### • `onresize`

```js
starter.renderer.myShaderName.onresize( event => {

  starter.renderer.myShaderName.setSize( event.target.innerWidth, event.target.innerHeight );

} );
```

#### • `onmousemove`

```js
starter.shader.myShaderName.onmousemove( event => {

  starter.shader.myShaderName.material.uniforms.u_mouse.value.x = event.clientX;
  starter.shader.myShaderName.material.uniforms.u_mouse.value.y = event.clientY;

} );
```

### 3. starter [`object`]

#### • `event`

#### • `mouse`

#### • `screen`

#### • `timer`

## 📝 Todo

- ~~glsl files support (create plugin)~~
- supports glsl #include
- supports more primitives
- create keyboard control
- create documentation
- add option mode by default
- test cases

## 📁 Source

- @see [how to write portable webgl](http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl)
- @see [using hooks for easier development webgl glsl](https://www.clicktorelease.com/blog/using-hooks-for-easier-development-webgl-glsl)
- @see [WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)

## ©️ License

Copyright ©️ 2019 monsieurbadia

Released under the [MIT](https://github.com/monsieurbadia/glsl-reports/blob/master/LICENSE.md) license

## 🙏 Supports

⭐️ this repository if this project helped you!

[npm]: https://img.shields.io/npm/v/w2gl
[npm-url]: https://www.npmjs.com/package/w2gl
[build-size]: https://badgen.net/bundlephobia/minzip/w2gl
[build-size-url]: https://bundlephobia.com/result?p=w2gl
[npm-downloads]: https://img.shields.io/npm/dw/w2gl
[npmtrends-url]: https://www.npmtrends.com/w2gl
[dev-dependencies]: https://img.shields.io/david/dev/monsieurbadia/w2gl.js
[dev-dependencies-url]: https://david-dm.org/monsieurbadia/w2gl.js#info=devDependencies
