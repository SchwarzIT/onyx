# Units

A unit system helps to simplify the structure of components layouts. Employing a systematic approach to all units like margin, padding and border radius leads to a more seamless, balanced and unified user experience. It not only establishes the groundwork for responsive design but also paves the way for a customizable UI density system. This, in turn, contributes to the overall improvement of all onyx product's quality and accessibility.

## 4px system

The onyx unit system is based on the value `4`, which is scaled by multiplication. This leads to a restricted set of values that guarantees a harmonious appearance. All of those values are described by [variables](/variables/introduction), that can be used for building the interface.

::: tip rem
Although the unit system is based on pixel values, rem is used in development.
This is a **relative unit** that is based on the default font size of the web application (usually 16px).

For example, a value of `24px` would be defined as `1.5rem`.
The reason for using rem is to ensure the scalability of components and layouts, which leads to a smoother responsiveness.
:::

## Spacing

Spacing between elements or components are essential for creating visual hierarchy. A consistent use supports homogenous and visual appealing interfaces that work on all devices. Therefore, layout spacings and margins are pending on the [column grid](/basics/breakpoints-grid), that is based on the breakpoint or screen size.
For more information about your provided screen design please contact your assigned XU-Designer.

### Spacing variables

To use spacing variables you have to use the [semantic variable collection](/variables/spacings).
Those variables are named like t-shirt sizes for easy usage. Use them for visual consistency.

| Variable name |      rem | Pixels |
| ------------- | -------: | -----: |
| `5xs`         | 0.125rem |    2px |
| `4xs`         |  0.25rem |    4px |
| `3xs`         | 0.375rem |    6px |
| `2xs`         |   0.5rem |    8px |
| `xs`          | 0.625rem |   10px |
| `sm`          |  0.75rem |   12px |
| `md`          |     1rem |   16px |
| `lg`          |   1.5rem |   24px |
| `xl`          |     2rem |   32px |
| `2xl`         |     3rem |   48px |
| `3xl`         |     4rem |   64px |
| `4xl`         |     6rem |   96px |

## Border radius

The choice of border radius has a big impact to the whole appearance of an UI. With border radius variables it is easy to customize this visual basis.

::: warning Attention
The base value for border radius that is used for components is `4px`.

For example, buttons are using this value. Sometimes buttons or other elements are used inside another component. This leads to a larger border radius of the outside component to keep the visual appearance homogenous.
:::

### Border radius variables

To use border radius variables you have to use the [semantic variable collection](/variables/borders).
Those variables are named like t-shirt sizes for easy usage.

| Variable name |      rem | Pixels |
| ------------- | -------: | -----: |
| `xs`          | 0.125rem |    2px |
| `sm`          |  0.25rem |    4px |
| `md`          |   0.5rem |    8px |
| `lg`          |     1rem |   16px |
| `xl`          |     2rem |   32px |
| `full`        |  62.5rem | 1000px |
