# w2gl.js
===

A WebGL micro-library

# usage

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