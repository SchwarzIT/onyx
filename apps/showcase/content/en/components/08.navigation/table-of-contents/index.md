---
title: Table Of Contents
componentName: OnyxTableOfContents
---

The table of contents component is used to display a list of sections/headings in a page with links to the corresponding sections.

## Examples

### Basic

The table of contents should be on the right of the content with a minimum width of `8rem` and a maximum width of `15rem`. It should also use `position: fixed`, so it does not scroll with the page content. The links are highlighted as active automatically based on the current link and scroll position (requires [headline](/components/navigation/headline) components inside the page content with a matching [hash](/components/navigation/headline#hash) property).

:component-example{name="Basic" layout="fullWidth"}

### Skeleton

Use the skeleton on initial page load while the data for the table of contents is loading. Can be set on either the whole table of contents or only individual items.

:component-example{name="Skeleton" layout="grow"}
