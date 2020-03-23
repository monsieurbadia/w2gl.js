import {
  Event,
  Mouse,
  Screen,
  Shader
} from 'core';

// i not sure for this pattern for the moment..
// @see https://stijndewitt.com/2014/01/26/enums-in-javascript/

export const CORE = {
  EVENT: 1,
  MOUSE: 2,
  SCREEN: 3,
  SHADER: 4,
  properties: {
    1: new Event(),
    2: new Mouse(),
    3: new Screen(),
    4: new Shader()
  }
};
