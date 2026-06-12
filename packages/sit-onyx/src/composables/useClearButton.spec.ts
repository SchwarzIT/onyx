import { expect, test, vi } from "vitest";
import { ref } from "vue";
import { useFormContext } from "../components/OnyxForm/OnyxForm.core.js";
import { useClearButton } from "./useClearButton.js";

vi.mock("../components/OnyxForm/OnyxForm.core.js", async (importOriginal) => {
  const mod = await importOriginal<typeof import("../components/OnyxForm/OnyxForm.core.js")>();
  return {
    ...mod,
    useFormContext: vi.fn().mockReturnValue({ disabled: ref(false) }),
  };
});

test.each([
  // truthy cases
  { modelValue: "Test", visible: true },
  { modelValue: " ", visible: true },
  { modelValue: 0, visible: true },
  { modelValue: true, visible: true },
  { modelValue: false, visible: true },
  { modelValue: [0], visible: true },
  // falsy cases
  { modelValue: undefined, visible: false },
  { modelValue: null, visible: false },
  { modelValue: "", visible: false },
  { modelValue: NaN, visible: false },
  { modelValue: [], visible: false },
])("should show clear button with value $modelValue: $visible", ({ modelValue, visible }) => {
  // ARRANGE
  const { showClearButton } = useClearButton({
    modelValue: ref(modelValue),
    props: {},
  });

  // ASSERT
  expect(showClearButton.value).toBe(visible);
});

test("should hide when readonly", () => {
  // ARRANGE
  const { showClearButton } = useClearButton({
    modelValue: ref("Test"),
    props: { readonly: true },
  });

  // ASSERT
  expect(showClearButton.value).toBe(false);
});

test("should hide when loading", () => {
  // ARRANGE
  const { showClearButton } = useClearButton({
    modelValue: ref("Test"),
    props: { loading: true },
  });

  // ASSERT
  expect(showClearButton.value).toBe(false);
});

test("should hide when disabled", () => {
  // ARRANGE
  vi.mocked(useFormContext).mockReturnValue({ disabled: ref(true) } as ReturnType<
    typeof useFormContext
  >);

  const { showClearButton } = useClearButton({
    modelValue: ref("Test"),
    props: {},
  });

  // ASSERT
  expect(showClearButton.value).toBe(false);
});

test("should hide when explicitly hidden", () => {
  // ARRANGE
  const { showClearButton } = useClearButton({
    modelValue: ref("Test"),
    props: { hideClearIcon: true },
  });

  // ASSERT
  expect(showClearButton.value).toBe(false);
});
