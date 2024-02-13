# Icons

onyx includes a set of well-crafted SVG icons that are free to use.

If you want to download the icons as SVG, please head over to our [GitHub repository](https://github.com/SchwarzIT/onyx/tree/main/packages/icons/src/assets).

A full changelog can be found [here](/development/packages/changelogs/icons).

## Installation

To get started, install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add -D @sit-onyx/icons@alpha
```

```sh [npm]
npm install -D @sit-onyx/icons@alpha
```

```sh [yarn]
yarn install -D @sit-onyx/icons@alpha
```

:::

Afterwards, you can import and use icons as needed. Please see the [OnyxIcon](/development/components/OnyxIcon) for the technical documentation.

## Available icons

You can hover over an icon to see its name.

<script lang="ts" setup>
import OnyxIconLibrary from "../.vitepress/components/OnyxIconLibrary.vue"
</script>

<OnyxIconLibrary />
