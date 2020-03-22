export function CoreContext () {}

CoreContext.prototype = Object.assign( {},  {

  constructor: CoreContext,

  context: null,

  getContext: () => CoreContext.prototype.context,

  setContext: ( canvas ) => (
    CoreContext.prototype.context = canvas.getContext( 'webgl' )
  )

} );
