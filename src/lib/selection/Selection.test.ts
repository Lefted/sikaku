import { Selection } from "$lib/selection/Selection";
import { nameOf } from "test/name-of";
import { describe, expect, it } from "vitest";

describe(Selection.name, () => {
  describe(nameOf<Selection>("expand"), () => {
    it("should expand the selection to the bottom right if the end point is larger", () => {
      const selection = new Selection(0, 0, 10, 10);
      selection.expand(15, 15);
      expect(selection.getX()).toBe(0);
      expect(selection.getY()).toBe(0);
      expect(selection.getX2()).toBe(15);
      expect(selection.getY2()).toBe(15);
    });

    it("should not expand the selection to the bottom right if the end point is smaller", () => {
      const selection = new Selection(0, 0, 10, 10);
      selection.expand(5, 5);
      expect(selection.getX()).toBe(0);
      expect(selection.getY()).toBe(0);
      expect(selection.getX2()).toBe(10);
      expect(selection.getY2()).toBe(10);
    });

    it("should expand the selection to the top left if the end point is smaller", () => {
      const selection = new Selection(5, 5, 10, 10);
      selection.expand(0, 0);
      expect(selection.getX()).toBe(0);
      expect(selection.getY()).toBe(0);
      expect(selection.getX2()).toBe(10);
      expect(selection.getY2()).toBe(10);
    });

    it("should not expand the selection if the end point is not larger and not smaller", () => {
      const selection = new Selection(5, 5, 10, 10);
      selection.expand(8, 8);
      expect(selection.getX()).toBe(5);
      expect(selection.getY()).toBe(5);
      expect(selection.getX2()).toBe(10);
      expect(selection.getY2()).toBe(10);
    });
  });
});
