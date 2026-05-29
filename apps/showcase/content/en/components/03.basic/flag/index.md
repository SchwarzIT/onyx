---
title: Flag
componentName: OnyxIcon
---

Flags are used to visually display a country. We recommend using our official flags listed below but any SVG flag library is compatible with our design system.

## Installation

To use our official flag library, install it into your project first:

:npm-install-code-tabs{packages="@sit-onyx/flags"}

::info-card{headline="External flag libraries" color="warning"}
When using external flag libraries instead of our official one, you must ensure that the SVG content is safe to use since the SVG code is injected into the HTML of the icon component. When using untrusted or unsecure sources, your application might become insecure / affected by [Cross-site scripting (XSS)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS).
::

## Examples

Technically, flags are used the exact same way as icons and are also displayed using the icon component. For more information, please refer to the [icon](/components/basic/icon) component.

### Sizes

To ensure a consistent look and usage across multiple pages and applications, the flag supports multiple pre-defined sizes. When set to `inline` instead of a fixed size, the flag will be sized automatically to the current text size which can be useful to align the flag with inline text.

:component-example{name="Sizes" layout="fullWidth"}

### Country names

For certain use cases, it might be required to also display the country name. The country names can easily be received in many languages using JavaScript's native [Intl.DisplayNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames) API so they don't have to be translated manually.

:component-example{name="CountryName"}

### Metadata

We also include some metadata for each flag / country such as the continent name.

:component-example{name="Metadata" layout="grow"}

## Available flags

::info-card{headline="Coming Soon"}
We are currently working on this section of our showcase and will provide it soon! So make sure to check this page regularly.
::
