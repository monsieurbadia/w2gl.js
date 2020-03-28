import { Base } from 'base';
import { GLSLReports } from './core/core.glsl';
// import './core/core.glsl';

import {
  createCustomCamera,
  createCustomMesh,
  createCustomScene,
  createCustomRendererWebGL,
} from 'custom';

import { pipe } from 'util';

export const W2GL = {

  init ( option, callback ) {

    const _browser = Base.CORE.BROWSER;
    const _event = Base.CORE.EVENT;
    const _mouse = Base.CORE.MOUSE;
    const _screen = Base.CORE.SCREEN;

    const _core = {
      THREE: option.instance,
      browser: Base.CORE.properties[ _browser ],
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
    const _starter = _prepare( _option );

    // TODO
    if ( !option.scene ) {

      const glslReport = new GLSLReports();

      glslReport.init();

      // 1. init scene
      _starter.scene.default.init( [ _starter.mesh.default ] );
  
      // 2. init camera
      _starter.camera.default.init( [ 0, 0, -1 ] );
  
      // 3. init renderer
      _starter.renderer.default.init( _starter.scene.default, _starter.camera.default );

    }

    if ( !_starter.browser.run.webgl() ) return;

    return callback === undefined
      ? _starter
      : callback( _starter );

  }

};
