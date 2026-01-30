<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script setup lang="ts">
import { useGlobalEventListener } from "@sit-onyx/headless";
import { computed, onBeforeMount, onBeforeUnmount, ref } from "vue";
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
  highlightWhenPressed: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the pressed key and props key match.
   */
  pressMatch: [key: KeyboardKey, event: KeyboardEvent];
}>();

const skeleton = useSkeletonContext(props);
const isPressed = ref(false);

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

const isHighlighted = computed<boolean>(
  () => props.highlighted || (props.highlightWhenPressed && isPressed.value),
);

const visualLabel = computed<string>(() => {
  const os = actualOS.value;
  const key = props.keyName;
  const fallback = GENERIC_KEY_SYMBOLS[key] ?? String(props.keyName);

  if (os === "macOS") {
    return MAC_KEY_SYMBOLS[key] ?? fallback;
  }

  if (os === "windows") {
    return WINDOWS_KEY_SYMBOLS[key] ?? fallback;
  }

  return fallback;
});

const handleKeydown = (event: KeyboardEvent) => {
  const pressedKey = keyboardEventToKeyboardKey(event);
  if (pressedKey === props.keyName) {
    emit("pressMatch", pressedKey, event);
    isPressed.value = true;
  }
};

const resetPressedState = () => {
  isPressed.value = false;
};

const handleKeyup = (event: KeyboardEvent) => {
  const keyboardKey = keyboardEventToKeyboardKey(event);

  if (
    keyboardKey === props.keyName ||
    (keyboardKey === "Meta" && (detectedOs.value === "macOS" || detectedOs.value === "generic"))
  ) {
    resetPressedState();
  }
};

useGlobalEventListener({ type: "keydown", listener: handleKeydown });
useGlobalEventListener({ type: "keyup", listener: handleKeyup });

onBeforeMount(() => {
  window.addEventListener("blur", resetPressedState);
  window.addEventListener("focus", resetPressedState);
});

onBeforeUnmount(() => {
  window.removeEventListener("blur", resetPressedState);
  window.removeEventListener("focus", resetPressedState);
});

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
    --onyx-key-background: var(--onyx-color-base-background-tinted);
    --onyx-key-border-color: var(--onyx-color-base-neutral-300);
    --onyx-key-border-radius: var(--onyx-radius-sm);
    --onyx-key-color: var(--onyx-color-text-icons-neutral-medium);
    --onyx-key-background-highlighted: var(--onyx-color-base-neutral-200);
    --onyx-key-border-color-highlighted: var(--onyx-color-base-neutral-400);
    --onyx-key-size: 1.5rem;
  }
}

.onyx-key {
  @include layers.component() {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 0.5em;

    height: var(--onyx-key-size);
    min-width: var(--onyx-key-size);

    font-size: 0.9em;
    line-height: 1;

    background-color: var(--onyx-key-background);
    border: 1px solid var(--onyx-key-border-color);
    border-radius: var(--onyx-key-border-radius);
    color: var(--onyx-key-color);

    &--highlighted {
      background-color: var(--onyx-key-background-highlighted);
      border-color: var(--onyx-key-border-color-highlighted);
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
