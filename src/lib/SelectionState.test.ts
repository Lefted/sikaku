import { Rectangle } from "$lib/SelectionState";
import { describe, expect, it } from "vitest";

describe("SelectionState", () => {
  // intersection tests
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
