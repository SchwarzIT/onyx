---
"@sit-onyx/nuxt-docs": minor
---

refactor(useCollection)!: do not throw error on 404

The `useCollection()` composable no longer always throws an error when the collection is not found to prevent unintentional error pages / side effects where the collection is loaded but not crucial for the page. Use the newly returned `error` object to show the error page manually.

Also, `useSeoMeta()` is no longer set as well for the same reason.

**Before**:

```ts
const { data } = await useCollection({ collection: "content_en" });
```

**After**:

```ts
const { data, error } = await useCollection({ collection: "content_en" });

watch(
  error,
  () => {
    if (error.value) showError(error.value);
  },
  { immediate: true },
);

useSeoMeta({
  title: () => data.value?.seo.title,
  description: () => data.value?.seo.description,
});
```
