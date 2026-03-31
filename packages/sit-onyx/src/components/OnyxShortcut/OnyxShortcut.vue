<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};

type FlatShortcutItem =
  | { type: "key"; name: KeyboardKey; stepIndex: number }
  | { type: "separator"; label: string };
</script>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { _unstableUseShortcut } from "../../composables/useShortcut.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import type { KeyboardKey } from "../../utils/keyboard.js";
import OnyxKey from "../OnyxKey/OnyxKey.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type {
  OnyxShortcutProps,
  ShortcutItemAll,
  ShortcutItemAny,
  ShortcutSequenceStep,
} from "./types.js";

const SEPARATORS = {
  ALL: "+",
  ANY: "/",
  SEQUENCE: "→",
  GROUP_OPEN: "(",
  GROUP_CLOSE: ")",
} as const;

const props = withDefaults(defineProps<OnyxShortcutProps>(), {
  os: "auto",
  skeleton: SKELETON_INJECTED_SYMBOL,
  disabled: false,
  cleanupDelay: 5000,
  highlight: false,
});

const skeleton = useSkeletonContext(props);

const emit = defineEmits<{
  /**
   * Emitted when the full shortcut sequence is completed successfully.
   */
  complete: [];
  /**
   * Emitted when a step in the shortcut sequence is completed.
   */
  stepComplete: [step: ShortcutSequenceStep, stepIndex: number];
}>();

const isGroupAny = (item: unknown): item is ShortcutItemAny => {
  return typeof item === "object" && item !== null && "any" in item;
};

const isGroupAll = (item: unknown): item is ShortcutItemAll => {
  return typeof item === "object" && item !== null && "all" in item;
};

const { sequence, cleanupDelay, element } = toRefs(props);

const isShortcutHighlightingDisabled = computed(() => props.disabled || props.highlight !== "auto");
const { isKeyHighlighted } = _unstableUseShortcut({
  element,
  disabled: isShortcutHighlightingDisabled,
  sequence,
  cleanupDelay,
  onStepComplete: (step, stepIndex) => {
    emit("stepComplete", step, stepIndex);
  },
  onComplete: () => {
    emit("complete");
  },
});

const flattenedItems = computed(() => {
  const result: FlatShortcutItem[] = [];

  props.sequence.forEach((step, stepIndex) => {
    // Determine if it's an 'all' or 'any' step
    const items = "all" in step ? step.all : step.any;
    const stepSeparator = "all" in step ? SEPARATORS.ALL : SEPARATORS.ANY;

    items.forEach((item, itemIndex) => {
      if (isGroupAny(item) || isGroupAll(item)) {
        const subKeys = isGroupAny(item) ? item.any : item.all;
        const subSeparator = isGroupAny(item) ? SEPARATORS.ANY : SEPARATORS.ALL;

        result.push({ type: "separator", label: SEPARATORS.GROUP_OPEN });

        subKeys.forEach((subKey, subIdx) => {
          result.push({ type: "key", name: subKey as KeyboardKey, stepIndex });
          if (subIdx < subKeys.length - 1 && !item.hideSeparator) {
            result.push({ type: "separator", label: subSeparator });
          }
        });

        result.push({ type: "separator", label: SEPARATORS.GROUP_CLOSE });
      } else {
        // Simple key
        result.push({ type: "key", name: item as KeyboardKey, stepIndex });
      }

      // Add separator between items in the same step
      if (itemIndex < items.length - 1 && !step.hideSeparator) {
        result.push({ type: "separator", label: stepSeparator });
      }
    });

    // Add sequence separator between steps
    if (stepIndex < props.sequence.length - 1) {
      result.push({ type: "separator", label: SEPARATORS.SEQUENCE });
    }
  });

  return result;
});
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-component', 'onyx-shortcut-skeleton']" />
  <span v-else :class="['onyx-component', 'onyx-shortcut']">
    <template v-for="(item, index) in flattenedItems" :key="index">
      <OnyxKey
        v-if="item.type === 'key'"
        :name="item.name"
        :os="props.os"
        :highlight="
          props.highlight === true ||
          (!isShortcutHighlightingDisabled && isKeyHighlighted(item.name, item.stepIndex))
        "
      />

      <span v-else class="onyx-shortcut__separator">
        {{ item.label }}
      </span>
    </template>
  </span>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-shortcut {
  @include layers.component() {
    display: inline-flex;
    align-items: center;
    gap: var(--onyx-spacing-4xs);
    font-family: monospace;

    &__separator {
      color: var(--onyx-color-text-icons-neutral-medium);
    }

    &__group {
      display: inline-flex;
      align-items: center;
      gap: var(--onyx-spacing-4xs);
      font-family: monospace;
    }
  }
}

.onyx-shortcut-skeleton {
  @include layers.component() {
    display: inline-block;
    width: 4rem;
    height: 1.5rem;
    border-radius: var(--onyx-radius-sm);
  }
}
</style>
