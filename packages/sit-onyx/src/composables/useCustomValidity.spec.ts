import { provideI18n } from "../i18n";
import { beforeEach, describe, expect, test, vi } from "vitest";
import * as vue from "vue";
import { nextTick, reactive } from "vue";
import {
  useCustomValidity,
  type InputValidationElement,
  type UseCustomValidityOptions,
} from "./useCustomValidity";

// keep track of provide/inject because they need to be mocked
let provided = new Map();

const app = {
  provide: vi.fn((key, value) => provided.set(key, value)) satisfies (typeof vue)["provide"],
} as unknown as vue.App;

beforeEach(() => {
  provided = new Map();
});

describe("useCustomValidity", () => {
  test("should set custom error", async () => {
    provideI18n(app, { locale: "test" });

    const initialValidity: ValidityState = {
      badInput: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valueMissing: false,
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
});
