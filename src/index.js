import { Base } from 'base';
import './core/core.glsl';

import {
  createCustomCamera,
  createCustomMesh,
  createCustomScene,
  createCustomRendererWebGL,
} from 'custom';

import { pipe } from 'util';

export const W2GL = {

  init ( option, callback ) {

    const _event = Base.CORE.EVENT;
    const _mouse = Base.CORE.MOUSE;
    const _screen = Base.CORE.SCREEN;

    const _core = {
      event: Base.CORE.properties[ _event ],
      mouse: Base.CORE.properties[ _mouse ],
      screen: Base.CORE.properties[ _screen ],
    };

    const _option = { ..._core, ...option };

    const _operations = [
      createCustomScene,
      createCustomCamera,
      createCustomRendererWebGL,
      createCustomMesh,
    ];

    const _prepare = pipe( ..._operations );
    const _compute = _prepare( _option );

    return callback === undefined
      ? _compute
      : callback( _compute );

  }

};
