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

    this.state.section.element.className = JSON.parse( this.darkmode ) ? 'glsl-reports darkmode' : 'glsl-reports';
    this.state.section.element.style.display = JSON.parse( this.show ) ? 'block' : 'none';

  }

  connectedCallback () {

    this.ready();

  }

  constructor () {

    super();

    this.attachShadow( { mode: 'open' } );

    this.state = {
      button: {
        toggle: {
          darkmode: null,
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
      darkmode: {
        value: false
      },
      logs: [],
      reports: {
        element: null
      },
      section: {
        element: null
      },
      show: {
        value: false
      },
      template: document.createElement( 'template' ),
    };

  }

  init () {

    this.apply();

    document.body.appendChild( this );

  }

  ready () {

    this.state.template.innerHTML = `
      <style>

        .glsl-reports {
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
          background: hsl(206, 37%, 96%);
          font-size: 12px;
          white-space: normal;
          overflow-y: auto;
          transition: background 300ms ease;
        }

        .darkmode {
          background: hsl(210, 24%, 15%);
        }
          
        .glsl-reports__header {
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
          width: 100%;
          height: 60px;
          display: flex;
          position: fixed;
          align-items: center;
          border-top: 4px solid hsl(196, 96%, 72%);
          background: hsl(210, 24%, 10%);
          color: hsl(21, 23%, 88%);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1rem;
          transition:
            border-top 300ms ease,
            color 300ms ease;
        }

        .darkmode .glsl-reports__header {
          color: hsl(210, 24%, 75%);
          border-top: 4px solid hsl(185, 76%, 64%);
        }

        .glsl-reports__header__column {
          display: flex;
          align-items: center;
        }

        .glsl-reports__header__column:nth-child(1) {
          margin-right: auto;
        }


        .glsl-reports__header__column:nth-child(2) {
          margin-left: auto;
        }

        .glsl-reports__header__title {
          margin-left: 30px;
          color: hsl(196, 96%, 72%);
        }

        .darkmode .glsl-reports__header__title {
          color: hsl(185, 76%, 64%);
        }

        .glsl-reports__header__counter {
          margin: 0 0 0 20px;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: hsl(196, 96%, 72%);
          color: hsla(196, 96%, 24%, 1);
          font-size: 10px;
          letter-spacing: 0;
          transition:
            background 300ms ease,
            color 300ms ease;
        }

        .darkmode .glsl-reports__header__counter {
          background: hsl(185, 76%, 64%);
          color: hsl(185, 76%, 24%);
        }

        .glsl-reports__filter {
          padding: 0;
          margin-left: auto;
          margin-right: 30px;
          display: flex;
          list-style: none;
        }

        .glsl-reports__filter__item__button {
          border: 0;
          border-radius: 0.2rem;
          background: transparent;
          font-size: 0.65rem;
          white-space: nowrap;
          text-decoration: none;
          padding: 0.25rem 0.5rem;
          margin: 0.25rem 0.05rem;
          cursor: pointer;
          color: hsl(0, 0%, 100%);
          text-transform: uppercase;
          transition:
            border 300ms ease,
            color 300ms ease;
        }

        .glsl-reports__filter__item__button:active,
        .glsl-reports__filter__item__button:hover,
        .glsl-reports__filter__item__button:focus {
          outline: none;
          color: hsl(196, 96%, 72%);
        }

        .glsl-reports__filter__item__button--all:hover {
          color: hsl(196, 96%, 72%);
        }

        .glsl-reports__filter__item__button--error:hover {
          color: hsl(5, 98%, 60%);
        }

        .glsl-reports__filter__item__button--warning:hover {
          color: hsl(48, 89%, 50%);
        }

        .glsl-reports__item__button--darkmode {
          margin-left: 10px;
          margin-right: 30px;
        }

        .glsl-reports__main {
          margin: 80px auto;
          max-width: 800px;
          min-width: 720px;
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.2);
          background: hsl(0, 0%, 100%);
          transition: background 300ms ease;
        }

        .darkmode .glsl-reports__main {
          background: hsl(209, 28%, 17%);
        }

        .glsl-reports__logs {
          margin: 0;
          padding: 0;
          max-width: 800px;
          min-width: 720px;
          list-style-type: none;
          position: relative;
        }

        .glsl-reports__logs__item__wrapper {
          height: 100%;
          min-height: 80px;
          margin: 0 30px;
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: flex-start;
          position: relative;
          border-bottom: 1px solid hsl(206, 37%, 96%);
          letter-spacing: -0.05em;
          color: hsl(219, 86%, 28%);
          transition:
            border-bottom 300ms ease,
            color 300ms ease;
        }

        .darkmode .glsl-reports__logs__item__wrapper {
          border-bottom: 1px solid hsl(210, 24%, 15%);
          color: hsl(21, 23%, 88%);
        }

        .glsl-reports__logs__item:last-child .glsl-reports__logs__item__wrapper {
          border-bottom: none;
        }

        .darkmode .glsl-reports__logs__item:last-child .glsl-reports__logs__item__wrapper {
          border-bottom: none;
        }

        .glsl-reports__logs__item__column {
          margin-right: 40px
        }

        .glsl-reports__logs__item__column:nth-child(2) {
          width: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .glsl-reports__logs__item__column span {
          margin-bottom: 5px;
        }

        .glsl-reports__logs__item__column span:last-child {
          margin-bottom: 0;
        }

        .glsl-reports__logs__item__column:nth-child( 3 ) span {
          display: block;
        }

        .glsl-reports__logs__item__message {
          font-style: italic;
        }

        .glsl-reports__logs__item__id {
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

        .darkmode .glsl-reports__logs__item__id {
          color: hsl(21, 23%, 88%);
          border: 1px solid hsl(21, 23%, 88%);
        }

        .glsl-reports__logs__item__wrapper--code {
          margin-top: 10px;
          display: block;
          letter-spacing: -0.05em;
        }

        .glsl-reports__logs__item__type {
          padding: 2px 15px;
          border-radius: 10px;
          letter-spacing: -0.05em;
        }
    
        .glsl-reports__logs__item__type--error {
          background: hsl(5, 98%, 60%);
          color: hsl(5, 98%, 30%);
        }
    
        .glsl-reports__logs__item__type--warning {
          background: hsl(48, 89%, 50%);
          color: hsl(48, 89%, 25%);
        }

        .switch {
          margin-right: 30px;
          width: 50px;
          height: 30px;
          display: block;
          position: relative;
        }
        
        .slider {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: grid;
          cursor: pointer;
          align-items: center;
          position: absolute;
          background: hsl(210, 24%, 10%);
          -webkit-transition: 400ms;
          transition: 400ms;
        }
        
        .slider:before {
          content: "";
          z-index: 2;
          width: 15px;
          height: 15px;
          position: absolute;
          background: hsl(196, 96%, 72%);
          -webkit-transition:
            background 400ms ease,
            transform 400ms ease;
          transition:
            background 400ms ease,
            transform 400ms ease;
          transform: translate3d(0, 0, 0);
        }
        
        .slider:after {
          content: "";
          left: 2px;
          right: 0;
          z-index: 1;
          width: 35px;
          height: 5px;
          position: absolute;
          border-radius: 34px;
          background: hsl(206, 37%, 96%);
          transition: background 400ms ease;
        }
        
        input:checked + .slider:before {
          background: hsl(185, 76%, 64%);
          -webkit-transform: translate3d(25px, 0, 0);
          transform: translate3d(25px, 0, 0);
        }
        
        input:checked + .slider:after {
          background: hsl(210, 24%, 15%);
        }
        
        .slider.round:before {
          border-radius: 50%;
        }

      </style>

      <section id="GLSLReports" class="glsl-reports">
        <header class="glsl-reports__header">
          <div class="glsl-reports__header__column">
            <h3 class="glsl-reports__header__title">GLSL Reports</h3>
            <span id="GLSLReportsLogsCounter" class="glsl-reports__header__counter"></span>
          </div>
          <div class="glsl-reports__header__column">
            <ul class="glsl-reports__filter">
              <li class="glsl-reports__filter__item">
                <button
                  id="GLSLReportsButtonAll"
                  class="glsl-reports__filter__item__button glsl-reports__filter__item__button--all"
                  type="button"
                  value="all">
                  all
                </button>
              </li>
              <li class="glsl-reports__filter__item">
                <button
                  id="GLSLReportsButtonError"
                  class="glsl-reports__filter__item__button glsl-reports__filter__item__button--error"
                  type="button"
                  value="error">
                  error
                </button>
              </li>
              <li class="glsl-reports__filter__item">
                <button
                  id="GLSLReportsButtonWarning"
                  class="glsl-reports__filter__item__button glsl-reports__filter__item__button--warning"
                  type="button"
                  value="warning">
                  warning
                </button>
              </li>
            </ul>
            <label class="switch">
              <input id="GLSLReportsButtonToggleDarkMode" type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
        </header>
        <main class="glsl-reports__main">
          <ul id="GLSLReportsLogs" class="glsl-reports__logs"></ul>
        </main>
      </section>
    `;

    this.shadowRoot.appendChild( document.importNode( this.state.template.content, true ) );

    this.state.section.element = this.shadowRoot.getElementById( 'GLSLReports' );
    this.state.reports.element = this.shadowRoot.getElementById( 'GLSLReportsLogs' );
    this.state.counter.element = this.shadowRoot.getElementById( 'GLSLReportsLogsCounter' );
    this.state.button.filter.all = this.shadowRoot.getElementById( 'GLSLReportsButtonAll' );
    this.state.button.filter.error = this.shadowRoot.getElementById( 'GLSLReportsButtonError' );
    this.state.button.filter.warning = this.shadowRoot.getElementById( 'GLSLReportsButtonWarning' );
    this.state.button.toggle.darkmode = this.shadowRoot.getElementById( 'GLSLReportsButtonToggleDarkMode' )

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

  ontoggle ( event ) {

    this.darkmode = event.target.checked;

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
    
        if ( this.getShaderParameter( shader, this.COMPILE_STATUS ) === false ) {

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

        const log = {
          type,
          status,
          line,
          message,
          source: _source
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

    logs.forEach( log =>  

      this.state.reports.element.innerHTML += `

        <li class="glsl-reports__logs__item">
          <div class="glsl-reports__logs__item__wrapper">
            <div class="glsl-reports__logs__item__column">
              <span class="glsl-reports__logs__item__id"></span>
            </div>
            <div class="glsl-reports__logs__item__column">
              <span class="glsl-reports__logs__item__type glsl-reports__logs__item__type--${ log.type === 'ERROR' ? 'error' : 'warning' }">
                ${ log.type }
              </span>
            </div>
            <div class="glsl-reports__logs__item__column">
              <span class="glsl-reports__logs__item__message">"<b> ${ log.message } </b>" in line ${ log.line }</span>
              <span class="glsl-reports__logs__item__code">${ log.source[ log.line ] }</span>
            </div>
          </div>
        </li>

      `

    );

    // the compileShader method use a pipe to send log array one by one. it split errors by files as the example below
    // - file 0 [ "error1\n errro2\n " ] - file 1 [ "error1\n errro2\n" ]
    // so i'm computing the logs total after their are create in the DOM then i reindex the logs id

    const children = this.state.reports.element.children;

    for ( let index = 0, id = 1; index < children.length; index++, id++ ) {

      const child = children[ index ];
      const childClassName =  '.glsl-reports__logs__item__id';

      child.querySelector( childClassName ).innerHTML = id;

    }

  }

}

window.customElements.define( 'glsl-reports', GLSLReports );
