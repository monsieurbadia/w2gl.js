import { EVENT } from 'base';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public it adds callbacks relative to the render event */
export const onrender = f => typeof f === 'function' && EVENT.LIST.renderList.push( f );
