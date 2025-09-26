import { beforeEach, describe, expect, test, vi } from "vitest";
import { nextTick, reactive, ref } from "vue";
import type { InputValidationElement } from "./useCustomValidity.js";
import { useFormElementError, type UseFormElementErrorOptions } from "./useFormElementError.js";

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
 * Creates a mock input element that more realistically simulates native validity behavior.
 * Calling `setCustomValidity` will dynamically update the `validity` object.
 */
const createMockInput = (initialCustomValidity = "") => {
  const _validityState = reactive({
    ...getDefaultValidityState(),
    customError: !!initialCustomValidity,
    valid: !initialCustomValidity,
  });

  return {
    get validity() {
      return _validityState;
    },
    setCustomValidity: vi.fn((message: string) => {
      _validityState.customError = !!message;
      _validityState.valid = !_validityState.customError;
    }),
    setNativeValidity: (state: Partial<ValidityState>) => {
      Object.assign(_validityState, state);
    },
  };
};

describe("useFormElementError", () => {
  beforeEach(() => {
    tFunctionMock.mockReset();
  });

  test("should set custom error via options and override native errors", async () => {
    // ARRANGE
    const mockInput = createMockInput();
    const props = reactive<UseFormElementErrorOptions["props"]>({
      modelValue: "",
      error: "This is a custom error.",
    });

    const { vCustomValidity, errorMessages } = useFormElementError({ props, emit: vi.fn() });

    // ACT
    vCustomValidity.mounted(mockInput);
    // Simulate a native validation error occurring before the custom error is applied
    mockInput.setNativeValidity({ valueMissing: true, valid: false });
    await nextTick();

    // ASSERT
    expect(mockInput.setCustomValidity).toHaveBeenCalledWith("This is a custom error.");
    expect(errorMessages.value).toEqual({
      shortMessage: "This is a custom error.",
      longMessage: "This is a custom error.",
      hidden: false,
    });
  });

  test.each([
    { cause: "badInput", key: "validations.badInput" },
    { cause: "patternMismatch", key: "validations.patternMismatch" },
    { cause: "rangeOverflow", key: "validations.rangeOverflow" },
    { cause: "rangeUnderflow", key: "validations.rangeUnderflow" },
    { cause: "stepMismatch", key: "validations.stepMismatch" },
    { cause: "tooLong", key: "validations.tooLong" },
    { cause: "tooShort", key: "validations.tooShort" },
    { cause: "typeMismatch", key: "validations.typeMismatch.generic" },
    { cause: "valueMissing", key: "validations.valueMissing" },
  ])("should create a default error translation for $cause", async ({ cause, key }) => {
    // ARRANGE
    const initialInvalid: ValidityState = {
      ...getDefaultValidityState(),
      [cause]: true,
      valid: false,
    };
    const props = reactive<UseFormElementErrorOptions["props"]>({});
    const { vCustomValidity, errorMessages } = useFormElementError({
      error: undefined,
      props,
      emit: () => ({}),
    });
    // This is the correct way to mock the t function for each test case
    tFunctionMock.mockReturnValueOnce("This is a test");
    tFunctionMock.mockReturnValueOnce("Test");
    const mockInput = {
      validity: initialInvalid,
      setCustomValidity: vi.fn(),
    } satisfies InputValidationElement;

    // ACT
    vCustomValidity.mounted(mockInput);
    await nextTick();

    // ASSERT
    expect(errorMessages.value).toEqual({ longMessage: "This is a test", shortMessage: "Test" });
    expect(tFunctionMock).toBeCalledWith(`${key}.fullError`, expect.any(Object));
    expect(tFunctionMock).toBeCalledWith(`${key}.preview`, expect.any(Object));
  });

  test("should format date min errors", async () => {
    // ARRANGE
    const initialValidity: ValidityState = {
      ...getDefaultValidityState(),
      rangeUnderflow: true,
      valid: false,
    };

    const mockInput = {
      validity: initialValidity,
      setCustomValidity: vi.fn(),
    } satisfies InputValidationElement;

    const props = reactive<UseFormElementErrorOptions["props"]>({
      type: "date",
      min: new Date(2024, 11, 10, 14, 42),
    });

    const { vCustomValidity, errorMessages } = useFormElementError({
      props,
      emit: () => ({}),
    });

    tFunctionMock.mockImplementationOnce(
      (translationKey, params) => `${translationKey}: ${params.min}`,
    );
    tFunctionMock.mockReturnValueOnce("Too low");

    vCustomValidity.mounted(mockInput);
    await nextTick();

    // ASSERT
    expect(errorMessages.value).toStrictEqual({
      shortMessage: "Too low",
      longMessage: "validations.rangeUnderflow.fullError: 12/10/2024",
    });

    // ACT
    tFunctionMock.mockImplementationOnce(
      (translationKey, params) => `${translationKey}: ${params.min}`,
    );
    tFunctionMock.mockReturnValueOnce("Too low");

    props.type = "datetime-local";
    await nextTick();

    // ASSERT
    expect(errorMessages.value).toStrictEqual({
      shortMessage: "Too low",
      longMessage: "validations.rangeUnderflow.fullError: 12/10/2024, 02:42 PM",
    });
  });

  test("should format date max errors", async () => {
    // ARRANGE
    const initialValidity: ValidityState = {
      ...getDefaultValidityState(),
      rangeOverflow: true,
      valid: false,
    };

    const mockInput = {
      validity: initialValidity,
      setCustomValidity: vi.fn(),
    } satisfies InputValidationElement;

    const props = reactive<UseFormElementErrorOptions["props"]>({
      type: "date",
      max: new Date(2024, 11, 10, 14, 42),
    });

    const { vCustomValidity, errorMessages } = useFormElementError({
      props,
      emit: () => ({}),
    });

    tFunctionMock.mockImplementationOnce(
      (translationKey, params) => `${translationKey}: ${params.max}`,
    );
    tFunctionMock.mockReturnValueOnce("Too high");

    vCustomValidity.mounted(mockInput);
    await nextTick();

    // ASSERT
    expect(errorMessages.value).toStrictEqual({
      shortMessage: "Too high",
      longMessage: "validations.rangeOverflow.fullError: 12/10/2024",
    });

    // ACT
    tFunctionMock.mockImplementationOnce(
      (translationKey, params) => `${translationKey}: ${params.max}`,
    );
    tFunctionMock.mockReturnValueOnce("Too high");

    props.type = "datetime-local";
    await nextTick();

    // ASSERT
    expect(errorMessages.value).toStrictEqual({
      shortMessage: "Too high",
      longMessage: "validations.rangeOverflow.fullError: 12/10/2024, 02:42 PM",
    });
  });
});
