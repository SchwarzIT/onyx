import { describe, expect, test, vi } from "vitest";
import * as vue from "vue";
import { nextTick, reactive, ref } from "vue";
import { I18N_INJECTION_KEY } from "../i18n/index.js";
import { useWhitespaceValidation } from "./useWhitespaceValidation.js";

vi.mock("vue", async (importOriginal) => {
  const module = await importOriginal<typeof import("vue")>();

  return {
    ...module,
    inject: vi.fn((key) =>
      key === I18N_INJECTION_KEY ? { t: { value: (s: string) => s } } : undefined,
    ) satisfies (typeof vue)["inject"],
  };
});

describe("useWhitespaceValidation", () => {
  test("should not return error when it's not required", () => {
    // ARRANGE
    const modelValue = ref("   ");
    const props = reactive({ required: false });
    const { whitespaceError } = useWhitespaceValidation({ props, modelValue });

    // ASSERT
    expect(whitespaceError.value).toBeUndefined();
  });

  test("should set error when it is required and the input consists of whitespace only", async () => {
    // ARRANGE
    const modelValue = ref("valid text");
    const props = reactive({ required: true });
    const { whitespaceError } = useWhitespaceValidation({ props, modelValue });

    // ASSERT
    expect(whitespaceError.value).toBeUndefined();

    // ACT
    modelValue.value = "   ";
    await nextTick();

    // ASSERT
    expect(whitespaceError.value).toMatchObject({
      shortMessage: "validations.valueMissing.preview",
      longMessage: "validations.valueMissing.whitespaceError",
    });

    // ACT
    modelValue.value = "  valid text  ";
    await nextTick();

    // ASSERT
    expect(whitespaceError.value).toBeUndefined();
  });

  test("should handle HTML tags with whitespace only (e.g. for text editor / tiptap)", async () => {
    // ARRANGE
    const modelValue = ref("<p>   </p>");
    const props = reactive({ required: true });
    const { whitespaceError } = useWhitespaceValidation({ props, modelValue });

    // ASSERT
    expect(whitespaceError.value).toMatchObject({
      shortMessage: "validations.valueMissing.preview",
      longMessage: "validations.valueMissing.whitespaceError",
    });

    // ACT
    modelValue.value = "<p>  hello  </p>";
    await nextTick();

    // ASSERT
    expect(whitespaceError.value).toBeUndefined();
  });
});
