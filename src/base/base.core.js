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

export const CORE = Object.freeze( {
  BROWSER: new Browser(),
  EVENT: new Event(),
  MOUSE: new Mouse(),
  SCREEN: new Screen(),
  SHADER: new Shader(),
  LIST: [
    'browser',
    'event',
    'mouse',
    'screen'
  ]
} );
