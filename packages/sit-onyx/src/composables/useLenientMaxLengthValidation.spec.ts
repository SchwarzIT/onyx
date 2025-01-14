import { describe, expect, test, vi } from "vitest";
import * as vue from "vue";
import { nextTick, reactive } from "vue";
import { I18N_INJECTION_KEY } from "../i18n";
import { useLenientMaxLengthValidation } from "./useLenientMaxLengthValidation";

vi.mock("vue", async (importOriginal) => {
  const module: typeof vue = await importOriginal();

  return {
    ...module,
    inject: vi.fn((key) =>
      key === I18N_INJECTION_KEY ? { t: { value: (s: string) => s } } : undefined,
    ) satisfies (typeof vue)["inject"],
  };
});

describe("useLenientMaxLengthValidation", () => {
  test("should only set maxlength when strict", async () => {
    // ARRANGE
    const props = reactive({ modelValue: "", maxlength: 5, strictMaxlength: true });
    const { maxLength, maxLengthError } = useLenientMaxLengthValidation({ props });

    // ASSERT
    expect(maxLengthError.value).toBeUndefined();
    expect(maxLength.value).toBe(5);
  });

  test("should set maxlength error manually when not strict and too long", async () => {
    // ARRANGE
    const props = reactive({ modelValue: "", maxlength: 5, strictMaxlength: false });
    const { maxLength, maxLengthError } = useLenientMaxLengthValidation({ props });

    // ASSERT
    expect(maxLengthError.value).toBeUndefined();
    expect(maxLength.value).toBeUndefined();

    // ACT
    props.modelValue = "123456";
    await nextTick();

    // ASSERT
    expect(maxLength.value).toBeUndefined();
    expect(maxLengthError.value).toMatchObject({
      longMessage: "validations.rangeOverflow.fullError",
      shortMessage: "validations.rangeOverflow.preview",
    });

    // ACT
    props.modelValue = "12345";
    await nextTick();

    // ASSERT
    expect(maxLength.value).toBeUndefined();
    expect(maxLengthError.value).toBeUndefined();
  });
});
