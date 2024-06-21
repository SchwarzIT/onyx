import { computed, onBeforeUnmount, ref, watch, type Ref } from "vue";
import { useAnimationFrame } from "./useAnimationFrame";

export type UseTimerOptions = {
  /**
   * Timestamp when the timer will end.
   */
  endTime: Ref<ConstructorParameters<typeof Date>[0]>;
  /**
   * Whether to use `requestAnimationFrame()` to update the time left.
   * Useful is used for smooth animations.
   *
   * If `false`, it will be updated every second.
   *
   * @false
   */
  useAnimationFrame?: boolean;
};

/**
 * Composable for managing a single timer.
 */
export const useTimer = (options: UseTimerOptions) => {
  /**
   * Current interval ID. Can be used to cancel the timer.
   */
  const intervalId = ref<ReturnType<typeof setInterval>>();

  const timeLeft = ref(calculateTimeLeft(new Date(options.endTime.value).getTime()));
  const isEnded = computed(() => timeLeft.value === 0);

  watch(
    options.endTime,
    (newEndTime) => {
      const endTimestamp = new Date(newEndTime).getTime();

      // trigger immediate
      timeLeft.value = calculateTimeLeft(endTimestamp);

      if (!options.useAnimationFrame) {
        clearInterval(intervalId.value); // clear any previous timers

        intervalId.value = setInterval(() => {
          timeLeft.value = calculateTimeLeft(endTimestamp);
          if (isEnded.value) clearInterval(intervalId.value);
        }, 1000);
      } else {
        useAnimationFrame(() => {
          timeLeft.value = calculateTimeLeft(endTimestamp);
        });
      }
    },
    { immediate: true },
  );

  // prevent dangling timers when component is unmounted
  onBeforeUnmount(() => {
    clearInterval(intervalId.value);
    timeLeft.value = 0; // this ensures that the requestAnimationFrame is stopped before unmount
  });

  return {
    /**
     * Time (in milliseconds) that the timer has left.
     */
    timeLeft,
    /**
     * Whether the timer is ended.
     */
    isEnded,
  };
};

/**
 * Calculates the remaining time between the given endTime and now.
 * Will not be smaller than 0.
 */
const calculateTimeLeft = (endTimestamp: number) => {
  const timeLeft = endTimestamp - Date.now();
  return Math.max(timeLeft, 0);
};
