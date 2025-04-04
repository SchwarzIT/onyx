---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/nuxt-docs/package.json";
</script>

# @sit-onyx/nuxt-docs

<div class="hide-external-link">

Nuxt layer/template for creating documentations with the onyx design system. You can easily write markdown files and they will be rendered with pre-defined layouts and onyx components. Fully flexible and customizable.

</div>

{{ packageJson.description }}.

::: warning Work in progress
This package is work in progress. More features will be added in the future.
:::

## Changelog

A full changelog can be found [here](/development/packages/changelogs/nuxt-docs).

## Features

The theme includes the following features:

- pre-defined page layouts (landing page, docs etc.)
- pre-configured [Nuxt content](https://content.nuxt.com/) module to render markdown pages with onyx components.
- custom user friendly error page for 404, unexpected errors etc.

## Installation

### Step 1: Create a basic Nuxt project

To get started, you need a basic Nuxt project. You can check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/installation) for this.

### Step 2: Install the onyx documentation template

Install the onyx documentation layer by running

::: code-group

```sh [pnpm]
pnpm add -D @sit-onyx/nuxt-docs@beta
```

```sh [npm]
npm install -D @sit-onyx/nuxt-docs@beta
```

```sh [yarn]
yarn install -D @sit-onyx/nuxt-docs@beta
```

:::

### Step 3: Enable the Nuxt layer

Now, just extend your application with the onyx layer. You can check the [Nuxt documentation](https://nuxt.com/docs/getting-started/layers#usage) for further information.

::: code-group

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ["@sit-onyx/nuxt-docs"],
});
```

:::

Done. You can now start to write markdown files and see the renderer output in your application.

## Configuration

To configure the documentation layer, simply define a `app.config.ts`. There you can configure global options like the nav bar etc.

::: code-group

```ts [app.config.ts]
export default defineAppConfig({
  onyxDocs: {
    // your options here
    nav: {
      appName: "My documentation",
    },
  },
});
```

:::

## Write markdown

This documentation layer uses the official [Nuxt content](https://content.nuxt.com/) module. So to create pages/content with markdown, simply create a file inside the `content` folder of your application.

::: code-group

```md [content/index.md]
# Hello World

This is an example page using the [onyx documentation template](https://onyx.schwarz/development/packages/nuxt-docs.html) for Nuxt.
```

:::

## Layouts

This documentation layer supports several pre-build [layouts](https://nuxt.com/docs/guide/directory-structure/layouts) that are used by default. You can change the layout per page or add your own layouts if the existing ones do not fit your needs.

::: info Coming soon
This package is work in progress. More features will be added in the future.
:::

## Components

There are also several components included in the documentation layer that you can optionally use to easily build e.g. team pages.

::: info Coming soon
This package is work in progress. More features will be added in the future.
:::
