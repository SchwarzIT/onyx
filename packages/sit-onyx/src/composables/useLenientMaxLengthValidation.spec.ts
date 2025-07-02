import { describe, expect, test, vi } from "vitest";
import * as vue from "vue";
import { nextTick, reactive, ref } from "vue";
import { I18N_INJECTION_KEY } from "../i18n/index.js";
import {
  useLenientMaxLengthValidation,
  type SharedTextInputProps,
} from "./useLenientMaxLengthValidation.js";

vi.mock("vue", async (importOriginal) => {
  const module = await importOriginal<typeof import("vue")>();

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
    const modelValue = ref("");
    const props = reactive<SharedTextInputProps>({ maxlength: { max: 5, strict: true } });
    const { maxLength, maxLengthError } = useLenientMaxLengthValidation({ props, modelValue });

    // ASSERT
    expect(maxLengthError.value).toBeUndefined();
    expect(maxLength.value).toBe(5);
  });

  test("should set maxlength error manually when not strict and too long", async () => {
    // ARRANGE
    const modelValue = ref("");
    const props = reactive<SharedTextInputProps>({ maxlength: 5 });
    const { maxLength, maxLengthError } = useLenientMaxLengthValidation({ props, modelValue });

    // ASSERT
    expect(maxLengthError.value).toBeUndefined();
    expect(maxLength.value).toBeUndefined();

    // ACT
    modelValue.value = "123456";
    await nextTick();

    // ASSERT
    expect(maxLength.value).toBeUndefined();
    expect(maxLengthError.value).toMatchObject({
      longMessage: "validations.tooLong.fullError",
      shortMessage: "validations.tooLong.preview",
    });

    // ACT
    modelValue.value = "12345";
    await nextTick();

    // ASSERT
    expect(maxLength.value).toBeUndefined();
    expect(maxLengthError.value).toBeUndefined();
  });
});
