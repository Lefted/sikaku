import { Rectangle } from "$lib/Rectangle";

export class Selection extends Rectangle {
  constructor(
    x: number,
    y: number,
    x2: number,
    y2: number,
    private lineWidth: number = 5
  ) {
    super(x, y, x2, y2);
  }

  expand(mouseX: number, mouseY: number) {
    [this.x, this.y] = [Math.min(this.x, mouseX), Math.min(this.y, mouseY)];
    [this.x2, this.y2] = [Math.max(this.x2, mouseX), Math.max(this.y2, mouseY)];
  }

  snapToGrid(canvasSize: number, gridSize: number) {
    const SNAP_VALUE = canvasSize / gridSize;
    const [x1, y1] = [
      Math.floor(this.clamp(this.x, 0, canvasSize) / SNAP_VALUE) * SNAP_VALUE,
      Math.floor(this.clamp(this.y, 0, canvasSize) / SNAP_VALUE) * SNAP_VALUE,
    ];
    const [x2, y2] = [
      Math.ceil(this.clamp(this.x2, 0, canvasSize) / SNAP_VALUE) * SNAP_VALUE,
      Math.ceil(this.clamp(this.y2, 0, canvasSize) / SNAP_VALUE) * SNAP_VALUE,
    ];
    [this.x, this.y, this.x2, this.y2] = [x1, y1, x2, y2];
  }

  draw(ctx: CanvasRenderingContext2D) {
    const [w, h] = [this.getWidth(), this.getHeight()];
    if (w == 0 || h == 0) return;

    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#c0392b";
    ctx.rect(
      this.x + this.lineWidth / 2,
      this.y + this.lineWidth / 2,
      w - this.lineWidth,
      h - this.lineWidth
    );
    ctx.stroke();
  }

  private clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }
}
