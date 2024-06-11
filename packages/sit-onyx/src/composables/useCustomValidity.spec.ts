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

    const { vCustomValidity } = useCustomValidity({
      props,
      emit: (_, validity) => (currentValidity = validity),
    });

    vCustomValidity.mounted(mockInput);

    await nextTick(); // wait for watchers to be called
    expect(currentValidity).toBeUndefined(); // should not be emitted initially

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
  });

  test("should create a default error translation", async () => {
    tFunctionMock.mockReset();

    const initialInvalidEmpty: ValidityState = {
      ...getDefaultValidityState(),
      valueMissing: true,
      valid: false,
    };

    const mockInput = {
      validity: initialInvalidEmpty,
      setCustomValidity: vi.fn(),
    } satisfies InputValidationElement;

    const props = reactive<UseCustomValidityOptions["props"]>({});

    const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit: (_, __) => {} });

    vCustomValidity.mounted(mockInput);

    tFunctionMock.mockReturnValueOnce("Test");
    tFunctionMock.mockReturnValueOnce("This is a test");

    await nextTick(); // wait for watchers to be called
    expect(errorMessages.value).toEqual({ longMessage: "Test", shortMessage: "This is a test" });
    expect(tFunctionMock).toBeCalledWith("validations.valueMissing.preview", {
      maxLength: undefined,
      minLength: undefined,
      n: 0,
      value: undefined,
    });
  });
});
