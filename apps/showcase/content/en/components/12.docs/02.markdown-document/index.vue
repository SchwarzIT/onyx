<script lang="ts" setup>
import { OnyxMarkdownDocument } from "@sit-onyx/comark";
import { createMarkdownParser } from "comark";

const parse = createMarkdownParser();

const document =
  await parse(`This is _server-side_ parsed **markdown** content rendered with [Comark](https://comark.dev) and [Onyx](https://onyx.schwarz).
`);
</script>

<template>
  <ClientOnly>
    <OnyxMarkdownDocument :value="document" />
  </ClientOnly>
</template>

<style lang="scss" scoped>
.onyx-markdown-document {
  text-align: center;
}
</style>
