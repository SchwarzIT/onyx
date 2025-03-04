<script lang="ts" setup>
import { packageManager } from "../../../../../package.json";
import nodeVersion from "../../../../../.node-version?raw";
</script>

# Contribution Guide

When contributing to onyx, please respect the [Schwarz IT Code of Conduct](https://github.com/SchwarzIT/.github/blob/main/CODE_OF_CONDUCT.md) and our [technical vision/guidelines](/principles/technical-vision).

::: info Target audience
This document is directed at people that are developing **for** onyx.
It gives tips and guidelines on what should or must be considered when working with onyx.
:::

## Prerequisites / Technical setup

1. Install [Node.js](https://nodejs.org/en) version **{{ nodeVersion }}**. <br />
   We recommend using [fnm](https://github.com/Schniz/fnm) for managing your node versions which will automatically use the correct node version when working in the onyx repo.

::: tip Recommended fnm setup

- Run `corepack enable` once
- Add `eval $(fnm env --use-on-cd --version-file-strategy=recursive --corepack-enabled --resolve-engines)` to your _shell startup file_ (e.g. `~/.bash_profile`, `~/.zshrc` )

:::

2. Install the [pnpm](https://pnpm.io/) package manager with a compatible version to `^{{ packageManager.replace("pnpm@", "") }}`

## Recommended IDE Setup

We follow the official Vue recommendation for IDE setup which is [VSCode](https://code.visualstudio.com) with the [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension.

## Set up the monorepo

In order to work in the onyx monorepo, you need to install the dependencies by running:

```sh
pnpm install
```

## Package scripts

Depending on which package you want to contribute, there are different scripts available. A full list can be found in the `package.json` file of the corresponding package.
Here is a list of the most commonly used scripts.

::: code-group

```sh [Monorepo root]
pnpm install # install all dependencies
pnpm lint:fix:all # lint and fix all packages
pnpm format:all # format all files
pnpm dev <package-name> # run dev mode for the given `<package-name>`
```

```sh [packages/sit-onyx]
pnpm dev # run Storybook in dev mode when developing components
pnpm build # build all onyx components
pnpm test # run unit tests
pnpm test:playwright # run Playwright component tests
```

```sh [apps/docs]
pnpm dev # run docs in dev mode
```

:::

## Creating a Pull Request

Pull Requests are very welcome!
Please consider our [technical guidelines](/principles/technical-vision) when contributing to onyx.

1. [Create a fork](https://github.com/SchwarzIT/onyx/fork) to commit and push your changes to
2. When your changes affect the user and need to be released, [add a changeset](https://github.com/SchwarzIT/onyx/blob/main/.changeset/README.md).
3. Then [create a PR](https://github.com/SchwarzIT/onyx/compare) to merge your changes back into our repository.

When your PR gets approved, you can expect a pre-release immediately after it is merged. Production releases are planned to be published every 2 weeks after the release of version 1.0.0.

::: tip Screenshot tests
Component screenshot tests using Playwright will only be performed in our [GitHub workflows](https://github.com/SchwarzIT/onyx/actions) to ensure consistency of the resulting images which vary on different operating systems.

If you made visual changes to components, you can use [this Workflow](https://github.com/SchwarzIT/onyx/actions/workflows/playwright-screenshots.yml) to update the screenshots on your branch.
:::

## Developing Components

Below is the basic code for a new onyx component.

Find more details about:

- 📚 [Writing stories](./stories.md)
- 🎨 [Creating styles](./styling.md)
- 🎭 [Implementing tests](./testing.md)

::: code-group

```vue [OnyxComponent.vue]
<script lang="ts" setup>
import type { OnyxComponentProps } from "./types";
import { useDensity } from "../../composables/density";

const props = defineProps<OnyxComponentProps>();

const { densityClass } = useDensity(props);
</script>

<template>
  <div :class="['onyx-component', 'onyx-component-name', densityClass]">
    <!-- component HTML -->
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-component-name {
  @include layers.component() {
    // component styles...
  }
}
</style>
```

```ts [types.ts]
import type { DensityProp } from "../../styles/density";

export type OnyxComponentProps = DensityProp & {
  // component props...
};
```

<<< ./testing-example.ct.tsx [OnyxComponent.ct.tsx]

<<< ./stories-example.ts [OnyxComponent.stories.ts]
:::
