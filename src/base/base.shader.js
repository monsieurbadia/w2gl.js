export const SHADER = Object.freeze( {
  CUSTOM: {
    vertex: {
      name: '#include <core_functions>',
      functions: ``
    },
    fragment: {
      name: '#include <core_functions>',
      functions: `
  
        // PRIMITIVE
  
        float box ( vec3 pos, vec3 size ) {
          return length( max( abs( pos ) - size, 0.0 ) );
        }
  
        float plane ( vec3 pos ) {
          return pos.y;
        }
        
        float sphere ( vec3 pos, float radius ) {
          return length( pos ) - radius;
        }

        float intersectPlane( vec3 pos, vec3 dir ) {
          return -pos.y / dir.y;
        }
  
        // TRANSLATE
  
        vec2 rotate ( vec2 v, float angle ) {
  
          float c = cos( angle );
          float s = sin( angle );
  
          return mat2( c, s, -s, c ) * v;
        
        }
  
      `
    }
  },
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
