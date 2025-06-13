import { computed, onBeforeUnmount, readonly, ref, watch, type Ref } from "vue";

/**
 * Composable for managing a single timer.
 */
export const useTimer = (endTime: Ref<ConstructorParameters<typeof Date>[0]>) => {
  /**
   * Current interval ID. Can be used to cancel the timer.
   */
  const intervalId = ref<ReturnType<typeof setInterval>>();

  const timeLeft = ref(calculateTimeLeft(new Date(endTime.value).getTime()));
  const isEnded = computed(() => timeLeft.value === 0);

  watch(
    endTime,
    (newEndTime) => {
      clearInterval(intervalId.value); // clear any previous timers
      const endTimestamp = new Date(newEndTime).getTime();

      // setInterval does not trigger immediate so we calculate it once here
      timeLeft.value = calculateTimeLeft(endTimestamp);

      intervalId.value = setInterval(() => {
        timeLeft.value = calculateTimeLeft(endTimestamp);
        if (isEnded.value) clearInterval(intervalId.value);
      }, 1000);
    },
    { immediate: true },
  );

  // prevent dangling timers when component is unmounted
  onBeforeUnmount(() => clearInterval(intervalId.value));

  return {
    /**
     * Time (in milliseconds) that the timer has left.
     */
    timeLeft: readonly(timeLeft),
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
