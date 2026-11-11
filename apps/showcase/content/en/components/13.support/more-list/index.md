---
title: More list
componentName: OnyxMoreList
---

An overflow container that dynamically monitors the visibility of its items and collapses those that exceed the available width into a more indicator (e.g., "+3 more").

## Examples

### Basic

Follow the steps below to create a basic more list:

<steps>

::step
#headline
Step 1: Define injection key

#default
The more list works using [provide / inject](https://vuejs.org/guide/components/provide-inject.html). Define a new injection key for your specific more list.

<<< ./examples/index.ts
::

::step
#headline
Step 2: Create child component

#default
You must define a custom child component that is used to display the list items. This child component must then register itself to the more list so it can watch the component size and manage its visibility.

<<< ./examples/BadgeListItem.vue
::

::step
#headline
Step 3: Create more list

#default
Create the more list parent component and use the already created child component to display the list items. The content for the more indicator can also be fully customized.

<p style="color: var(--onyx-color-text-icons-info-intense)">Resize your browser window the see the more list in action.</p>

<<< ./examples/Basic.example.vue preview=true clientOnly=true layout=fullWidth
::

</steps>
