---
outline: [2, 3]
---

# Grid System

The grid implementation in **onyx** differs from other design system implementations that you might know.
Instead of having a fixed 12 column grid, we have a dynamic grid with 4, 8, 12, 16 and optionally 20 columns.
The amount of columns differs based on the active breakpoint.
You can find a detailed description of the system in the [design system docs](/basics/breakpoints-grid).

::: details Advantages of the dynamic grid
The dynamic grid has the following advantages over a fixed column grid:

- Elements in the grid are wrapped on smaller breakpoints per default
- Single Elements keep their approximate size over multiple breakpoints per default
- Ensures reasonable minimal and maximal size for individual elements
  :::

Grid elements span the number of columns that is assigned to them.
If there are less columns available than an element is assigned, it will span all columns of the row.

Additionally, an element can also be configured to span a specific amount of columns for a minimum breakpoint.
To learn about the grid breakpoints, please refer to the [design system docs](/basics/breakpoints-grid#breakpoints).
Multiple span definitions can then be combined to resize an element based on the breakpoint.

::: tip Grid playground
If you want to get familiar with how the grid works, you can use our [grid playground](https://storybook.onyx.schwarz/?path=/story/examples-gridplayground--default).
:::

## Examples

::: code-group

```html [Default]
<main class="onyx-grid-container">
  <OnyxHeadline is="h1">Page headline</OnyxHeadline>

  <form class="onyx-grid">
    <OnyxInput class="onyx-grid-span-4" label="Input 1" />
    <OnyxInput class="onyx-grid-span-4" label="Input 2" />
    <OnyxButton class="onyx-grid-span-16" label="Submit" type="submit" />
  </form>
</main>
```

```html [With max width]
<div class="onyx-grid-max-md onyx-grid-center">
  <OnyxNavBar app-name="Example" />

  <main class="onyx-grid-container">
    <OnyxHeadline is="h1">Page headline</OnyxHeadline>

    <form class="onyx-grid">
      <OnyxInput class="onyx-grid-span-4" label="Input 1" />
      <OnyxInput class="onyx-grid-span-4" label="Input 2" />
      <OnyxButton class="onyx-grid-span-16" label="Submit" type="submit" />
    </form>
  </main>
</div>
```

:::

## Usage

The grid is configured via specific CSS classes which you can find below.

### Page padding and max width

Use the `onyx-grid-container` class to set up the main page padding. Should be typically be set on the root component of every page.

Optionally, you can configure to limit the page content width at a specific breakpoint. This can help to maintain some white space for larger screens so the content does not take up e.g. the whole 4k screen width. To do so, set the following class on the very top element of your application:

- `onyx-grid-max-md`: Limits the width before the `lg` breakpoint (`1440px`)
- `onyx-grid-max-lg`: Limits the width before the `xl` breakpoint (`1920px`)
- `onyx-grid-center`: Centers the page content when it has a max defined. By default it is left aligned.

::: info
The `onyx-grid-max-<breakpoint>` and `onyx-grid-center` classes must be set on the very top app level because some onyx components like the `OnyxNavBar` align with the grid to e.g. automatically set the max width also for the nav bar to match the page content width.
:::

### Apply grid

To apply the grid to a specific component, set the `onyx-grid` class.
The number of columns depends on the current breakpoint.

For components inside the grid, you can set the `onyx-grid-span-<number>` class to specify how many columns the component should span where `<number>` is between `1` and `20`.

**Note**: Columns 13-20 are only available if you set the `onyx-grid-lg-16` or `onyx-grid-xl-20` on the grid and their respective breakpoint is reached (useful for 4k screens).

#### Full-width grid elements

To reserve a complete row for a single grid element, the `onyx-grid-span-full` class can be used.
An element with this class will always span from the first to the last column.

#### Responsive grid elements

You can also set the column span depending on a minimum breakpoint width by setting the `onyx-grid-<breakpoint>-span-<number>` class where `<breakpoint>` and `<number>` are taken from the following table:

::: details Columns per breakpoint

| breakpoint | max columns            |
| ---------- | ---------------------- |
| 2xs        | 4                      |
| xs         | 8                      |
| sm         | 8                      |
| md         | 12                     |
| lg         | 12 (optional 16)       |
| xl         | 12 (optional 16 or 20) |

:::

Multiple classes can be combined as necessary.
