import { EVENT } from 'base';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public it adds callbacks relative to the mousemove event */
export const onmousemove = f => typeof f === 'function' && EVENT.LIST.mousemoveList.push( f );
