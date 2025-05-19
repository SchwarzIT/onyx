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

## Country names

You can get the country name of a flag in several languages using JavaScript's native [Intl.DisplayNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames) API.

Here is an example on how to use it (together with [vue-i18n](https://vue-i18n.intlify.dev/)):

::: details Expand code snippet

```ts
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const countryNames = computed(() => new Intl.DisplayNames(locale.value, { type: "region" }));
const germany = computed(() => countryNames.value.of("DE"));
// Output (depending on the locale):
// "Germany" if locale is EN
// "Deutschland" if locale is DE
// ...
```

:::

Alternatively, there is also metadata available for each flag exported from the `@sit-onyx/flags` package:

::: details Expand code snippet

```ts
import { FLAG_METADATA } from "@sit-onyx/flags";

console.log(FLAG_METADATA.DE);
// Output: { internationalName: "Germany", continent: "Europe" }
```

:::

## Available flags

You can hover over a flag to see its name. Click on it or press enter when selecting it via keyboard to copy the import statement for the selected flag.

<script lang="ts" setup>
import OnyxFlagLibrary from ".vitepress/components/OnyxFlagLibrary.vue"
</script>

<OnyxFlagLibrary />
