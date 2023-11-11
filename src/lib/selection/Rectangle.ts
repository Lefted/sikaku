export class Rectangle {
  constructor(
    protected x: number,
    protected y: number,
    protected x2: number,
    protected y2: number
  ) {
    if (x > x2) {
      this.x = x2;
      this.x2 = x;
    }

    if (y > y2) {
      this.y = y2;
      this.y2 = y;
    }
  }

  intersects(rect: Rectangle) {
    return (
      this.x < rect.getX2() &&
      this.x2 > rect.getX() &&
      this.y < rect.getY2() &&
      this.y2 > rect.getY()
    );
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getX2() {
    return this.x2;
  }

  getY2() {
    return this.y2;
  }

  getWidth() {
    return this.x2 - this.x;
  }

  getHeight() {
    return this.y2 - this.y;
  }

  getArea() {
    return this.getWidth() * this.getHeight();
  }

  setStartPoint(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setEndPoint(x: number, y: number) {
    this.x2 = x;
    this.y2 = y;
  }
}
