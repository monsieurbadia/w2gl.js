/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

// @see https://www.clicktorelease.com/blog/using-hooks-for-easier-development-webgl-glsl/
// @see http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl/

export class GLSLReports extends HTMLElement {
  
  connectedCallback () {
    this.ready();
  }

  constructor () {

    super();

    this.attachShadow( { mode: 'open' } );

    this.state = {
      logs: [],
      button: {
        filter: {
          all: null,
          error: null,
          warning: null
        }
      },
      template: document.createElement( 'template' )
    };

  }

  init () {

    this.apply();

  }

  ready () {

    this.state.template.innerHTML = `
      <style>

        section {
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: 0;
          padding: 60px 0 30px 0;
          width: 100%;
          height: 100%;
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
          font-size: 12px;
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

        main {
          background: #202d39;
          margin: 80px 30px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px hsla( 0, 0%, 0%, 0.2 );
        }

        #GLSLReports {
          margin: 0;
          padding: 0;
          list-style-type: none;
          position: relative;
        }
      
        #GLSLReports li {
          color: #e8dfda;
          overflow: hidden;
        }
        
        #GLSLReports li:first-child {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        #GLSLReports li:last-child {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }

        #GLSLReports li .glsl-error__element {
          height: 100%;
          min-height: 80px;
          margin: 0 30px;
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: flex-start;
          position: relative;
          border-bottom: 1px solid hsla( 210, 24%, 11%, 0.35 );
          color: #e8dfda;
          letter-spacing: -0.05em;
        }
          
        #GLSLReports li:last-child .glsl-error__element {
          border-bottom: none;
        }
        
        .glsl-error__element__column {
          margin-right: 40px
        }

        .glsl-error__element__column span {
          display: block;
          margin-bottom: 10px;
        }

        .glsl-error__element__column span:last-child {
          margin-bottom: 0;
        }
        
        .glsl-error__element__message {
          font-style: italic;
        }
        
        .glsl-error__element__id {
          font-weight: 700;
        }
          
        .glsl-error__element--code {
          margin-top: 10px;
          display: block;
          letter-spacing: -0.05em;
        }
          
        .glsl-error__element__type {
          padding: 2px 15px;
          border-radius: 10px;
          letter-spacing: -0.05em;
        }
    
        .glsl-error__element__type--error {
          background: hsl( 5, 98%, 60% );
          color: hsl( 5, 98%, 30% );
        }
    
        .glsl-error__element__type--warning {
          background: hsl(48, 89%, 50%);
          color: hsl(48, 89%, 25%);
        }

      </style>

      <section>
      <header>
        <div><h3>GLSL Reports</h3><span id="GLSLReportsErrorCounter"></span></div>
        <div>
          <ul>
            <li><button id="GLSLReportsButtonAll" type="button" value="all">all</button></li>
            <li><button id="GLSLReportsButtonError" type="button" value="error">error</button></li>
            <li><button id="GLSLReportsButtonWarning" type="button" value="warning">warning</button></li>
          </ul>
        </div>
      </header>
      <main>
        <ul id="GLSLReports"></ul>
      </main>
      </section>
    `;

    this.shadowRoot.appendChild( document.importNode( this.state.template.content, true ) );

    this.state.button.filter.all = this.shadowRoot.getElementById( 'GLSLReportsButtonAll' );
    this.state.button.filter.error = this.shadowRoot.getElementById( 'GLSLReportsButtonError' );
    this.state.button.filter.warning = this.shadowRoot.getElementById( 'GLSLReportsButtonWarning' );

    this.state.button.filter.all.onclick = this.click.bind( this );
    this.state.button.filter.error.onclick = this.click.bind( this );
    this.state.button.filter.warning.onclick = this.click.bind( this );

  }

  click ( event ) {

    let logsFiltered;
    
    switch ( event.target.value ) {

      case 'error':

        logsFiltered = this.state.logs.filter( log => log.type === 'ERROR' );

        break;

      case 'warning':

        logsFiltered = this.state.logs.filter( log => log.type === 'WARNING' );

        break;

      default:

        logsFiltered = this.state.logs;

        break;

    }

    this.shadowRoot.getElementById( 'GLSLReports' ).innerHTML = '';

    logsFiltered.forEach( logFiltered => this.templating( logFiltered ) );

  }

  apply () {

    const self = this;

    function _hook( f, c ) {
      return function() {
        const res = f.apply( this, arguments );
        c.apply( this, arguments );
        return res;
      }
    }

    WebGLRenderingContext.prototype.compileShader = _hook(
 
      WebGLRenderingContext.prototype.compileShader, 
    
      function( shader ) {
    
        if ( this.getShaderParameter( shader, this.COMPILE_STATUS ) == false ) {

          const logs = this.getShaderInfoLog( shader );
          const source = this.getShaderSource( shader );
          
          document.body.appendChild( self );

          self.compileErrors( logs, source );

        }
    
      }
    
    );

  }

  templating ( log ) {

    this.shadowRoot.getElementById( 'GLSLReports' ).innerHTML += `
      <li>
        <div class="glsl-error__element">
          <div class="glsl-error__element__column">
            <span class="glsl-error__element__id">${ log.id }</span>
          </div>
          <div class="glsl-error__element__column">
            <span class="glsl-error__element__type glsl-error__element__type--${ log.type === 'ERROR' ? 'error' : 'warning' }">
              ${ log.type }
            </span>
          </div>
          <div class="glsl-error__element__column">
            <span class="glsl-error__element__message">"<b> ${ log.message } </b>" in line ${ log.line }</span>
            <span class="glsl-error__element__code">${ log.source[ log.line ] }</span>
          </div>
        </div>
      </li>
    `;

  }

  compileErrors ( logs, source ) {

    const _logs = logs.split( '\n' );
    const _source = source.split( '\n');

    this.shadowRoot.getElementById( 'GLSLReports' ).innerHTML = '';

    this.state.logs = _logs.reduce( ( result, log, index ) => {

      const match = log.match( /(ERROR|WARNING): (\d+):(\d+): (.*)/ );

      if ( match ) {

        const id = index + 1;
        const type = match[ 1 ]
        const status = match[ 2 ];
        const line = parseInt( match[ 3 ], 10 ) - 1;
        const message = match[ 4 ];

        const log = {
          id,
          type,
          status,
          line,
          message,
          source: _source
        };

        this.templating( log, _source );

        return [
          ...result,
          log
        ];

      }

      return [
        ...result
      ];

    }, [] );

  }

}

window.customElements.define( 'glsl-reports', GLSLReports );
