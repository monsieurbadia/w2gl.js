export class Timer {

  constructor () {

    this.speed = 0.05;
    this.time = 0;

  }

  render () {

    this.time += this.speed;

  }

}
