export class Rectangle {
  constructor(
    private x: number,
    private y: number,
    private x2: number,
    private y2: number
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
}

class SelectionState {
  selections: Rectangle[] = [];

  addSelection(selection: Rectangle) {
    this.selections.push(selection);
  }

  clearSelections() {
    this.selections = [];
  }

  getSelections() {
    return this.selections;
  }
}

export const selectionState = new SelectionState();
