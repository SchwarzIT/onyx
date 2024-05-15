<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, toRef, watch } from "vue";
import type { OnyxTimerProps } from "./types";
import { useTimer } from "../../composables/useTimer";
import { injectI18n } from "../../i18n";

const props = withDefaults(defineProps<OnyxTimerProps>(), {
  endTime: new Date().toISOString(),
});

const emit = defineEmits<{
  timerEnded: [];
}>();

const { t } = injectI18n();

const { startTimer, endTimer, timeLeft, isEnded } = useTimer({
  endTime: toRef(props, "endTime"),
  isPaused: toRef(props, "isPaused"),
});

// format the time left in hours, minutes and seconds, could be moved to utils
const formattedTime = computed(() => {
  const hours = Math.floor(timeLeft.value / 60000 / 60);
  const minutes = Math.floor(timeLeft.value / 60000);
  const seconds = Math.floor((timeLeft.value % 60000) / 1000);
  let time = "";
  let label = t.value("time.seconds", { n: seconds });
  if (minutes > 0) {
    label = t.value("time.minutes", { n: minutes });
  }
  if (hours > 0) {
    label = t.value("time.hours", { n: hours });
    time = `${hours.toString().padStart(2, "0")}:`;
  }
  return `${time}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${label}`;
});

//TODO: duration
const formattedDuration = computed(() => {
  return "tbd";
});

watch(isEnded, (value) => {
  if (value) emit("timerEnded");
});

onMounted(() => startTimer());

onBeforeUnmount(() => endTimer());
</script>

<template>
  <p class="onyx-timer">
    <span v-if="props.label" class="onyx-timer__label">{{ props.label }}</span>
    <time :datetime="formattedDuration" class="onyx-timer__time">{{ formattedTime }}</time>
  </p>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-timer {
  @include layers.component() {
    display: inline-flex;
    gap: var(--onyx-spacing-2xs);
    padding: var(--onyx-tag-padding);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    &__label {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
    &__time {
      font-weight: 600;
    }
  }
}
</style>
