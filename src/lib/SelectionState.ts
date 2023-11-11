import type { Selection } from "$lib/Selection";

export class SelectionState {
  selections: Selection[] = [];

  addSelection(selection: Selection) {
    this.selections.push(selection);
  }

  clearSelections() {
    this.selections = [];
  }

  getSelections() {
    return this.selections;
  }
}
