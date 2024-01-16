# Typography

::: danger
Still content to create!
:::

The onyx font system includes three different font families that can be used througout your application, pending on the usecase. It contains several headline styles as well as paragraph styles and mono space styles.

::: info
The font families that can be used with onyx are:

- [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3)
- [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro?query=source)
- [Lidl Font Pro](https://www.brand.lidl/brandelements/brandelements/view/id/664#headline_2486)
- [Kaufland Regular](https://google.com)
  :::

## Brand Typography

The standard font family is defined to be the Source Sans. If you are creating a new onyx project, this will always be the startingpoint. In the initial phase the Source Sans applies to all color themes that are provided by onyx.

In case you are working on a Kaufland application or Lidl application, you are free to switch into the brand font families of Kaufland Regular or Lidl Font Pro.

::: warning Attention
Please note that only the `Kaufland Regular` may be implemented in the Kaufland theme and only the `Lidl Font Pro` in the Lidl theme!

For all the other color themes, `Source Sans` remains the font of choise!
:::

### How to import

To import Kaufland Regular and Lidl Font Pro follow the steps below.

::: code-group

```txt [Kaufland Regular]
Lorem Ipsum
```

```txt [Lidl Font Pro]
Lorem Ipsum
```

:::

## Font stacks

_custom component for displaying font definitions_

### Headlines

::: details h1

This is the page title. It can only be used once per page at the very top.

#### Details

| Property            |          Value |
| ------------------- | -------------: |
| `weight`            | SemiBold - 600 |
| `size`              |          28 px |
| `line height`       |          40 px |
| `letter spacing`    |           0 px |
| `text decoration`   |           none |
| `paragraph spacing` |           0 px |
| `case`              |       original |

:::

::: details h2

Used for section titles and navigation in the navbar.

#### Details

| Property            |          Value |
| ------------------- | -------------: |
| `weight`            | SemiBold - 600 |
| `size`              |          20 px |
| `line height`       |          28 px |
| `letter spacing`    |           0 px |
| `text decoration`   |           none |
| `paragraph spacing` |           0 px |
| `case`              |       original |

:::

::: details h3

Used for element headlines and buttons.

#### Details

| Property            |          Value |
| ------------------- | -------------: |
| `weight`            | SemiBold - 600 |
| `size`              |          16 px |
| `line height`       |          24 px |
| `letter spacing`    |           0 px |
| `text decoration`   |           none |
| `paragraph spacing` |           0 px |
| `case`              |       original |

:::

::: details h4

Used for bold labels and table column headers.

#### Details

| Property            |          Value |
| ------------------- | -------------: |
| `weight`            | SemiBold - 600 |
| `size`              |          13 px |
| `line height`       |          20 px |
| `letter spacing`    |           0 px |
| `text decoration`   |           none |
| `paragraph spacing` |           0 px |
| `case`              |       original |

:::

::: tip
H5 and h6 are not part of the onyx font system and should not be used therefore. Althoug they are defined in the code the same way like h4.
:::

### Paragraph

::: details paragraph-big

Used for inactive navigation in the navbar.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |         20 px |
| `line height`       |         28 px |
| `letter spacing`    |          0 px |
| `text decoration`   |          none |
| `paragraph spacing` |          0 px |
| `case`              |      original |

:::

::: details paragraph-default

Used for default font for paragraph-text.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |         16 px |
| `line height`       |         24 px |
| `letter spacing`    |          0 px |
| `text decoration`   |          none |
| `paragraph spacing` |          0 px |
| `case`              |      original |

:::

::: details paragraph-small

Used for small font for paragraph-text.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |         13 px |
| `line height`       |         20 px |
| `letter spacing`    |          0 px |
| `text decoration`   |          none |
| `paragraph spacing` |          0 px |
| `case`              |      original |

:::

### Link

::: details link-big

Used for big sized links.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |         20 px |
| `line height`       |         28 px |
| `letter spacing`    |          0 px |
| `text decoration`   |     underline |
| `paragraph spacing` |          0 px |
| `case`              |      original |

:::

::: details link-default

Used for default sized links.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |         16 px |
| `line height`       |         24 px |
| `letter spacing`    |          0 px |
| `text decoration`   |     underline |
| `paragraph spacing` |          0 px |
| `case`              |      original |

:::

::: details link-small

Used for small sized links.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |         13 px |
| `line height`       |         20 px |
| `letter spacing`    |          0 px |
| `text decoration`   |     underline |
| `paragraph spacing` |          0 px |
| `case`              |      original |

:::

### Monospace

::: details mono-big

Used for big sized calculations.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |         20 px |
| `line height`       |         28 px |
| `letter spacing`    |          0 px |
| `text decoration`   |          none |
| `paragraph spacing` |          0 px |
| `case`              |      original |

:::

::: details mono-default

Used for default sized calculations.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |         16 px |
| `line height`       |         24 px |
| `letter spacing`    |          0 px |
| `text decoration`   |          none |
| `paragraph spacing` |          0 px |
| `case`              |      original |

:::

::: details mono-small

Used for small sized calculations.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |         13 px |
| `line height`       |         20 px |
| `letter spacing`    |          0 px |
| `text decoration`   |          none |
| `paragraph spacing` |          0 px |
| `case`              |      original |

:::

## Usage

It is important to keep the usage of font styles consistent throughout the whole application. Only by following the principles a clean and hierarchical UI structure can be guaranteed. You should focus on the correct usage for headlines in particular! If you got questions about it, please contact your assigned UX-Designer.

## Line length

## Writing style
