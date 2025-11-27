<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script setup lang="ts" generic="TKeyName extends string = CanonicalKey">
import { computed } from "vue";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import type { OperatingSystem } from "../../types/index.js";
import { detectOperatingSystem } from "../../utils/dom.js";
import { isCanonicalSpecialKey, toCanonicalKey, type CanonicalKey } from "../../utils/shortcut.js";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import {
  MAP_CANONICAL_TO_DISPLAY_LABEL_BY_OS,
  MAP_CANONICAL_TO_SCREEN_READER_LABEL_BY_OS,
  type OnyxKeyProps,
} from "./types.js";

type Props = OnyxKeyProps<TKeyName>;

const props = withDefaults(defineProps<Props>(), {
  variant: "auto",
  pressed: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const skeleton = useSkeletonContext(props);

/**
 * Effective OS based on variant / auto-detect
 */
const effectiveOs = computed<OperatingSystem>(() => {
  if (props.variant !== "auto") {
    return props.variant;
  }
  return detectOperatingSystem();
});

/**
 * Canonical key for mapping (or raw if not special)
 */
const canonicalKey = computed<CanonicalKey | string>(() => toCanonicalKey(String(props.keyName)));

/**
 * Visible label
 */
const visualLabel = computed<string>(() => {
  const key = canonicalKey.value;
  const os = effectiveOs.value;

  if (typeof key === "string" && isCanonicalSpecialKey(key)) {
    const osMap = MAP_CANONICAL_TO_DISPLAY_LABEL_BY_OS[os] ?? {};
    const genericMap = MAP_CANONICAL_TO_DISPLAY_LABEL_BY_OS.generic ?? {};

    return osMap[key] ?? genericMap[key] ?? String(props.keyName);
  }

  // Non-special keys: show as provided (e.g. "A", "F5", "1", "?")
  return String(props.keyName);
});

/**
 * Screen reader label.
 * Visible content is overridden by aria-label for assistive tech.
 */
const ariaLabel = computed<string>(() => {
  if (props.label) return props.label;

  const key = canonicalKey.value;
  const os = effectiveOs.value;

  if (typeof key === "string" && isCanonicalSpecialKey(key)) {
    const osMap = MAP_CANONICAL_TO_SCREEN_READER_LABEL_BY_OS[os] ?? {};
    const genericMap = MAP_CANONICAL_TO_SCREEN_READER_LABEL_BY_OS.generic ?? {};

    return `${osMap[key] ?? genericMap[key] ?? String(props.keyName)} key`;
  }

  return `${String(props.keyName)} key`;
});
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-component', 'onyx-key-skeleton']" />
  <kbd
    v-else
    :class="['onyx-component', 'onyx-key']"
    :data-os="effectiveOs"
    :data-pressed="props.pressed || undefined"
    :aria-label="ariaLabel"
  >
    {{ visualLabel }}
  </kbd>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-key-skeleton,
.onyx-key {
  @include layers.component() {
    --onyx-key-font-family: monospace;
    --onyx-key-background: var(--onyx-color-base-background-tinted);
    --onyx-key-border-color: var(--onyx-color-base-neutral-300);
    --onyx-key-border-radius: var(--onyx-radius-sm);
    --onyx-key-color: var(--onyx-color-text-icons-neutral-medium);
    --onyx-key-background-pressed: var(--onyx-color-base-neutral-200);
    --onyx-key-border-color-pressed: var(--onyx-color-base-neutral-400);
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

    font-family: var(--onyx-key-font-family);
    font-size: 0.9em;
    line-height: 1;

    background-color: var(--onyx-key-background);
    border: 1px solid var(--onyx-key-border-color);
    border-radius: var(--onyx-key-border-radius);
    color: var(--onyx-key-color);

    &[data-pressed="true"] {
      background-color: var(--onyx-key-background-pressed);
      border-color: var(--onyx-key-border-color-pressed);
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
