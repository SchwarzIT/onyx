---
title: Icon
componentName: OnyxIcon
---

Icons enhance visual communication and accessibility within the interface. We recommend using our official icons listed below but any SVG icon library is compatible with our design system.

## Installation

To use our official icon library, install it into your project first if not already done:

:npm-install-code-tabs{packages="@sit-onyx/icons"}

::info-card{headline="External icon libraries" color="warning"}
When using external icon libraries instead of our official one, you must ensure that the SVG content is safe to use since the SVG code is injected into the HTML of the icon component. When using untrusted or unsecure sources, your application might become insecure / affected by [Cross-site scripting (XSS)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS).
::

## Examples

### Sizes

To ensure a consistent look and usage across multiple pages and applications, the icon supports multiple pre-defined sizes. When set to `inline` instead of a fixed size, the icon will be sized automatically to the current text size which can be useful to align the icon with inline text.

:component-example{name="Sizes" layout="fullWidth"}

### Colors

Several colors are supported to highlight the semantic meaning of the icon. See our [color documentation](/introduction/foundation/colors#colors) for more information. If no color is set explicitly (default), the icon will use the current text color defined by the parent component.

:component-example{name="Colors" layout="fullWidth"}

### Metadata

We also include some metadata for each icon such as the category or alias names.

:component-example{name="Metadata" layout="grow"}

## Available icons

::info-card{headline="Coming Soon"}
We are currently working on this section of our showcase and will provide it soon! So make sure to check this page regularly.
::
