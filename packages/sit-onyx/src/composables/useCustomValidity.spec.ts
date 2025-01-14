import { beforeEach, describe, expect, test, vi } from "vitest";
import { nextTick, reactive, ref } from "vue";
import {
  useCustomValidity,
  type CustomMessageType,
  type InputValidationElement,
  type UseCustomValidityOptions,
} from "./useCustomValidity";

const tFunctionMock = vi.fn();

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

describe("useCustomValidity", () => {
  beforeEach(() => {
    tFunctionMock.mockReset();
  });

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

    const customError = ref<CustomMessageType>();

    const { vCustomValidity, errorMessages } = useCustomValidity({
      customError,
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

    customError.value = "explicit custom error";
    await nextTick();
    expect(mockInput.setCustomValidity).toBeCalledWith("Changed error");
    expect(currentValidity).toStrictEqual(initialValidity);

    props.customError = undefined;
    await nextTick();
    expect(mockInput.setCustomValidity).toBeCalledWith("explicit custom error");
    expect(currentValidity).toStrictEqual(initialValidity);

    props.customError = undefined;
    customError.value = undefined;
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
    const { vCustomValidity, errorMessages } = useCustomValidity({
      customError: undefined,
      props,
      emit: () => ({}),
    });
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

    const props = reactive<UseCustomValidityOptions["props"]>({
      type: "date",
      min: new Date(2024, 11, 10, 14, 42),
    });

    const { vCustomValidity, errorMessages } = useCustomValidity({
      props,
      emit: () => ({}),
    });

    tFunctionMock.mockImplementationOnce(
      (translationKey, params) => `${translationKey}: ${params.min}`,
    );
    tFunctionMock.mockReturnValueOnce("Too low");

    vCustomValidity.mounted(mockInput);
    await nextTick(); // wait for watchers to be called

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

    const props = reactive<UseCustomValidityOptions["props"]>({
      type: "date",
      max: new Date(2024, 11, 10, 14, 42),
    });

    const { vCustomValidity, errorMessages } = useCustomValidity({
      props,
      emit: () => ({}),
    });

    tFunctionMock.mockImplementationOnce(
      (translationKey, params) => `${translationKey}: ${params.max}`,
    );
    tFunctionMock.mockReturnValueOnce("Too high");

    vCustomValidity.mounted(mockInput);
    await nextTick(); // wait for watchers to be called

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
