import { computed, ref, type Ref } from "vue";

type TimerOptions = {
  endTime: Ref<string>; // iso date string
  isPaused?: Ref<boolean>;
  startImmediately?: boolean;
};

export const useTimer = (options: TimerOptions) => {
  const intervalId = ref<ReturnType<typeof setInterval>>();
  const timeLeft = ref(0);
  const isEnded = ref(false);

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
        if (options.isPaused?.value) return;
        calculateTimeLeft();
        if (timeLeft.value === 0) {
          isEnded.value = true;
          clearInterval(intervalId.value);
        }
      }
    }, 999);
  };

  const endTimer = () => {
    clearInterval(intervalId.value);
  };

  calculateTimeLeft();

  if (options.startImmediately) startTimer();

  return { startTimer, endTimer, timeLeft, isEnded };
};
