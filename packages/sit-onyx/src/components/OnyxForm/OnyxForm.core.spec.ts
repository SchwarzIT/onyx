import { expect, it, vi } from "vitest";
import { reactive } from "vue";
import {
  FORM_INJECTED_SYMBOL,
  provideFormContext,
  useFormContext,
  type FormInjected,
  type FormProps,
} from "./OnyxForm.core";

let injected: (args: unknown[]) => void;

vi.mock("vue", async (importOriginal) => {
  const mod = await importOriginal<typeof import("vue")>();
  return {
    ...mod,
    inject: () => injected,
    provide: (_: symbol, ctx: (...args: unknown[]) => void) => (injected = ctx),
  };
});

it.for([
  {
    formProps: { disabled: true, showError: true, requiredMarker: "optional" },
    localProps: { disabled: true, showError: true, requiredMarker: "optional" },
    expected: { disabled: true, showError: true, requiredMarker: "optional" },
  },
  {
    formProps: { disabled: false, showError: false, requiredMarker: "optional" },
    localProps: { disabled: true, showError: true, requiredMarker: "required" },
    expected: { disabled: true, showError: true, requiredMarker: "required" },
  },
  {
    formProps: { disabled: true, showError: true, requiredMarker: "required" },
    localProps: { disabled: false, showError: false, requiredMarker: "optional" },
    expected: { disabled: false, showError: false, requiredMarker: "optional" },
  },
  {
    formProps: { disabled: false, showError: true, requiredMarker: "required" },
    localProps: { disabled: false, showError: false, requiredMarker: "required" },
    expected: { disabled: false, showError: false, requiredMarker: "required" },
  },
  {
    formProps: { disabled: true, showError: true, requiredMarker: "optional" },
    localProps: {
      disabled: FORM_INJECTED_SYMBOL,
      showError: FORM_INJECTED_SYMBOL,
      requiredMarker: FORM_INJECTED_SYMBOL,
    },
    expected: { disabled: true, showError: true, requiredMarker: "optional" },
  },
  {
    formProps: { disabled: false, showError: false, requiredMarker: "required" },
    localProps: {
      disabled: FORM_INJECTED_SYMBOL,
      showError: FORM_INJECTED_SYMBOL,
      requiredMarker: FORM_INJECTED_SYMBOL,
    },
    expected: { disabled: false, showError: false, requiredMarker: "required" },
  },
  {
    formProps: undefined,
    localProps: {
      disabled: FORM_INJECTED_SYMBOL,
      showError: FORM_INJECTED_SYMBOL,
    },
    expected: { disabled: false, showError: "touched", requiredMarker: "required" },
  },
  {
    formProps: undefined,
    localProps: { disabled: true, showError: "touched", requiredMarker: "optional" },
    expected: { disabled: true, showError: "touched", requiredMarker: "optional" },
  },
  {
    formProps: undefined,
    localProps: { disabled: false, showError: false, requiredMarker: "required" },
    expected: { disabled: false, showError: false, requiredMarker: "required" },
  },
] as const)(
  "it should derive expected state when correctly",
  ({ formProps, localProps, expected }) => {
    provideFormContext(formProps);
    const result = useFormContext(localProps);
    Object.entries(expected).forEach(([key, value]) => {
      const resultValue = result[key as keyof FormProps].value;

      expect(
        resultValue,
        `Expected "${value}", got "${resultValue}" for formProps "${formProps}" and localProps "${localProps}"`,
      ).toBe(value);
    });
  },
);

it("should update when changed", async () => {
  const formProps = reactive({ disabled: false, showError: true });
  provideFormContext(formProps);

  const localProps = reactive({ disabled: FORM_INJECTED_SYMBOL as FormInjected<boolean> });
  const { disabled } = useFormContext(localProps);
  expect(disabled.value).toBe(false);

  formProps.disabled = true;
  localProps.disabled = true;
  expect(disabled.value).toBe(true);
  localProps.disabled = false;
  expect(disabled.value).toBe(false);
});
