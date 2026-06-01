<script lang="ts" setup>
import { iconUndo } from "@sit-onyx/icons";
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
     * - default: Pre-defined Limited width
     * - fullWidth: Full width
     * - grow: Same as "default" but children use "flex-grow" to grow the available width
     */
    layout?: "default" | "fullWidth" | "grow";
    /**
     * The orientation of the example if multiple components are used.
     */
    orientation?: "horizontal" | "vertical";
  }>(),
  {
    layout: "default",
    orientation: "horizontal",
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
        <!-- setting the "dark" class in additional to the colorScheme since its needed for some components such as the OnyxImage -->
        <OnyxCard
          :class="['example__preview', { dark: options.colorScheme === 'dark' }]"
          :style="{ colorScheme: options.colorScheme }"
        >
          <div
            v-bind="attrs"
            :class="[
              'example__preview-wrapper',
              { [`onyx-density-${options.density}`]: options.density },
              { [`example__preview-wrapper--${props.layout}`]: props.layout },
              { [`example__preview-wrapper--${props.orientation}`]: props.orientation },
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
          :icon="iconUndo"
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
    --preview-max-width: 24rem;
    display: flex;
    flex-direction: row;
    gap: var(--onyx-density-md);
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: var(--preview-max-width);
    container-type: inline-size;

    // this is used to position fixed components (e.g. OnyxFAB) relative to the preview wrapper
    // instead of relative to the whole screen
    contain: layout;

    &--fullWidth {
      --preview-max-width: initial;
    }

    &--grow {
      > * {
        flex: 1;
      }

      &.example__preview-wrapper--vertical {
        > * {
          width: 100%;
        }
      }
    }

    &--vertical {
      flex-direction: column;
    }
  }

  :deep(.example__code) {
    --onyx-markdown-renderer-margin-block: 0;
  }
}
</style>
