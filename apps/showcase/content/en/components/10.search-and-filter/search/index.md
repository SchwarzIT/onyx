---
title: Search
componentName: OnyxSearch
status: experimental
---

The search component provides a straightforward text search functionality, allowing users to type in a keyword or phrase and receive results that directly match their input. It can optionally include additional filters, e.g. when working with complex tables.

## Examples

### Basic

A basic search supports the user to enter a search text.

<<< ./examples/Basic.example.vue preview=true layout=grow

### Shortcut

When enabling the shortcut, the keyboard can be used to focus the search.

<<< ./examples/Shortcut.example.vue preview=true layout=grow

### Visual styles

Multiple visual styles are supported to customize the search, depending on where it is placed, e.g. inside a sidebar.

<steps>

::step
#headline
Tinted

#default
Use the tinted search when the component is used on a blank background.

<<< ./examples/Tinted.example.vue preview=true layout=grow

::

::step
#headline
Strong border radius

#default
The search can optionally display with a stronger border radius.

<<< ./examples/StrongBorder.example.vue preview=true layout=grow

::

</steps>

<br />

### Filters

In addition to the text search, custom additional filters can be displayed. You can use any form or custom elements for this.

<steps>

::step
#headline
Underneath

#default
Displays the filters underneath / below the main search.

<<< ./examples/FiltersUnderneath.example.vue preview=true layout=fullWidth

::

::step
#headline
Inline

#default
Displays the filters inline / beside the main search.

<<< ./examples/FiltersInline.example.vue preview=true layout=fullWidth

::

::step
#headline
Modal

#default
Displays the filters inside a dedicated [modal](/components/feedback/modal).

<<< ./examples/FiltersModal.example.vue preview=true layout=grow

::

</steps>

<br />

### Skeleton

Use the skeleton on initial page load while the data for the search is currently loading.

<<< ./examples/Skeleton.example.vue preview=true layout=grow
