# w2gl.js
===

A WebGL micro-library

# usage

## option schema

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
          u_mouse: { type: 'v2', value: [] },
          u_resolution: { type: 'v2', value: [] },
          u_time: { type: 'f', value: 1.0 }
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
            gl_FragColor = vec4( 0.0, 0.0, 0.9, 1.0 );
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
};
```

## create option

```js
const option = { /* ... */ };

W2GL.init( option );
```

## create scene

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

### onrender

```js
// update plane mesh
starter.mesh.plane.onrender( timer => {

  starter.mesh.plane.material.uniforms.u_time += 0.05;

} );
```

### onresize

```js
starter.renderer.renderer1.onresize( _ => {

  starter.renderer.renderer1.setSize( window.innerWidth, window.innerHeight );

} );
```

### onmousemove

```js
starter.mesh.plane.onmousemove( _ => {

  starter.mesh.plane.material.uniforms.u_mouse.value.x = starter.mouse.x;
  starter.mesh.plane.material.uniforms.u_mouse.value.y = starter.mouse.y;

} );
```