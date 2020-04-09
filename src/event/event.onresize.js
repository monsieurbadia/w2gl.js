import { EVENT } from 'base';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
export const onresize = f => typeof f === 'function' && EVENT.LIST.resizeList.push( f );
