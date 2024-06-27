---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/nuxt/package.json";
</script>

# @sit-onyx/nuxt

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/@sit-onyx%2Fnuxt.svg)](https://www.npmjs.com/package/@sit-onyx/nuxt)

</div>

{{ packageJson.description }}.

## Changelog

A full changelog can be found [here](/development/packages/changelogs/nuxt).

## Features

- Auto import of all onyx components
- Automatic setup of global styles
- Automatic integration with [@nuxtjs/i18n](https://i18n.nuxtjs.org/)

## Quick Setup

Install the module in your [Nuxt](https://nuxt.com) application with one command:

```sh
npx nuxi module add @sit-onyx/nuxt@alpha
```

Afterwards you're able to just use all onyx components inside your app and the global styles will automatically be set up for you.

## Integration with @nuxtjs/i18n

Onyx features built in translations and the nuxt module extends on that by offering an out of the box integration with [@nuxtjs/i18n](https://i18n.nuxtjs.org/).
If your Nuxt project uses both modules, onyx will automatically detect it and use @nuxtjs/i18n to handle all the translations. This gives you all the bells and whistles of vue-i18n like lazy loading of translations.

### Setup

The setup is automated, @sit-onyx/nuxt will check if @nuxtjs/i18n is registered as well and register all onyx translations and add a plugin to handle the translations for onyx using vue-i18n.

> Please register @sit-onyx/nuxt **before** @nuxtjs/i18n. Otherwise the translations for onyx won't be picked up by @nuxtjs/i18n.

If your project uses standard language codes in the [BCP 47](https://www.rfc-editor.org/info/bcp47) format, supported translations will automatically be mapped correctly. Otherwise you'll have to define the mapping yourself by importing the messages inside your projects language definition. (See: [Extending onyx translations](#extending-onyx-translations))

### Customizing onyx translations

It might happen that a certain translation provided by onyx doesn't fit your project. As project specific translations will always overwrite the defaults from onyx, you can easily provide your own. Just define the key of the onyx translation inside your own messages scoped to the key "onyx". E.g. this example will remove the default brackets around the translation for "optional":

```json en-US.json
{
  "foo": "bar",
  "onyx": {
    "optional": "optional"
  }
}
```

For all available translations / keys please see: [i18n](/development/i18n#build-in-languages)

### Extending onyx translations

Maybe your project requires a language not supported by onyx. In this case you may provide translations for the keys within the "onyx" scope of your messages.

In case you'd like to use the messages of an existing onyx language, you can import it into your messages and overwrite them as you wish:

```ts customLang.ts
import enUS from "sit-onyx/locales/en-US.json";

export default {
  foo: "bar",
  onyx: { ...enUS, optional: "Custom optional" },
};
```

For more examples on how to customize your projects languages with support for onyx, feel free to take a look at one of our tests: [@sit-onyx/nuxt i18n test fixture](https://github.com/SchwarzIT/onyx/blob/nuxt-i18n/packages/nuxt/test/fixtures/i18n/nuxt.config.ts)

> Onyx is open source, so if you're missing translations for a language feel free to contribute them so other projects can benefit from it as well.
