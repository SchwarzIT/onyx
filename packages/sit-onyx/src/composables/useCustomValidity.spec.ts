import { describe, expect, test, vi } from "vitest";
import { nextTick, reactive } from "vue";
import {
  useCustomValidity,
  type InputValidationElement,
  type UseCustomValidityOptions,
} from "./useCustomValidity";

const tFunctionMock = vi.fn();

vi.mock("../i18n", () => ({
  injectI18n: () => ({
    t: { value: tFunctionMock },
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

describe("useCustomValidity", () => {
  test("should set custom error", async () => {
    tFunctionMock.mockReset();

    const initialValidity: ValidityState = {
      ...getDefaultValidityState(),
      customError: true,
      valid: false,
    };

    let currentValidity: ValidityState | undefined;

    const mockInput = {
      validity: initialValidity,
      setCustomValidity: vi.fn(),
    } satisfies InputValidationElement;

    const props = reactive<UseCustomValidityOptions["props"]>({
      customError: "Test error",
    });

    const { vCustomValidity, errorMessages } = useCustomValidity({
      props,
      emit: (_, validity) => (currentValidity = validity),
    });

    vCustomValidity.mounted(mockInput);

    await nextTick(); // wait for watchers to be called
    expect(currentValidity).toBeUndefined(); // should not be emitted initially
    expect(errorMessages.value).toEqual({
      longMessage: "Test error",
      shortMessage: "Test error",
      hidden: false,
    });

    props.modelValue = "Test";
    await nextTick();

    expect(mockInput.setCustomValidity).toBeCalledWith("Test error");
    expect(currentValidity).toStrictEqual(initialValidity);

    props.customError = "Changed error";
    await nextTick();
    expect(mockInput.setCustomValidity).toBeCalledWith("Changed error");
    expect(currentValidity).toStrictEqual(initialValidity);

    props.customError = undefined;
    const newValidity = { ...initialValidity, customError: false, valid: true };
    mockInput.validity = newValidity;
    await nextTick();
    expect(mockInput.setCustomValidity).toBeCalledWith("");
    expect(currentValidity).toStrictEqual(newValidity);
    expect(tFunctionMock).toHaveBeenCalledTimes(0);
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
    const initialInvalidEmpty: ValidityState = {
      ...getDefaultValidityState(),
      [cause]: true,
      valid: false,
    };
    const props = reactive<UseCustomValidityOptions["props"]>({});
    const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit: (_, __) => {} });
    tFunctionMock.mockReset();
    tFunctionMock.mockReturnValueOnce("Test");
    tFunctionMock.mockReturnValueOnce("This is a test");
    const mockInput = {
      validity: initialInvalidEmpty,
      setCustomValidity: vi.fn(),
    } satisfies InputValidationElement;

    // ACT
    vCustomValidity.mounted(mockInput);
    await nextTick(); // wait for watchers to be called

    // ASSERT
    expect(errorMessages.value).toEqual({ longMessage: "Test", shortMessage: "This is a test" });
    expect(tFunctionMock).toBeCalledWith(`${key}.preview`);
    expect(tFunctionMock).toBeCalledWith(`${key}.fullError`, expect.any(Object));
  });
});
