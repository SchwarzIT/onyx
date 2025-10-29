<script lang="ts" setup>
import { useDensity } from "sit-onyx";
import type { OnyxCodeGroupProps } from "./types.js";

const props = defineProps<OnyxCodeGroupProps>();

const { densityClass } = useDensity(props);

const activeTab = ref("");
watchEffect(() => (activeTab.value = props.tabs[0]?.label ?? ""));
</script>

<template>
  <div :class="['onyx-component', 'onyx-code-group', densityClass]">
    <OnyxTabs v-model="activeTab" label="Code snippet" density="compact">
      <OnyxTab v-for="tab in props.tabs" :key="tab.label" :value="tab.label">
        <template #tab>
          <OnyxIcon v-if="tab.icon" :icon="tab.icon" size="16px" />
          {{ tab.label }}
        </template>

        <pre>{{ tab.code }}</pre>
      </OnyxTab>
    </OnyxTabs>
  </div>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-code-group {
  @include layers.component() {
    --onyx-code-group-border: var(--onyx-1px-in-rem) solid
      var(--onyx-color-component-border-neutral);
    border-radius: var(--onyx-radius-md);
    border: var(--onyx-code-group-border);

    .onyx-tabs {
      --onyx-tabs-tablist-margin-bottom: 0;
      border-radius: inherit;

      &__tablist {
        background-color: var(--onyx-color-base-background-blank);
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        padding: var(--onyx-density-2xs);
        border-bottom: var(--onyx-code-group-border);
      }
    }

    .onyx-tab {
      font-size: var(--onyx-font-size-md);
      line-height: var(--onyx-font-line-height-md);

      &__panel {
        padding: var(--onyx-density-md);
        background: var(--onyx-color-base-background-tinted);
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;

        font-family: var(--onyx-font-family-mono);
        white-space: pre-wrap;
      }
    }
  }
}
</style>
