import { expectTypeOf, it } from "vitest";
import type { ComponentExposed, ComponentProps } from "vue-component-type-helpers";
import type { CustomMessageType } from "../../composables/useCustomValidity.js";
import type OnyxCheckbox from "../OnyxCheckbox/OnyxCheckbox.vue";
import type OnyxCheckboxGroup from "../OnyxCheckboxGroup/OnyxCheckboxGroup.vue";
import type OnyxInput from "../OnyxInput/OnyxInput.vue";
import type OnyxRadioButton from "../OnyxRadioButton/OnyxRadioButton.vue";
import type OnyxRadioGroup from "../OnyxRadioGroup/OnyxRadioGroup.vue";
import type OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import OnyxSwitch from "../OnyxSwitch/OnyxSwitch.vue";
import type OnyxTextarea from "../OnyxTextarea/OnyxTextarea.vue";
import { type __DONT_USE_VUE_FIX_KeyOfFormProps, type FormProps } from "./OnyxForm.core.js";

it("should be ensured that _KeyofFormProps includes all keys of FormProps", async () => {
  expectTypeOf<keyof FormProps>().toExtend<__DONT_USE_VUE_FIX_KeyOfFormProps>();
  expectTypeOf<__DONT_USE_VUE_FIX_KeyOfFormProps>().toExtend<keyof FormProps>();
});

type AllOnyxFormElements =
  | typeof OnyxSelect
  | typeof OnyxInput
  | typeof OnyxTextarea
  | typeof OnyxRadioButton
  | typeof OnyxCheckbox
  | typeof OnyxStepper
  | typeof OnyxSwitch;

it("should be ensured that all onyx form elements support the basic input props", async () => {
  expectTypeOf<ComponentProps<AllOnyxFormElements>>().toExtend<{
    modelValue?: unknown;
    label: string;
    customError?: CustomMessageType;
  }>();
});

it("should be ensured that all onyx form elements expose the internal input", async () => {
  expectTypeOf<ComponentExposed<AllOnyxFormElements>>().toExtend<{
    input: (HTMLInputElement | HTMLTextAreaElement) | null | undefined;
  }>();
});

type AllOnyxFormGroups = typeof OnyxCheckboxGroup | typeof OnyxRadioGroup;

it("should be ensured that all onyx form element groups expose the internal inputs", async () => {
  expectTypeOf<ComponentExposed<AllOnyxFormGroups>>().toExtend<{
    inputs: HTMLInputElement[];
  }>();
});
