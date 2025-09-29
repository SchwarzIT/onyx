import { beforeEach, describe, expect, test, vi } from "vitest";
import { nextTick, ref } from "vue";
import { useCustomValidity } from "./useCustomValidity.js";

const tFunctionMock = vi.fn();

// Mock the i18n translation function
vi.mock("../i18n", () => ({
  injectI18n: () => ({
    t: { value: tFunctionMock },
    locale: ref("en-US"),
  }),
}));

const getDefaultValidityState = (): ValidityState => ({
  badInput: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
  customError: false,
  valid: true,
});

/**
 * Creates a mock input element
 */
const createMockInput = (initialCustomValidity = "") => {
  let customValidity = initialCustomValidity;
  const validityState = {
    ...getDefaultValidityState(),
    get customError() {
      return !!customValidity;
    },
    get valid(): boolean {
      return !this.customError;
    },
  };

  return {
    get validity() {
      return validityState;
    },
    setCustomValidity: vi.fn((message: string) => {
      customValidity = message;
    }),
  };
};

describe("useCustomValidity", () => {
  beforeEach(() => {
    tFunctionMock.mockReset();
  });

  test("should set custom error via options", async () => {
    // ARRANGE
    const mockInput = createMockInput();
    const error = ref<string>("Test error");
    const { vCustomValidity, validityState } = useCustomValidity({ error, props: {} });

    // ACT
    vCustomValidity.mounted(mockInput);
    await nextTick();

    // ASSERT
    expect(mockInput.setCustomValidity).toHaveBeenCalledWith("Test error");
    expect(validityState.value).toEqual({
      ...getDefaultValidityState(),
      customError: true,
      valid: false,
    });
  });

  test("should update custom error when the value changes", async () => {
    // ARRANGE
    const mockInput = createMockInput();
    const error = ref<string>("Initial error");
    const { vCustomValidity, validityState } = useCustomValidity({ error, props: {} });

    // ACT
    vCustomValidity.mounted(mockInput);
    await nextTick();
    expect(mockInput.setCustomValidity).toHaveBeenCalledWith("Initial error");
    expect(validityState.value).toEqual({
      ...getDefaultValidityState(),
      customError: true,
      valid: false,
    });
    error.value = "Updated error";
    await nextTick();

    // ASSERT
    expect(mockInput.setCustomValidity).toHaveBeenCalledWith("Updated error");
    expect(validityState.value).toEqual({
      ...getDefaultValidityState(),
      customError: true,
      valid: false,
    });
  });

  test("should clear custom error when the value is undefined", async () => {
    // ARRANGE
    const mockInput = createMockInput("Initial error");
    const error = ref<string>("Initial error");
    const { vCustomValidity, validityState } = useCustomValidity({ error, props: {} });

    vCustomValidity.mounted(mockInput);
    await nextTick();

    // ACT
    error.value = "";
    await nextTick();

    // ASSERT
    expect(mockInput.setCustomValidity).toHaveBeenCalledWith("");
    expect(validityState.value).toEqual({
      ...getDefaultValidityState(),
      customError: false,
      valid: true,
    });
  });

  test("should not update validity state if nothing changes", async () => {
    // ARRANGE
    const mockInput = createMockInput();
    const error = ref<string>("Test error");
    const { vCustomValidity, validityState } = useCustomValidity({ error, props: {} });

    vCustomValidity.mounted(mockInput);
    await nextTick();

    const initialValidityStateValue = validityState.value;

    // ACT
    error.value = "Test error";
    await nextTick();

    // ASSERT
    expect(validityState.value).toBe(initialValidityStateValue);
  });
});
