import { describe, expect, test, vi } from "vitest";
import { nextTick, reactive, ref } from "vue";
import { useCustomValidity, type UseCustomValidityOptions } from "./useCustomValidity";

describe("useCustomValidity", () => {
  test("should set custom error", async () => {
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

    const inputRef = ref({
      validity: initialValidity,
      setCustomValidity: vi.fn(),
    }) satisfies UseCustomValidityOptions["inputRef"];

    const props = reactive<UseCustomValidityOptions["props"]>({
      customError: "Test error",
    });

    useCustomValidity({
      inputRef,
      props,
      emit: (_, validity) => (currentValidity = validity),
    });

    await nextTick(); // wait for watchers to be called
    expect(currentValidity).toBeUndefined(); // should not be emitted initially

    props.modelValue = "Test";
    await nextTick();

    expect(inputRef.value.setCustomValidity).toBeCalledWith("Test error");
    expect(currentValidity).toStrictEqual(initialValidity);

    props.customError = "Changed error";
    await nextTick();
    expect(inputRef.value?.setCustomValidity).toBeCalledWith("Changed error");
    expect(currentValidity).toStrictEqual(initialValidity);

    props.customError = undefined;
    const newValidity = { ...initialValidity, customError: false, valid: true };
    inputRef.value.validity = newValidity;
    await nextTick();
    expect(inputRef.value?.setCustomValidity).toBeCalledWith("");
    expect(currentValidity).toStrictEqual(newValidity);
  });
});
