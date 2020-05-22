const STAR_SIZE = 2;

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.color = 'white';
    this.altColor = '#0a6';
    this._colorState = false;
  }
  
  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
  
  toggleColor() {
    this._colorState = !this._colorState;
  }
  
  draw(context) {
    context.fillStyle = (this._colorState)
      ? this.altColor
      : this.color;
    context.fillRect(
      this.x,
      this.y,
      STAR_SIZE,
      STAR_SIZE
    );
  }
}

