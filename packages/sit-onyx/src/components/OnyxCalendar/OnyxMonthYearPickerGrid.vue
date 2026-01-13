<script lang="ts" setup>
import { computed, nextTick, useTemplateRef, watch } from "vue";
import { injectI18n } from "../../i18n/index.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";

const props = defineProps<{
  /**
   * Mode of the picker.
   */
  mode: "year" | "month";
  /**
   * The month / year that is currently visible.
   */
  viewMonth: Date;
  /**
   * When the calendar picker is open.
   */
  open: boolean;
}>();

const emit = defineEmits<{
  selectYear: [year: number];
  selectMonth: [month: number];
}>();

const { d } = injectI18n();

const currentViewYear = computed(() => props.viewMonth.getFullYear());
const currentViewMonthIndex = computed(() => props.viewMonth.getMonth());

const years = computed(() => {
  const count = 100;
  const currentYear = new Date().getFullYear();
  const start = currentYear - count;
  const end = currentYear + count;

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const monthNames = computed(() => {
  return Array.from({ length: 12 }, (_, i) => ({
    label: d.value(new Date(2000, i, 1), { month: "short" }),
    value: i,
  }));
});
const buttonRefs = useTemplateRef("buttons");

const scrollToActiveYear = async () => {
  if (props.mode !== "year") return;
  await nextTick();
  const activeIndex = years.value.indexOf(currentViewYear.value);
  const selectedYearButton: HTMLElement | undefined = buttonRefs.value?.[activeIndex]?.$el;
  if (!selectedYearButton) return;
  selectedYearButton.scrollIntoView({ block: "center" });
};

watch(
  () => props.open,
  (open) => {
    if (open) {
      scrollToActiveYear();
    }
  },
);
</script>

<template>
  <div class="onyx-component onyx-calendar__picker-grid">
    <template v-if="props.mode === 'year'">
      <!-- TODO: Change to SystemButton after styles are implemented -->
      <OnyxButton
        v-for="year in years"
        ref="buttons"
        :key="year"
        :label="year.toString()"
        :color="year === currentViewYear ? 'primary' : 'neutral'"
        mode="plain"
        size="small"
        @click="emit('selectYear', year)"
      />
    </template>

    <template v-else>
      <!-- TODO: Change to SystemButton after styles are implemented -->
      <OnyxButton
        v-for="month in monthNames"
        :key="month.value"
        :label="month.label"
        :color="month.value === currentViewMonthIndex ? 'primary' : 'neutral'"
        mode="plain"
        size="small"
        @click="emit('selectMonth', month.value)"
      />
    </template>
  </div>
</template>

<style lang="scss">
.onyx-calendar {
  &__picker-grid {
    display: grid;
    scroll-behavior: auto;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--onyx-density-2xs);
    padding: var(--onyx-density-xs);
    aspect-ratio: 1;
    overflow-y: auto;
    min-width: 16rem;

    &--inline {
      width: 100%;
      aspect-ratio: 1;
      background-color: var(--onyx-color-base-background-blank);
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      border-radius: var(--onyx-radius-md);
    }

    .onyx-button {
      width: 100%;
    }
    .onyx-calendar--small & {
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      border-radius: var(--onyx-radius-md);
      background-color: var(--onyx-color-base-background-blank);
      width: 100%;
      $header-height: calc(var(--onyx-font-line-height-sm) + 2 * var(--onyx-density-xs));
      // calendar-height + header-height + borders
      height: calc((100cqw / 7 * 6) + #{$header-height} + var(--onyx-1px-in-rem));
    }
  }
}
</style>
