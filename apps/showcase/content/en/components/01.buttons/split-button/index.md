---
title: Split button
componentName: OnyxSplitButton
status: new
---

The split button is used to have multiple actions alongside a group of similar actions. The main action will be displayed on the left and will be triggered immediately after clicking. On the right side and behind an arrow icon, there are multiple additional actions which can be individual or can extend the functionality of the main action.

The split button supports the same styles as the regular [button](/components/buttons/button) but extends the button with additional actions.

## Examples

### Primary

See the [button](/components/buttons/button#primary) documentation for when to use primary buttons.

:component-example{name="Primary"}

### Neutral

See the [button](/components/buttons/button#neutral) documentation for when to use neutral buttons.

:component-example{name="Neutral"}

### Danger

See the [button](/components/buttons/button#danger) documentation for when to use danger buttons.

:component-example{name="Danger"}

### Icons

An optional icon can be placed on either the left or the right side of the label.

:component-example{name="Icons"}

### Loading & Skeleton

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. While loading, the additional actions are unavailable.

On the other hand, the skeleton should be used on initial page load when the data for the page / button is initially loaded.

:component-example{name="Loading"}

### Hover

By default, the additional actions are opened on click but you can configure them to optionally show of hover instead.

:component-example{name="Hover"}
