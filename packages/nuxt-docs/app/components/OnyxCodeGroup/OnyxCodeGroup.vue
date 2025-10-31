<script lang="ts" setup>
import { iconFileCopy } from "@sit-onyx/icons";
import type { OnyxTabs } from "sit-onyx";
import type { OnyxCodeGroupProps } from "./types.js";

const props = defineProps<OnyxCodeGroupProps>();

defineSlots<{
  /**
   * Optionally override the displayed code (e.g. for syntax highlighting.)
   */
  default?(props: {
    /**
     * Index of the currently selected tab.
     */
    selectedIndex: number;
  }): unknown;
}>();

const selectedIndex = ref(0);
const selectedTab = computed(() => props.tabs.at(selectedIndex.value));
watch(
  () => props.tabs.length,
  (newLength) => {
    if (selectedIndex.value > newLength - 1) {
      selectedIndex.value = 0;
    }
  },
);

const tabs = useTemplateRef<{ $el?: HTMLElement }>("tabsRef");

const copyTeleportTarget = computed(() => {
  const el = tabs.value?.$el as HTMLElement | undefined;
  return el?.querySelector('[role="tablist"]');
});

const isCopied = ref(false);
const handleCopy = async () => {
  const code = selectedTab.value?.code;
  if (!code) return;

  await navigator.clipboard.writeText(code);
  isCopied.value = true;
  setTimeout(() => (isCopied.value = false), 2000);
};
</script>

<template>
  <OnyxTabs
    ref="tabsRef"
    v-model="selectedIndex"
    class="onyx-code-group"
    label="Code snippet"
    density="compact"
  >
    <OnyxTab
      v-for="(tab, index) in props.tabs"
      :key="index"
      :value="index"
      :disabled="tab.disabled"
      :skeleton="tab.skeleton"
    >
      <template #tab>
        <OnyxIcon v-if="tab.icon" :icon="tab.icon" size="16px" />
        {{ tab.label }}
      </template>

      <pre
        class="onyx-code-group__snippet"
        v-bind="tab.attributes"
      ><slot :selected-index>{{ tab.code }}</slot></pre>

      <span v-if="tab.language" class="onyx-text--small">
        {{ tab.language }}
      </span>
    </OnyxTab>

    <!-- TODO: replace once OnyxTabs supports the action slot: https://github.com/SchwarzIT/onyx/issues/4370 -->
    <Teleport v-if="copyTeleportTarget" :to="copyTeleportTarget" defer>
      <OnyxSystemButton
        v-if="!isCopied"
        class="onyx-code-group__copy"
        label="Copy code snippet"
        :icon="iconFileCopy"
        @click="handleCopy"
      />
      <OnyxTag v-else class="onyx-code-group__copy" label="Copied!" color="success" />
    </Teleport>
  </OnyxTabs>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-code-group {
  @include layers.component() {
    --onyx-code-group-border: var(--onyx-1px-in-rem) solid
      var(--onyx-color-component-border-neutral);
    --onyx-code-group-tablist-padding: var(--onyx-density-xs);
    --onyx-tabs-tablist-margin-bottom: 0;
    border-radius: var(--onyx-radius-md);

    &__snippet {
      white-space: pre-wrap;

      code {
        font-family: inherit;
      }

      code .line {
        display: block;
      }
    }

    &__copy {
      margin-left: auto;
    }

    .onyx-tabs {
      &__tablist {
        background-color: var(--onyx-color-base-background-blank);
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        padding: var(--onyx-code-group-tablist-padding);
        border-bottom: var(--onyx-code-group-border);
        border: var(--onyx-code-group-border);

        &:has(.onyx-tab:focus-visible) {
          margin: 0;
          padding: var(--onyx-code-group-tablist-padding);
        }
      }
    }

    .onyx-tab {
      font-size: var(--onyx-font-size-md);
      line-height: var(--onyx-font-line-height-md);

      &:focus-visible {
        // outline: 0;
      }

      &__panel {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        font-family: var(--onyx-font-family-mono);
        padding: var(--onyx-density-md);
        background: var(--onyx-color-base-background-tinted);
        border: var(--onyx-code-group-border);
        border-top: none;

        display: flex;
        gap: var(--onyx-density-lg);
        justify-content: space-between;
      }
    }
  }
}
</style>
