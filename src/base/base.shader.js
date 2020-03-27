import defaultVertex from '../glsl/glsl.default.vs';
import defaultFragment from '../glsl/glsl.default.fs';
import defaultColor from '../glsl/glsl.color.fs';

export const SHADER = Object.freeze( {
  CORE: {
    color: {
      name: '#include <core_color>',
      template: defaultColor,
      type: 'fragment'
    },
    vertex: {
      name: '#include <core_vertex>',
      template: defaultVertex,
      type: 'vertex'
    },
    fragment: {
      name: '#include <core_fragment>',
      template: defaultFragment,
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
