import {
  Browser,
  Event,
  Mouse,
  Screen,
  Shader
} from 'core';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

// i not sure for this pattern for the moment..
// @see https://stijndewitt.com/2014/01/26/enums-in-javascript/

export const CORE = Object.freeze( {
  BROWSER: 1,
  EVENT: 2,
  MOUSE: 3,
  SCREEN: 4,
  SHADER: 5,
  properties: {
    1: new Browser(),
    2: new Event(),
    3: new Mouse(),
    4: new Screen(),
    5: new Shader()
  }
} );
