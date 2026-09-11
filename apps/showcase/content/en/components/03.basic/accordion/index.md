---
title: Accordion
componentName: OnyxAccordion
---

An accordion is a versatile UI element that allows users to expand and collapse sections of content. It is commonly used for organizing large amounts of information in a compact space, enabling users to easily navigate through different categories or options.

## Examples

### Types

Multiple accordion items can be opened at the same time. Depending on the usage, one or multiple items can also be initially be opened without the user needing to interact with them first.

The accordion supports different visual types so it can be used in various use cases:

<steps>

::step
#headline
Default

#default
This type is the default and should be used when a simple and subtle separation of the page content is desired.

:component-example{name="Basic" layout="grow"}
::

::step
#headline
Card

#default
To achieve a clearer separation and structure of the page content, the `card` type can be used.

:component-example{name="Card" layout="grow"}
::

::step
#headline
Nested large

#default
The `nested-large` type is optimized to be used inside of other containers or components such as sidebar. It is **not** intended to be used standalone on the main page content.

:component-example{name="NestedLarge" layout="fullWidth"}
::

::step
#headline
Nested small

#default
Identically to the large type, `nested-small` is optimized to be used inside of other containers or components such as sidebar. It is also **not** intended to be used standalone on the main page content.

:component-example{name="NestedSmall" layout="fullWidth"}
::

</steps>

<br />

### Exclusive

The optional exclusive mode can be enabled so only one item can be opened at a time. Opening another item will automatically close the previously opened item. This can be useful to focus the users attention to a single item.

:component-example{name="Exclusive" layout="grow"}

### Custom content

Each accordion item supports custom content inside the header and body. The header should not contain interactive elements since its only used for toggling the content.

:component-example{name="CustomContent" layout="grow"}

### Disabled

The disabled state is used to indicate that the accordion is currently not interactive and the content can not be toggled. Individual items or the whole accordion can be disabled.

:component-example{name="Disabled" layout="grow"}

### Skeleton

The skeleton should be used on initial page load when the data for the page / accordion is initially loaded.

:component-example{name="Skeleton" layout="grow"}
