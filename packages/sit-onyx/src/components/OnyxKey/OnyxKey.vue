<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script setup lang="ts">
import { useGlobalEventListener } from "@sit-onyx/headless";
import { computed, onBeforeMount, ref } from "vue";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import type { OperatingSystem } from "../../types/index.js";
import { detectOperatingSystem } from "../../utils/dom.js";
import { keyboardEventToKeyboardKey } from "../../utils/shortcut.js";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import {
  GENERIC_KEY_SYMBOLS,
  MAC_KEY_SYMBOLS,
  WINDOWS_KEY_SYMBOLS,
  type KeyboardKey,
  type OnyxKeyProps,
} from "./types.js";

const props = withDefaults(defineProps<OnyxKeyProps>(), {
  os: "auto",
  highlighted: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the pressed key and props key match.
   */
  pressMatch: [key: KeyboardKey, event: KeyboardEvent];
}>();

const skeleton = useSkeletonContext(props);

const detectedOs = ref<OperatingSystem>("generic");
onBeforeMount(() => {
  if (props.os === "auto") {
    detectedOs.value = detectOperatingSystem();
  }
});

/**
 * Actually used operating system (considers auto detection).
 */
const actualOS = computed<OperatingSystem>(() => {
  return props.os == "auto" ? detectedOs.value : props.os;
});

const visualLabel = computed<string>(() => {
  const fallback = GENERIC_KEY_SYMBOLS[props.keyName] ?? props.keyName;
  if (actualOS.value === "macOS") return MAC_KEY_SYMBOLS[props.keyName] ?? fallback;
  if (actualOS.value === "windows") return WINDOWS_KEY_SYMBOLS[props.keyName] ?? fallback;
  return fallback;
});

const isPressed = ref(false);

const isHighlighted = computed(() => {
  return props.highlighted === "auto" ? isPressed.value : props.highlighted;
});

const handleKeydown = (event: KeyboardEvent) => {
  const pressedKey = keyboardEventToKeyboardKey(event);
  isPressed.value = pressedKey === props.keyName;
  if (isPressed.value) emit("pressMatch", pressedKey, event);
};

const handleKeyup = () => {
  isPressed.value = false;
};

const disableKeyListeners = computed(() => props.highlighted !== "auto");

useGlobalEventListener({ type: "keydown", listener: handleKeydown, disabled: disableKeyListeners });
useGlobalEventListener({ type: "keyup", listener: handleKeyup, disabled: disableKeyListeners });

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
  >
    {{ visualLabel }}
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

    height: var(--onyx-key-size);
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
    width: var(--onyx-key-size);
    height: var(--onyx-key-size);
    border-radius: var(--onyx-key-border-radius);
  }
}
</style>
