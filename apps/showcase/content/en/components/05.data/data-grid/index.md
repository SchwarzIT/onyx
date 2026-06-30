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

:component-example{name="Basic" layout="grow"}

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
Link

#default
Allows to display links to other pages or applications. Optionally support to define a custom display label.

:component-example{name="ColumnTypeLink" layout="grow"}
::

::step
#headline
Fallback text

#default
For every column, a fallback text is shown when the cell is empty. By default, "-" is used but a custom text can be defined if needed.

:component-example{name="ColumnTypeFallback" layout="grow"}
::

::step
#headline
Custom types

#default
Custom column types can be implemented for full flexibility on how the data is displayed. See the [custom feature section](#type-renderer-column-types) for further information.
::

</steps>

### Column width

All columns are equally sized by default. The width of every column can be adjusted if needed using any valid value accepted by [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns). So the column can e.g. have a fixed width using a static value like `4rem`, a flexible value like `1fr` or `max-content` or a minimum and maximum width using use the [minmax](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax) function.

:component-example{name="ColumnWidth" layout="fullWidth"}

### Skeleton

The skeleton should be used on initial page load when the data for the page / data grid is initially loaded.

:component-example{name="Skeleton" layout="grow"}

### Grouped columns

Column groups can be used to visually group columns that are related.

:component-example{name="ColumnGroups" layout="grow"}

### Global actions

Global actions allow the user to trigger custom actions for the data that are placed at the top right of the data grid. Examples use cases are edit, save, share or share actions. Actions can be displayed as text or icon buttons and can optionally be visually grouped. The actions automatically collapse into a [flyout menu](/components/basic/flyout-menu) if the available width is too small.

Actions are defined using a custom feature. See the [custom feature](#build-a-custom-feature) section below for further information.

:component-example{name="GlobalActions" layout="grow"}

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

:component-example{name="SortingAsync" layout="grow"}
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

:component-example{name="Filtering" layout="grow"}
::

::step
#headline
Async

#default
Alternatively, the filtering can be done asynchronously by an external service, e.g. by a backend or API so the data grid does not filter the data itself. Important: Set the `async` property on the data grid to disable the internal data transformations.

:component-example{name="FilteringAsync" layout="grow"}
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

:component-example{name="Pagination" layout="grow"}
::

::step
#headline
Lazy loading

#default
With lazy loading, more data is automatically displayed when the user scrolls to the end of the data grid. You **must** set a maximum height when using lazy loading.

:component-example{name="PaginationLazy" layout="grow"}
::

::step
#headline
Button loading

#default
Button loading is similar to lazy loading but requires the user to manually click a load more button to load the next page of data.

:component-example{name="PaginationButton" layout="grow"}
::

::step
#headline
Async

#default
Alternatively, the pagination can be done asynchronously by an external service, e.g. by a backend or API. This is especially useful for performance optimization when not all available data should be loaded at once. Async pagination is compatible with all modes mentioned above. Important: Set the `async` property on the data grid to disable the internal data transformations.

:component-example{name="PaginationAsync" layout="grow"}
::

</steps>

### Editing

Allows the user to edit the data. Multiple editing modes are supported depending on the requirements. For [built-in column types](#column-types), a corresponding edit component is used automatically.

Some examples below use custom features, see the [custom feature section](#build-a-custom-feature) for further information.

<steps>

::step
#headline
Manual

#default
All rows are editable at once and the rows do not switch between display and edit mode automatically. You have full control over how the editing is enabled, saved, cancelled etc. In this example we use custom buttons but you can also use auto-save or custom logic.

:component-example{name="EditingInline" layout="fullWidth"}
::

</steps>

### Sticky columns

One or multiple columns can be made sticky on the left or right side of the data grid. We strongly recommend to use sticky columns sparely since they can block the whole data grid on smaller devices.

<p style="color: var(--onyx-color-text-icons-info-intense)">Scroll the data grid horizontally below to see the sticky columns in action.</p>

:component-example{name="StickyColumns" layout="grow"}

### Selection

Allows the user to select multiple rows. When dealing with large data sets that use pagination or filters, a standard "Select all" button doesn't always work because many rows are hidden from the view. To solve this, the data grid **automatically switches** between two selection modes.

The data grid tracks the selection using a "contingent" - which is simply the specific list of rows the user has manually interacted with. How the selection behaves, depends on the mode:

<steps>

::step
#headline
Include mode <onyx-tag label="Default" />

#default
Only the rows that the user explicitly checked are included. The "contingent" is the list of checked rows.
::

::step
#headline
Exclude mode

#default
When checking the "Select all" checkbox in the column header, the data grid automatically switches to the "exclude" mode. It assumes the user wants to select _every single row_ in the entire dataset (even the ones on other pages). Everything **except** the rows the user manually unchecks is selected. The "contingent" becomes the "blacklist" of unchecked rows.

  ::info-card{headline="Important note for developers"}
  The data grid only stores the rows that the user unchecked. You need to write custom logic to calculate the final list of selected rows based on your project's specific requirements.
  ::
::

</steps>

:component-example{name="Selection" layout="grow"}

The checkboxes can optionally be only shown on hover.

### Resizing

Allows the user to manually change the width of columns by dragging the right border of the column header. Double clicking the right border adjusts the size to the content width.

To ensure the overall table size does not shrink, an empty filler column is added to the right if the columns do not take up the full width.

:component-example{name="Resizing" layout="grow"}

### Hide columns

Allows the user to hide or show columns. Can also be used by the developer to hide specific columns by default that the user can show manually if needed.

:component-example{name="HideColumns" layout="grow"}

### Expandable rows

Allows to expand additional content for each row. We do **NOT recommend** to show nested tables inside the expanded rows, prefer using e.g. a [modal](/components/feedback/modal) instead if needed.

:component-example{name="ExpandableRows" layout="grow"}

## Build a custom feature

Features are the fundamental building blocks that power the data grid. They are used internally to implement core data grid functionality and build-in features but can also be used to extend the data grid with custom functionality. This means that **every functionality** available for the data grid, can be implemented/used within a feature.

Using features has powerful benefits:

<steps>

::step
#headline
Compatibility

#default
Since features use a uniform and consistent API, multiple features are compatible with each other, ensuring that e.g. filtering and sorting is supported even when displaying the data with custom components.
::

::step
#headline
Reusability

#default
Data grid features are reusable by design which allows to share them across the application, team or beyond.
::

</steps>

This section will cover how to build a custom re-usable data grid feature. For build-in features, see the [feature examples](#features) above.

### Basic structure

Create a new feature by using the `createFeature()` utility.

<steps>

::step
#headline
Without options

#default
If the feature does not need any options to e.g. customize how the feature behaves, define the feature like this:

```ts [Basic feature]
import { createFeature } from "sit-onyx";

const withMyFeature = createFeature(() => ({
  name: Symbol("myFeature"),
}));
```

::

::step
#headline
With options

#default
To support custom feature options to customize its behavior and make it more flexible when re-used for several use-cases, return the feature from a custom function that accepts the feature options:

```ts [Reusable feature]
import { createFeature } from "sit-onyx";
import type { MaybeRef } from "vue";

export type MyFeatureOptions = {
  someOption?: MaybeRef<boolean | undefined>;
};

const useMyFeature = (options?: MyFeatureOptions) =>
  createFeature(() => {
    // e.g. use the options here...

    return {
      name: Symbol("myFeature"),
    };
  });

// usage:
// const withMyFeature = useMyFeature({ someOption: true });
```

::

</steps>

### Type renderer / Column types

Type renderers are used to define how a cell should visually be rendered/displayed. While several [build-in column types](#column-types) are supported, custom types can be used for use-case specific requirements. For specific types that are only needed for a single data grid, we recommend to place the feature with the data grid component. For generic / re-usable types, move the feature to a dedicated .ts file so it can be re-used by other data grids.

Type renderers use Vue render functions (`h` function). If you are not familiar with this syntax, please refer to the [Vue documentation](https://vuejs.org/guide/extras/render-function).

<steps>

::step
#headline
Simple type

#default
A simple custom type renders the value in a fixed way, e.g. by adding a copy button to copy the cell content.

:component-example{name="TypeRenderer" layout="grow"}
::

::step
#headline
Data-specific type

#default
A column type for a cell can access the full row data. This can be useful to create a custom column type that is very specific for a cell and is not reusable since it is strictly bound to the data shape of the specific data grid. The example below adds an email link to the name.

:component-example{name="TypeRendererEntry" layout="grow"}
::

::step
#headline
Re-usable type with options

#default
Options can be defined for a custom column type that can then be set per data grid to customize how the column type is rendered. This is especially useful for re-usable types that are used across multiple data grids. The following examples defines a "tag" column type that can be used in multiple data grids but can be customized via options to change the tag properties (color, icon etc.) based on the row data.

:component-example{name="TypeRendererOptions" layout="grow"}
::

</steps>

### Modify columns

Columns can be modified within a feature to e.g. add additional columns or edit/remove existing ones. You can optionally define an `order` when the modification is executed in cases where it should be executed before or after other features (the higher the order, the earlier it is applied).

In the example below, a new columns is added automatically combined with a [custom column type](#type-renderer-column-types) to display row actions.

:component-example{name="ModifyColumns" layout="grow"}

### Modify rows

Rows can be modified within a feature to e.g. add additional rows or edit/remove existing ones. You can optionally define an `order` when the modification is executed in cases where it should be executed before or after other features (the higher the order, the earlier it is applied).

You can also add additional row options such as `<tr>` attributes which are useful for adding event/click handlers, class for changing styles etc.

:component-example{name="ModifyRows" layout="grow"}
