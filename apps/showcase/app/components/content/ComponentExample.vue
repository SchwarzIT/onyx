<script lang="ts" setup>
import { iconSync } from "@sit-onyx/icons";
import type { Component } from "vue";
import type { ComponentExampleOptions } from "../ComponentExampleOptions.vue";

const props = withDefaults(
  defineProps<{
    /**
     * Example file name (without ".example.vue" extension).
     */
    name: string;
    /**
     * Component preview layout.
     * - default: Pre-defined Limited width (if only 1 child exists, fullWidth otherwise)
     * - fullWidth: Full width
     */
    layout?: "default" | "fullWidth";
  }>(),
  {
    layout: "default",
  },
);

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

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
</script>

<template>
  <div class="example">
    <OnyxTabs v-model="activeTab" class="example__tabs" :label="$t('components.example')" size="h3">
      <OnyxTab :label="$t('components.preview')" value="preview" density="compact">
        <OnyxCard class="example__preview" :style="{ colorScheme: options.colorScheme }">
          <div
            v-bind="attrs"
            :class="[
              'example__preview-wrapper',
              { [`onyx-density-${options.density}`]: options.density },
              { [`example__preview-wrapper--${props.layout}`]: props.layout },
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
    padding-block: var(--onyx-grid-margin);
    align-items: center;
  }

  &__preview-wrapper {
    --preview-max-width: initial;
    display: flex;
    flex-direction: row;
    gap: var(--onyx-density-md);
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: var(--preview-max-width);

    // this "useless" transform is used to position fixed components (e.g. OnyxFAB) relative to the preview wrapper
    // instead of relative to the whole screen
    transform: translate(0, 0);

    &--default {
      &:has(> :first-child:only-child) {
        --preview-max-width: 24rem;
      }
    }

    &--fullWidth {
      --preview-max-width: initial;
    }
  }

  :deep(.example__code) {
    --onyx-markdown-renderer-margin-block: 0;
  }
}
</style>
