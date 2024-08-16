---
"@sit-onyx/nuxt": major
---

feat: remove inline font families from bundle

onyx now no longer bundles/inlines the recommend font families because they got bundled by Vite into the main `style.css` file as base64 encoded URL.
This had negative impact on performance, tree-shaking and bundle size.

From now on, you need to install and import the font families manually. For more information see our [typography docs](https://onyx.schwarz/development/typography.html#installation).

For Nuxt, you can run

```sh
npm install -D @fontsource-variable/source-sans-3 @fontsource-variable/source-code-pro
```

and then import them in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  css: ["@fontsource-variable/source-sans-3", "@fontsource-variable/source-code-pro"],
});
```
