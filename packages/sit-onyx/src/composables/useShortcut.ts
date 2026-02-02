import { debounce, useGlobalEventListener } from "@sit-onyx/headless";
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  unref,
  type MaybeRef,
} from "vue";
import { isTypeableElement } from "../utils/dom.js";
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

export type ShortcutEventTarget = "sequenceComplete" | "stepComplete" | "keydown" | "none";

type UseShortcutOptions = {
  /**
   * Sequence of shortcut steps.
   *
   * @example
   * [{ all: ["Control", "C"] }, { any: ["V", "Insert"] }]
   */
  sequence: MaybeRef<ShortcutStep[]>;
  /**
   * Callback invoked when a step in the shortcut sequence is completed.
   */
  onStepComplete?: (
    step: ShortcutStep,
    stepIndex: number,
    key: KeyboardKey,
    event: KeyboardEvent,
  ) => void;
  /**
   * Callback invoked when the shortcut sequence is completed.
   */
  onSequenceComplete?: (key: KeyboardKey, event: KeyboardEvent) => void;
  /**
   * Element on which to listen for the shortcut events.
   * If not provided, the events are listened on the global window object.
   */
  element?: MaybeRef<HTMLElement | undefined | null>;
  /**
   * Delay in milliseconds before cleaning up the pressed keys after inactivity.
   *
   * @default 5000
   */
  cleanupDelay?: MaybeRef<number>;
  /**
   * Targets on which to call `event.preventDefault()` during keydown event.
   *
   * - `sequenceComplete` - prevent default when the full sequence is completed.
   * - `stepComplete` - prevent default when step is completed.
   * - `keydown` - prevent default on every keydown event.
   * - `none` - do not prevent default on any event.
   *
   * @default "stepComplete"
   */
  preventDefaultOn?: MaybeRef<ShortcutEventTarget>;
  /**
   * Targets on which to call `event.stopPropagation()` during keydown event.
   *
   * - `sequenceComplete` - stop propagation when the full sequence is completed.
   * - `stepComplete` - stop propagation when step is completed.
   * - `keydown` - stop propagation on every keydown event.
   * - `none` - do not stop propagation on any event.
   *
   * @default "stepComplete"
   */
  stopPropagationOn?: MaybeRef<ShortcutEventTarget>;
  /**
   * Whether the shortcut handling is disabled.
   */
  disabled?: MaybeRef<boolean>;
  /**
   * Whether to listen to repeated keydown events.
   *
   * @default false
   */
  listenOnRepeat?: MaybeRef<boolean>;
};

/**
 * @experimental
 * @deprecated This API is unstable and might change in patch releases.
 */
export const _unstableUseShortcut = (options: UseShortcutOptions) => {
  const sequence = computed(() => unref(options.sequence) ?? []);
  const cleanupDelay = computed(() => unref(options.cleanupDelay) ?? 5000);
  const preventDefaultOn = computed(() => unref(options.preventDefaultOn) ?? "stepComplete");
  const stopPropagationOn = computed(() => unref(options.stopPropagationOn) ?? "stepComplete");
  const listenOnRepeat = computed(() => unref(options.listenOnRepeat) ?? false);
  const element = computed(() => unref(options.element) ?? null);
  const isDisabled = computed(() => unref(options.disabled) ?? false);
  const isGlobalKeydownDisabled = computed(() => element.value !== null || isDisabled.value);
  const pressedKeys = ref<Set<KeyboardKey>>(new Set());
  const currentStepIndex = ref(0);
  const shouldAssignHighlightOnKeyup = ref(false);
  const highlightedStepIndex = ref(0);
  const { os } = useOperatingSystem();

  const cleanup = () => {
    pressedKeys.value.clear();
    currentStepIndex.value = 0;
    highlightedStepIndex.value = 0;
  };

  const debouncedCleanup = computed(() => debounce(cleanup, cleanupDelay.value));

  const keydownListener = (event: KeyboardEvent) => {
    const isActive = element.value
      ? document.activeElement === element.value || element.value.contains(document.activeElement)
      : true;

    if (!isActive) {
      return;
    }

    if (isDisabled.value) {
      return;
    }

    const isTypeableElementActive = isTypeableElement(document.activeElement);

    const isPrintableKey =
      event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

    /**
     * When a text-input capable element is focused (input, textarea, contenteditable),
     * shortcuts are suspended only for printable keys without modifier keys.
     */
    if (isTypeableElementActive && isPrintableKey) {
      return;
    }

    if (preventDefaultOn.value === "keydown") {
      event.preventDefault();
    }

    if (stopPropagationOn.value === "keydown") {
      event.stopPropagation();
    }

    if (event.repeat && !listenOnRepeat.value) {
      return;
    }

    debouncedCleanup.value();

    if (!sequence.value.length) {
      return;
    }

    const keyboardKey = keyboardEventToKey(event);

    if (keyboardKey === "unknown") {
      return;
    }

    pressedKeys.value.add(keyboardKey);

    const currentStep = sequence.value[currentStepIndex.value];

    if (!currentStep) {
      return;
    }

    if (!isKeyRelevantForStep(keyboardKey, currentStep)) {
      cleanup();
      return;
    }

    const isMatched = matchStep(currentStep, pressedKeys.value);

    if (!isMatched) {
      return;
    }

    shouldAssignHighlightOnKeyup.value = true;

    if (currentStepIndex.value === sequence.value.length - 1) {
      if (preventDefaultOn.value === "sequenceComplete") {
        event.preventDefault();
      }

      if (stopPropagationOn.value === "sequenceComplete") {
        event.stopPropagation();
      }

      options.onStepComplete?.(currentStep, currentStepIndex.value, keyboardKey, event);
      options.onSequenceComplete?.(keyboardKey, event);
      currentStepIndex.value = 0;
    } else {
      if (preventDefaultOn.value === "stepComplete") {
        event.preventDefault();
      }

      if (stopPropagationOn.value === "stepComplete") {
        event.stopPropagation();
      }

      options.onStepComplete?.(currentStep, currentStepIndex.value, keyboardKey, event);
      currentStepIndex.value += 1;
    }
  };

  const keyupListener = (event: KeyboardEvent) => {
    if (isDisabled.value) {
      return;
    }

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

  onMounted(() => {
    if (isDisabled.value) {
      return;
    }

    if (element.value) {
      element.value.addEventListener("keydown", keydownListener);
      element.value.addEventListener("keyup", keyupListener);
      element.value.addEventListener("blur", cleanup);
      element.value.addEventListener("focus", cleanup);
    }
  });

  onBeforeMount(() => {
    if (isDisabled.value) {
      return;
    }

    window.addEventListener("blur", cleanup);
    window.addEventListener("focus", cleanup);
  });

  onBeforeUnmount(() => {
    if (isDisabled.value) {
      return;
    }

    debouncedCleanup.value.abort();

    if (element.value) {
      element.value.removeEventListener("keydown", keydownListener);
      element.value.removeEventListener("keyup", keyupListener);
      element.value.removeEventListener("blur", cleanup);
      element.value.removeEventListener("focus", cleanup);
    }

    window.removeEventListener("blur", cleanup);
    window.removeEventListener("focus", cleanup);
  });

  return {
    isKeyHighlighted,
    currentStepIndex,
    pressedKeys,
  };
};
