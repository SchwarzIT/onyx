# Breakpoints and grid

Column grids in ui design and development establish a structured layout, organizing content, components and elements cohesively. They provide a framework for alignment and distribution, ensuring consistency and hierarchy. Additionally, grids serve as the foundation for smooth responsive behavior, allowing seamless adoption to different screen sizes and resolutions, ultimately enhancing usability and overall user experience.

To see the grid and breakpoints in action, feel free to have a look on the [grid playground](/exapmle).

## Understanding the grid

To understand the anatomy of a column grid, it is essential to comprehend its key components: margins, columns and gutters, which function harmoniously together. Visual examples and further details can be found below.

![description of grid units](/assets/grid-explanation.png)

::: details 1 Margins
Margins delineate the outer boundaries of the grid, providing spacing between the content and the edges of the interface. The margin has always a fixed value, that adopts to the breakpoint of the screen.
:::

::: details 2 Columns
Columns define the vertical divisions within the grid, organizing content into distinct sections. The value of the column unit is always flexible, what guarantees fluent sizing behavior of the content elements.
:::

::: details 3 Gutter
Gutters are the space between columns, ensuring adequate separation and consistent spacing between objects. The width of the gutter has always a fix value, that is defined by the breakpoint.
:::

## Columns

One of the key characteristics of columns is their flexibility in width, allowing them to adapt dynamically to the size of the screen. However, on smaller screens a condensed layout is achieved by utilizing fewer columns, where on the other side wider screens like desktop monitors increase the number of columns to make the most of the available space.
This adaptive approach ensures a continuously and consistent width of elements across different screen sizes. Moreover, as the number of columns increases on larger screens, additional virtual space is effectively gained. This expanded canvas provides designers and developers with more room to showcase content.

To maintain user's happiness with ultra-wide screens, such as 2k and above, consider a maximum width restriction on the grid, which obviously effects the content, as well.

::: warning Attention
These limits can be set to **1440px** or **1920px**, striking a balance between expansive screen usage and optimal content presentation.
:::

While these grid boundaries are optional, it is highly recommended to do so to guarantee readability.

The determination of the optimal number of columns is closely tied to the concept of the breakpoints, which define the points at which the layout of the ui responds to changes in screen size. The onyx [design and dev team](/brand/team) responsible for the fundamental guidelines established those breakpoints and grid implementations.

![description of breakpoints with all units included](/assets/breakpoints.png)

<!--@include: @/.vitepress/to-be-done.md-->
