import { expect, it, vi } from "vitest";
import { reactive, toValue } from "vue";
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
    formProps: { disabled: true, showError: true },
    localProps: { disabled: true, showError: true },
    expected: { disabled: true, showError: true },
  },
  {
    formProps: { disabled: false, showError: false },
    localProps: { disabled: true, showError: true },
    expected: { disabled: true, showError: true },
  },
  {
    formProps: { disabled: true, showError: true },
    localProps: { disabled: false, showError: false },
    expected: { disabled: false, showError: false },
  },
  {
    formProps: { disabled: false, showError: true },
    localProps: { disabled: false, showError: false },
    expected: { disabled: false, showError: false },
  },
  {
    formProps: { disabled: true, showError: true },
    localProps: {
      disabled: FORM_INJECTED_SYMBOL,
      showError: FORM_INJECTED_SYMBOL,
    },
    expected: { disabled: true, showError: true },
  },
  {
    formProps: { disabled: false, showError: false },
    localProps: {
      disabled: FORM_INJECTED_SYMBOL,
      showError: FORM_INJECTED_SYMBOL,
    },
    expected: { disabled: false, showError: false },
  },
  {
    formProps: undefined,
    localProps: {
      disabled: FORM_INJECTED_SYMBOL,
      showError: FORM_INJECTED_SYMBOL,
    },
    expected: { disabled: false, showError: "touched" },
  },
  {
    formProps: undefined,
    localProps: { disabled: true, showError: "touched" },
    expected: { disabled: true, showError: "touched" },
  },
  {
    formProps: undefined,
    localProps: { disabled: false, showError: false },
    expected: { disabled: false, showError: false },
  },
] as const)(
  "it should derive expected state when correctly",
  ({ formProps, localProps, expected }) => {
    provideFormContext(formProps);
    const result = useFormContext(localProps);
    Object.entries(expected).forEach(([key, value]) => {
      const resultValue = toValue(result[key as keyof FormProps]);

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
