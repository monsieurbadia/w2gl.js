/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

export const SHADER = Object.freeze( {
  CORE: {
    color: {
      name: '#include <core_color>',
      template: '',
      type: 'fragment'
    },
    vertex: {
      name: '#include <core_vertex>',
      template: '',
      type: 'vertex'
    },
    fragment: {
      name: '#include <core_fragment>',
      template: '',
      type: 'fragment'
    }
  },
  UNIFORMS: {
    mouse: {
      type: 'v2',
      value: []
    },
    resolution: {
      type: 'v2',
      value: [ window.innerWidth, window.innerHeight ]
    },
    time: {
      type: 'f',
      value: 1.0
    }
  }
} );
