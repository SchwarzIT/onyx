# Typography

The onyx design system relies on a default (sans-serif) and a monospace font family.

onyx is intended to be used with the following font families which are open-source
and free to use under the [SIL Open Font License](https://en.wikipedia.org/wiki/SIL_Open_Font_License):

- Default: [Source Sans 3](https://fontsource.org/fonts/source-sans-3)
- Monospace: [Source Code Pro](https://fontsource.org/fonts/source-code-pro)

## Using custom font families

::: info Default font families
The above default font families are already bundled into the component library
so you don't need to install them manually.
:::

If you want to use custom font families, you need to install them and override the following CSS variables manually.

We recommend installing font families as npm package using [Fontsource](https://fontsource.org).

::: code-group

```css [custom.css]
/* import your custom fonts here... */
:root {
  --onyx-font-family: "My custom font family", sans-serif;
  --onyx-font-family-mono: "My custom mono font family", monospace;
}
```

```ts [main.ts]
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
