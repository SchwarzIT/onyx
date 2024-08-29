---
"@sit-onyx/nuxt": minor
---

feat: provide toasts

The Nuxt plugin now registers the `createOnyx()` Vue plugin which also provides [toasts](https://storybook.onyx.schwarz/?path=/docs/feedback-toast--docs). So you no longer need to manually provide them, so if you have something like the following in your code, you can remove it:

```ts
provide(TOAST_PROVIDER_INJECTION_KEY, createToastProvider());
```

Also the i18n integration that syncs your nuxt-i18n locale with onyx now also supports the `locale.language` key since `locale.iso` is deprecated.
