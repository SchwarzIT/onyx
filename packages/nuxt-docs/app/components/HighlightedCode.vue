<script lang="ts" setup>
import dark from "@shikijs/themes/github-dark";
import light from "@shikijs/themes/github-light";
import { OnyxMarkdownDocument } from "@sit-onyx/comark";
import { parseMarkdown } from "comark";
import shiki from "comark/plugins/shiki";

const props = defineProps<{
  code: string;
  language: string;
}>();

const snippet = computed(() => {
  return `
\`\`\`${props.language}
${props.code}
\`\`\`
`;
});

const { data: value } = await useAsyncData(snippet, () =>
  parseMarkdown(snippet.value, {
    plugins: [shiki({ themes: { light, dark } })],
  }),
);
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <!--
    We need to override the components here to force using the regular pre and code components.
    This way, the renderer does not use the globally defined ProsePre and ProseCode components which have their own styling, features etc.
     -->
  <OnyxMarkdownDocument v-if="value" :value :components="{ pre: 'pre', code: 'code' }" />
</template>

<style scoped>
.onyx-markdown-document {
  /* Overwrite font-family, because otherwise it will be reset to the non-mono font-family */
  font-family: inherit;
}
</style>
