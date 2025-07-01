# Typography

The onyx design system relies on a default (sans-serif) and a monospace font family.

onyx is intended to be used with the following font families which are open-source
and free to use under the [SIL Open Font License](https://en.wikipedia.org/wiki/SIL_Open_Font_License):

- Default: [Source Sans 3](https://fontsource.org/fonts/source-sans-3)
- Monospace: [Source Code Pro](https://fontsource.org/fonts/source-code-pro)

## Installation

To install and use the recommended onyx font families, install them by running

::: code-group

```sh [pnpm]
pnpm add @fontsource-variable/source-sans-3 @fontsource-variable/source-code-pro
```

```sh [npm]
npm install @fontsource-variable/source-sans-3 @fontsource-variable/source-code-pro
```

```sh [yarn]
yarn install @fontsource-variable/source-sans-3 @fontsource-variable/source-code-pro
```

:::

and then import them in your main TypeScript / CSS file, e.g.:

::: code-group

```ts [main.ts]
import "@fontsource-variable/source-code-pro";
import "@fontsource-variable/source-sans-3";
```

:::

or if you are using Nuxt, then import them in your `nuxt.config.ts`:

::: code-group

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  css: ["@fontsource-variable/source-sans-3", "@fontsource-variable/source-code-pro"],
});
```

:::

For further information about the font families or installation, refer to the [Fontsource docs](https://fontsource.org).

## Using custom font families

If you want to use custom font families, you need to install and import them like mentioned [above](#installation).
Afterwards, you need to override the following CSS variables like shown below so the font families are picked up by all onyx components.

We recommend installing font families as npm package using [Fontsource](https://fontsource.org).

::: code-group

```css [custom.css]
:root {
  --onyx-font-family: "My custom font family", sans-serif;
  --onyx-font-family-mono: "My custom mono font family", monospace;
}
```

```ts [main.ts]
// import your custom fonts here...
import "custom.css";
```

:::

## Font styles

onyx provides some utility CSS classes for font styles that can be used to style custom text components like `<p>` or `<span>`.

| Class                                    | Description                                            |
| ---------------------------------------- | ------------------------------------------------------ |
| `class="onyx-text"`                      | Sets the default font size and line height             |
| `class="onyx-text onyx-text--small"`     | Same as `onyx-text` but in small size and line height  |
| `class="onyx-text onyx-text--large"`     | Same as `onyx-text` but in large size and line height  |
| `class="onyx-text onyx-text--monospace"` | Same as `onyx-text` but with the monospace font family |
