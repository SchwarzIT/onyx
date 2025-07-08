import { describe, expect, test } from "vitest";
import { ref } from "vue";
import { useErrorClass, type ShowErrorMode } from "./useErrorClass.js";

describe("useErrorClass", () => {
  const showErrorMode = ref<ShowErrorMode>(true);
  const errorClass = useErrorClass(showErrorMode);

  test.each([
    { mode: true, expected: "onyx-form-element--immediate-invalid" },
    { mode: false, expected: "onyx-form-element--suppress-invalid" },
    { mode: "touched", expected: "onyx-form-element--touched-invalid" },
  ] as const)("should return correct class for showError mode $mode", ({ mode, expected }) => {
    showErrorMode.value = mode;
    expect(errorClass.value).toBe(expected);
  });
});
