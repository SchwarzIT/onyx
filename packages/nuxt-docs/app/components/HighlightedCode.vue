<script lang="ts" setup>
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

const { data: ast } = await useAsyncData(snippet, () => parseMarkdown(snippet.value));
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <!--
    We need to override the components here to force using the regular pre and code components.
    This way, the renderer does not use the globally defined ProsePre and ProseCode components which have their own styling, features etc.
     -->
  <MDCRenderer
    v-if="ast"
    :body="ast.body"
    :data="ast.data"
    :components="{ pre: 'pre', code: 'code' }"
  />
</template>
