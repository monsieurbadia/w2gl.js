import { CoreContext } from './core.context';

export class Geometry extends CoreContext {

  constructor () {

    super();

    this.uuid = `${ window.parseInt( Math.random() * 123456789 ) }`; // fake uuid()

  }

}
