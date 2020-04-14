- ## option

`option` object define your scene `starter`. this is the valid schema object you must follow to init your scene or shader scene properly.

```js
{
  THREE,
  shader: {
    myShaderName: {
      fragment: `
        void main () {
          gl_Position = vec4( position, 1.0 );
        }
      `,
      vertex: `
        uniform vec2 resolution;
        uniform float time;
  
        void main () {
          vec2 st = gl_FragCoord.xy/resolution.xy;
          gl_FragColor = vec4( st.x, st.y, 0.0, 1.0 );
        }
      `
    }
  }
}
```