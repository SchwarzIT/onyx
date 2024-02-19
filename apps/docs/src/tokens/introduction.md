# Introduction

Understanding the logic, structure and usage of tokens is crucial for creating onyx applications. Here is everything you need to know. Please feel free to visit our [Q&A](https://github.com/SchwarzIT/onyx/discussions/categories/q-a) if you have any questions.

## What is a design token?

A design token is a fundamental, reusable building block for design systems like onyx. It represents a specific aspect of a design as a key-value pair such as color, typography, spacing or another visual element. Design tokens help maintain consistency and streamlining the design and development process across various platforms and applications.

::: tip Important
Design tokens are variables, that are used equally in development and design to ensure the customizability under the consideration of the consistency across all onyx applications.
:::

## How do they work?

First of all, it is essential to understand the basic systematic of tokens. Tokens are categorised into three layers, that are related to each other. Every token layer has its own responsibility, but not all layers are used directly in the design and development process.

### Global tokens

Global tokens are the fundamental elements of every design system to establish a unique design language. This level of tokens define fundamental properties such as colors, spacings and other without any usecase or context. All of those values are stored in a systematic way.

For example `onyx-color-universal-white` is just the value for white color in general.

::: warning Important
Global tokens are not used within the process of designing and developing an application! As a result they are hidden to minimize sources of errors. Imagine them like the invisible base for your product.
:::

![token label mapped to a single value](/images/global_token.webp)

### Semantic tokens

This token layer puts the global tokens into context. At this point, semantic tokens differentiate between light and dark mode and connect a usecase or purpose to the values, that were defined in the global tokens. The naming of semantic tokens is less generic and more specific to the intended use.

For example `onyx-color-surface-bg-blank` is exclusively used for a blank background color. To have a more detailed view about the color token system and how light and dark modes are implemented, please check out the [color documentation](/basics/colors).

::: warning Important
Semantic tokens are used from both developers and designers to build applications with existing standard components. With the use of those tokens, a seamless switch between light and dark mode is guaranteed. Otherwise, this will not work without additional effort.
:::

![token mapped to multiple child tokens](/images/semantic_token.webp)

### Component tokens

The third and last token layer is used for building components exclusively. Important to know is: To keep things simple, not every component is built with component tokens. They are only used in case of irregularities or exceptions between the provided color themes.

For example `onyx-component-button-primary-bg-hover` is exclusively used for the hover effect color of the onyx primary button.

::: warning Important
Only the maintainers (onyx designers and developers) of the design system are able to use component tokens on a regular basis. All others do not have access to minimize sources of errors. Instead all application-designers and -developers do benefit from component tokens by using standard onyx components in their project.
:::

![child tokens mapped to component usecase](/images/component_token.webp)

## Why is it important?

In essence, design tokens provide a systematic and efficient way to abstract and manage visual design attributes, fostering coherence and flexibility in the creation and maintenance of digital products and user interfaces. Here are the key benefits:

::: details Consistency
Design tokens help maintain a consistent look and feel across different components and elements of a design system. By using predefined values for colors, typography, spacing, and other design elements, you ensure a cohesive visual identity throughout your project.
:::

::: details Scalability
As a project grows in size and complexity, design tokens make it easier to scale design efforts. When changes are needed, such as updating a color or a font, design tokens allow for quick and systematic adjustments across the entire system.
:::

::: details Collaboration
Design tokens facilitate collaboration between designers and developers. By using a shared set of design tokens, both teams can work more seamlessly together. Designers can focus on creating consistent designs, while developers can easily implement those designs using the predefined tokens.
:::

::: details Maintenance
Design tokens simplify the maintenance process. If a design element needs to be updated or changed, you can do so by modifying the corresponding design token, ensuring that the change is reflected consistently across the entire project.
:::

::: details Adaptability
Design tokens enhance adaptability across different platforms and devices. Whether you're designing for a website, mobile app, or other digital platforms, using design tokens allows for easier adaptation and consistency across various screen sizes and resolutions.
:::

::: details Efficiency
Design tokens promote efficiency in the design and development workflow. Designers can create and update designs more quickly, and developers can implement changes more efficiently, reducing the overall time and effort required for both disciplines.
:::

::: details Documentation
Design tokens serve as a form of documentation for the design system. They provide a clear and structured reference for all the design elements, making it easier for team members to understand and use the design system effectively.
:::

## How to read tokens?

onyx uses a strict naming convention for the tokens to keep consistency. For a better understanding of the naming convention, see the information below.

::: tip
Design tokens of the onyx design system are always prefixed with `onyx-` so they can always be differentiated with custom tokens of your application.
:::

To get more details about the color palette system and the transmission into the token system (considering light and dark mode), please visit the [color documentation](/basics/colors).

![token taxonomy based on: source, type, usage, palette, value](/images/token_naming.webp)
