<script lang="ts" setup>
import { computed, watchEffect } from "vue";
import { useTimer } from "../../../../composables/useTimer.js";
import { injectI18n } from "../../../../i18n/index.js";
import { formatTime, timeToDurationString } from "../../../../utils/time.js";
import type { OnyxTimerProps } from "./types.js";

const props = defineProps<OnyxTimerProps>();

const emit = defineEmits<{
  /**
   * Emitted when timer has ended.
   */
  timerEnded: [];
}>();

const { locale } = injectI18n();
const { timeLeft, isEnded } = useTimer(computed(() => props.endTime));

const timeFormat = computed(
  () => new Intl.RelativeTimeFormat(locale.value, { numeric: "always", style: "short" }),
);

/**
 * Formatted remaining time.
 */
const formattedTime = computed(() => formatTime(timeLeft.value, timeFormat.value));

watchEffect(() => isEnded.value && emit("timerEnded"));

defineExpose({
  /**
   * Time (in milliseconds) that the timer has left.
   */
  timeLeft,
});
</script>

<template>
  <div
    class="onyx-component onyx-timer onyx-text onyx-truncation-ellipsis"
    role="timer"
    :aria-label="props.hideLabel ? props.label : undefined"
  >
    <span v-if="!props.hideLabel" class="onyx-timer__label">{{ props.label }}</span>
    <time :datetime="timeToDurationString(timeLeft)" class="onyx-timer__time">
      {{ formattedTime }}
    </time>
  </div>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-timer {
  @include layers.component() {
    display: inline-flex;
    gap: var(--onyx-spacing-2xs);
    border-radius: var(--onyx-radius-md);
    border: none;
    background: var(--onyx-color-base-background-blank);
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    width: max-content;
    max-width: 100%;

    &__label {
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    &__time {
      font-weight: var(--onyx-font-weight-semibold);
    }
  }
}
</style>
