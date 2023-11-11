export class MouseState {
  private mousePos: [number, number] = [0, 0];
  private leftPressed: boolean = false;

  constructor(private canvas: HTMLCanvasElement) {}

  updateMouseState(e: MouseEvent) {
    this.recalcMousePos(e);
    this.leftPressed = e.buttons === 1;
  }

  getMousePos() {
    return this.mousePos;
  }

  isLeftPressed() {
    return this.leftPressed;
  }

  private recalcMousePos(evt: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect(), // abs. size of element
      scaleX = this.canvas.width / rect.width, // relationship bitmap vs. element for X
      scaleY = this.canvas.height / rect.height; // relationship bitmap vs. element for Y

    this.mousePos = [
      (evt.clientX - rect.left) * scaleX,
      (evt.clientY - rect.top) * scaleY,
    ];
  }
}
