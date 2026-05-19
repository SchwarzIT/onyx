---
title: Button
componentName: OnyxButton
---

Buttons serve as fundamental components in UI design, acting as gateways for user interactions and pivotal points for initiating actions within an interface. Whether prompting users to submit forms, navigate through pages, or trigger specific functionalities, buttons play a pivotal role in guiding users through their digital journey.

## Examples

### Primary

Use primary buttons for the most relevant actions for the current workflow such as "Save" or "Submit" actions.

:component-example{name="Primary"}

### Neutral

Neutral buttons are used for secondary actions such as "Cancel" actions.

:component-example{name="Neutral"}

### Danger

Use danger buttons for destructive actions such as "Delete".

:component-example{name="Danger"}

### Icons

An optional icon can be placed on either the left or the right side of the label.

:component-example{name="Icons"}

### Loading & Skeleton

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. On the other hand, the skeleton should be used on initial page load when the data for the page / button is initially loaded.

:component-example{name="Loading"}

### Disabled

Buttons can be disabled to indicate that their actions is currently not available and the button can not be clicked.
For an improved user experience, it should be clear to the user _why_ the button is disabled.

<div class="onyx-text--small" style="color: var(--onyx-color-text-icons-info-intense)">

Please not that we do **NOT recommend** to disable "Submit" buttons in forms since this breaks our default form validation behavior where validation is automatically triggered for each form element used inside the form and error messages are displayed correspondingly. For further information, please refer to our [form](/components/form-elements/form) component.

</div>

:component-example{name="Disabled"}
