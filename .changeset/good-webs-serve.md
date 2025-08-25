---
"sit-onyx": patch
---

fix: use correct types for emitted "update:" events for v-models

Some v-model "update:" events where typed incorrectly which also allowed null / undefined values.
This made it harder to work the emitted values because nullish checks had to be implemented by the user, although the actually emitted value is always defined.

The following events are updated:

For reference: `type Nullable<T> = T | null | undefined`

| Component         | Event name            | New type   | Old type             |
| ----------------- | --------------------- | ---------- | -------------------- |
| OnyxAccordion     | "update:modelValue"   | `TValue[]` | `Nullable<TValue[]>` |
| OnyxBasicDialog   | "update:open"         | `boolean`  | `Nullable<boolean>`  |
| OnyxCheckboxGroup | "update:modelValue"   | `TValue[]` | `Nullable<TValue[]>` |
| OnyxFAB           | "update:open"         | `boolean`  | `Nullable<boolean>`  |
| OnyxFilterTag     | "update:active"       | `boolean`  | `Nullable<boolean>`  |
| OnyxInput         | "update:modelValue"   | `string`   | `Nullable<string>`   |
| OnyxMiniSearch    | "update:modelValue"   | `string`   | `Nullable<string>`   |
| OnyxFlyoutMenu    | "update:open"         | `boolean`  | `Nullable<boolean>`  |
| OnyxMenuItem      | "update:open"         | `boolean`  | `Nullable<boolean>`  |
| OnyxNavItem       | "update:open"         | `boolean`  | `Nullable<boolean>`  |
| OnyxUserMenu      | "update:flyoutOpen"   | `boolean`  | `Nullable<boolean>`  |
| OnyxProgressSteps | "update:highestValue" | `number`   | `Nullable<number>`   |
| OnyxSwitch        | "update:modelValue"   | `boolean`  | `Nullable<boolean>`  |
| OnyxTextarea      | "update:modelValue"   | `string`   | `Nullable<string>`   |
