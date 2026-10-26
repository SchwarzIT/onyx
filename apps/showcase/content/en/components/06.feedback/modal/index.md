---
title: Modal
componentName: OnyxModal
---

Modals display dialog content over an active backdrop, requiring user interaction or dismissal before returning to the main page. Use modals for focused workflows, such as form inputs or critical confirmation steps.

## Examples

### Basic

Modal contents are fully customizable, with optional description and footer slots. To prevent layout shifts with dynamic content, set a explicit width on the modal container.

<<< ./examples/Basic.example.vue preview=true

### Form

When rendering forms within modals, place the primary submit action in the `#footer` slot. Link the button to the form via the `form` attribute matching the form's `id`. See [OnyxForm](/components/form-elements/form#external-submit-buttons) for details on external submit actions.

<<< ./examples/Form.example.vue preview=true

### Grid

Modals can host responsive grids using our [grid system](/docs/foundation/breakpoints-and-grid). Set an explicit modal width and apply `container-type: inline-size` so nested grid classes respond to the modal width.

<<< ./examples/Grid.example.vue preview=true
