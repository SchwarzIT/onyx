---
title: Button
componentName: OnyxButton
---

Buttons serve as s asdas in UI design, acting as gateways for user interactions and pivotal points for initiating actions within an interface. Whether prompting users to submit forms, navigate through pages, or trigger specific functionalities, buttons play a pivotal role in guiding users through their digital journey.

## Examples

### Primary

Use primary buttons for the most relevant actions for the current workflow such as "Save" or "Submit" actions.

<<< ./examples/Primary.example.vue preview=true

### Neutral

Neutral buttons are used for secondary actions such as "Cancel" actions.

<<< ./examples/Neutral.example.vue preview=true

### Danger

Use danger buttons for destructive actions such as "Delete". For an improved user experience, we strongly recommend to show a confirmation before actually deleting any data. You can use our [alert modal](/components/feedback/alert-modal) component for this.

<<< ./examples/Danger.example.vue preview=true

### Icons

An optional icon can be placed on either the left or the right side of the label.

<<< ./examples/Icons.example.vue preview=true

### Loading & Skeleton

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. On the other hand, the skeleton should be used on initial page load when the data for the page / button is initially loaded.

<<< ./examples/Loading.example.vue preview=true

### Disabled

Buttons can be disabled to indicate that their actions is currently not available and the button can not be clicked.
For an improved user experience, it should be clear to the user _why_ the button is disabled.

<div class="onyx-text--small" style="color: var(--onyx-color-text-icons-info-intense)">

Please note that we do **NOT recommend** to disable "Submit" buttons in forms since this breaks the default form validation behavior where validation is automatically triggered for each form element used inside the form and error messages are displayed correspondingly. For further information, please refer to our [form](/components/form-elements/form) component.

</div>

<<< ./examples/Disabled.example.vue preview=true
