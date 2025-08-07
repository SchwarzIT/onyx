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

The package includes the following features:

- pre-defined page layouts (landing page, docs etc.)
- pre-configured [Nuxt content](https://content.nuxt.com/) module to render markdown pages with onyx components.
- custom user friendly error page for 404, unexpected errors etc.
- supports Nuxt 4
- integration with [Nuxt i18n](https://i18n.nuxtjs.org/)

## Installation

### Step 1: Create a basic Nuxt project

To get started, you need a basic Nuxt project. You can check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/installation) for this.

::: warning app.vue
**Important!**
If your Nuxt project has a `app/app.vue` file, delete it. Otherwise the whole documentation template will be overridden and not work correctly.
:::

### Step 2: Configure pnpm

If you are using pnpm, make sure to create the following `pnpm-workspace-yaml` and `.npmrc` file. Otherwise the Nuxt layer will not work correctly.
When using another package manager, you can skip this step.

::: code-group

```yml [pnpm-workspace.yaml]
# needed to correctly install the Nuxt content and Nuxt image module
onlyBuiltDependencies:
  - better-sqlite3
  - sharp
```

```properties [.npmrc]
# "shamefully-hoist" is the default config from Nuxt for layers
# It is currently needed to correctly install the peerDependencies from Nuxt layers
shamefully-hoist=true
```

:::

### Step 3: Install the onyx documentation template

Install the onyx documentation layer by running

::: code-group

```sh [pnpm]
pnpm add @sit-onyx/nuxt-docs@beta
```

```sh [npm]
npm install @sit-onyx/nuxt-docs@beta
```

```sh [yarn]
yarn install @sit-onyx/nuxt-docs@beta
```

:::

### Step 4: Enable the Nuxt layer

Now, just extend your application with the onyx layer. You can check the [Nuxt documentation](https://nuxt.com/docs/getting-started/layers#usage) for further information.

::: code-group

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ["@sit-onyx/nuxt-docs"],
});
```

:::

Done! You can now start to write markdown files and see the renderer output in your application.

### Step 5: Create your first page

Finally create your first content page by creating a `content/en/index.md` file which will be the home/landing page of your documentation.
For more information about writing markdown/content, see the [Write markdown](#write-markdown) section.

::: code-group

```md [content/en/index.md]
# Hello World

This is an example page using the [onyx documentation template](https://onyx.schwarz/development/packages/nuxt-docs.html) for Nuxt.
```

:::

::: info
By default, the `content/en` folder is used to provide the content so all files must be placed inside this folder. If you want to add other languages or change the default language, refer to thr [i18n section](#i18n).
:::

## Configuration

To configure the documentation layer, simply define a `app/app.config.ts`. There you can configure global options like the nav bar etc.

::: code-group

```ts [app/app.config.ts]
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

```md [content/en/hello-world.md]
# Hello World

This is an example page using the [onyx documentation template](https://onyx.schwarz/development/packages/nuxt-docs.html) for Nuxt.
```

:::

Nuxt content will automatically create a route for every markdown file. In this example, the page will be available on `/hello-world`.

## I18n

The Nuxt documentation template is integrated with [Nuxt i18n](https://i18n.nuxtjs.org/) so you can easily provide content in multiple languages.

When using multiple languages, the nav bar will automatically show a language switch where the user can switch the current language.

By default, `en` is used as default locale so you need to place all markdown files inside the `content/en` folder so they are picked up correctly.
If you only plan to use English, you don't need to do anything and are good to go.

For further information about the Nuxt i18n integration with the Nuxt content module, read the [official Nuxt content documentation](https://content.nuxt.com/docs/integrations/i18n).

### Add language

To add other languages, follow the steps below.

#### Step 1: Add locale to Nuxt config

First, register all your desired locales in the `nuxt.config.ts` file so the Nuxt i18n module is aware of them.

::: code-group

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    locales: [
      // make sure to also add the language property
      { code: "en", language: "en-US", name: "English" },
      { code: "de", language: "de-DE", name: "Deutsch" },
    ],
  },
});
```

:::

#### Step 2: Configure Nuxt content module

Now you need to configure the [Nuxt content](https://content.nuxt.com/) module so it knows where to find the files / content for your languages.

::: code-group

```ts [content.config.ts]
import { defineCollection, defineContentConfig } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    // content_en is registered by default in @sit-onyx/nuxt-docs so there is no need to register it manually here
    // define a new collection for every additional language here
    content_de: defineCollection({
      type: "page",
      source: { include: "de/**", prefix: "" },
    }),
  },
});
```

:::

You can now place content in the `content/de` folder to serve German content.

### Change default locale

If you want to change the default locale to something other than English (e.g. if you don't want to offer English content), follow the steps below.

#### Step 1: Add default locale

Follow the same steps as described in the [Add language section](#add-language) to register your new language.

#### Step 2: Change default locale

To change the default locale used by Nuxt i18n, just update the `nuxt.config.ts` accordingly (see [Nuxt i18n docs](https://i18n.nuxtjs.org/docs/api/options#defaultlocale) for further information).

::: code-group

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    defaultLocale: "de",
  },
});
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
