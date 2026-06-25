---
title: Table
componentName: OnyxTable
---

A streamlined way to display smaller data sets. The table component focuses on simplicity, making it easy for users to view and interact with data without overwhelming them.

::info-card{headline="Data grid vs. table" color="warning"}
For most cases, we recommend to use the data grid instead. Please refer to the [data grid documentation](/components/data/table) for further information when to use the data grid and the table.
::

## Examples

### Basic

A basic table displays rows in a pre-defined set of columns. The table header is optional. The cell content is fully customizable.

:component-example{name="Basic" layout="fullWidth"}

### Striped

Striped rows can be enabled where every even row has a different background color.

:component-example{name="Striped" layout="fullWidth"}

### Vertical borders

Use vertical borders to separate the columns more clearly and achieve a grid look.

:component-example{name="VerticalBorders" layout="fullWidth"}

### Slots

The table supports four custom slots around the main table to add custom content such as headline, actions or pagination.

:component-example{name="Slots" layout="fullWidth"}

### Column groups

Columns can be grouped to visually group related columns.

:component-example{name="ColumnGroups" layout="fullWidth"}
