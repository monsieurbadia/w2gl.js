export class Screen {

  constructor () {

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // that method is used into a listener
    this.resize = this.resize.bind( this );

  }

  resize ( event ) {
  
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
  
  }

}
