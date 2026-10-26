---
title: Flag
componentName: OnyxIcon
---

Flags visually represent countries or territories. While Onyx provides an official flag package, any SVG flag set can be used.

## Installation

Install the official flag package:

:npm-install-code-tabs{packages="@sit-onyx/flags"}

## Examples

Flags share the same rendering API as icons and are displayed via the [icon](/components/basic/icon) component.

### Sizes

Flags support standardized preset sizes. Setting size to `inline` scales the flag dynamically with surrounding font size:

<<< ./examples/Sizes.example.vue preview=true  layout="fullWidth"

### Country names

To display localized country names alongside flags, use JavaScript's native [Intl.DisplayNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames) API to avoid maintaining custom dictionary maps.

<<< ./examples/CountryName.example.vue preview=true

### Metadata

Each flag definition includes metadata (such as continent and ISO code) for search and grouping purposes.

<<< ./examples/Metadata.example.vue preview=true  layout="grow"

## Available flags

:flag-overview
