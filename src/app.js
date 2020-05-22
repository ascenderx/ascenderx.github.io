const NUM_STARS = 100;
const INTERVAL = 60;
const STAR_DX = 0.7;
const STAR_DY = 1;

class Application {
  constructor(canvas) {
    this._cvs = canvas;
    this._ctx = canvas.getContext('2d');
    this._stars = [];
    for (let s = 0; s < NUM_STARS; s++) {
      let x = Math.floor(Math.random() * canvas.width);
      let y = Math.floor(Math.random() * canvas.height);
      let star = new Star(x, y);
      star.dx = STAR_DX;
      star.dy = STAR_DY;
      this._stars.push(star);
    }
    this._loop = new Loop(() => {
      this._update();
      this._draw();
    }, INTERVAL);
  }
  
  get isRunning() {
    return this._loop.isRunning;
  }
  
  set isRunning(value) {
    if (value) {
      this.resume();
    } else {
      this.pause();
    }
  }
  
  pause() {
    this._loop.pause();
  }
  
  resume() {
    this._loop.resume();
  }
  
  resize() {
    this._stars.forEach((star) => {
      star.x = Math.floor(Math.random() * this._cvs.width);
      star.y = Math.floor(Math.random() * this._cvs.height);
    });
  }
  
  _update() {
    this._stars.forEach((star) => {
      let shouldToggleColor = Math.floor(Math.random() * 2);
      if (shouldToggleColor) {
        star.toggleColor();
      }
      
      star.update();
      if (star.x < 0) {
        star.x = this._cvs.width;
      } else if (star.x > this._cvs.width) {
        star.x = 0;
      }
      
      if (star.y < 0) {
        star.y = this._cvs.height;
      } else if (star.y > this._cvs.height) {
        star.y = 0;
      }
    });
  }
  
  _draw() {
    this._ctx.clearRect(
      0,
      0,
      this._cvs.width,
      this._cvs.height
    );
    this._stars.forEach((star) => {
      star.draw(this._ctx);
    });
  }
}

