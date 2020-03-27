// follow these articles 
// @see https://www.clicktorelease.com/blog/using-hooks-for-easier-development-webgl-glsl/
// @see http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl/

function _hook( f, c ) {
  return function() {
    const res = f.apply( this, arguments );
    c.apply( this, arguments );
    return res;
  }
}

function compileErrors( errors, source ) {

  const stylesheet = `

    .glsl-report {
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      padding: 60px 0 30px 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      position: fixed;
      background-color: #1d262f;
      font-size: 12px;
      color: #ffffff;
      white-space: normal;
      overflow-y: auto;
    }

    header {
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      width: 100%;
      height: 80px;
      display: flex;
      color: hsl( 210, 24%, 75% );
      padding: 0 0 0 30px;
      align-items: center;
      background: hsl( 210, 24%, 10% );
      position: fixed;
      font-weight: 800;
      letter-spacing: 0.1rem;
      border-top: 6px solid hsl( 210, 24%, 75% );
    }

    header > span  {
      margin: 0 0 0 20px;
      background: red;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: hsl( 5, 98%, 60% );
      color: hsl( 5, 98%, 90% );
      font-size: 10px;
      letter-spacing: 0;
    }

    #GLSLReport {
      margin: 80px 30px;
      border-radius: 10px;
      overflow: hidden;
      list-style-type: none;
      box-shadow: 0 4px 6px hsla( 0, 0%, 0%, 0.2 );
    }

    #GLSLReport li {
      background: #202d39;
      color: #e8dfda;
      overflow: hidden;
    }

    #GLSLReport li:last-child {
      border-bottom: none;
    }

    li .glsl-error__element {
      height: 100%;
      min-height: 80px;
      margin: 0 30px;
      display: flex;
      color: #e8dfda;
      align-items: center;
      flex-direction: row;
      position: relative;
      border-bottom: 1px solid hsla( 210, 24%, 11%, 0.35 );
    }

    li:last-child .glsl-error__element {
      border-bottom: none;
    }

    .glsl-error__element--main {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-start;
      letter-spacing: -0.05em;
    }

    .glsl-error__element--column {
      margin-right: 40px
    }

    .glsl-error__element--message {
      font-style: italic;
    }

    .glsl-error__element--id {
      font-weight: 700;
    }

    .glsl-error__element--code {
      margin-top: 10px;
      display: block;
      letter-spacing: -0.05em;
    }

    .glsl-error__element--type {
      padding: 2px 15px;
      border-radius: 10px;
      background: hsl( 5, 98%, 60% );
      color: hsl( 5, 98%, 30% );
      letter-spacing: -0.05em;
    }

  `;

  const code = source.split( '\n' );
  const style = document.createElement( 'style' );
  const container = document.createElement( 'div' );
  const title = document.createElement( 'header' );
  const count = document.createElement( 'span' );
  const report = document.createElement( 'ul' );
  const li = document.createElement( 'li' );

  count.innerHTML = errors.split( '\n' ).length - 1;
  title.innerHTML = 'GLSL Reporter'
  style.textContent = stylesheet;

  container.classList.add( 'glsl-report' );
  report.setAttribute( 'id', 'GLSLReport' );

  document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );
  document.body.appendChild( container );
  title.appendChild( count );
  container.appendChild( title );
  container.appendChild( report );

  errors.split( '\n' ).forEach( ( error, index ) => {

    const match = error.match( /ERROR: (\d+):(\d+): (.*)/ );
  
    if ( match ) {
      
      const status = parseInt( match[ 1 ], 10 ) - 1; // if -1 show error
      const line = parseInt( match[ 2 ], 10 ) - 1;
      const message = match[ 3 ];
      const reportChild = li.cloneNode( true );
      const template = `
        <div class="glsl-error__element">
          <div class="glsl-error__element--main">
            <div class="glsl-error__element--column">
              <span class="glsl-error__element--id">${ index + 1 }</span>
            </div>
            <div class="glsl-error__element--column">
              <span class="glsl-error__element--type">ERROR</span>
            </div>
            <div class="glsl-error__element--column">
              <span class="glsl-error__element--message">"<b> ${ message } </b>" in line ${ line }</span>
              <span class="glsl-error__element--code">${ code[ line ] }</span>
            </div>
          </div>
        </div>
      `;

      reportChild.innerHTML = template;

      report.appendChild( reportChild );

    }

  } );
    
}

WebGLRenderingContext.prototype.compileShader = _hook(
 
  WebGLRenderingContext.prototype.compileShader, 

  function( shader ) {

    if ( this.getShaderParameter( shader, this.COMPILE_STATUS ) == false ) {

      const errors = this.getShaderInfoLog( shader );
      const source = this.getShaderSource( shader );
      
      compileErrors( errors, source );

    }

  }

);
