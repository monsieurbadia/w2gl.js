import { EVENT } from 'base';
import { onmousemove, onresize } from 'event';

/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

/** @public */
const mousemove = event => EVENT.LIST.mousemoveList.forEach( f => f( event ) );

/** @public */
const resize = event => EVENT.LIST.resizeList.forEach( f => f( event ) );

/** @private */
const listeners = [
  [ 'mousemove', mousemove ],
  [ 'resize', resize ]
];

/** @public */
const clear = _ => listeners.forEach( listener => window.removeEventListener( listener[ 0 ], listener[ 1 ], false ) );

/** @public */
const init = _ => listeners.forEach( listener => window.addEventListener( listener[ 0 ], listener[ 1 ], false ) );

/**
 * events
 * @public
 */

export const Events = Object.freeze( function () {

  return Object.assign( this, {
    onmousemove,
    onresize,
    clear,
    init,
    mousemove,
    resize
  } );

} );
