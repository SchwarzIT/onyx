# Typography

The onyx font system includes two different font families that can be used throughout your application, pending on the usecase. It contains several headline styles as well as paragraph styles and mono space styles.

::: info
The font families that can be used with onyx are:

- [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3)
- [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro?query=source)

Lidl and Kaufland font families are coming soon.

:::

## Brand typography

The default font family is defined to be the Source Sans and Source Code Pro (monospace). If you are creating a new onyx project, this will always be included out-of-the-box. In the initial phase, Source Sans applies to all color themes that are provided by onyx.

If you want to use custom font families, please take a look at the [technical documentation](/development/typography).

## Font stacks

_custom component for displaying font definitions_

### Headlines

::: details h1

This is the page title. It can only be used once per page at the very top.

#### Details

| Property            |          Value |
| ------------------- | -------------: |
| `weight`            | SemiBold - 600 |
| `size`              |           28px |
| `line height`       |           40px |
| `letter spacing`    |            0px |
| `text decoration`   |           none |
| `paragraph spacing` |            0px |
| `case`              |       original |

:::

::: details h2

Used for section titles and navigation in the navbar.

#### Details

| Property            |          Value |
| ------------------- | -------------: |
| `weight`            | SemiBold - 600 |
| `size`              |           20px |
| `line height`       |           28px |
| `letter spacing`    |            0px |
| `text decoration`   |           none |
| `paragraph spacing` |            0px |
| `case`              |       original |

:::

::: details h3

Used for element headlines and buttons.

#### Details

| Property            |          Value |
| ------------------- | -------------: |
| `weight`            | SemiBold - 600 |
| `size`              |           16px |
| `line height`       |           24px |
| `letter spacing`    |            0px |
| `text decoration`   |           none |
| `paragraph spacing` |            0px |
| `case`              |       original |

:::

::: details h4

Used for bold labels and table column headers.

#### Details

| Property            |          Value |
| ------------------- | -------------: |
| `weight`            | SemiBold - 600 |
| `size`              |           13px |
| `line height`       |           20px |
| `letter spacing`    |            0px |
| `text decoration`   |           none |
| `paragraph spacing` |            0px |
| `case`              |       original |

:::

::: tip
H5 and h6 are not part of the onyx font system and should not be used therefore. Although they are defined in the code the same way like h4.
:::

### Paragraph

::: details paragraph-big

Used for inactive navigation in the navbar.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |          20px |
| `line height`       |          28px |
| `letter spacing`    |           0px |
| `text decoration`   |          none |
| `paragraph spacing` |           0px |
| `case`              |      original |

:::

::: details paragraph-default

Used for default font for paragraph-text.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |          16px |
| `line height`       |          24px |
| `letter spacing`    |           0px |
| `text decoration`   |          none |
| `paragraph spacing` |           0px |
| `case`              |      original |

:::

::: details paragraph-small

Used for small font for paragraph-text.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |          13px |
| `line height`       |          20px |
| `letter spacing`    |           0px |
| `text decoration`   |          none |
| `paragraph spacing` |           0px |
| `case`              |      original |

:::

### Link

::: details link-big

Used for big sized links.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |          20px |
| `line height`       |          28px |
| `letter spacing`    |           0px |
| `text decoration`   |     underline |
| `paragraph spacing` |           0px |
| `case`              |      original |

:::

::: details link-default

Used for default sized links.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |          16px |
| `line height`       |          24px |
| `letter spacing`    |           0px |
| `text decoration`   |     underline |
| `paragraph spacing` |           0px |
| `case`              |      original |

:::

::: details link-small

Used for small sized links.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |          13px |
| `line height`       |          20px |
| `letter spacing`    |           0px |
| `text decoration`   |     underline |
| `paragraph spacing` |           0px |
| `case`              |      original |

:::

### Monospace

::: details mono-big

Used for big sized calculations.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |          20px |
| `line height`       |          28px |
| `letter spacing`    |           0px |
| `text decoration`   |          none |
| `paragraph spacing` |           0px |
| `case`              |      original |

:::

::: details mono-default

Used for default sized calculations.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |          16px |
| `line height`       |          24px |
| `letter spacing`    |           0px |
| `text decoration`   |          none |
| `paragraph spacing` |           0px |
| `case`              |      original |

:::

::: details mono-small

Used for small sized calculations.

#### Details

| Property            |         Value |
| ------------------- | ------------: |
| `weight`            | Regular - 400 |
| `size`              |          13px |
| `line height`       |          20px |
| `letter spacing`    |           0px |
| `text decoration`   |          none |
| `paragraph spacing` |           0px |
| `case`              |      original |

:::

## Usage

It is important to keep the usage of font styles consistent throughout the whole application. Only by following this principle, a clean and hierarchical UI structure can be guaranteed. You should focus on the correct usage for headlines in particular! If you have questions about it, please contact your assigned UX-Designer.

## Line length

To create a flowing readability, the line length is key. There are no strict rules on the usage, due to the dependency on [screen size, breakpoint and column grid](/basics/breakpoints-grid). Nevertheless onyx provides some guidelines and recommendations for your implementation.

![image](/assets/line_length.png)

Generally speaking: the wider the line the harder to read and to follow. The optimal range for readability is usually between 60 and 80 characters. If the text is way longer than this guideline, just use a second text column instead.

## Writing style

If you want to use text in your application, please take the following principles into account.

::: details Focus

Formulate your text purposefully and concisely. Do not use unnecessary verbiage. Nevertheless, form short, complete and grammatically correct sentences.

:::

::: details Descriptive

Describe prompts clearly and use the imperative (especially with buttons). Buttons are always titled with verbs and should at best consist of only one word. More than one word is possible in exceptional cases.

:::

::: details Hierarchy

Hierarchy is key to a well working user experience. Always be aware on how to use section titles and element headlines.
Also use [color and contrast](/basics/colors) for creating hierarchy in a subtle way.

:::

::: details Context

Texts must always have a connection to the things that are going on in the screen, in terms of content.
Never text about content, the user cannot relate to.

:::

::: details Consistency

Texts should never be built in uppercase. Always use the provided line height for spacing. Do not try to squeeze characters or text blocks. Less is more - Minimalism is key.

:::

## Links

Links are the tool of choice to refer to another page. Please use the `link` font style. By default, links have an underline and are primary-colored. Under consideration of the text styling principles, the text color can be changed in exceptional usecases. Please doublecheck with your assigned UX-Designer.

## Truncation

For more details about truncation and how to use it, please visit the [truncation basics](/basics/truncation).
