---
title: Table
componentName: OnyxTable
---

A lightweight component for displaying smaller, structured datasets.

::info-card{headline="Data grid vs. table" color="warning"}
For complex datasets requiring sorting, filtering, or advanced actions, use [OnyxDataGrid](/components/data/data-grid) instead. See the data grid documentation for a feature comparison.
::

## Examples

### Basic

A standard table displays rows across predefined columns. Headers are optional, and cell contents can be customized with template slots.

<<< ./examples/Basic.example.vue preview=true  layout="fullWidth"

### Striped

Alternating row backgrounds can be enabled to improve readability in dense tables.

<<< ./examples/Striped.example.vue preview=true  layout="fullWidth"

### Vertical borders

Vertical dividing borders can be added to clearly distinguish adjacent columns.

<<< ./examples/VerticalBorders.example.vue preview=true  layout="fullWidth"

### Slots

The table provides slots around its core layout for elements like headlines, toolbar actions, or pagination controls.

<<< ./examples/Slots.example.vue preview=true  layout="fullWidth"

### Column groups

Headers can be merged into column groups to represent hierarchical data relationships.

<<< ./examples/ColumnGroups.example.vue preview=true  layout="fullWidth"
