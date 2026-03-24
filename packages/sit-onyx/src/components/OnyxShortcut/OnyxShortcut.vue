<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
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

const isStepAll = (
  step: ShortcutSequenceStep,
): step is Extract<ShortcutSequenceStep, { all: unknown }> => {
  return "all" in step;
};

const isStepAny = (
  step: ShortcutSequenceStep,
): step is Extract<ShortcutSequenceStep, { any: unknown }> => {
  return "any" in step;
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
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-component', 'onyx-shortcut-skeleton']" />
  <span v-else :class="['onyx-component', 'onyx-shortcut']">
    <template v-for="(step, stepIndex) in props.sequence" :key="stepIndex">
      <template v-if="isStepAll(step)">
        <template v-for="(item, itemIndex) in step.all" :key="itemIndex">
          <template v-if="isGroupAny(item)">
            <span class="onyx-shortcut__group">
              <span class="onyx-shortcut__separator">{{ SEPARATORS.GROUP_OPEN }}</span>
              <template v-for="(subKey, subKeyIndex) in item.any" :key="subKeyIndex">
                <OnyxKey
                  :name="subKey"
                  :os="props.os"
                  :highlight="
                    props.highlight === true ||
                    (!isShortcutHighlightingDisabled && isKeyHighlighted(subKey, stepIndex))
                  "
                />
                <span
                  v-if="subKeyIndex < item.any.length - 1 && !item.hideSeparator"
                  class="onyx-shortcut__separator"
                >
                  {{ SEPARATORS.ANY }}
                </span>
              </template>
              <span class="onyx-shortcut__separator">{{ SEPARATORS.GROUP_CLOSE }}</span>
            </span>
          </template>

          <OnyxKey
            v-else
            :name="item as KeyboardKey"
            :os="props.os"
            :highlight="
              props.highlight === true ||
              (!isShortcutHighlightingDisabled && isKeyHighlighted(item as KeyboardKey, stepIndex))
            "
          />
          <span
            v-if="itemIndex < step.all.length - 1 && !step.hideSeparator"
            class="onyx-shortcut__separator"
          >
            {{ SEPARATORS.ALL }}
          </span>
        </template>
      </template>

      <template v-else-if="isStepAny(step)">
        <template v-for="(item, itemIndex) in step.any" :key="itemIndex">
          <template v-if="isGroupAll(item)">
            <span class="onyx-shortcut__group">
              <span class="onyx-shortcut__separator">{{ SEPARATORS.GROUP_OPEN }}</span>
              <template v-for="(subKey, subKeyIndex) in item.all" :key="subKeyIndex">
                <OnyxKey
                  :name="subKey"
                  :os="props.os"
                  :highlight="
                    props.highlight === true ||
                    (!isShortcutHighlightingDisabled && isKeyHighlighted(subKey, stepIndex))
                  "
                />
                <span
                  v-if="subKeyIndex < item.all.length - 1 && !item.hideSeparator"
                  class="onyx-shortcut__separator"
                >
                  {{ SEPARATORS.ALL }}
                </span>
              </template>
              <span class="onyx-shortcut__separator">{{ SEPARATORS.GROUP_CLOSE }}</span>
            </span>
          </template>

          <OnyxKey
            v-else
            :name="item as KeyboardKey"
            :os="props.os"
            :highlight="
              props.highlight === true ||
              (!isShortcutHighlightingDisabled && isKeyHighlighted(item as KeyboardKey, stepIndex))
            "
          />
          <span
            v-if="itemIndex < step.any.length - 1 && !step.hideSeparator"
            class="onyx-shortcut__separator"
          >
            {{ SEPARATORS.ANY }}
          </span>
        </template>
      </template>

      <span v-if="stepIndex < props.sequence.length - 1" class="onyx-shortcut__separator">
        {{ SEPARATORS.SEQUENCE }}
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
      user-select: none;
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
