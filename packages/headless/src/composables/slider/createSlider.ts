import { computed, ref, toValue, watch, type HTMLAttributes, type MaybeRef, type Ref } from "vue";
import { areArraysEqual } from "../../utils/array.js";
import { createBuilder, createElRef } from "../../utils/builder.js";
import { MathUtils } from "../../utils/math.js";
import { useGlobalEventListener } from "../helpers/useGlobalListener.js";

export type SliderMark = {
  value: number;
  label?: string;
};

type SliderValue = number | [number, number];

export type NormalizedSliderValue = [number] | [number, number];

export type CreateSliderOptions<TValue extends SliderValue = SliderValue> = {
  /**
   * Current value(s) of the slider.
   */
  value: Ref<TValue>;
  /**
   * Minimum value of the slider.
   *
   * @default 0
   */
  min?: MaybeRef<number>;
  /**
   * Maximum value of the slider.
   *
   * @default 100
   */
  max?: MaybeRef<number>;
  /**
   * Step size for the slider.
   *
   * @default 1
   */
  step?: MaybeRef<number>;
  /**
   * Whether to use the discrete mode where only values that are multiples of the `step` property can be selected.
   *
   * @default false
   */
  discrete?: MaybeRef<boolean>;
  /**
   * Step size to increase/decrease the slider value when changing the value via keyboard while pressing the "Shift" key.
   *
   * default 10% of the total range (max - min)
   */
  shiftStep?: MaybeRef<number>;
  /**
   * Whether the slider is disabled.
   *
   * @default false
   */
  disabled?: MaybeRef<boolean>;
  /**
   * Whether to show marks inside the slider rail.
   * - `true`: will generate marks automatically based on `step` prop
   * - array of numbers or `SliderMark` objects: will shown at the specified values with optional labels
   *
   * @default false
   */
  marks?: MaybeRef<SliderMark[] | number[] | boolean>;
  /**
   * Aria label for the slider.
   */
  label: MaybeRef<string>;
  /**
   * Callback when the current value changes.
   */
  onChange?: (value: TValue) => void;
};

const NAVIGATION_KEYS = new Set<string>([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "PageUp",
  "PageDown",
  "Home",
  "End",
]);
const INCREMENT_KEYS = new Set(["ArrowRight", "ArrowUp", "PageUp"]);
const DECREMENT_KEYS = new Set(["ArrowLeft", "ArrowDown", "PageDown"]);

/**
 * Composable for creating an accessibility-compliant slider.
 * For supported keyboard shortcuts, see: https://www.w3.org/WAI/ARIA/apg/patterns/slider/
 *
 *  * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export const _unstableCreateSlider = createBuilder(
  <TValue extends SliderValue>(options: CreateSliderOptions<TValue>) => {
    const sliderRef = createElRef<HTMLElement>();

    const min = computed(() => toValue(options.min) ?? 0);
    const max = computed(() => toValue(options.max) ?? 100);
    const step = computed(() => toValue(options.step) ?? 1);

    /**
     * Index of the thumb that is currently dragged.
     */
    const draggingThumbIndex = ref<number>();

    // ensure focus on thumb while dragging
    watch(draggingThumbIndex, (newThumbIndex) => {
      if (newThumbIndex == undefined) return;
      Array.from(sliderRef.value.querySelectorAll<HTMLElement>('[role="slider"]'))
        .at(newThumbIndex)
        ?.focus();
    });

    const shiftStep = computed(() => {
      const shiftStep = toValue(options.shiftStep);
      if (shiftStep != undefined) return shiftStep;

      // Round to the nearest step multiple to ensure it aligns with step boundaries
      const stepMultiple = Math.max(1, Math.round(((max.value - min.value) * 0.1) / step.value));
      return stepMultiple * step.value;
    });

    const marks = computed<SliderMark[]>(() => {
      const _marks = toValue(options.marks);
      if (!_marks) return [];

      if (_marks === true) {
        // auto-generate marks based on step
        const markCount = Math.floor((max.value - min.value) / step.value) + 1;

        return Array.from({ length: markCount }, (_, index) => {
          return { value: min.value + step.value * index } satisfies SliderMark;
        });
      }

      // normalize user provided marks
      return _marks
        .map((mark) => {
          if (typeof mark === "number") return { value: mark };
          return mark;
        })
        .sort((a, b) => a.value - b.value);
    });

    /**
     * Normalizes the given slider (values) by ensuring that:
     * 1. Value is between min and max range
     * 2. Values are matching the `step` property (are multiples of it)
     * 3. Are sorted ascending (if range mode)
     */
    const getNormalizedValue = computed(() => {
      return (value: TValue | NormalizedSliderValue) => {
        let values: NormalizedSliderValue = typeof value === "number" ? [value] : value;

        // normalization
        values = values
          .map((value) => MathUtils.clamp(value, min.value, max.value))
          .map((value) => {
            // round all values to match the defined step (so they are all multiples of the step size)
            // this is e.g. needed when dragging the slider to change its value
            const stepDecimals = MathUtils.decimalsCount(step.value);

            return Number(
              (Math.round((value - min.value) / step.value) * step.value + min.value).toFixed(
                stepDecimals,
              ),
            );
          })
          .sort((a, b) => a - b) as typeof values;

        return values;
      };
    });

    /**
     * Current slider value(s) normalized to an array.
     */
    const normalizedValue = computed<NormalizedSliderValue>(() =>
      getNormalizedValue.value(toValue(options.value)),
    );

    /**
     * Updates the current value with the given value. Will normalize the value.
     */
    const updateValue = (value: NormalizedSliderValue) => {
      const normalized = getNormalizedValue.value(value);
      const newValue = normalized.length > 1 ? normalized : normalized[0];

      // do not emit an update if the actual value didn't change
      if (areArraysEqual(normalized, normalizedValue.value)) return;

      options.onChange?.(newValue as TValue);
    };

    /**
     * Gets the given value in percentage relative to the sliders min/max range.
     */
    const getValueInPercentage = computed(() => {
      return (value: number) => {
        const percentage = MathUtils.valueToPercent(value, min.value, max.value);
        return MathUtils.clamp(percentage, 0, 100);
      };
    });

    const handleKeydown = (event: KeyboardEvent, thumbIndex: number) => {
      if (!NAVIGATION_KEYS.has(event.key)) return;
      event.preventDefault();

      const currentValue = normalizedValue.value.slice() as typeof normalizedValue.value;
      if (currentValue[thumbIndex] == undefined) return;

      const stepSize = event.shiftKey ? shiftStep.value : step.value;

      if (event.key === "Home") {
        currentValue[thumbIndex] = min.value;
        return updateValue(currentValue);
      }

      if (event.key === "End") {
        currentValue[thumbIndex] = max.value;
        return updateValue(currentValue);
      }

      if (INCREMENT_KEYS.has(event.key)) {
        currentValue[thumbIndex] = currentValue[thumbIndex] + stepSize;
        updateValue(currentValue);
      } else if (DECREMENT_KEYS.has(event.key)) {
        currentValue[thumbIndex] = currentValue[thumbIndex] - stepSize;
        updateValue(currentValue);
      }
    };

    const handlePointerdown = (event: PointerEvent) => {
      event.preventDefault(); // avoid text selection

      const value = getValueFromCoordinates(event.x);
      if (value == undefined) return;

      // determine for which range thumb the value should be changed
      const thumb = normalizedValue.value.reduce(
        (previous, thumbValue, index) => {
          const distance = Math.abs(thumbValue - value);
          if (distance < previous.distance) return { index, distance };
          return previous;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );

      const newValue = normalizedValue.value.slice() as typeof normalizedValue.value;
      newValue[thumb.index] = value;
      updateValue(newValue);

      draggingThumbIndex.value = thumb.index;
    };

    const handlePointermove = (event: PointerEvent) => {
      if (draggingThumbIndex.value == undefined) return;

      let value = getValueFromCoordinates(event.x);
      if (value == undefined) return;

      const otherIndex = draggingThumbIndex.value === 0 ? 1 : 0;
      const otherValue = normalizedValue.value[otherIndex];

      // prevent thumbs from overlapping each other
      if (otherValue != undefined) {
        if (draggingThumbIndex.value < otherIndex && value > otherValue) {
          value = otherValue;
        } else if (draggingThumbIndex.value > otherIndex && value < otherValue) {
          value = otherValue;
        }
      }

      const newValue = normalizedValue.value.slice() as typeof normalizedValue.value;
      newValue[draggingThumbIndex.value] = value;
      updateValue(newValue);
    };

    useGlobalEventListener({
      type: "pointermove",
      listener: handlePointermove,
      disabled: computed(() => draggingThumbIndex.value == undefined),
    });

    const handlePointerup = () => {
      draggingThumbIndex.value = undefined;
    };

    useGlobalEventListener({
      type: "pointerup",
      listener: handlePointerup,
      disabled: computed(() => draggingThumbIndex.value == undefined),
    });

    /**
     * Gets the corresponding slider value for the given x coordinate across the rail.
     */
    const getValueFromCoordinates = (x: number) => {
      const rect = sliderRef.value.getBoundingClientRect();
      if (rect.width <= 0) return;

      const percent = MathUtils.clamp((x - rect.left) / rect.width, 0, 1);
      return MathUtils.percentToValue(percent, min.value, max.value);
    };

    return {
      elements: {
        /**
         * Root slider container element
         */
        root: computed(() => {
          const events: HTMLAttributes = {
            onPointerdown: handlePointerdown,
          };

          return {
            ref: sliderRef,
            style: { touchAction: "pan-y" },
            ...(toValue(options.disabled) ? undefined : events),
          };
        }),

        /**
         * Individual thumb elements for each value (span)
         */
        thumbContainer: computed(() => (data: { index: number; value: number }) => ({
          "data-index": data.index,
          style: { left: `${getValueInPercentage.value(data.value)}%` },
        })),

        /**
         * Input inside each thumb for accessibility
         */
        thumbInput: computed(() => (data: { index: number; value: number }) => {
          const events: HTMLAttributes = {
            onKeydown: (event) => handleKeydown(event, data.index),
          };

          return {
            min: min.value,
            max: max.value,
            value: data.value,
            role: "slider",
            type: "range",
            "aria-label": toValue(options.label),
            "aria-valuemin": min.value,
            "aria-valuemax": max.value,
            "aria-valuenow": data.value,
            "aria-orientation": "horizontal",
            "data-index": data.index,
            // TODO: check step
            step: toValue(options.discrete) && marks.value.length ? "any" : step.value,
            disabled: toValue(options.disabled),
            ...(toValue(options.disabled) ? undefined : events),
          };
        }),

        /**
         * Single Mark element inside the rail
         */
        mark: computed(() => (data: { value: number; label?: string; positionOffset?: string }) => {
          const percentage = getValueInPercentage.value(data.value);

          // adjusting the position for marks with proper edge offset to prevent overflow because of rounding.
          // for marks at 0% and 100%, applies the given offset to keep them within bounds.
          let position = `${percentage}%`;
          if (data.positionOffset && percentage <= 0) {
            position = data.positionOffset;
          }
          if (data.positionOffset && percentage >= 100) {
            position = `calc(100% - ${data.positionOffset})`;
          }

          return {
            "aria-hidden": true,
            style: { left: position },
          };
        }),

        /**
         * Label for each mark
         */
        markLabel: computed(() => (data: { value: number }) => ({
          "aria-hidden": true,
          style: {
            // TODO: check if offset should be applied to first/last label as well
            left: `${getValueInPercentage.value(data.value)}%`,
          },
        })),

        /**
         * Track element representing the selected range
         */
        track: computed(() => {
          const isRange = normalizedValue.value.length > 1;
          const offsetValue = isRange ? normalizedValue.value[0] : min.value;
          const left = getValueInPercentage.value(offsetValue);

          const lengthValue = normalizedValue.value.at(-1)!;
          const width = getValueInPercentage.value(lengthValue) - left;

          return {
            style: {
              left: `${left}%`,
              width: `${width}%`,
            },
          };
        }),
      },
      state: {
        normalizedValue,
        shiftStep,
        marks,
      },
      internals: {
        updateValue,
      },
    };
  },
);
