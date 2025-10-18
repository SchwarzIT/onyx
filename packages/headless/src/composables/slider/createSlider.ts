import { computed, onBeforeUnmount, ref, unref, watch, type MaybeRef, type Ref } from "vue";
import { areArraysEqual } from "../../utils/array.js";
import { createBuilder, createElRef } from "../../utils/builder.js";
import { isFocusVisible } from "../../utils/dom.js";
import { MathUtils } from "../../utils/math.js";
import type { Nullable } from "../../utils/types.js";

export type SliderMark =
  | {
      value: number;
      label?: string;
    }
  | number;

export type SliderOrientation = "horizontal" | "vertical";

export type CreateSliderOptions = {
  /**
   * Current value(s) of the slider.
   * Each value should be between min and max.
   *
   * @default [min]
   */
  values: Ref<number[]>;
  /**
   * Minimum value of the slider.
   *
   * @default 0
   */
  min: MaybeRef<number>;
  /**
   * Maximum value of the slider.
   *
   * @default 100
   */
  max: MaybeRef<number>;
  /**
   * Step size for the slider.
   *
   * @default 1
   */
  step: MaybeRef<number | null>;
  /**
   * Step size when holding shift key.
   *
   * @default 10
   */
  shiftStep?: MaybeRef<number>;
  /**
   * Whether the slider is disabled.
   *
   * @default false
   */
  disabled?: MaybeRef<boolean>;
  /**
   * Array of marks to display on the slider.
   *
   * @default false
   */
  marks?: MaybeRef<Nullable<SliderMark[] | boolean>>;
  /**
   * Aria label for the slider.
   *
   * @default undefined
   */
  label?: MaybeRef<string>;
  /**
   * Orientation of the slider.
   *
   * @default "horizontal"
   */
  orientation?: MaybeRef<SliderOrientation>;
  /**
   * Callback when the value changes during interaction.
   * Note: This is called during interaction (dragging, key press, etc.).
   */
  onChange?: (value: number[]) => void;
  /**
   * Callback when the value is committed (drag end, key press, etc.).
   * Note: This is called when the user stops interacting with the slider.
   */
  onCommit?: (value: number[]) => void;
};

const INTENTIONAL_DRAG_COUNT_THRESHOLD = 2 as const;

const KEY = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Left: "ArrowLeft",
  Right: "ArrowRight",
  PageUp: "PageUp",
  PageDown: "PageDown",
  Home: "Home",
  End: "End",
} as const;

const NAVIGATION_KEYS = new Set<string>([
  KEY.Up,
  KEY.Down,
  KEY.Left,
  KEY.Right,
  KEY.PageUp,
  KEY.PageDown,
  KEY.Home,
  KEY.End,
]);
const INCREMENT_KEYS = new Set<string>([KEY.Right, KEY.Up, KEY.PageUp]);
const DECREMENT_KEYS = new Set<string>([KEY.Left, KEY.Down, KEY.PageDown]);

const TRACK_CALCULATION_STRATEGIES = {
  horizontal: (rect: DOMRect, coords: { x: number; y: number }) =>
    MathUtils.clamp((coords.x - rect.left) / rect.width, 0, 1),

  vertical: (rect: DOMRect, coords: { x: number; y: number }) =>
    MathUtils.clamp((rect.bottom - coords.y) / rect.height, 0, 1),
};

const readThumbIndex = (event: Event) =>
  Number((event.currentTarget as HTMLElement)?.dataset.index ?? -1);

/**
 * Rounds a value to the nearest step, starting from a minimum.
 * Examples:
 * roundToStep(5.13, 0.1, 0); // 5.1
 * roundToStep(7, 2, 1);      // 7
 */
const roundToStep = (value: number, step: number, min: number) =>
  Number((Math.round((value - min) / step) * step + min).toFixed(MathUtils.decimalsCount(step)));

const findClosestIndex = (values: number[], currentValue: number) => {
  const result = values.reduce<{
    closestIndex: number;
    closestDistance: number;
  } | null>((acc, value, index) => {
    const distance = Math.abs(currentValue - value);

    if (!acc || distance <= acc.closestDistance) {
      return {
        closestIndex: index,
        closestDistance: distance,
      };
    }

    return acc;
  }, null);

  return result!.closestIndex;
};

const adjustValueByIndex = ({
  values,
  newValue,
  index,
}: {
  values: number[];
  newValue: number;
  index: number;
}) => values.map((value, i) => (i === index ? newValue : value)).sort((a, b) => a - b);

const asc = (a: number, b: number) => a - b;

const valueToArray = (value: number | number[]) => (Array.isArray(value) ? value : [value]);

/**
 * Composable for creating an accessibility-compliant slider.
 * For supported keyboard shortcuts, see: https://www.w3.org/WAI/ARIA/apg/patterns/slider/
 */
export const createSlider = createBuilder((options: CreateSliderOptions) => {
  const sliderRef = createElRef<HTMLElement>();

  // Computed properties from options
  const min = computed(() => unref(options.min) ?? 0);
  const max = computed(() => unref(options.max) ?? 100);
  const values = computed(() => unref(options.values) ?? [min.value ?? 0]);
  const step = computed(() =>
    typeof unref(options.step) === "undefined" ? 1 : unref(options.step),
  );
  const shiftStep = computed(() => unref(options.shiftStep) ?? 10);
  const isDisabled = computed(() => unref(options.disabled) ?? false);
  const marks = computed(() => unref(options.marks) ?? false);
  const label = computed(() => unref(options.label));
  const orientation = computed(() => unref(options.orientation) ?? "horizontal");

  // Refs and variables for internal state
  /**
   * Holds the identifier of the active touch point (Touch.identifier).
   * Reason: lets the slider track and finish the drag with the *same finger*
   * only—avoiding interference from other touches in multi-touch scenarios and
   * preventing stuck or incorrect drags.
   */
  let touchId: number | null = null;
  /**
   * Counts the number of move events during a drag operation.
   * Reason: lets us differentiate between intentional drags and accidental slight movements,
   */
  let movesSinceStart: number = 0;
  /**
   * Used for committing the value when the user stops dragging accidentally.
   * Sometimes the committed value is different from the current value while dragging.
   * So we need to keep track of it.
   */
  let lastChangedValue: number[] | null = null;
  /**
   * Previous active thumb index during drag. Used during drag to keep the same thumb active.
   */
  let previousActiveIndex: number | null = null;
  /**
   * Indicates whether the slider is currently being dragged or not.
   */
  const isDragging = ref<boolean>(false);
  /**
   * Index of the currently active thumb.
   * Thumb could be active even if not dragging (e.g. click on the rail to move the thumb there).
   */
  const activeThumbIndex = ref<number>(-1);
  /**
   * Index of the thumb that is currently focused.
   */
  const focusedThumbIndex = ref<number>(-1);
  /**
   * Indicates whether the slider is a range slider (with two or more thumbs) or a single value slider (with one thumb).
   */
  const isRange = computed(() => values.value.length > 1);

  /**
   * If `showMarks` is `true` and `step` is provided, marks will be generated for each step in the range.
   * If `marks` is an array and `showMarks` is `true`, it will be used as provided.
   * If `showMarks` is `false`, no marks will be shown.
   */
  const marksList = computed<{ value: number; label?: string }[]>(() => {
    /**
     * No marks to show
     */
    if (marks.value === false) return [];

    /**
     * Use provided marks, filtering out those that are out of range and normalizing numbers to objects
     */
    if (marks.value && Array.isArray(marks.value)) {
      return marks.value
        .map((mark) => (typeof mark === "number" ? { value: mark } : mark))
        .filter((mark) => mark.value >= min.value && mark.value <= max.value)
        .sort((a, b) => asc(a.value, b.value));
    }

    const stepValue = step.value;

    /**
     * Generate marks for each step in the range, if step is provided
     */
    if (stepValue && stepValue > 0) {
      return [...Array(Math.floor((max.value - min.value) / stepValue + 1))].map((_, index) => ({
        value: min.value + stepValue * index,
      }));
    }

    return [];
  });

  /**
   * Defines the main axis (position and size) and cross axis (thickness) based on orientation.
   */
  const axis = computed(() =>
    orientation.value === "vertical"
      ? { position: "bottom" as const, size: "height" as const, cross: "width" as const }
      : { position: "left" as const, size: "width" as const, cross: "height" as const },
  );

  const marksValues = computed(() => marksList.value.map((mark) => mark.value));

  // Internal methods
  const emitChange = (next: number[]) => {
    if (!areArraysEqual(values.value, next)) {
      options.onChange?.(next);
    }
    lastChangedValue = next;
  };

  const emitCommit = (fallback: number[]) => {
    options.onCommit?.(lastChangedValue ?? fallback);
  };

  const ensureFocusOnThumb = (options: { index: number; shouldSetActive: boolean }) => {
    const { index, shouldSetActive = false } = options;
    const slider = sliderRef.value;

    if (!slider) return;

    if (
      slider.contains(document.activeElement) &&
      Number(document.activeElement?.getAttribute("data-index")) !== index
    ) {
      slider.querySelector<HTMLElement>(`[type="range"][data-index="${index}"]`)?.focus();
    }

    if (shouldSetActive) {
      activeThumbIndex.value = index;
    }
  };

  const eventToCoords = (event: MouseEvent | TouchEvent, touchId?: number | null) => {
    if (touchId !== undefined && (event as TouchEvent).changedTouches) {
      const touchEvent = event as TouchEvent;
      for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
        const touch = touchEvent.changedTouches[i];

        if (touch && touch.identifier === touchId) {
          return {
            x: touch.clientX,
            y: touch.clientY,
          };
        }
      }

      return false;
    }

    // In case of MouseEvent, we return the coordinates
    const mouseEvent = event as MouseEvent;
    return {
      x: mouseEvent.clientX,
      y: mouseEvent.clientY,
    };
  };

  const getNextFromCoords = (opts: {
    coords: { x: number; y: number };
    /**
     * `isMoving` is needed to differentiate between direct click on the track and moving the thumb afterwards
     */
    isMoving?: boolean;
  }) => {
    const { coords, isMoving = false } = opts;
    const slider = sliderRef.value;
    if (!slider) return null;

    const rect = slider.getBoundingClientRect();
    const mainSize = orientation.value === "vertical" ? rect.height : rect.width;
    if (mainSize <= 0) return null;

    const percent = TRACK_CALCULATION_STRATEGIES[orientation.value](rect, coords);

    const raw = MathUtils.percentToValue(percent, min.value, max.value);
    const snapped =
      step.value !== null
        ? roundToStep(raw, step.value, min.value)
        : marksValues.value[findClosestIndex(marksValues.value, raw)];

    if (typeof snapped !== "number") return null;

    const candidate = MathUtils.clamp(snapped, min.value, max.value);

    if (!isRange.value) {
      return { newValue: candidate, activeIndex: 0 };
    }

    const closestIndex = findClosestIndex(values.value, candidate);
    const index = isMoving && previousActiveIndex != null ? previousActiveIndex : closestIndex;

    const adjustedValues = adjustValueByIndex({
      values: values.value,
      newValue: candidate,
      index,
    });

    const adjustedIndex = findClosestIndex(adjustedValues, candidate);
    previousActiveIndex = adjustedIndex;

    return { newValue: adjustedValues, activeIndex: adjustedIndex };
  };

  /**
   * Handles keyboard events for slider interaction and change event on the hidden input.
   */
  const commitValueFromEvent = (event: KeyboardEvent | Event, input: number) => {
    const index = readThumbIndex(event);
    const current = values.value[index];

    if (typeof current !== "number") {
      return;
    }

    /**
     * If step is null, the thumb can only be slid onto marks provided with the marks prop. (Discrete state)
     */
    const useMarks = step.value === null && marksList.value.length > 0;

    const snapByMarks = (candidate: number) => {
      const list = marksList.value;
      const first = list[0];
      const last = list.at(-1);

      if (!first || !last) {
        return current;
      }

      if (candidate <= first.value) {
        return first.value;
      }
      if (candidate >= last.value) {
        return last.value;
      }

      const pos = marksValues.value.indexOf(current);
      const neighbor = candidate < current ? list[pos - 1] : list[pos + 1];
      return neighbor?.value ?? current;
    };

    const scalar = MathUtils.clamp(useMarks ? snapByMarks(input) : input, min.value, max.value);

    const nextValues = isRange.value
      ? adjustValueByIndex({ values: values.value, newValue: scalar, index })
      : [scalar];

    if (isRange.value) {
      const activeIndex = nextValues.indexOf(scalar);
      ensureFocusOnThumb({ index: activeIndex, shouldSetActive: true });
    }

    focusedThumbIndex.value = index;

    if (!areArraysEqual(values.value, nextValues)) {
      emitChange(nextValues);
    }
    emitCommit(nextValues);
  };

  // Event handlers
  const handlePointerEnd = (event: TouchEvent | MouseEvent) => {
    const coords = eventToCoords(event, touchId);
    isDragging.value = false;

    if (!coords) {
      return;
    }

    const next = getNextFromCoords({ coords, isMoving: true });

    if (!next) {
      return;
    }

    const { newValue } = next;
    activeThumbIndex.value = -1;

    emitCommit(valueToArray(newValue));

    movesSinceStart = 0;
    touchId = null;
    stopPointerListening();
  };

  const handlePointerMove = (event: TouchEvent | MouseEvent) => {
    const coords = eventToCoords(event, touchId);

    if (!coords) return;

    movesSinceStart += 1;

    // should not move in the case if some other element consumed a mouseup event and it was not fired
    if (event.type === "mousemove" && (event as MouseEvent).buttons === 0) {
      handlePointerEnd(event);
      return;
    }

    const nextState = getNextFromCoords({ coords, isMoving: true });

    if (!nextState) {
      handlePointerEnd(event);
      return;
    }

    const { newValue, activeIndex } = nextState;

    if (!isDragging.value && movesSinceStart > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      isDragging.value = true;
    }

    ensureFocusOnThumb({ index: activeIndex!, shouldSetActive: true });
    emitChange(valueToArray(newValue));
    isDragging.value = true;
  };

  const handlePointerStart = (event: TouchEvent) => {
    if (isDisabled.value) {
      return;
    }

    const touch = event.changedTouches[0];

    if (touch !== null && touch !== undefined) {
      touchId = touch.identifier;
    }

    const coords = eventToCoords(event, touchId);

    if (coords) {
      const nextState = getNextFromCoords({ coords, isMoving: false });

      if (nextState) {
        const { newValue, activeIndex } = nextState;
        ensureFocusOnThumb({ index: activeIndex, shouldSetActive: true });
        emitChange(valueToArray(newValue));
      }
    }

    movesSinceStart = 0;
    document.addEventListener("touchmove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("touchend", handlePointerEnd);
  };

  const stopPointerListening = () => {
    document.removeEventListener("mousemove", handlePointerMove);
    document.removeEventListener("mouseup", handlePointerEnd);
    document.removeEventListener("touchmove", handlePointerMove);
    document.removeEventListener("touchend", handlePointerEnd);
  };

  const handleRootMousedown = (event: MouseEvent) => {
    if (isDisabled.value) {
      return;
    }

    // only left clicks should be considered
    if (event.button !== 0) {
      return;
    }

    if (event.defaultPrevented) {
      return;
    }

    // Avoid text selection
    event.preventDefault();
    const coords = eventToCoords(event, touchId);

    if (coords) {
      const nextState = getNextFromCoords({ coords });

      if (nextState) {
        const { newValue, activeIndex } = nextState;
        ensureFocusOnThumb({ index: activeIndex, shouldSetActive: true });
        emitChange(valueToArray(newValue));
      }
    }

    movesSinceStart = 0;
    document.addEventListener("mousemove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("mouseup", handlePointerEnd);
  };

  const handleHiddenInputChange = (event: Event) => {
    if (isDisabled.value) {
      return;
    }

    const value = (event.target as HTMLInputElement).valueAsNumber;
    commitValueFromEvent(event, value);
  };

  const handleHiddenInputFocus = (event: FocusEvent) => {
    const index = readThumbIndex(event);

    /**
     * Focus visible is needed to set the focus based on keyboard (Tab/Shift+Tab)
     */
    if (isFocusVisible(event.target as HTMLSpanElement)) {
      focusedThumbIndex.value = index;
      activeThumbIndex.value = index;
    }
  };

  const handleHiddenInputBlur = (event: FocusEvent) => {
    if (!isFocusVisible(event.target as HTMLSpanElement)) {
      focusedThumbIndex.value = -1;
      activeThumbIndex.value = -1;
    }
  };

  const handleHiddenInputKeydown = (event: KeyboardEvent) => {
    if (!NAVIGATION_KEYS.has(event.key)) return;

    event.preventDefault();

    const index = readThumbIndex(event);
    const value = values.value[index];

    if (typeof value !== "number") {
      return;
    }

    if (step.value != null) {
      const stepSize = event.shiftKey ? shiftStep.value : step.value;

      if (event.key === "Home") return commitValueFromEvent(event, min.value);
      if (event.key === "End") return commitValueFromEvent(event, max.value);

      if (INCREMENT_KEYS.has(event.key)) {
        const next = MathUtils.clamp(value + stepSize, min.value, max.value);
        if (next !== value) commitValueFromEvent(event, next);
        return;
      }

      if (DECREMENT_KEYS.has(event.key)) {
        const next = MathUtils.clamp(value - stepSize, min.value, max.value);
        if (next !== value) commitValueFromEvent(event, next);
        return;
      }

      return;
    } else {
      /**
       * When step is null, the thumb can only be slid onto marks provided with the marks prop.
       */
      const values = marksValues.value;
      const lastIndex = values.length - 1;
      const currentIndex = values.indexOf(value);
      const first = values[0];
      const last = values[lastIndex];

      if (event.key === "Home" && typeof first === "number")
        return commitValueFromEvent(event, first);
      if (event.key === "End" && typeof last === "number") return commitValueFromEvent(event, last);

      if (INCREMENT_KEYS.has(event.key)) {
        const nextIdx = currentIndex < 0 ? 0 : Math.min(lastIndex, currentIndex + 1);
        const next = values[nextIdx];
        if (next !== value && typeof next === "number") commitValueFromEvent(event, next);
        return;
      }

      if (DECREMENT_KEYS.has(event.key)) {
        const nextIdx = currentIndex < 0 ? 0 : Math.max(0, currentIndex - 1);
        const next = values[nextIdx];
        if (next !== value && typeof next === "number") commitValueFromEvent(event, next);
        return;
      }
    }
  };

  const trackOffset = computed(() =>
    MathUtils.valueToPercent(
      isRange.value && values.value[0] ? values.value[0] : min.value,
      min.value,
      max.value,
    ),
  );
  const trackLength = computed(
    () =>
      MathUtils.valueToPercent(values.value.at(-1) ?? 0, min.value, max.value) - trackOffset.value,
  );
  const trackStyle = computed(() => ({
    [axis.value.position]: `${trackOffset.value}%`,
    [axis.value.size]: `${trackLength.value}%`,
  }));

  const isMarkActive = (markValue: number) => {
    if (isRange.value) {
      const minValue = Math.min(...values.value);
      const maxValue = Math.max(...values.value);
      return markValue >= minValue && markValue <= maxValue;
    }

    const currentValue = values.value[0]!;
    return markValue <= currentValue;
  };

  onBeforeUnmount(stopPointerListening);

  watch(
    () => isDisabled.value,
    () => {
      if (isDisabled.value) {
        isDragging.value = false;
        activeThumbIndex.value = -1;
        focusedThumbIndex.value = -1;
        stopPointerListening();
      }
    },
  );

  return {
    elements: {
      /**
       * Root slider container element
       */
      root: computed(() => ({
        ref: sliderRef,
        style: { touchAction: orientation.value === "vertical" ? "pan-x" : "pan-y" },
        onMousedown: handleRootMousedown,
        onTouchstart: handlePointerStart,
      })),

      /**
       * Individual thumb elements for each value (span)
       */
      thumbContainer: computed(() => (data: { index: number; value: number }) => ({
        "data-index": data.index,
        style: {
          [axis.value.position]: `${MathUtils.valueToPercent(data.value, min.value, max.value)}%`,
        },
      })),

      /**
       * Visually hidden input inside each thumb for accessibility
       */
      thumbInput: computed(() => (data: { index: number; value: number }) => ({
        min: min.value,
        max: max.value,
        value: data.value,
        role: "slider",
        type: "range",
        "aria-label": label.value,
        "aria-valuemin": min.value,
        "aria-valuemax": max.value,
        "aria-valuenow": data.value,
        "aria-orientation": orientation.value,
        "data-index": data.index,
        tabIndex: isDisabled.value ? -1 : 0,
        step: step.value === null && marks.value ? "any" : (step.value ?? undefined),
        disabled: typeof isDisabled.value === "boolean" ? isDisabled.value : false,
        onChange: handleHiddenInputChange,
        onFocus: handleHiddenInputFocus,
        onBlur: handleHiddenInputBlur,
        onKeydown: handleHiddenInputKeydown,
        /**
         * Visually hidden styles.
         */
        style: {
          border: 0,
          clip: "rect(0 0 0 0)",
          margin: "-1px",
          overflow: "hidden",
          padding: 0,
          position: "absolute",
          whiteSpace: "nowrap",
          width: "100%",
          height: "100%",
        } as const,
      })),

      /**
       * Mark elements
       */
      mark: computed(() => (data: { value: number; label?: string }) => ({
        "data-value": data.value,
        "aria-hidden": true,
        style: {
          [axis.value.position]:
            `${MathUtils.clamp(MathUtils.valueToPercent(data.value, min.value, max.value), 0, 100)}%`,
        },
      })),

      /**
       * Label for each mark
       */
      markLabel: computed(() => (data: { value: number }) => ({
        "data-value": data.value,
        style: {
          [axis.value.position]: `${MathUtils.valueToPercent(data.value, min.value, max.value)}%`,
        },
        "aria-hidden": true,
      })),

      /**
       * Track element representing the selected range
       */
      track: computed(() => ({
        role: "presentation",
        "aria-hidden": true,
        style: trackStyle.value,
      })),

      /**
       * Rail element representing the full slider range
       */
      rail: computed(() => ({
        role: "presentation",
        "aria-hidden": true,
      })),
    },

    state: {
      /**
       * True if the slider is currently being dragged.
       */
      isDragging,
      /**
       * Index of the currently active thumb.
       * Thumb could be active even if not dragging (e.g. click on the rail to move the thumb there).
       * `-1` if no thumb is active.
       */
      activeThumbIndex,
      /**
       * Index of the thumb that is currently focused.
       * `-1` if no thumb is focused.
       */
      focusedThumbIndex,
      /**
       * `true` if the slider is a range slider (with two or more thumbs).
       */
      isRange,
      /**
       * Offset of the track as a percentage (0-100).
       */
      trackOffset,
      /**
       * Length of the track as a percentage (0-100).
       */
      trackLength,
      /**
       * List of marks to display on the slider.
       * - If marks option is `true`, marks are generated based on the step value.
       * - If marks option is an array of numbers or objects, it is used as provided (filtered to be within range).
       * - If marks option is `false`, no marks are shown.
       */
      marksList,
    },

    internals: {
      /**
       * Converts a value from the slider's range to a percentage (0-100).
       * @param value - value to convert
       * @returns percentage representation of the value
       */
      valueToPercent: (value: number) => MathUtils.valueToPercent(value, min.value, max.value),
      /**
       * Checks if a given mark value is active (i.e., within the selected range).
       * Use case: when rendering marks, to determine if a mark is covered by the selected range.
       *
       * @param markValue - value of the mark to check
       * @returns `true` if the mark is active, `false` otherwise
       */
      isMarkActive,
      /**
       * Clamps a value to the slider's range.
       * @param value - value to clamp
       * @returns clamped value
       */
      clampValue: (value: number) => MathUtils.clamp(value, min.value, max.value),
      /**
       * Main axis properties based on orientation.
       */
      axis,
    },
  };
});
