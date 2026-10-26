---
title: Button
componentName: OnyxButton
---

Buttons trigger actions, submit forms, and guide users through critical workflows.

## Examples

### Primary

Use primary buttons for the key action in a given view (e.g. "Save", "Submit", "Continue").

<<< ./examples/Primary.example.vue preview=true

### Neutral

Use neutral buttons for secondary or cancel actions.

<<< ./examples/Neutral.example.vue preview=true

### Danger

Use danger buttons for destructive operations such as "Delete". We recommend pairing destructive actions with a confirmation dialog such as [OnyxAlertModal](/components/feedback/alert-modal).

<<< ./examples/Danger.example.vue preview=true

### Icons

Icons can be placed before or after the text label.

<<< ./examples/Icons.example.vue preview=true

### Loading & skeleton

The `loading` state indicates an action is in progress following user interaction. The `skeleton` prop displays a loading placeholder during initial page rendering.

<<< ./examples/Loading.example.vue preview=true

### Disabled

Buttons can be disabled when an action is unavailable. Ensure the interface explains why the action is disabled.

<div class="onyx-text--small" style="color: var(--onyx-color-text-icons-info-intense)">

Do not disable "Submit" buttons in forms. Keeping submit buttons enabled allows form validation to trigger on click and guide users to fix errors. See the [form component](/components/form-elements/form) for details.

</div>

<<< ./examples/Disabled.example.vue preview=true
