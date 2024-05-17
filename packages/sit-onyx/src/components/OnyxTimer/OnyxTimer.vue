<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, toRef, watch } from "vue";
import type { OnyxTimerProps } from "./types";
import { useTimer } from "../../composables/useTimer";
import { injectI18n } from "../../i18n";
import { formatTimerTime, formatTimerTimeDuration } from "../../utils/time";

const props = defineProps<OnyxTimerProps>();

const emit = defineEmits<{
  /** emitted when timer has ended */
  timerEnded: [];
}>();

const { t } = injectI18n();

const { startTimer, endTimer, timeLeft, isEnded } = useTimer({
  endTime: toRef(props, "endTime"),
});

const formattedTime = computed(() => formatTimerTime(timeLeft.value, t));

const formattedTimeAttribute = computed(() => formatTimerTimeDuration(timeLeft.value));

watch(isEnded, (value) => {
  if (value) emit("timerEnded");
});

onMounted(() => startTimer());

onBeforeUnmount(() => endTimer());
</script>

<template>
  <p class="onyx-timer">
    <span v-if="props.label" class="onyx-timer__label">{{ props.label }}</span>
    <time :datetime="formattedTimeAttribute" class="onyx-timer__time">{{ formattedTime }}</time>
  </p>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-timer {
  @include layers.component() {
    display: inline-flex;
    border-radius: var(--onyx-radius-sm);
    border: none;
    background: var(--onyx-color-base-background-blank);
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
    gap: var(--onyx-spacing-2xs);
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
