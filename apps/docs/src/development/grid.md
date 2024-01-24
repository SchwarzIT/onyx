# Grid System

::: warning Work in progress / Active development
This library is currently in early / active development.
:::

The grid implementation in **onyx** differs from more popular grid system implementation, that you might know.
Instead of having a fixed 12 column grid, we have a dynamic grid with 4, 8, 12, 16 and optionally 20 columns.
The amount of columns differs based on the active breakpoint.
You can find a detailed description of the system in the [design system docs]() (TODO: Add link to grid UX definition).

::: info
The dynamic grid has the following advantages over a fixed column grid:

- Elements in the grid are wrapped on smaller breakpoints per default
- Single Elements keep their approximate size over multiple breakpoints per default
- Ensures reasonable minimal and maximal size for individual elements
  :::

## Usage

The grid layout is configured via the following classes. They must be set on the main element of your application.

- `onyx-grid`: Sets up the Grid wrapper, which configures the grid layout depending on the breakpoint. Should be set on the main element of an application.

Additionally there are some optional modifier classes available.

- `onyx-grid-xl-20`: Increases the column count from 16 to 20 for the `xl` breakpoint.
- `onyx-grid-max-md`: Caps the width before the `lg` breakpoint
- `onyx-grid-max-lg`: Caps the width before the `xl` breakpoint
