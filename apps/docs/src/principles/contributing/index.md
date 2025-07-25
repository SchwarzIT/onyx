---
outline: [2, 3]
---

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

## Prerequisites / Setup

1. Install [Node.js](https://nodejs.org/en) version **{{ nodeVersion }}**. <br />
   We recommend using [fnm](https://github.com/Schniz/fnm) for managing your node versions which will automatically use the correct node version when working in the onyx repo.

::: tip Tip: Let _fnm_ automatically choose the right version

- Run `corepack enable` once
- Add `eval $(fnm env --use-on-cd --version-file-strategy=recursive --corepack-enabled --resolve-engines)` to your _shell startup file_ (e.g. `~/.bash_profile`, `~/.zshrc` )

:::

2. Install the [pnpm](https://pnpm.io/) package manager with a compatible version to `^{{ packageManager.replace("pnpm@", "") }}`

### Recommended IDE Setup

We follow the official Vue recommendation for IDE setup which is [VSCode](https://code.visualstudio.com) with the [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension.

## Global scripts

Depending on which package you want to contribute, there are different scripts available. A full list can be found in the `package.json` file of the corresponding package.
Here is a list of the most commonly used global scripts that you can run in the monorepo root folder.

```sh
pnpm install # install all dependencies
pnpm lint:fix:all # lint and fix all packages with eslint
pnpm format:all # format all files with prettier
pnpm dev <package-name> # run dev mode for the given `<package-name>`, e.g. "pnpm dev sit-onyx"
```

## Create new component

To create and contribute a new component to onyx, follow the steps as described below.

### Step 1: Get the code

First, you need to get access to the code. Onyx is Open Source and available on [GitHub](https://github.com/SchwarzIT/onyx).

Just [create a fork](https://github.com/SchwarzIT/onyx/fork) of the repository to get started.

::: info Access for employees of the Schwarz group
If you are an employee at the [Schwarz group](https://gruppe.schwarz) you can also get direct access to the onyx GitHub repository so you can create branches in there without needing to fork it.

Just contact one of the [team members / engineers](/about/team).
:::

### Step 2: Install dependencies

If you haven't already, install the dependencies of the monorepo by running:

```sh
pnpm install
```

### Step 3: Run Storybook locally

We are using [Storybook](https://storybook.js.org/) to develop and document onyx components. The Storybook is also deployed on [storybook.onyx.schwarz](https://storybook.onyx.schwarz).

To start it locally for development, just run the following command in the monorepo root folder. Afterwards, you can access Storybook on [localhost:6006](http://localhost:6006)

```sh
pnpm dev sit-onyx
```

### Step 4: Create .vue file

Now, create a new Vue file for your component. All onyx components are located in the `packages/sit-onyx/src/components` folder. Create a new folder with the name of your component and place a `.vue` file with your component name in it.

For the rest of this guide, we assume that we want to create a component named `OnyxExampleComponent`. So you should place it inside `packages/sit-onyx/src/component/OnyxExampleComponent/OnyxExampleComponent.vue`.

You can/should use the following boilerplate code to start your component:

::: code-group

```vue [OnyxExampleComponent.vue]
<script lang="ts" setup>
import type { OnyxExampleComponentProps } from "./types";
import { useDensity } from "../../composables/density";

const props = defineProps<OnyxExampleComponentProps>();

const { densityClass } = useDensity(props);
</script>

<template>
  <div :class="['onyx-component', 'onyx-example-component', densityClass]">
    Place your component HTML here...
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-example-component {
  @include layers.component() {
    // component styles here...
    font-family: var(--onyx-font-family);
  }
}
</style>
```

:::

A few notes on the code snippet above:

1. Every onyx component must have the `onyx-component` CSS class set on its root. This is used/needed for normalizing CSS styles, such as remove default margins from HTML elements etc.
2. The `densityClass` must also be bind to the component root. To learn more about onyx densities, please refer to our [density basics](/basics/density).
3. We use [CSS layers](/principles/contributing/styling.html#css-layers) to allow users to easily override all styles. You must place all your component styles inside `@include layers.component() { // your styles... }`
4. All component styles are global, so you **must** use [BEM](https://getbem.com/naming/) for naming your classes. All nested classes must start with the prefix of your component to avoid global side effects, e.g. `.onyx-example-component__label`.

### Step 5: Create types for properties

To define your component props, create a new `types.ts` file in the component folder and type the properties as needed for your component.
**Note**: The type name must start with your component name (see code snippet below) and extend the `DensityProp` so the [density](/basics/density) can be set for the component.

::: code-group

```ts [types.ts]
import type { DensityProp } from "../../composables/density";

export type OnyxExampleComponentProps = DensityProp & {
  // your component props, e.g.:
  // label: string;
};
```

:::

### Step 6: Create stories file

To develop, preview and document the component, you need to create a stories file so the component appear in the Storybook UI.

::: tip Story title
Please make sure to adjust the Story title to use the category that your component fits in. We use "Basic" here but you can see a list of existing categories on [storybook.onyx.schwarz](https://storybook.onyx.schwarz).

Also make sure to remove the "Onyx" prefix for the title.
:::

::: code-group

```ts{5} [OnyxExampleComponent.stories.ts]
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxExampleComponent from "./OnyxExampleComponent.vue";

const meta: Meta<typeof OnyxExampleComponent> = {
  title: "Basic/ExampleComponent",
  component: OnyxExampleComponent,
};

export default meta;
type Story = StoryObj<typeof OnyxExampleComponent>;

export const Default = {
  args: {
    // you can define component props and slots here to create your component examples, e.g.:
    // label: "Hello World",
  },
} satisfies Story;
```

:::

### Step 7: Export component

Last but not least, export the component and its types from the library so other users can actually use/import it once the component is released.
Please place the import alphabetically sorted by the component name.

::: code-group

```ts [packages/sit-onyx/src/index.ts]
export { default as OnyxExampleComponent } from "./components/OnyxExampleComponent/OnyxExampleComponent.vue";
export * from "./components/OnyxExampleComponent/types";
```

:::

### Step 8: Create pull request

Once you are done with your changes, [create a pull request](https://github.com/SchwarzIT/onyx/compare) and describe the changes that you did.
Please consider our [technical guidelines](/principles/technical-vision) when contributing to onyx.

If you are contributing multiple components, features or your contributing is big, please split up the contribution and create multiple PRs!

::: tip Draft PRs
Don't worry if your PR is not completely done yet because you have open questions etc.
You can also create a draft pull request so the onyx team can help you out or finalize the PR for you.
:::

When your PR gets approved, you can expect a pre-release immediately after it is merged. Production releases are planned to be published every 2 weeks after the release of version 1.0.0.

::: tip Screenshot tests
Component screenshot tests using Playwright will only be performed in our [GitHub workflows](https://github.com/SchwarzIT/onyx/actions) to ensure consistency of the resulting images which vary on different operating systems.

If you made visual changes to components, you can use [this Workflow](https://github.com/SchwarzIT/onyx/actions/workflows/playwright-screenshots.yml) to update the screenshots on your branch.
:::

### Step 9: Create changeset

If your changes affect the user and need to be released (e.g. added a new component or feature), you need to [add a changeset](https://github.com/SchwarzIT/onyx/blob/main/.changeset/README.md).

With this, the [onyx changelog and versioning](/development/packages/changelogs/sit-onyx.html) is managed automatically.

In the monorepo root, run:

```sh
npx changeset add
```

and follow the interactive CLI there. Please describe your changes in perspective of the user since this will end up in the changelog.

## Further reading

Here you can find more details about:

- 📚 [Writing stories](./stories.md)
- 🎨 [Creating styles](./styling.md)
- 🎭 [Implementing tests](./testing.md)
