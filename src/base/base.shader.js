export const SHADER = Object.freeze( {
  UNIFORMS: {
    mouse: {
      type: 'v2',
      value: []
    },
    resolution: {
      type: 'v2',
      value: [
        window.innerWidth,
        window.innerHeight
      ]
    },
    time: {
      type: 'f',
      value: 1.0
    }
  }
} );
