---
title: Data grid
componentName: OnyxDataGrid
---

A highly customizable and modular table for displaying complex datasets. The data grid supports features like sorting, filtering, grouping columns and rows and much more, giving both developers and users extensive control.

## Data grid vs. table

We recommend to use the data grid in most cases since it supports advanced built-in features. The [table](/components/data/table) component is a simple styled wrapper for the HTML [\<table\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table) element without additional features. The table can be used in rare edge cases where maximum flexibility and customization is required or where the data grid overhead is unwanted.

If you are unsure which component to use or there is no reasonable explicit requirement for the table, use the data grid.

## Examples

### Basic

A very basic data grid contains one or multiple columns and a set of data to display in rows. Each column has a type that defines how the value is displayed. See the [available column types](#column-types) below.

:component-example{name="Basic" layout="fullWidth"}

### Column types

<!-- TODO: update custom feature link -->
The data grid supports several column data types out-of-the-box that will display the data accordingly and also integrate with e.g. the [sorting](#sorting) or [filtering](#filtering) feature. To implement custom column types, see the [custom feature section](#build-a-custom-feature) below.

<steps>

::step
#headline
String / Text <onyx-tag label="Default" />

#default
Displays the value as text and is the default type for all columns.

:component-example{name="ColumnTypeString" layout="grow"}
::

::step
#headline
Number

#default
Displays the value as formatter number depending on the current application language. Optionally, a custom format can be defined using [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

:component-example{name="ColumnTypeNumber" layout="grow"}
::

::step
#headline
Date & Time

#default
Multiple column types are supported to display date, datetime, time and timestamp depending on the current application language. Optionally, a custom format can be defined using [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

:component-example{name="ColumnTypeDate" layout="fullWidth"}
::

::step
#headline
Select

#default
<!-- TODO: change link -->
The select type allows the developer to define a set of available options where the corresponding text is displayed depending on the value. This is particularly useful when the value is technically an enum but a user-friendly translated label should be shown. When used in combination with the [editing](#editing) feature, the user can change the value based on the pre-defined list of options.

:component-example{name="ColumnTypeSelect" layout="grow"}
::

::step
#headline
Fallback text

#default
For every column, a fallback text is shown when the cell is empty. By default, "-" is used but a custom text can be defined if needed.

:component-example{name="ColumnTypeFallback" layout="grow"}
::

</steps>

### Skeleton

The skeleton should be used on initial page load when the data for the page / data grid is initially loaded.

:component-example{name="Skeleton" layout="fullWidth"}

### Grouped columns

Column groups can be used to visually group columns that are related.

:component-example{name="ColumnGroups" layout="fullWidth"}

## Features

Data grid features are re-usable pieces of code that extend the functionality of the data grid using a unified API. We support several advanced features out-of-the-box for common use cases such as sorting, filtering, pagination and more. See the [custom feature](#build-a-custom-feature) section below for how you can build your own feature.

In fact, every internal functionality of the data grid such as the different [column types](#column-types) is build using a feature.

### Sorting

Allows the user to sort the rows by a specific column. The developer can optionally define an initial sorting, customize the sorting logic and disabled/enabled sorting for specific columns. For [built-in column types](#column-types), the sorting logic is correctly defined by default. For custom types, make sure to define a custom sorting function if alphabetical sorting is not sufficient.

<steps>

::step
#headline
Internal

#default
The data is sorted internally by default considering all available data.

:component-example{name="Sorting" layout="fullWidth"}
::

::step
#headline
Async

#default
Alternatively, the sorting can be done asynchronously by an external service, e.g. by a backend or API so the data grid does not sort the data itself. Important: Set the `async` property on the data grid to disable the internal data transformations.

:component-example{name="SortingAsync" layout="fullWidth"}
::

</steps>

### Filtering / Search

Allows the user to filter / search a column. The developer can optionally customize the filter logic and disabled/enabled filtering for specific columns.

<steps>

::step
#headline
Internal

#default
The data is filtered internally by default considering all available data.

:component-example{name="Filtering" layout="fullWidth"}
::

::step
#headline
Async

#default
Alternatively, the filtering can be done asynchronously by an external service, e.g. by a backend or API so the data grid does not filter the data itself. Important: Set the `async` property on the data grid to disable the internal data transformations.

:component-example{name="FilteringAsync" layout="fullWidth"}
::

</steps>

### Pagination

Use pagination to handle data grids where a lot of data is available which would be too much to show it all at once to optimize performance. Different pagination modes are supported as described below. Each pagination mode also supports a select where the user can select how many items per page should be displayed.

<steps>

::step
#headline
Select <onyx-tag label="Default" />

#default
The select type uses our [pagination](/components/data/pagination) component to show a page select on the bottom right.

:component-example{name="Pagination" layout="fullWidth"}
::

::step
#headline
Lazy loading

#default
With lazy loading, more data is automatically displayed when the user scrolls to the end of the data grid. You **must** set a maximum height when using lazy loading.

:component-example{name="PaginationLazy" layout="fullWidth"}
::

::step
#headline
Button loading

#default
Button loading is similar to lazy loading but requires the user to manually click a load more button to load the next page of data. We strongly recommended to set a maximum height since the data grid can get very long when loading many pages.

:component-example{name="PaginationButton" layout="fullWidth"}
::

::step
#headline
Async

#default
Alternatively, the pagination can be done asynchronously by an external service, e.g. by a backend or API. This is especially useful for performance optimization when not all available data should be loaded at once. Async pagination is compatible with all modes mentioned above. Important: Set the `async` property on the data grid to disable the internal data transformations.

:component-example{name="PaginationAsync" layout="fullWidth"}
::

</steps>

## Build a custom feature

::info-card{headline="Coming Soon"}
This part of the documentation will be available soon.
::
