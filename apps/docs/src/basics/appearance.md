# Appearance

A unit system helps to simplify the structure of components layouts. Employing a systematic approach to all units like margin, padding and radius leads to a more seamless, balanced and unified user experience. It not only establishes the groundwork for responsive design but also paves the way for a customizable UI density system. This, in turn, contributes to the overall improvement of all onyx product's quality and accessibility.

## 4px system

The onyx unit system is based on the value `4`, which is scaled by multiplication. This leads to a restricted set of values that guarantees a harmonious appearance. All of those values are described by [tokens](/tokens/), that can be used for building the interface.

::: tip REM
Although the unit system is based on pixel values, rem is used in development.
This is a **relative unit** that is based on the default font size of the web application (usually 16px).

For example, a value of `24px` would be defined as `1.5rem`.
The reason for using rem is to ensure the scalability of components and layouts, which leads to a smoother responsiveness.
:::

## Spacing

Spacing between elements or components are essential for creating visual hierarchy. A consistent use supports homogenous and visual appealing interfaces that work on all devices. Therefore, layout spacings and margins are pending on the [column grid](/basics/breakpoints_grid), that is based on the breakpoint or screen size.
For more information about your provided screendesign please contact your assigned XU-Designer.

### Spacing tokens

To use spacing tokens you have to use the [semantic token collection](/tokens/).
Those tokens are named like t-shirt sizes for easy usage. Use them for visual consistency.

| Token name |       REM | Pixels |
| ---------- | --------: | -----: |
| `none`     |     0 rem |   0 px |
| `3xs`      | 0.125 rem |   2 px |
| `2xs`      |  0.25 rem |   4 px |
| `xs`       |   0.5 rem |   8 px |
| `sm`       |     1 rem |  16 px |
| `md`       |   1.5 rem |  24 px |
| `lg`       |     2 rem |  32 px |
| `xl`       |     3 rem |  48 px |
| `2xl`      |     4 rem |  64 px |
| `3xl`      |     6 rem |  96 px |

## Radius

The choice of radius has a big impact to the whole appearance of an UI. With radius tokens it is easy to customize this visual basis.

::: warning Attention
The base value for radius that is used for components is `4 px`.

For examples, buttons are using this value. Sometimes buttons or other elements are used inside another component. This leads to a larger radius of the outside component to keep the visual appearance homogenous.
:::

### Radius tokens

To use radius tokens you have to use the [semantic token collection](/tokens/).
Those tokens are named like t-shirt sizes for easy usage.

| Token name |       REM |  Pixels |
| ---------- | --------: | ------: |
| `none`     |     0 rem |    0 px |
| `xs`       | 0.125 rem |    2 px |
| `sm`       |  0.25 rem |    4 px |
| `md`       |   0.5 rem |    8 px |
| `lg`       |     1 rem |   16 px |
| `xl`       |     2 rem |   32 px |
| `full`     |  62.5 rem | 1000 px |
