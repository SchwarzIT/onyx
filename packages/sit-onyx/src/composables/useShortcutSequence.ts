import { useGlobalEventListener } from "@sit-onyx/headless";
import { computed, ref, unref, type MaybeRef } from "vue";
import {
  getCanonicalKeyFromEvent,
  isAllStep,
  isAnyStep,
  toCanonicalKey,
  type ShortcutStep,
  type ShortcutToken,
} from "../utils/shortcut.js";

type ParsedStep = {
  all: ShortcutToken[];
  any: ShortcutToken[];
};

/**
 * Normalize sequence into canonical tokens.
 */
const parseSequence = (sequence: ShortcutStep[]): ParsedStep[] =>
  sequence.map((step) => {
    const allRaw = isAllStep(step) ? step.all : [];
    const anyRaw = isAnyStep(step) ? step.any : [];

    return {
      all: allRaw.map(toCanonicalKey),
      any: anyRaw.map(toCanonicalKey),
    };
  });

/**
 * Check whether the current pressed keys satisfy a step.
 */
const matchStep = (step: ParsedStep, pressed: Set<ShortcutToken>): boolean => {
  const { all, any } = step;

  if (all.length > 0) {
    return all.every((key) => pressed.has(key));
  }

  if (any.length > 0) {
    return any.some((key) => pressed.has(key));
  }

  // Empty step: always matches
  return true;
};

export type UseShortcutSequenceOptions = {
  /**
   * If `true`, preventDefault is called for key events that complete a step in the sequence.
   */
  preventDefault?: MaybeRef<boolean>;
  /**
   * If `true`, stopPropagation is called for key events that complete a step in the sequence.
   */
  stopPropagation?: MaybeRef<boolean>;
  /**
   * Sequence of shortcut steps.
   *
   * @example
   * [{ all: ["ctrl", "c"] }, { any: ["v", "insert"] }]
   */
  sequence: MaybeRef<ShortcutStep[]>;
  /**
   * Timeout in milliseconds after which the sequence is reset if no further keys are pressed.
   *
   * @default 1000
   */
  stepTimeout?: MaybeRef<number>;
  /**
   * Callback invoked when the full sequence is successfully matched.
   */
  listener?: () => void;
};

/**
 * @experimental
 * @deprecated This API is unstable and might change in patch releases.
 */
export const _unstableUseShortcutSequence = (options: UseShortcutSequenceOptions) => {
  const sequence = computed(() => unref(options.sequence) ?? []);
  const preventDefault = computed(() => unref(options.preventDefault) ?? true);
  const stopPropagation = computed(() => unref(options.stopPropagation) ?? false);
  const stepTimeout = computed(() => unref(options.stepTimeout) ?? 1000);
  const parsedSequence = computed(() => parseSequence(sequence.value));
  const isSingleStep = computed(() => parsedSequence.value.length <= 1);

  /**
   * Current shortcut step index in the sequence.
   */
  const stepIndex = ref<number>(0);
  /**
   * Holds all currently pressed keys.
   */
  const pressed = ref<Set<ShortcutToken>>(new Set());
  /**
   * Keys that are relevant for the current step and currently pressed.
   */
  const activeStepPressed = ref<Set<ShortcutToken>>(new Set());
  /**
   * Maps a canonical key to the step index that "owns" its highlight.
   * This lets us avoid double-highlighting and weird jumps.
   */
  const keyOwnerStep = ref(new Map<ShortcutToken, number>());
  /**
   * Whether the full sequence has been matched and is in "completed" state.
   * We keep highlights until keys are released or blur happens.
   */
  const isCompleted = ref<boolean>(false);
  /**
   * Timeout ID for resetting the sequence after inactivity.
   */
  let timeoutId: number | null = null;

  const clearTimer = () => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const resetSequence = () => {
    clearTimer();
    activeStepPressed.value.clear();
    keyOwnerStep.value.clear();
    stepIndex.value = 0;
    isCompleted.value = false;
  };

  const resetAll = () => {
    resetSequence();
    pressed.value.clear();
  };

  /**
   * Schedule reset between steps for multi-step sequences.
   */
  const scheduleInterStepReset = () => {
    clearTimer();

    if (!isSingleStep.value && stepIndex.value > 0 && !isCompleted.value) {
      timeoutId = window.setTimeout(() => {
        resetSequence();
      }, stepTimeout.value);
    }
  };

  const isKeyRelevantForStep = (key: ShortcutToken, step: ParsedStep): boolean =>
    step.all.includes(key) || step.any.includes(key);

  const keydownListener = (event: KeyboardEvent) => {
    clearTimer();

    const steps = parsedSequence.value;
    if (!steps.length) return;

    const currentStep = steps[stepIndex.value];
    if (!currentStep) return;

    const canonical = getCanonicalKeyFromEvent(event);
    pressed.value.add(canonical);

    // Ignore keys that are not part of the current step.
    if (!isKeyRelevantForStep(canonical, currentStep)) {
      return;
    }

    activeStepPressed.value.add(canonical);

    if (!keyOwnerStep.value.has(canonical)) {
      keyOwnerStep.value.set(canonical, stepIndex.value);
    }

    const matched = matchStep(currentStep, activeStepPressed.value);

    if (!matched) {
      // Not enough relevant keys yet; wait for more.
      return;
    }

    if (preventDefault.value) {
      event.preventDefault();
    }
    if (stopPropagation.value) {
      event.stopPropagation();
    }

    const isLast = stepIndex.value === steps.length - 1;

    if (isLast) {
      isCompleted.value = true;
      options.listener?.();
      // Do not reset immediately — keep highlight until keyup/blur/resetAll.
      return;
    }

    // Move to next step.
    // Keep keyOwnerStep as-is: this preserves stable highlight
    stepIndex.value = stepIndex.value + 1;
    activeStepPressed.value.clear();

    // Schedule reset if no further keys are pressed.
    scheduleInterStepReset();
  };

  const keyupListener = (event: KeyboardEvent) => {
    const key = getCanonicalKeyFromEvent(event);

    // Meta / Control edge case: other keyups may be lost, so we need to clear those sets.
    if (key === "meta" || key === "control") {
      activeStepPressed.value.clear();
      keyOwnerStep.value.clear();
      pressed.value.clear();
    }

    pressed.value.delete(key);
    activeStepPressed.value.delete(key);
    keyOwnerStep.value.delete(key);

    // After a completed sequence: reset once all keys are released.
    if (isCompleted.value && pressed.value.size === 0) {
      resetSequence();
    }
  };

  const blurListener = () => {
    resetAll();
  };

  /**
   * Decide if a key should be visually highlighted.
   */
  const isHighlightedKey = computed(() => (key: string, stepIndexFromKey: number): boolean => {
    const canonical = toCanonicalKey(key);
    if (!pressed.value.has(canonical)) {
      return false;
    }

    const occurrences = parsedSequence.value.reduce(
      (count, step) =>
        count + (step.all.includes(canonical) || step.any.includes(canonical) ? 1 : 0),
      0,
    );

    /**
     * If key occurs only once, just highlight when pressed.
     */
    if (occurrences === 1) {
      return true;
    }

    return stepIndexFromKey === keyOwnerStep.value.get(canonical);
  });

  useGlobalEventListener({ type: "keydown", listener: keydownListener });
  useGlobalEventListener({ type: "keyup", listener: keyupListener });
  useGlobalEventListener({ type: "blur", listener: blurListener });

  return {
    /**
     * Current step index in the sequence.
     */
    stepIndex,
    /**
     * Set of currently pressed keys.
     */
    pressed,
    /**
     * Predicate to check if a key is highlighted.
     */
    isHighlightedKey,
  };
};
