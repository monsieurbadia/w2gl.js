export const SHADER = Object.freeze( {
  CORE: {
    color: {
      name: '#include <core_color>',
      template: `
  
        vec3 BLACK = vec3( 0.000, 0.000, 0.000 ); 
        vec3 DARKBLUE = vec3( 0.000, 0.000, 0.545 ); 
        vec3 BLUE = vec3( 0.000, 0.000, 1.000 ); 
        vec3 GRAY = vec3( 0.502, 0.502, 0.502 );
        vec3 GREEN = vec3( 0.000, 0.502, 0.000 );
        vec3 PINK = vec3( 1.000, 0.753, 0.796 );
        vec3 RED = vec3( 1.000, 0.000, 0.000 ); 
        vec3 WHITE = vec3( 1.000, 1.000, 1.000 );
        vec3 YELLOW = vec3( 1.000, 1.000, 0.000 );

      `,
      type: 'fragment'
    },
    vertex: {
      name: '#include <core_vertex>',
      template: `

        precision mediump float;

      `,
      type: 'vertex'
    },
    fragment: {
      name: '#include <core_fragment>',
      template: `

        precision mediump float;

        // PRIMITIVE

        float box ( vec3 pos, vec3 size ) {
          return length( max( abs( pos ) - size, 0.0 ) );
        }

        float roundedBox( vec3 pos, vec3 size, float radius ) {
          return length(max(abs(pos) - size, 0.0)) - radius;
        }

        float plane ( vec3 pos ) {
          return pos.y;
        }

        float sphere ( vec3 pos, float radius ) {
          return length( pos ) * 2.0 - radius;
        }

        float intersectPlane( vec3 pos, vec3 dir ) {
          return -pos.y / dir.y;
        }

        vec2 repeat( inout vec2 pos, vec2 period ) {

          vec2 off = pos + period * 0.5;
          vec2 idx = floor( off / period );
          pos = mod( off, period ) - period * 0.5;
            
          return idx;

        }
  
        // vec3 albedo( vec3 pos ) {
          
        //   return vec3( fract( pos.x ) + fract( pos.z ) );

        // }
        
        vec3 sunDirection = normalize ( vec3( 1.0, 0.4, 1.0 ) );
        
        float diffuse( vec3 normal ) {
          
          return clamp( dot( normal, sunDirection ), 0.0, 1.0 );

        }
        
        float specular( vec3 normal, vec3 dir ) {
          
          vec3 h = normalize( sunDirection - dir );
          return pow( clamp( dot( h, normal ), 0.0, 1.0 ), 100.0 );

        }

        // TRANSLATE
  
        vec2 rotate ( vec2 v, float angle ) {
  
          float c = cos( angle );
          float s = sin( angle );
  
          return mat2( c, s, -s, c ) * v;
        
        }
  
      `,
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
