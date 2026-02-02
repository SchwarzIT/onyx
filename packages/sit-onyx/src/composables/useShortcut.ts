import { debounce, useGlobalEventListener } from "@sit-onyx/headless";
import { computed, onBeforeUnmount, ref, unref, watch, type MaybeRef } from "vue";
import type { Nullable } from "../types/utils.js";
import {
  isAllStep,
  isAnyStep,
  keyboardEventToKey,
  type KeyboardKey,
  type ShortcutStep,
} from "../utils/keyboard.js";
import { useOperatingSystem } from "./useOperatingSystem.js";

/**
 * Check whether the current pressed keys satisfy a step.
 */
const matchStep = (step: ShortcutStep, pressed: Set<KeyboardKey>): boolean => {
  if (isAllStep(step)) {
    return step.all.every((key) => pressed.has(key));
  }

  if (isAnyStep(step)) {
    return step.any.some((key) => pressed.has(key));
  }

  return false;
};

/**
 * Check whether a key is relevant for a given step.
 */
const isKeyRelevantForStep = (key: KeyboardKey, step: ShortcutStep): boolean => {
  if (isAllStep(step)) {
    return step.all.includes(key);
  }

  if (isAnyStep(step)) {
    return step.any.includes(key);
  }

  return false;
};

type UseShortcutOptions = {
  /**
   * Sequence of shortcut steps.
   *
   * @example `[{ all: ["Control", "C"] }, { any: ["V", "Insert"] }]`
   */
  sequence: MaybeRef<ShortcutStep[]>;
  /**
   * Element for listening to keyboard events.
   *
   * @default Global window object
   */
  element?: MaybeRef<Nullable<HTMLElement>>;
  /**
   * Delay in milliseconds before cleaning up the pressed keys after inactivity.
   *
   * @default 5000
   */
  cleanupDelay?: MaybeRef<number>;
  /**
   * Whether the shortcut handling is disabled.
   */
  disabled?: MaybeRef<boolean>;
  /**
   * Whether to listen to repeated keydown events.
   *
   * @default false
   */
  // TODO: clarify why this is needed
  listenOnRepeat?: MaybeRef<boolean>;
  /**
   * Callback invoked when the full shortcut sequence is completed.
   */
  onComplete?: () => void;
  /**
   * Callback invoked when a single step of the shortcut sequence is completed.
   */
  onStepComplete?: (step: ShortcutStep, stepIndex: number) => void;
};

/**
 * Composable for managing a keyboard shortcut that can consist of one or multiple steps.
 * If you want to also visualize the shortcut, use the `OnyxShortcut` component instead.
 *
 * @experimental
 * @deprecated This API is unstable and might change in patch releases.
 */
export const _unstableUseShortcut = (options: UseShortcutOptions) => {
  const sequence = computed(() => unref(options.sequence));
  const cleanupDelay = computed(() => unref(options.cleanupDelay) ?? 5000);
  const listenOnRepeat = computed(() => unref(options.listenOnRepeat) ?? false);
  const element = computed(() => unref(options.element));
  const isDisabled = computed(() => unref(options.disabled) ?? false);
  const isGlobalKeydownDisabled = computed(() => !!element.value || isDisabled.value);
  const pressedKeys = ref(new Set<KeyboardKey>());
  const currentStepIndex = ref(0);
  const shouldAssignHighlightOnKeyup = ref(false);
  const highlightedStepIndex = ref(0);
  const { os } = useOperatingSystem();

  const cleanup = () => {
    pressedKeys.value.clear();
    currentStepIndex.value = 0;
    highlightedStepIndex.value = 0;
  };

  const debouncedCleanup = debounce(cleanup, cleanupDelay);

  const keydownListener = (event: KeyboardEvent) => {
    if (isDisabled.value) return;
    if (event.repeat && !listenOnRepeat.value) return;

    debouncedCleanup();

    if (!sequence.value.length) return;

    const keyboardKey = keyboardEventToKey(event);
    if (keyboardKey === "unknown") return;

    pressedKeys.value.add(keyboardKey);

    const currentStep = sequence.value[currentStepIndex.value];
    if (!currentStep) return;

    if (!isKeyRelevantForStep(keyboardKey, currentStep)) {
      cleanup();
      return;
    }

    const isMatched = matchStep(currentStep, pressedKeys.value);
    if (!isMatched) return;

    shouldAssignHighlightOnKeyup.value = true;

    if (currentStepIndex.value === sequence.value.length - 1) {
      options.onStepComplete?.(currentStep, currentStepIndex.value);
      options.onComplete?.();
      currentStepIndex.value = 0;
    } else {
      options.onStepComplete?.(currentStep, currentStepIndex.value);
      currentStepIndex.value += 1;
    }
  };

  const keyupListener = (event: KeyboardEvent) => {
    if (isDisabled.value) return;

    const keyboardKey = keyboardEventToKey(event);

    if (shouldAssignHighlightOnKeyup.value) {
      highlightedStepIndex.value = currentStepIndex.value;
      shouldAssignHighlightOnKeyup.value = false;
    }

    /**
     * **NOTE** In macOS, keys won't trigger "keyup" event when Meta key is pressed.
     * So, we reset everything on Meta key up to avoid stuck keys.
     */
    if (keyboardKey === "Meta" && (os.value === "macOS" || os.value === "generic")) {
      pressedKeys.value.clear();
    }

    pressedKeys.value.delete(keyboardKey);
  };

  const isKeyHighlighted = computed(
    () => (key: KeyboardKey, stepIndex: number) =>
      pressedKeys.value.has(key) && highlightedStepIndex.value === stepIndex,
  );

  useGlobalEventListener({
    type: "keydown",
    listener: keydownListener,
    disabled: isGlobalKeydownDisabled,
  });
  useGlobalEventListener({
    type: "keyup",
    listener: keyupListener,
    disabled: isGlobalKeydownDisabled,
  });

  const addElementListeners = (element: HTMLElement) => {
    element.addEventListener("keydown", keydownListener);
    element.addEventListener("keyup", keyupListener);
  };

  const removeElementListeners = (element?: Nullable<HTMLElement>) => {
    element?.removeEventListener("keydown", keydownListener);
    element?.removeEventListener("keyup", keyupListener);
  };

  watch(
    [element, isDisabled],
    ([newElement, disabled], [oldElement]) => {
      if (disabled) {
        removeElementListeners(newElement);
        return;
      }

      if (newElement !== oldElement) {
        removeElementListeners(oldElement);
        if (newElement) addElementListeners(newElement);
      }
    },
    { immediate: true },
  );

  onBeforeUnmount(() => {
    debouncedCleanup.abort();
    removeElementListeners(element.value);
  });

  return {
    isKeyHighlighted,
    currentStepIndex,
    pressedKeys,
  };
};
