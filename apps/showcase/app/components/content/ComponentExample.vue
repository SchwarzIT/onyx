<script lang="ts" setup>
import { iconSync } from "@sit-onyx/icons";
import type { Component } from "vue";
import type { ComponentExampleOptions } from "../ComponentExampleOptions.vue";

const props = defineProps<{
  /**
   * Example file name (without ".example.vue" extension).
   */
  name: string;
}>();

const { locale } = useI18n();
const route = useRoute();

const activeTab = ref("preview");

// Vite analyzes these glob imports at build time
const allExamples = {
  components: import.meta.glob<Component>("~~/content/*/components/**/examples/*.example.vue", {
    import: "default",
  }),
  sourceCodes: import.meta.glob<string>("~~/content/*/components/**/examples/*.example.vue", {
    import: "default",
    query: "?raw",
  }),
};

const componentName = computed(() => route.params.name);

const fileKey = computed(() => {
  return Object.keys(allExamples.components).find((key) => {
    return (
      key.includes(`/content/${locale.value}/`) &&
      key.endsWith(`/${componentName.value}/examples/${props.name}.example.vue`)
    );
  });
});

// build time breaker to guarantee that no non-existing examples are used
// see "prerender" config in nuxt.config.ts
watchEffect(() => {
  if (!fileKey.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `Example "${props.name}" not found for component "${componentName.value}".`,
      // throwing a fatal error  will fail during SSR / prerendering
      fatal: true,
    });
  }
});

const ExampleComponent = computed(() => {
  const component = allExamples.components[fileKey.value ?? ""];
  return component ? defineAsyncComponent(component) : undefined;
});

const { data: exampleCode } = await useAsyncData(
  () => `example-code-${componentName.value}-${props.name}-${locale.value}`,
  async () => {
    const code = (await allExamples.sourceCodes[fileKey.value ?? ""]?.()) ?? "";
    if (!code) return;
    const markdown = `\`\`\`vue\n${code.trim()}\n\`\`\``;
    return parseMarkdown(markdown);
  },
);

const options = ref<ComponentExampleOptions>({});
</script>

<template>
  <div class="example">
    <OnyxTabs v-model="activeTab" class="example__tabs" :label="$t('components.example')" size="h3">
      <OnyxTab :label="$t('components.preview')" value="preview" density="compact">
        <OnyxCard class="example__preview" :style="{ colorScheme: options.colorScheme }">
          <div
            :class="[
              'example__preview-wrapper',
              { [`onyx-density-${options.density}`]: options.density },
            ]"
          >
            <ExampleComponent />
          </div>
        </OnyxCard>
      </OnyxTab>

      <OnyxTab :label="$t('components.code')" value="code" density="compact">
        <!-- we use a build time breaker so the "v-if" here is only used for TypeScript -->
        <MDC v-if="exampleCode" class="example__code" :value="exampleCode" />
      </OnyxTab>

      <template #actions>
        <OnyxIconButton
          v-if="Object.keys(options).length > 0"
          :icon="iconSync"
          :label="$t('components.options.reset')"
          color="neutral"
          density="compact"
          @click="options = {}"
        />

        <ComponentExampleOptions v-model="options" />
      </template>
    </OnyxTabs>
  </div>
</template>

<style lang="scss" scoped>
.example {
  &__tabs {
    --onyx-tabs-tablist-margin-bottom: var(--onyx-density-2xs);
  }

  &__preview {
    --onyx-card-padding: var(--onyx-density-3xl);
    --onyx-card-gap: var(--onyx-density-md);
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__preview-wrapper {
    display: contents;

    > *:only-child {
      flex-grow: 1;
    }
  }

  :deep(.example__code) {
    --onyx-markdown-renderer-margin-block: 0;
  }
}
</style>
