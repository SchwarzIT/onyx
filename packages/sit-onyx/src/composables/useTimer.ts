import { computed, ref, watch, type Ref } from "vue";

type TimerOptions = {
  endTime: Ref<string> /** expect ISO string @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString} */;
  startImmediately?: boolean;
};

/**
 * Timer composable
 * @param options @see TimerOptions
 * @returns composable to start and stop a timer, get the time left and track if the timer has ended.
 */
export const useTimer = (options: TimerOptions) => {
  const intervalId = ref<ReturnType<typeof setInterval>>();
  const timeLeft = ref(0);
  const isEnded = ref(false);

  const validateEndTime = () => {
    const date = new Date(options.endTime.value);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid end time");
    }
  };

  const endTimestamp = computed(() => {
    return new Date(options.endTime.value).getTime();
  });

  const calculateTimeLeft = () => {
    timeLeft.value = endTimestamp.value - Date.now();
    if (timeLeft.value <= 0) {
      timeLeft.value = 0;
    }
  };

  const startTimer = () => {
    clearInterval(intervalId.value);
    intervalId.value = setInterval(() => {
      if (endTimestamp.value > 0) {
        calculateTimeLeft();
        if (timeLeft.value === 0) {
          isEnded.value = true;
          clearInterval(intervalId.value);
        }
      }
    }, 1000);
  };

  const endTimer = () => {
    clearInterval(intervalId.value);
  };

  calculateTimeLeft();

  if (options.startImmediately) startTimer();

  watch(
    options.endTime,
    () => {
      validateEndTime();
    },
    { immediate: true },
  );

  return { startTimer, endTimer, timeLeft, isEnded };
};
