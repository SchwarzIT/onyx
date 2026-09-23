<script lang="ts" setup>
import { iconUndo } from "@sit-onyx/icons";
import { createNotificationsProvider, NOTIFICATIONS_PROVIDER_INJECTION_KEY } from "sit-onyx";
import type { ComponentExampleOptions } from "../ComponentExampleOptions.vue";

const props = withDefaults(
  defineProps<{
    /**
     * Example file name (without ".example.vue preview=true" extension).
     */
    previewComponent: string;
    /**
     * Component preview layout.
     *
     * - default: Pre-defined Limited width
     * - fullWidth: Full width
     * - grow: Same as "default" but children use "flex-grow" to grow the available width
     */
    layout?: "default" | "fullWidth" | "grow";
    /**
     * The orientation of the example if multiple components are used.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Whether to override specific onyx provide/inject keys.
     * Useful if e.g. notifications should not be shown globally inside the showcase itself.
     */
    provide?: { notifications?: boolean };
  }>(),
  {
    layout: "default",
    orientation: "horizontal",
  },
);

defineSlots<{ default: unknown }>();

const activeTab = ref("preview");

const ExampleComponent = computed(() => resolveComponent(props.previewComponent));
console.log("props.previewComponent ==> ", props.previewComponent);
console.log("resolveComponent ==> ", ExampleComponent);

const options = ref<ComponentExampleOptions>({});

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();

if (props.provide?.notifications) {
  const provider = createNotificationsProvider();
  provide(NOTIFICATIONS_PROVIDER_INJECTION_KEY, provider);
}
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
            <component :is="ExampleComponent" v-if="ExampleComponent" />
          </div>
        </OnyxCard>
      </OnyxTab>

      <OnyxTab :label="$t('components.code')" value="code" density="compact">
        <div class="example__code">
          <slot></slot>
        </div>
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

    // if the OnyxAppLayout component is used, scale it to 100% instead of full viewport size
    .onyx-app {
      width: 100%;
      height: 100%;
      min-height: 24rem;
      background-color: var(--onyx-color-base-background-tinted);
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      border-radius: var(--onyx-radius-md);

      :deep(.onyx-app__nav),
      :deep(.onyx-nav-bar) {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
      }

      :deep(.onyx-app__page) {
        border-radius: inherit;
      }

      :deep(.onyx-app__nav:has(.onyx-nav-bar--vertical)) {
        border-bottom-left-radius: inherit;

        .onyx-nav-bar--vertical,
        .onyx-sidebar__body {
          border-top-left-radius: inherit;
        }

        .onyx-nav-bar--vertical {
          border-bottom-left-radius: inherit;
        }
      }

      :deep(
        > .onyx-app__page
          > .onyx-page
          > .onyx-page__sidebar
          > .onyx-sidebar:not(.onyx-sidebar--temporary)
      ) {
        --onyx-sidebar-width: 16rem;
      }
    }
  }

  :deep(.example__code) {
    --onyx-markdown-renderer-margin-block: 0;
  }
}
</style>
