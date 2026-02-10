<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script setup lang="ts">
import { useGlobalEventListener } from "@sit-onyx/headless";
import { computed, ref } from "vue";
import { useOperatingSystem, type OperatingSystem } from "../../composables/useOperatingSystem.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { injectI18n } from "../../i18n/index.js";
import {
  GENERIC_KEY_SYMBOLS,
  MAC_KEY_SYMBOLS,
  WINDOWS_KEY_SYMBOLS,
  keyboardEventToKey,
} from "../../utils/keyboard.js";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxKeyProps } from "./types.js";

const props = withDefaults(defineProps<OnyxKeyProps>(), {
  os: "auto",
  highlighted: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the given key was pressed.
   */
  pressed: [];
}>();

const { t } = injectI18n();
const skeleton = useSkeletonContext(props);
const { os: detectedOs } = useOperatingSystem();

const label = computed(() => t.value("key.label", { name: props.name }));

/**
 * Actually used operating system (considers auto detection).
 */
const actualOS = computed<OperatingSystem>(() => {
  return props.os == "auto" ? detectedOs.value : props.os;
});

const visualLabel = computed<string>(() => {
  const fallback = GENERIC_KEY_SYMBOLS[props.name] ?? props.name;
  if (actualOS.value === "macOS") return MAC_KEY_SYMBOLS[props.name] ?? fallback;
  if (actualOS.value === "windows") return WINDOWS_KEY_SYMBOLS[props.name] ?? fallback;
  return fallback;
});

const isPressed = ref(false);

const isHighlighted = computed(() => {
  return props.highlighted === "auto" ? isPressed.value : props.highlighted;
});

const handleKeydown = (event: KeyboardEvent) => {
  const pressedKey = keyboardEventToKey(event);
  isPressed.value = pressedKey === props.name;
  if (isPressed.value) emit("pressed");
};

const handleKeyup = () => {
  isPressed.value = false;
};

useGlobalEventListener({ type: "keydown", listener: handleKeydown });
useGlobalEventListener({ type: "keyup", listener: handleKeyup });

defineExpose({
  /**
   * Actually used operating system (considers auto detection).
   */
  actualOS,
});
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-component', 'onyx-key-skeleton']" />
  <kbd
    v-else
    :class="[
      'onyx-component',
      'onyx-key',
      'onyx-text',
      'onyx-text--monospace',
      { 'onyx-key--highlighted': isHighlighted },
    ]"
    :title="label"
  >
    <span aria-hidden="true" class="onyx-truncation-ellipsis">
      {{ visualLabel }}
    </span>

    <OnyxVisuallyHidden>{{ label }}</OnyxVisuallyHidden>
  </kbd>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-key-skeleton,
.onyx-key {
  @include layers.component() {
    --onyx-key-border-radius: var(--onyx-radius-sm);
    --onyx-key-size: 1.5rem;
  }
}

.onyx-key {
  @include layers.component() {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: var(--onyx-key-size);
    padding-inline: var(--onyx-density-2xs);

    background-color: var(--onyx-color-base-background-tinted);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    border-radius: var(--onyx-key-border-radius);
    color: var(--onyx-color-text-icons-neutral-medium);

    &--highlighted {
      background-color: var(--onyx-color-base-neutral-200);
      border-color: var(--onyx-color-base-neutral-400);
    }
  }
}

.onyx-key-skeleton {
  @include layers.component() {
    display: inline-block;
    min-width: var(--onyx-key-size);
    width: var(--onyx-key-size);
    min-height: var(--onyx-key-size);
    height: var(--onyx-key-size);
    border-radius: var(--onyx-key-border-radius);
  }
}
</style>
