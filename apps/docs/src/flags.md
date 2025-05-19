# Flags

onyx includes a set of well-crafted SVG flags that are free to use.

If you want to download the flags as SVG, please head over to our [GitHub repository](https://github.com/SchwarzIT/onyx/tree/main/packages/flags/src/assets).

A full changelog can be found [here](/development/packages/changelogs/flags).

## Installation

To get started, install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add -D @sit-onyx/flags@beta
```

```sh [npm]
npm install -D @sit-onyx/flags@beta
```

```sh [yarn]
yarn install -D @sit-onyx/flags@beta
```

:::

Afterwards, you can import and use flags as needed. Please see the [OnyxIcon](https://storybook.onyx.schwarz/?path=/docs/basic-icon--docs) for the technical documentation. Technically, flags are used the same way as icons in onyx. This means that also flags can be passed for all components that support icons.

## Available flags

You can hover over a flag to see its name. Click on it or press enter when selecting it via keyboard to copy the import statement for the selected flag.

<script lang="ts" setup>
import OnyxFlagLibrary from ".vitepress/components/OnyxFlagLibrary.vue"
</script>

<OnyxFlagLibrary />
