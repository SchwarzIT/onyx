---
title: Form
componentName: OnyxForm
---

Forms collect user input across fields such as text inputs, selects, and steppers. With integrated validation and error states, the form component simplifies complex data collection.

Technically, our form component wraps the native HTML [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form) element and adds utility features like cascading disabled states across child inputs.

## Form validation

All Onyx form components integrate with [native HTML form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation#using_built-in_form_validation). External validation libraries are usually unnecessary.

Submitting the form triggers validation across all child inputs and surfaces corresponding error messages. The `submit` event fires only when all fields satisfy validation constraints.

::info-card{headline="Submit button"}
We advise against disabling form submit buttons. Disabling the button prevents users from discovering validation errors upon click. Keeping the submit button enabled allows the form to highlight invalid fields and guide correction when submitted.
::

Form reset buttons are discouraged. See the [MDN reset documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/reset) for details.

## Examples

The examples below use the Onyx [grid system](/docs/foundation/breakpoints-and-grid) for responsive multi-column layouts.

### Basic

Basic form demonstrating validation constraints. Click "Submit" with empty fields to trigger validation highlights:

<<< ./examples/Basic.example.vue preview=true  layout="grow"

### External submit buttons

Some layouts require placing the submit action outside the form element (e.g. inside a modal footer).

To connect an external button, assign an `id` to the form and set the `form` attribute on the button to match that `id`. Validation and submission behaviors work identically:

<<< ./examples/Modal.example.vue preview=true

### Required / optional marker

Required fields show an asterisk by default. When the vast majority of fields are required, set `requiredMarker="optional"` to label the rare optional fields instead.

Maintain one consistent marker convention per form.

<<< ./examples/OptionalMarker.example.vue preview=true  layout="grow"

### Disabled

Disabling the form cascades the disabled state down to all child inputs, which is ideal during asynchronous submit operations.

<<< ./examples/Disabled.example.vue preview=true  layout="grow"

### Skeleton

Setting the `skeleton` prop renders skeletons for all nested fields during initial data fetch.

<<< ./examples/Skeleton.example.vue preview=true  layout="grow"
