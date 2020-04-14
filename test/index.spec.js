// import w2gl from '../src/index';
// import { Browser } from 'core';
// import { pipe } from '../src/util/util.pipe';


// jest.mock( '../src/core/core.browser.js');
// jest.mock( '../src/util/util.empty.js');
// jest.mock( '../src/core/core.browser.js');
// jest.mock( '../src/util/util.pipe.js');
// jest.mock( '../src/util/util.reducer.js');

// const option = {
//   browser: new Browser(),
//   // mouse: new Mouse(),
//   // screen: new Screen(),
//   // shader: new Shader(),
//   // list: [
//   //   'browser',
//   //   'event',
//   //   'mouse',
//   //   'screen'
//   // ]
// };

// Browser.mockReturnValue( { run: { webgl: () => {} } } );
// pipe.mockReturnValue( ( ...fs ) => options => [ ...fs ].reduce( ( result, f ) => f( result ), options || {} ) );

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

describe( 'w2gl', () => {

  const THREEMock = {
    Camera: {},
    PlaneBufferGeometry: {},
    Mesh: {},
    ShaderMaterial: {},
    WebGLRenderer: {}
  };

  const optionMock = {
    THREE: THREEMock,
    shader: {
      myShaderName : {
        vertex: `
          void main () {
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragment: `
          uniform vec2 resolution;
          uniform float time;

          void main () {
            vec2 st = gl_FragCoord.xy / resolution.xy;
            gl_FragColor=vec4(st.x, st.y, 0.0, 1.0);
          }
        `
      }
    }
  };

  // expect( w2gl ).toBeDefined();

  describe( 'init', () => {

    it.skip( 'must return an error when init is called without any parameter', () => {

      // expect( w2gl.init() ).toBe( true );

      // pipe.mockImplementationOnce( ( ...fs ) => payload => Object.assign( payload, { ...option } ) )
      // console.log(  )
      // expect( w2gl.init( {} ) ).toThrow( TypeError );
      // expect( () => w2gl.init() ).toThrow( TypeError );
      // expect( w2gl.init( {}, () => {} ) ).toBe();

      // expect( w2gl.init( optionMock ) ).toThrow( TypeError );
    
    } );

    // it.skip( 'must must a function', () => {

      // expect( () => {

      //   const starter = w2gl.init(  );

      // } ).toStrictEqual( true );
    
    // } );

  } );

} );
