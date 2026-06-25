---
title: Pagination
componentName: OnyxPagination
---

Pagination can be used in cases where a lot of data exists that should not be shown or loaded all at once. The user can select a page for which data should be shown, e.g. inside a [data grid](/components/data/data-grid).

## Examples

### Select

The pagination supports different display types. The default "select" allows the user to either navigate using a previous/next button or jump to a specific page using a select which can optionally be disabled.

:component-example{name="Select"}

### Inline

The inline type is a more classic-style pagination. When using it, keep in mind that the component might not work ideally on small screen sizes.

:component-example{name="Inline"}

### Compact

A compact type of the pagination, ideally for small screen sizes. It supports a previous/next button and page select which can optionally be disabled.

For all pagination types, you can enable the `autoCompact` property which will automatically switch to the compact type when the available width is smaller than the specified [breakpoint](/introduction/foundation/breakpoints-and-grid#breakpoints).

:component-example{name="Compact"}

### Disabled

The pagination can be disabled to prevent the user to switch to another page. For types that include a page select (such as [select](#select) and [compact](#compact)), the select can be disabled individually if needed using the `disableFlyout` property.

:component-example{name="Disabled"}

### Skeleton

The skeleton can be used on initial page load when the data for the page / pagination is initially loaded.

:component-example{name="Skeleton"}
