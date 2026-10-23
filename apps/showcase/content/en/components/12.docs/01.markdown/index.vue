<script lang="ts" setup>
import { OnyxMarkdown } from "@sit-onyx/comark";

const markdown = `This is _client-side_ parsed **markdown** content rendered with [Comark](https://comark.dev) and [Onyx](https://onyx.schwarz).
`;
</script>

<template>
  <ClientOnly>
    <Suspense>
      <OnyxMarkdown>{{ markdown }}</OnyxMarkdown>
    </Suspense>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.onyx-markdown {
  text-align: center;
}
</style>
