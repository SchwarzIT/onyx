# Typography

All Onyx components rely on a default an a monospace font family.
However, we don't bundle any font families with the components to keep the bundle size small and to allow you to use whatever font family you like.

We recommend to use the following font families where you will also find installation instructions below.

- Default: [Source Sans 3](https://fontsource.org/fonts/source-sans-3)
- Monospace: [Source Code Pro](https://fontsource.org/fonts/source-code-pro)

## Installation

Font families can easily be installed as npm package so you don't need to download and copy them into your source code.

::: code-group

```sh [pnpm]
pnpm add -D @fontsource-variable/source-sans-3 @fontsource-variable/source-code-pro
```

```sh [npm]
npm install -D @fontsource-variable/source-sans-3 @fontsource-variable/source-code-pro
```

```sh [yarn]
yarn install -D @fontsource-variable/source-sans-3 @fontsource-variable/source-code-pro
```

:::

After that, import the styles into your `main.ts` file:

::: code-group

```ts [main.ts]
import "@fontsource-variable/source-code-pro";
import "@fontsource-variable/source-sans-3";
```

:::

## Using custom font families

If you don't install the default Onyx font families mentioned above, you should override the following CSS variables with your custom installed font family.
Otherwise all components will use the browsers default font family for `sans-serif` and `monospace`.

::: code-group

```css [custom.css]
/* import your custom fonts here... */
:root {
  --onyx-font-family: "My custom font family", sans-serif;
  --onyx-font-family-mono: "My custom mono font family", monospace;
}
```

```ts [main.ts]
// make sure to import your custom styles AFTER "sit-onyx/style.css"
import "custom.css";
```

:::
