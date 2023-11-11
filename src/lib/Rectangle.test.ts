import { Rectangle } from "$lib/Rectangle";
import { nameOf } from "test/name-of";
import { describe, expect, it } from "vitest";

describe(Rectangle.name, () => {
  describe("constructor", () => {
    it("should use the smaller x and y as the start point and the larger x and y as the end point", () => {
      const rect = new Rectangle(10, 10, 0, 0);
      expect(rect.getX()).toBe(0);
      expect(rect.getY()).toBe(0);
      expect(rect.getX2()).toBe(10);
      expect(rect.getY2()).toBe(10);
    });
  });

  describe(nameOf<Rectangle>("intersects"), () => {
    it("should return true if the selection intersects with the rectangle", () => {
      const selection = new Rectangle(0, 0, 10, 10);
      const rect = new Rectangle(5, 5, 15, 15);
      expect(selection.intersects(rect)).toBe(true);
    });

    it("should return false if the selection does not intersect with the rectangle", () => {
      const selection = new Rectangle(0, 0, 10, 10);
      const rect = new Rectangle(11, 11, 15, 15);
      expect(selection.intersects(rect)).toBe(false);
    });
  });
});
