import { expect, it, vi } from "vitest";
import { reactive, toValue } from "vue";
import {
  FORM_INJECTED_SYMBOL,
  provideFormContext,
  useFormContext,
  type FORM_INJECTED,
  type FormInjected,
  type FormInjectedProps,
} from "./OnyxForm.core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let injected: any;

vi.mock("vue", async (importOriginal) => {
  const mod = await importOriginal<typeof import("vue")>();
  return {
    ...mod,
    inject: () => injected,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provide: (_: any, ctx: any) => (injected = ctx),
  };
});

it.for([
  {
    formProps: { disabled: true },
    localProps: { disabled: true },
    expected: { disabled: true },
  },
  {
    formProps: { disabled: false },
    localProps: { disabled: true },
    expected: { disabled: true },
  },
  {
    formProps: { disabled: true },
    localProps: { disabled: false },
    expected: { disabled: false },
  },
  {
    formProps: { disabled: false },
    localProps: { disabled: false },
    expected: { disabled: false },
  },
  {
    formProps: { disabled: true },
    localProps: { disabled: FORM_INJECTED_SYMBOL as FORM_INJECTED },
    expected: { disabled: true },
  },
  {
    formProps: { disabled: false },
    localProps: { disabled: FORM_INJECTED_SYMBOL as FORM_INJECTED },
    expected: { disabled: false },
  },
  {
    formProps: undefined,
    localProps: { disabled: FORM_INJECTED_SYMBOL as FORM_INJECTED },
    expected: { disabled: false },
  },
  {
    formProps: undefined,
    localProps: { disabled: true },
    expected: { disabled: true },
  },
  {
    formProps: undefined,
    localProps: { disabled: false },
    expected: { disabled: false },
  },
])("it should derive expected state when correctly", ({ formProps, localProps, expected }) => {
  provideFormContext(formProps);
  const result = useFormContext(localProps);
  Object.entries(expected).forEach(([key, value]) => {
    const resultValue = toValue(result[key as keyof FormInjectedProps]);

    expect(
      resultValue,
      `Expected "${value}", got "${resultValue}" for formProps "${formProps}" and localProps "${localProps}"`,
    ).toBe(value);
  });
});

it("should update when changed", async () => {
  const formProps = reactive({ disabled: false });
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
