// follow these articles 
// @see https://www.clicktorelease.com/blog/using-hooks-for-easier-development-webgl-glsl/
// @see http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl/

function _h( f, c ) {
  return function() {
    var res = f.apply( this, arguments );
    c.apply( this, arguments );
    return res;
  }
}

function compileErrors( errors, source ) {

  var css = `

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
      border-top: 4px solid #12bcfa;
      background-color: #1d262f;
      font-size: 14px;
      color: #ffffff;
      white-space: normal;
      overflow: hidden;
    }

    header {
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 80px;
      display: flex;
      color: #12bcfa;
      padding: 0 0 0 30px;
      align-items: center;
      background: #161d24;
      position: absolute;
      font-weight: 800;
      letter-spacing: 0.1rem;
    }

    #GLSLReport {
      margin: 80px 30px;
      border-radius: 10px;
      overflow: hidden;
      list-style-type: none;
      box-shadow: 0 5px 5px hsla( 0, 0%, 0%, 0.2 );
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
      border-bottom: 1px solid #161d24;
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
      background: rgba( 253, 83, 68, 0.8 );
      color: rgba( 88, 23, 17, 1.0 );
      letter-spacing: -0.05em;
    }

  `;

  const code = source.split( '\n' );
  const el = document.createElement( 'style' );
  const container = document.createElement( 'div' );
  const title = document.createElement( 'header' );
  const report = document.createElement( 'ul' );
  const li = document.createElement( 'li' );

  container.classList.add( 'glsl-report' );
  title.innerHTML = 'GLSL Reporter'

  el.textContent = css;

  report.setAttribute( 'id', 'GLSLReport' );

  document.getElementsByTagName( 'head' )[ 0 ].appendChild( el );
  document.body.appendChild( container );
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
              <span class="glsl-error__element--id">000${ index }</span>
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

WebGLRenderingContext.prototype.compileShader = _h( 
  WebGLRenderingContext.prototype.compileShader, 
  function( shader ) {

    if ( this.getShaderParameter( shader, this.COMPILE_STATUS ) == false ) {

      const errors = this.getShaderInfoLog( shader );
      const source = this.getShaderSource( shader );
      
      compileErrors( errors, source );

    }

  } 

);
