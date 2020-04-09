import { EVENT } from 'base';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
export const onmousemove = f => typeof f === 'function' && EVENT.LIST.mousemoveList.push( f );
