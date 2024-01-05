---
outline: [2, 3]
---

<script lang="ts" setup>
import { data } from './languages.data';
</script>

# Internationalization

Onyx supports internationalization out-of-the-box. This includes commonly used translations
that are used by our Onyx components like texts for cancel / confirm buttons or "No data" scenarios.

::: tip Default translations
English is always supported so you don't need to do anything if you only need English texts.
:::

## Build-in languages

<ul>
  <li v-for="language in data.languages" :key="language">
    {{ language.name }} ({{ Math.round(language.keyCount / data.totalKeys * 100) }}% translated)
  </li>
</ul>

::: details Which texts are translated?
Below you can find all translatable texts that are used by our components.

<<< ../../../../packages/sit-onyx/src/i18n/locales/en-US.json
:::

## Usage

You need to globally provide the i18n instance for Onyx. We assume that you are already using some third-party library such as `vue-i18n`
for managing your app translations so Onyx will integrate nicely into your setup.

::: code-group

```vue [App.vue]
<script lang="ts" setup>
import { provideI18n } from "sit-onyx";
import deDE from "sit-onyx/locales/de-DE.json";
import { useI18n } from "vue-i18n";

const { locale, fallbackLocale } = useI18n();

provideI18n({
  // The Onyx locale will be updated whenever your vue-i18n locale changes
  locale,
  fallbackLocale,
  // make sure that the key for each langauge is the same that you are using
  // for your vue-i18n JSON files
  messages: { "de-DE": deDE },
});
</script>
```

:::

That's it. All built-in component texts are not also available in German and the locale is synced with `vue-i18n`.

## Custom translations

You can customize specific messages or even provide a whole custom language will full TypeScript support.

Some messages also support pluralization or placeholders for values. Please take a look at the [English texts](#build-in-languages) to see which format is used for a specific message.

### Change a single message

::: code-group

```vue [App.vue]
<script lang="ts" setup>
import { provideI18n } from "sit-onyx";
import enUS from "sit-onyx/locales/en-US.json";

enUS.someMessage = "Custom translation";

provideI18n({
  // ...
  messages: { "en-US": enUS },
});
</script>
```

:::

### Additional languages

You can add a whole new language with full TypeScript support. But please note that you might need to manually update any keys that we might add/remove in the future.

::: tip Contribution
We are open for accepting community contributions, if you want to add a missing language, feel free to [create a Pull request](https://github.com/SchwarzIT/onyx/pulls) so all Onyx users can benefit from it.
You can simply add the translations inside the [locales folder](https://github.com/SchwarzIT/onyx/tree/main/packages/sit-onyx/src/i18n/locales).
:::

```ts [Using TypeScript]
import type { Translation } from "sit-onyx";

const myCustomLanguage: Translation = {
  // add your translations here...
};
```
