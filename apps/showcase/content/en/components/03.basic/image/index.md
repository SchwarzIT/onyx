---
title: Image
componentImage: OnyxImage
---

Image components are essential elements in web design, serving multiple purposes to enhance the visual appeal, user experience and functionality of an application.

For general recommendations on how to use images, please refer to our:

<div class="onyx-grid">
<link-card class="onyx-grid-span-4" headline="Image foundations" link="/introduction/foundation/images"></link-card>
</div>

## Examples

### Basic

The image component enforces high accessibility standards by e.g. requiring to define an alternative text as well as a width and height to prevent layout shifts. You can still define a custom size using CSS.

:component-example{name="Basic"}

### Light and dark mode

You can also define a different image for light and for dark mode which will automatically be displayed depending on the current theme.

:component-example{name="LightDark"}

### Shapes

The image supports multiple common shapes / border styles.

<steps>

::step
#headline
Rounded

#default
:component-example{name="Rounded"}
::

::step
#headline
Circle

#default
:component-example{name="Circle"}
::

::step
#headline
Clipped

#default
:component-example{name="Clipped" layout="fullWidth"}
::

</steps>

<br />

### Skeleton

The skeleton can be used on initial page load when the data for the page / image is initially loaded.

:component-example{name="Skeleton"}
