import { Selection } from "$lib/selection/Selection";

export class SelectionState {
  selections: Selection[] = [];
  currentSelection: Selection = new Selection(0, 0, 0, 0, 5);

  updateSelectionPos(x: number, y: number) {
    this.currentSelection.expand(x, y);
  }

  initCurrentSelection(x: number, y: number) {
    this.currentSelection = new Selection(x, y, x, y, 5);
  }

  confirmSelection(canvasSize: number, gridSize: number) {
    this.currentSelection.snapToGrid(canvasSize, gridSize);
    this.addSelection(this.currentSelection);
    this.currentSelection = new Selection(0, 0, 0, 0, 5);
  }

  addSelection(selection: Selection) {
    this.selections = this.selections.filter((s) => !selection.intersects(s));
    this.selections.push(selection);
  }

  clearSelections() {
    this.selections = [];
  }

  getSelections() {
    return this.selections;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.selections.forEach((selection) => selection.draw(ctx));
  }
}
