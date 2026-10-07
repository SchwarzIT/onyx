---
title: Modal
componentName: OnyxModal
---

The modal is used to provide information to the user while interaction with the rest of the page is prevented and a backdrop is displayed. Use a modal if the user's focus should be fully shifted to the modal content, e.g. to perform a specific workflow such as filling out a form.

## Examples

### Basic

The modal content is fully customizable. An optional description and footer slot can be displayed if needed. To prevent layout shifts when dynamic content is used, we strongly recommend to set a fixed width.

<<< ./examples/Basic.example.vue preview=true

### Form

When using a form inside the modal, we recommend to place the submit button inside the `footer` slot. Make sure to "connect" the form and submit button using an ID since the button is technically outside of the form. Refer to our [form component](/components/form-elements/form#external-submit-buttons) for further information about using external submit buttons.

<<< ./examples/Form.example.vue preview=true

### Grid

The modal can also used with our [grid system](/docs/foundation/breakpoints-and-grid) to easily achieve responsive layouts.
**Important**: You must set a fixed modal width and set the `container-type: inline-size` CSS property. This ensures the grid scales correctly based on the modal's width.

<<< ./examples/Grid.example.vue preview=true
