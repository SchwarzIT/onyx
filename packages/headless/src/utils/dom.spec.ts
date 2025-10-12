import { describe, expect, test, vi } from "vitest";
import { isFocusVisible } from "./dom.js";

describe("isFocusVisible", () => {
  test("should return true when element matches :focus-visible", () => {
    // ARRANGE
    const mockElement = {
      matches: vi.fn().mockReturnValue(true),
    } as unknown as Element;

    // ACT
    const result = isFocusVisible(mockElement);

    // ASSERT
    expect(result).toBe(true);
    expect(mockElement.matches).toHaveBeenCalledWith(":focus-visible");
  });

  test("should return false when element does not match :focus-visible", () => {
    // ARRANGE
    const mockElement = {
      matches: vi.fn().mockReturnValue(false),
    } as unknown as Element;

    // ACT
    const result = isFocusVisible(mockElement);

    // ASSERT
    expect(result).toBe(false);
    expect(mockElement.matches).toHaveBeenCalledWith(":focus-visible");
  });

  test("should return false when matches throws an error", () => {
    // ARRANGE
    const mockElement = {
      matches: vi.fn().mockImplementation(() => {
        throw new Error(":focus-visible not supported");
      }),
    } as unknown as Element;

    // ACT
    const result = isFocusVisible(mockElement);

    // ASSERT
    expect(result).toBe(false);
    expect(mockElement.matches).toHaveBeenCalledWith(":focus-visible");
  });

  test("should return false when matches throws a DOMException", () => {
    // ARRANGE
    const mockElement = {
      matches: vi.fn().mockImplementation(() => {
        throw new DOMException("Syntax error", "SyntaxError");
      }),
    } as unknown as Element;

    // ACT
    const result = isFocusVisible(mockElement);

    // ASSERT
    expect(result).toBe(false);
    expect(mockElement.matches).toHaveBeenCalledWith(":focus-visible");
  });

  test("should handle real DOM element with focus-visible support", () => {
    // ARRANGE
    const element = document.createElement("button");
    document.body.appendChild(element);

    // ACT
    const result = isFocusVisible(element);

    // ASSERT
    expect(typeof result).toBe("boolean");
    document.body.removeChild(element);
  });
});
