# Layout

Different layouts are the best way to focus the users attention and create hierarchy. On top a well chosen layout serves as a guiding hand for the user to work with the application. The best way to create both an attractive and accessible layout is to follow the principles below.

::: details Responsive
Layouts should be adaptive in their structure displayed on [multiple devices and screensizes](/basics/breakpoints_grid).
:::

::: details Clean
Using a [column grid](/basics/breakpoints_grid) for creating interfaces with onyx is not only mandatory but also the best way to build pixel perfect and adaptive layouts.
:::

::: details Content related
Whether implementing a sidebar for horizontan content structure or building a vertical only scrollable page, the layout always has to match the content - not the other way around. First think about how to structure the content and second put it in a fitting layout.
:::

## Anatomy

This section defines the anatomy of the whole page layout. If you want to learn more about the anatomy of single components in particular, please visit the [component documentation](/components).

In a maximum expression, a typical onyx layout consists of these regions.

![Logo](/assets/image_placeholder.png)

::: details 1. Main Navigation
Primary navigation to jump between major pages inside the application. In addition, global interactions can be placed here. This section always sticks to the top (alternatively to the left side) and is independend from scrolling.
:::

::: details 2. Side Navigation
Secondary navigation to jump between pages that are part of the master-detail-structure. In order to be a flexible object, secondary interactions and information can also be entered here. This section always sticks to the side of the screen and is independend from scrolling.
:::

::: details 3. Body
The main content is displayed here. This is totally fexible in its representantion and depends on the used grid and components. This section is the main scroll container of the interface.
:::

::: details 4. Confirmation
Global confirmations are triggered by a global section at the bottom of the screen. It is independend from scrolling and sticks to the bottom. This section can also be applied to objects.
:::

This is just an example layout for showing the posibilities of having several sections. It is important to be aligned to the [column grid](/basics/breakpoints_grid), that is provided by onyx. For more information about the components of main navigation, side navigation and confirmation, please visit the [component documentation](/components).

## Alignment

Column grids for the whole page layout are always `left aligned` by default. An `center aligned`version is possible alternatively. The alignemnt inside an object (component) is a different story.

::: warning
The layout of a component is **always** left aligned without any exception.
:::
