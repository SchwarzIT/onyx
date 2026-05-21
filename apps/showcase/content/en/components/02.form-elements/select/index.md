---
title: Select
componentName: OnyxSelect
---

The select is a fundamental element utilized across various components such as dropdowns, navigation bars, pagination, tables, etc. It provides the users with the ability to open a small modal window, facilitating single or multi-selection based on the context in which it is employed.

## Examples

### Basic

A single value can be selected out of all available options by default.

:component-example{name="Basic" layout="grow"}

### Multiple

The select also supports selecting multiple values. A "Select all" option can optionally be displayed to allow the user to select all available options with a single action.

<steps>

::step
#headline
Text mode

#default
Different modes are supported for displaying the selected values: A summary (default) that just shows the number of selected options and a preview mode that shows the labels of all selected options. For full flexibility, the `valueLabel` property can be used to define a custom value to be displayed for the current selection.
::

::step
#headline
Selection order

#default
Selected options are automatically sorted first after selecting, closing and re-opening the flyout. You can disable this behavior using the `keepSelectionOrder` property so the options keep their original order.
::

</steps>

:component-example{name="Multiple" layout="grow" orientation="vertical"}

### Search

An additional search input can be enabled to support filtering the options. The search is automatically cleared when the flyout closes. If needed, you can access or change the current search term by binding the `v-model:search-term` property.

When used in combination with multiselect and the "Select all" option, an additional "Select filtered" option is supported to select all options that are matching the current search term.

<steps>

::step
#headline
Default search

#default
The default search logic filters the options based on their label (not case-sensitive).

:component-example{name="Search" layout="grow"}
::

::step
#headline
Custom search logic

#default
For full flexibility, the internal default search logic can be disabled so you can filter the options manually. Since the passed options only include the filtered options with this approach, it is **mandatory** that you manage the `valueLabel` property yourself so that the current selection is still displayed, even if it is currently not included in the filtered options.

:component-example{name="CustomSearch" layout="grow"}
::

</steps>

<br />

### Load more options

When working with very large data sets or backend-provided data, it might be desired to only load a few options initially and then load more options on demand to optimize performance.

The select supports multiple ways of pagination / loading more options depending on the use case:

<steps>

::step
#headline
Lazy loading

#default
With lazy loading, more options are loaded automatically when the user scrolls to the end of the list. You can optionally define a scroll offset to trigger the lazy loading earlier, e.g. when scrolling to the third last option.

:component-example{name="LazyLoading" layout="grow"}
::

::step
#headline
Load more button

#default
Using a load more button is similar to lazy loading but instead of automatically loading more options, the user needs to manually click on a button.

:component-example{name="ButtonLoading" layout="grow"}
::

::step
#headline
Async search

#default
TODO:
::

</steps>

<br />

### Readonly & Disabled

Readonly and disabled are used to indicate that the select is currently not editable.

:component-example{name="Readonly" layout="grow"}

### Loading & Skeleton

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. On the other hand, the skeleton should be used on initial page load when the data for the page/select is initially loaded.

:component-example{name="Loading" layout="grow"}

### Message

An optional message, error or success message can be displayed. Each message supports showing an info tooltip with further information.
When multiple message types are defined at once, only the most relevant will be displayed (e.g. error is preferred over the regular message).

:component-example{name="Message" layout="grow" orientation="vertical"}

### Slots

Multiple slots are supported to pass in custom content if needed.

:component-example{name="Slots" layout="grow"}

### Label positions

The select label can be positioned in several ways to support a wide variety of layouts.

:component-example{name="LabelPositions" layout="grow" orientation="vertical"}
