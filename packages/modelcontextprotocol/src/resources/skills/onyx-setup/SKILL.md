---
name: onyx-setup
description: One-time configuration, initialization, CSS/font imports, i18n, and layout scaffolding for the Onyx design system. Use when setting up a new project or integrating Vue Router.
license: Apache-2.0
---

# Onyx Setup & Integration

Configure and initialize the Onyx Vue 3 design system, mandatory styles, fonts, internationalization, and root layout scaffolding.

## Setup & Initialization

### Vue 3 Setup

1. Install `sit-onyx`.
2. Import style files and initialize the Onyx plugin.

```typescript
import { createApp } from "vue";
import { createOnyx } from "sit-onyx";
import App from "./App.vue";

// Mandatory component styles
import "sit-onyx/style.css";

// Highly recommended global application styles (sets body background, font, etc.)
import "sit-onyx/global.css";

const onyx = createOnyx({
  // router: routerInstance // Option: Pass router instance here
});

const app = createApp(App);
app.use(onyx);
```

### Nuxt Setup

1. Install `@sit-onyx/nuxt`.
2. Register the module in `nuxt.config.ts`. Do not manually call `createOnyx()`.

```typescript
export default defineNuxtConfig({
  modules: ["@sit-onyx/nuxt"],
  onyx: {
    // optional module options here
  },
});
```

## Internationalization (i18n) Setup

English (`en-US`) is default and registered out-of-the-box. Additional languages must be registered manually.

### Vue 3 Integration with `vue-i18n`

To sync translations, import the JSON file from Onyx and register it in the `createOnyx` initialization options:

```typescript
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createOnyx } from "sit-onyx";
import App from "./App.vue";

// Import required Onyx translation file
import onyxDE from "sit-onyx/locales/de-DE.json";

const i18n = createI18n({
  legacy: false,
  locale: "de-DE",
  // your messages setup
});

const onyx = createOnyx({
  i18n: {
    // Syncs initial language
    locale: i18n.global.locale,
    // Message locale name MUST exactly match the code in vue-i18n
    messages: {
      "de-DE": onyxDE,
    },
  },
});

const app = createApp(App);
app.use(i18n).use(onyx);
```

_Note: Onyx translations update automatically whenever you change the active language inside `vue-i18n`._

### Nuxt Integration with `@nuxtjs/i18n`

The `@sit-onyx/nuxt` module automatically registers the corresponding Onyx languages for you.

**Strict BCP 47 Rule:**
If you use 2-digit locale codes (e.g. `es` instead of `es-ES`), you **MUST** configure the `language` property inside `nuxt.config.ts` so Onyx can map the translation correctly:

```typescript
export default defineNuxtConfig({
  modules: ["@sit-onyx/nuxt", "@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: "de-DE" }, // Standard 4-digit code works automatically
      { code: "es", language: "es-ES" }, // 2-digit code requires language mapping
    ],
  },
});
```

## Recommended Font Setup

Install font packages `@fontsource-variable/source-sans-3` and `@fontsource-variable/source-code-pro`. Import them into your main entrypoint:

### Vue (`main.ts`)

```typescript
import "@fontsource-variable/source-code-pro";
import "@fontsource-variable/source-sans-3";
```

### Nuxt (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  css: ["@fontsource-variable/source-code-pro", "@fontsource-variable/source-sans-3"],
});
```

## App Layout Scaffolding (Boilerplate)

Use Onyx layout components to manage structural complexity, scroll behaviors, and responsive constraints.

### Root Shell (`OnyxAppLayout`)

Place `OnyxAppLayout` at the root of the application (e.g. `App.vue` or `app/app.vue`). Use class modifiers to cap maximum width on large screens.

```vue
<template>
  <!-- Cap width at 1920px (lg breakpoint) and center align the layout -->
  <OnyxAppLayout class="onyx-grid-max-lg onyx-grid-center">
    <template #navBar>
      <OnyxNavBar app-name="Example App">
        <OnyxNavItem label="Home" link="/" />
      </OnyxNavBar>
    </template>

    <!-- Render pages inside the root layout shell -->
    <RouterView />
  </OnyxAppLayout>
</template>
```

## Vue Router Integration

Pass the Vue router instance to `createOnyx({ router })` to enable native routing integration:

- Internal links (e.g., `/my-page`) passed to navigation components (`OnyxLink`, `OnyxNavBar`, `OnyxNavItem`, `OnyxMenuItem`) navigate via Vue Router automatically.
- Active states on `OnyxNavItem` and `OnyxMenuItem` update automatically depending on the active route.
- Mobile flyouts close automatically upon navigation.
- **Fallback:** Uses native browser navigation for external links, links with `target="_blank"`, or when no router is registered.
