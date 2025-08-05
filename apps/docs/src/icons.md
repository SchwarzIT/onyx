# Icons

onyx includes a set of well-crafted SVG icons that are free to use.

If you want to download the icons as SVG, please head over to our [GitHub repository](https://github.com/SchwarzIT/onyx/tree/main/packages/icons/src/assets).

A full changelog can be found [here](/development/packages/changelogs/icons).

## Installation

To get started, install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add -D @sit-onyx/icons@beta
```

```sh [npm]
npm install -D @sit-onyx/icons@beta
```

```sh [yarn]
yarn install -D @sit-onyx/icons@beta
```

:::

Afterwards, you can import and use icons as needed. Please see the [OnyxIcon](https://storybook.onyx.schwarz/?path=/docs/basic-icon--docs) for the technical documentation.

## Usage

There are two different ways of using / importing icons from this package:

### Option 1: JavaScript import <Badge text="recommended" />

> **Requires @sit-onyx/icons version >= 1.0.0-beta.22**

For the best developer experience, it is recommended to use JavaScript imports. This approach also supports IDE intellisense, so you can e.g. just start typing "icon" in your editor and all available icons will be suggested to you.

```ts
import { iconPlaceholder } from "@sit-onyx/icons";

// or to import all icons (note: no tree-shaking will be supported then):
// import * as ALL_ICONS from "@sit-onyx/icons";
```

### Option 2: Import from SVG file

Alternatively, you can import the icon from the raw SVG file:

```ts
// Note that "?raw" is needed to import the SVG content instead of a path to the file itself.
// ?raw will be resolved by the bundler (e.g. Vite).
// if you want to import the path to the icon instead of the content, you can omit the "?raw" part
import iconPlaceholder from "@sit-onyx/icons/placeholder.svg?raw";
```

## Available icons

You can hover over an icon to see its name. Click on it or press enter when selecting it via keyboard to copy the import statement for the selected icon.

<script lang="ts" setup>
import OnyxIconLibrary from ".vitepress/components/OnyxIconLibrary.vue"
</script>

<OnyxIconLibrary />
