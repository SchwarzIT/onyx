---
title: Form
componentName: OnyxForm
---

Forms are comprehensive components designed for collecting user inputs, including fields like text inputs, selects, steppers and more. With built-in validation and error handling, this flexible component adapts well to different input needs.

Technically, our form component is a small wrapper for the native HTML [\<form\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form) element that supports additional convenience features to easy manage forms with multiple form elements such as disabling all elements at once.

## Form validation

All our form element components integrate with the [build-in HTML form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation#using_built-in_form_validation) which means for most use cases, no additional validation logic or library is needed.

Simply place the form elements inside the form component as shown in the examples below. Triggering the form submit will validate all components and show a corresponding error message if any element is invalid. The `submit` event of the form is only called when all validations are passed.

Take a look at the corresponding component documentation to see a full list of available properties and form validations.

::info-card{headline="Submit button"}
Please not that we do **NOT** recommend to disable "Submit" buttons in forms since this breaks our default form validation behavior where validation is automatically triggered for each form element used inside the form and error messages are displayed correspondingly. Keep the button enabled instead for an improved user experience. Even if the user tries to submit the form before its valid, the submit ist not triggered and all invalid form elements are highlighted with proper error messages.
::

## Examples

In the following examples, we are using our [grid system](/introduction/foundation/breakpoints-and-grid) to easily apply responsive layouts.

### Basic

This example shows a basic form with some validations. Click the submit button before entering any values to see the form validation in action.

:component-example{name="Basic" layout="grow"}

### External submit buttons

For some layouts, it might be required to place the submit button technically outside of the form itself, e.g. when a modal is used where the submit button is inside the modal footer but the form itself is placed inside the modal button.

To "connect" such external submit button, simply add an ID to the form and define the HTML [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/form) attribute with the same ID on the button. This way, the form validation, submit etc. still work as expected, even when the submit button is not placed inside the form.

:component-example{name="Modal"}

### Reset

A optional reset button can be used to allow the user to reset/revert his changes and restore the form with its default values. Depending on the use case, the default value can either be empty or contain pre-defined values (e.g. when editing existing data).

:component-example{name="Reset" layout="grow"}

### Required / optional marker

Required form elements are indicated by a red asterisk by default while optional elements are not highlighted.
When most form elements are required with only a few being optional, you can use the `requiredMarker` property to change the marker type to "optional". This way, optional form elements are highlighted while required elements are not.

We strongly recommend to use only **one** marker type per form.

:component-example{name="OptionalMarker" layout="grow"}

### Disabled

The form can be disabled which will automatically disabled all form elements used inside the form such as inputs, selects etc. This can be useful when e.g. disabling the form while loading / submitting so the user can not edit any data while its being processed.

:component-example{name="Disabled" layout="grow"}
