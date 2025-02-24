---
"sit-onyx": major
---

refactor(OnyxAccordion): move management of items open state to parent component

The open state of all nested OnyxAccordionItem components is now fully moved to the OnyxAccordion to prevent recursive state logic.
The OnyxAccordion now also supports a `v-model` for the currently opened items.

#### Breaking changes

- OnyxAccordionItem: remove `open` property. Use the new `v-model` / `modelValue` on the OnyxAccordion
- OnyxAccordionItem: require new `value` property
