import { describe, expect, test } from "vitest";
import { createToastProvider } from "./useToast.js";

describe("useToast", () => {
  test("should create toast provider", () => {
    const provider = createToastProvider();

    expect(provider.toasts.value).toStrictEqual([]);

    provider.show({ headline: "Test 1" });
    provider.show({ headline: "Test 2" });

    expect(provider.toasts.value).toStrictEqual([
      {
        id: 1,
        headline: "Test 1",
        onClose: expect.any(Function),
      },
      {
        id: 2,
        headline: "Test 2",
        onClose: expect.any(Function),
      },
    ]);

    provider.remove(2);

    expect(provider.toasts.value).toStrictEqual([
      {
        id: 1,
        headline: "Test 1",
        onClose: expect.any(Function),
      },
    ]);

    provider.toasts.value[0].onClose();

    expect(provider.toasts.value).toStrictEqual([]);
  });
});
