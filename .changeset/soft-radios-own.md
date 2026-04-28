---
"@sit-onyx/nuxt-docs": minor
---

feat: support search options for `GlobalSearch`

You can now override the `GlobalSearch` component to e.g. pass options for generating the search sections:

```vue
<script lang="ts" setup>
import GlobalSearch from "#layers/onyx/app/components/GlobalSearch.vue";

const { loggedIn } = useUserSession();
</script>

<template>
  <GlobalSearch :options="loggedIn ? undefined : { ignoredTags: ['auth-only'] }" />
</template>
```
