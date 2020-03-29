/**
 * @author monsieurbadia / https://monsieurbadia.com/
 */

// @see https://uxplanet.org/8-tips-for-dark-theme-design-8dfc2f8f7ab6
// @see https://www.clicktorelease.com/blog/using-hooks-for-easier-development-webgl-glsl/
// @see http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl/

export class GLSLReports extends HTMLElement {

  static get observedAttributes () {

    return [ 'darkmode', 'show' ];

  }

  get darkmode () {

    return this.state.darkmode.value;

  }

  get show () {

    return this.state.show.value;

  }

  set show ( value ) {

    this.state.show.value = value;

    this.setAttribute( 'show', value );

  }

  set darkmode ( value ) {

    this.state.darkmode.value = value;

    this.setAttribute( 'darkmode', value );

  }

  attributeChangedCallback ( name, oldValue, newValue ) {

    if ( oldValue === newValue ) return;

    this.state.section.element.className = JSON.parse( this.darkmode ) ? 'dark' : '';
    this.state.section.element.style.display = JSON.parse( this.show ) ? 'block' : 'none';

  }

  connectedCallback () {

    this.ready();

  }

  constructor () {

    super();

    this.attachShadow( { mode: 'open' } );

    this.state = {
      show: {
        value: false
      },
      logs: [],
      button: {
        toggle: {
          darkmode: null,
          seemore: null
        },
        filter: {
          all: null,
          error: null,
          warning: null
        }
      },
      counter: {
        element: null,
        value: 0
      },
      reports: {
        element: null
      },
      section: {
        element: null
      },
      template: document.createElement( 'template' ),
      darkmode: {
        value: false
      }
    };

  }

  init () {

    this.apply();

    document.body.appendChild( this );

  }

  ready () {

    this.state.template.innerHTML = `
      <style>

        #GLSL {
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: 0;
          display: none;
          padding: 60px 0 30px 0;
          width: 100%;
          height: 100%;
          position: fixed;
          background: #f2f6f9;
          font-size: 12px;
          white-space: normal;
          overflow-y: auto;
          transition: background 300ms ease;
        }

        #GLSL.dark {
          background: #1d262f;
        }
          
        header {
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
          padding: 0 0 0 30px;
          width: 100%;
          height: 60px;
          display: flex;
          position: fixed;
          align-items: center;
          border-top: 4px solid #71d7fc;
          background: hsl( 210, 24%, 10% );
          color: #e8dfda;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1rem;
          transition:
            border-top 300ms ease,
            color 300ms ease;
        }

        #GLSL.dark header {
          color: hsl( 210, 24%, 75% );
          border-top: 4px solid hsl( 185, 76%, 64% );
        }

        header > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #GLSL header > div > h3 {
          color: #71d7fc;
        }

        #GLSL.dark  header > div > h3 {
          color: hsl( 185, 76%, 64% );
        }

        .glsl-reports-filter {
          margin-left: auto;
          display: flex;
          list-style: none;
        }

        #GLSLReportsCounter  {
          margin: 0 0 0 20px;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #71d7fc;
          color: hsla( 196, 96%, 24%, 1 );
          font-size: 10px;
          letter-spacing: 0;
          transition:
            background 300ms ease,
            color 300ms ease;
        }

        #GLSL.dark #GLSLReportsCounter {
          background: hsl( 185, 76%, 64% );
          color: hsl( 185, 76%, 24% );
        }

        main {
          margin: 80px 30px;
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 4px 6px hsla( 0, 0%, 0%, 0.2 );
          background: #ffffff;
          transition: background 300ms ease;
        }

        #GLSL.dark main {
          background: #202d39;
        }

        #GLSLReports {
          margin: 0;
          padding: 0;
          list-style-type: none;
          position: relative;
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
          border-bottom: 1px solid hsl( 206, 37%, 96% );
          letter-spacing: -0.05em;
          color: hsl( 219, 86%, 28% );
          transition:
            border-bottom 300ms ease,
            color 300ms ease;
        }

        #GLSL.dark #GLSLReports li .glsl-error__element {
          border-bottom: 1px solid hsl( 210, 24%, 15% );
          color: #e8dfda;
        }

        #GLSLReports li:last-child .glsl-error__element {
          border-bottom: 0;
        }

        #GLSL.dark #GLSLReports li:last-child .glsl-error__element {
          border-bottom: 0;
        }

        #GLSLReports li:last-child .glsl-error__element {
          border-bottom: none;
        }
        
        .glsl-error__element__column {
          margin-right: 40px
        }

        .glsl-error__element__column span {
          margin-bottom: 5px;
        }

        .glsl-error__element__column span:last-child {
          margin-bottom: 0;
        }
        
        .glsl-error__element__column:nth-child( 3 ) span {
          display: block;
        }

        .glsl-error__element__message {
          font-style: italic;
        }
        
        .glsl-error__element__id {
          width: 25px;
          height: 25px;
          font-weight: 700;
          display: flex;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          border: 1px solid hsl(219, 86%, 28%);
          color: hsl(219, 86%, 28%);
          font-size: 10px;
          letter-spacing: 0;
          transition:
            border 300ms ease,
            color 300ms ease;
        }

        #GLSL.dark .glsl-error__element__id {
          color: #e8dfda;
          border: 1px solid #e8dfda;
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

      <section id="GLSL">
        <header>
          <div><h3>GLSL Reports</h3><span id="GLSLReportsCounter"></span></div>
          <div>
            <ul class="glsl-reports-filter">
              <li><button id="GLSLReportsButtonAll" type="button" value="all">all</button></li>
              <li><button id="GLSLReportsButtonError" type="button" value="error">error</button></li>
              <li><button id="GLSLReportsButtonWarning" type="button" value="warning">warning</button></li>
            </ul>
          </div>
          <div>
            <button id="GLSLReportsButtonToggleTheme" type="button" value="${ this.state.darkmode.value }">toggle</button>
          </div>
        </header>
        <main>
          <ul id="GLSLReports"></ul>
        </main>
      </section>
    `;

    this.shadowRoot.appendChild( document.importNode( this.state.template.content, true ) );

    this.state.section.element = this.shadowRoot.getElementById( 'GLSL' );
    this.state.reports.element = this.shadowRoot.getElementById( 'GLSLReports' );
    this.state.counter.element = this.shadowRoot.getElementById( 'GLSLReportsCounter' );
    this.state.button.filter.all = this.shadowRoot.getElementById( 'GLSLReportsButtonAll' );
    this.state.button.filter.error = this.shadowRoot.getElementById( 'GLSLReportsButtonError' );
    this.state.button.filter.warning = this.shadowRoot.getElementById( 'GLSLReportsButtonWarning' );
    this.state.button.toggle.darkmode = this.shadowRoot.getElementById( 'GLSLReportsButtonToggleTheme' )
    this.state.button.toggle.seemore = this.shadowRoot.querySelector( '.glsl-code-source' );

    this.state.button.filter.all.onclick = this.onclick.bind( this );
    this.state.button.filter.error.onclick = this.onclick.bind( this );
    this.state.button.filter.warning.onclick = this.onclick.bind( this );
    this.state.button.toggle.darkmode.onclick = this.ontoggle.bind( this );

    this.setAttribute( 'darkmode', this.state.darkmode.value );
    this.setAttribute( 'show', this.state.show.value );

  }

  onclick ( event ) {

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


    this.state.counter.value = 0;
    this.state.reports.element.innerHTML = '';

    this.templating( logsFiltered, true );

  }

  onopen ( event ) {

    // UGLY

    event.target.parentNode.parentNode.nextElementSibling.innerHTML = '';

    event.target.value.split( '\n' ).forEach( (line, index) => {

    const currentIndex = event.target.parentNode.parentNode.querySelector( '.glsl-reports__element__message__line' ).innerHTML;

      if ( index === JSON.parse( currentIndex ) ) {

        console.log( 'eee', index === currentIndex)
      }
      
      event.target.parentNode.parentNode.nextElementSibling.innerHTML += `<p style="${ index === JSON.parse( currentIndex ) ? 'background:red;' : '' }">${ line.replace( /[[:space:]]/g, '%20' ) }<p>`;
    } );

  }

  ontoggle ( event ) {

    this.darkmode = event.target.value = !JSON.parse( event.target.value );

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
          
          self.compileErrors( logs, source );
          
          self.show = true;

        }
    
      }
    
    );

  }

  compileErrors ( logs, source ) {

    const _logs = logs.split( '\n' );
    const _source = source.split( '\n' );

    const logsParsed = _logs.reduce( ( result, log ) => {

      const match = log.match( /(ERROR|WARNING): (\d+):(\d+): (.*)/ );

      if ( match ) {

        const type = match[ 1 ]
        const status = match[ 2 ];
        const line = parseInt( match[ 3 ], 10 ) - 1;
        const message = match[ 4 ];
        const code = _source;

        const log = {
          type,
          status,
          line,
          message,
          code,
          source
        };

        return [
          ...result,
          log
        ];

      }

      return [
        ...result
      ];

    }, [] );

    this.templating( logsParsed );

  }

  templating ( logs, isFilter = false ) {

    // do not update the logs when using filter mode

    if ( !isFilter ) this.state.logs.push( ...logs );

    this.state.counter.value += logs.length;
    this.state.counter.element.innerHTML = this.state.counter.value;

    logs.forEach( ( log, index ) =>  

      this.state.reports.element.innerHTML += `
        <li>
          <div class="glsl-error__element">
            <div class="glsl-error__element__column">
              <span class="glsl-error__element__id"></span>
            </div>
            <div class="glsl-error__element__column">
              <span class="glsl-error__element__type glsl-error__element__type--${ log.type === 'ERROR' ? 'error' : 'warning' }">
                ${ log.type }
              </span>
            </div>
            <div class="glsl-error__element__column">
              <span class="glsl-error__element__message">"<b> ${ log.message } </b>" in line<span class="glsl-reports__element__message__line">${ log.line }</span></span>
              <span class="glsl-error__element__code">${ log.code[ log.line ] }</span>
              <button id="GLSLReportsButtonSeeMore" type="button" value="${ log.source }">...</button>
            </div>
          </div>
          <pre class="glsl-code__element__source"></pre>
        </li>
      `

    );

    // the compileShader method use a pipe to send log array one by one. it split errors by files as the example below
    // - file 0 [ "error1\n", "errro2\n" ] - file 1 [ "error1\n", "errro2\n" ]
    // so i'm computing the logs total after their are create in the DOM.

    const children = this.state.reports.element.children;

    for ( let index = 0, id = 1; index < children.length; index++, id++ ) {

      const child = children[ index ];
      const childClassName =  '.glsl-error__element__id';

      child.querySelector( childClassName ).innerHTML = id;
      child.querySelector( '#GLSLReportsButtonSeeMore' ).onclick = this.onopen.bind( this );

    }

  }

}

window.customElements.define( 'glsl-reports', GLSLReports );
