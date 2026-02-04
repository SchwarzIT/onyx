<script lang="ts" setup>
import { computed, inject, onUnmounted, watch } from "vue";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import { CODE_TABS_INJECTION_KEY } from "../OnyxCodeTabs/types.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxTab from "../OnyxTab/OnyxTab.vue";
import type { OnyxCodeTabProps } from "./types.js";

const props = withDefaults(defineProps<OnyxCodeTabProps>(), {
  disabled: undefined,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

defineSlots<{
  /**
   * Tab panel / content. By default, the `code` property will be used (without syntax highlighting).
   */
  default?(): unknown;
  /**
   * Optional slot to override the tab content. By default, the `label` and `icon` property will be displayed.
   */
  tab?(): unknown;
}>();

const { t } = injectI18n();

const tabProps = useForwardProps(props, OnyxTab);
const tabsContext = inject(CODE_TABS_INJECTION_KEY, undefined);
const label = computed(() => props.label ?? t.value("codeTabs.tabLabel"));
const skeleton = useSkeletonContext(props);

watch(
  [() => props.value, () => props.code],
  ([newValue, newCode], [oldValue]) => {
    if (oldValue) {
      tabsContext?.tabs.value.delete(oldValue);
    }
    tabsContext?.tabs.value.set(newValue, newCode);
  },
  { immediate: true },
);

onUnmounted(() => {
  tabsContext?.tabs.value.delete(props.value);
});

const disabled = computed(() => {
  if (props.disabled != undefined) return props.disabled;
  return tabsContext && tabsContext.tabs.value.size <= 1;
});
</script>

<template>
  <OnyxTab v-bind="tabProps" :label class="onyx-code-tab" :disabled>
    <template #tab>
      <slot name="tab">
        <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
        {{ label }}
      </slot>
    </template>

    <div v-if="skeleton" class="onyx-code-tab__skeletons">
      <OnyxSkeleton v-for="i in 3" :key="i" class="onyx-code-tab__skeleton" />
    </div>

    <template v-else>
      <slot>
        <pre><code class="onyx-text--small">{{ props.code }}</code></pre>
      </slot>

      <span v-if="props.language" class="onyx-code-tab__language onyx-text--small">
        {{ props.language }}
      </span>
    </template>
  </OnyxTab>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-code-tab {
  @include layers.component() {
    &.onyx-tab__panel {
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
      font-family: var(--onyx-font-family-mono);
      padding: var(--onyx-density-md);
      background-color: var(--onyx-color-base-background-tinted);
      border: var(--onyx-code-group-border);
      border-top: none;

      display: flex;
      gap: var(--onyx-density-lg);
      justify-content: space-between;
      white-space: pre-wrap;

      pre,
      code {
        font-family: inherit;
        white-space: inherit;
      }
    }

    &__language {
      user-select: none;
    }

    &__skeletons {
      --onyx-code-tab-skeleton-gap: var(--onyx-density-xs);
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: var(--onyx-code-tab-skeleton-gap);
    }

    &__skeleton {
      $skeleton-count: 3;
      height: calc(
        1lh - (var(--onyx-code-tab-skeleton-gap) / $skeleton-count) * ($skeleton-count - 1)
      );
    }

    // styles if only 1 tab exists in the group
    &:only-of-type:disabled {
      .onyx-tab__label {
        color: var(--onyx-tab-color-selected);

        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
