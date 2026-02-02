<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script setup lang="ts">
import { toRefs } from "vue";
import { _unstableUseShortcut } from "../../composables/useShortcut.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { isAllStep, isAnyStep, type KeyboardKey, type ShortcutStep } from "../../utils/keyboard.js";
import OnyxKey from "../OnyxKey/OnyxKey.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxShortcutProps } from "./types.js";

const SEPARATORS = {
  ALL: "+",
  ANY: "/",
  SEQUENCE: "→",
} as const;

const props = withDefaults(defineProps<OnyxShortcutProps>(), {
  os: "auto",
  skeleton: SKELETON_INJECTED_SYMBOL,
  preventDefaultOn: "stepComplete",
  stopPropagationOn: "stepComplete",
  disabled: false,
  listenOnRepeat: false,
  cleanupDelay: 5000,
  highlight: false,
});

const skeleton = useSkeletonContext(props);

const emit = defineEmits<{
  /**
   * Emitted when the shortcut sequence is successfully completed.
   */
  sequenceComplete: [key: KeyboardKey, event: KeyboardEvent];
  /**
   * Emitted when a step in the shortcut sequence is completed.
   */
  stepComplete: [step: ShortcutStep, stepIndex: number, key: KeyboardKey, event: KeyboardEvent];
}>();

const {
  preventDefaultOn,
  stopPropagationOn,
  sequence,
  listenOnRepeat,
  disabled,
  cleanupDelay,
  element,
} = toRefs(props);

const { isKeyHighlighted } = _unstableUseShortcut({
  element,
  disabled,
  sequence,
  cleanupDelay,
  listenOnRepeat,
  preventDefaultOn,
  stopPropagationOn,
  onStepComplete: (...args) => {
    emit("stepComplete", ...args);
  },
  onSequenceComplete: (...args) => {
    emit("sequenceComplete", ...args);
  },
});
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-component', 'onyx-shortcut-skeleton']" />
  <span v-else :class="['onyx-component', 'onyx-shortcut']">
    <template v-for="(step, stepIndex) in props.sequence" :key="stepIndex">
      <template v-if="isAllStep(step)">
        <template v-for="(key, keyIndex) in step.all" :key="keyIndex">
          <OnyxKey
            :name="key"
            :os="props.os"
            :highlighted="props.highlight && isKeyHighlighted(key, stepIndex)"
          />
          <span
            v-if="keyIndex < step.all.length - 1 && !step.separatorHidden"
            class="onyx-shortcut__separator"
          >
            {{ SEPARATORS.ALL }}
          </span>
        </template>
      </template>

      <template v-if="isAnyStep(step)">
        <template v-for="(key, keyIndex) in step.any" :key="keyIndex">
          <OnyxKey
            :name="key"
            :os="props.os"
            :highlighted="props.highlight && isKeyHighlighted(key, stepIndex)"
          />
          <span
            v-if="keyIndex < step.any.length - 1 && !step.separatorHidden"
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
    gap: 0.25rem;
    font-family: monospace;

    &__separator {
      color: var(--onyx-color-text-icons-neutral-medium);
      user-select: none;
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
