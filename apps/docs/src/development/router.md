# Vue Router integration

onyx nicely integrates with the [Vue Router](https://router.vuejs.org/) of your application. This brings the following features:

- when passing links to components (e.g. OnyxLink or OnyxNavBar), internal links like `/my-page` or opened via the provided Vue router. External links, internal links with `target="_blank"` or if no router is provided, will be opened using browser-native behavior.
- the active state of the OnyxNavButton, OnyxNavItem and OnyxMenuItem will be automatically set depending on the current route
- mobile flyouts of the OnyxNavBar (burger and context menu) will automatically be closed when the current route changes (e.g. because the user has clicked a nav item)

## Setup

::: tip Nuxt
If you are using the onyx [Nuxt module](/development/packages/nuxt), the router setup is already configured for you.
:::

To enable the Vue Router integration with onyx, simply pass your router instance when creating the onyx plugin via `createOnyx()`:

::: code-group

```ts [main.ts]
import { createApp } from "vue";
import { createOnyx } from "sit-onyx";
import { createRouter } from "vue-router";

const router = createRouter({
  // your router options
});

const onyx = createOnyx({ router });

const app = createApp(App);
app.use(router).use(onyx);
```

:::
