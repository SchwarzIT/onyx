# Grid System

::: warning Work in progress / Active development
This library is currently in early / active development.
:::

The grid implementation in **onyx** differs from other design system implementations that you might know.
Instead of having a fixed 12 column grid, we have a dynamic grid with 4, 8, 12, 16 and optionally 20 columns.
The amount of columns differs based on the active breakpoint.
You can find a detailed description of the system in the design system docs (TODO: Add link to grid UX definition).

::: info
The dynamic grid has the following advantages over a fixed column grid:

- Elements in the grid are wrapped on smaller breakpoints per default
- Single Elements keep their approximate size over multiple breakpoints per default
- Ensures reasonable minimal and maximal size for individual elements

:::

Grid elements span the number of columns that is assigned to them.
If there are less columns available than an element is assigned, it will span all columns of the row.

Additionally, an element can also be configured to span a specific amount of columns for a minimum breakpoint (TODO: Add link to breakpoint UX definition).
Multiple span definitions can then be combined to resize an element based on the breakpoint.

## Usage

The grid layout is configured via the following CSS classes which must be set on the main element of your application.

- `onyx-grid`: Sets up the grid wrapper which configures the grid layout depending on the breakpoint. Should be set on the main element of the application.

Additionally, there are some optional modifier classes available.

- `onyx-grid-xl-20`: Increases the column count from 16 to 20 for the `xl` breakpoint (useful for 4k screens).
- `onyx-grid-max-md`: Caps the width before the `lg` breakpoint (`1440px`)
- `onyx-grid-max-lg`: Caps the width before the `xl` breakpoint (`1920px`)

For configuring the amount of columns an element should be spanning, use the class `onyx-grid-span-<number>`, where `<number>` is the number of columns from `1` to `20`.

To set the amount of columns for a minimum screen width, use the class `onyx-grid-<breakpoint>-span-<number>`, where `<breakpoint>` and `<number>` are taken from the following table:

| breakpoint | max number |
| ---------- | ---------- |
| 2xs        | 4          |
| xs         | 8          |
| sm         | 8          |
| md         | 12         |
| lg         | 16         |
| xl         | 16 or 20   |

The `onyx-grid-span` classes can be combined as necessary.

### Example

E.g. `class="onyx-grid-span-6 onyx-grid-md-span-8 onyx-grid-lg-span-12"` would result in the following element sizes:

| breakpoint | spanning n columns | relevant class       |
| ---------- | ------------------ | -------------------- |
| 2xs        | 4                  | onyx-grid-span-6     |
| xs         | 6                  | onyx-grid-span-6     |
| sm         | 6                  | onyx-grid-span-6     |
| md         | 8                  | onyx-grid-md-span-8  |
| lg         | 12                 | onyx-grid-lg-span-12 |
| xl         | 12                 | onyx-grid-lg-span-12 |
