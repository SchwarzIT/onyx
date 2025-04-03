import { computed, onMounted, onUnmounted, ref, unref, type MaybeRef } from "vue";
import type { DateValue } from "../components/OnyxDatePicker/types";
import { injectI18n } from "../i18n";

export type UseRelativeTimeFormatOptions = {
  /**
   * Time/date to format.
   */
  time: MaybeRef<DateValue>;
  /**
   * Options to use for the formatter.
   */
  options?: MaybeRef<Intl.RelativeTimeFormatOptions>;
};

/**
 * Reactive wrapper/utilities around the `Intl.RelativeTimeFormat` API.
 */
export const useRelativeTimeFormat = (options: UseRelativeTimeFormatOptions) => {
  const { locale, t } = injectI18n();
  const format = computed(() => new Intl.RelativeTimeFormat(locale.value, unref(options.options)));

  const now = ref(Date.now());
  let nowInterval: ReturnType<typeof setInterval> | undefined;

  onMounted(() => {
    // only calling setInterval onMounted to support SSR
    nowInterval = setInterval(
      () => (now.value = Date.now()),
      // run interval only every 10 seconds to not run too many intervals
      1000 * 10,
    );
  });
  onUnmounted(() => clearInterval(nowInterval));

  /**
   * Full seconds passed between now and the given date.
   * Will be negative, if date is in the past and positive if its in the future.
   */
  const secondsPassed = computed(() => {
    const date = new Date(unref(options.time)).getTime();
    const millisecondsPassed = date - now.value;
    return Math.floor(millisecondsPassed / 1000);
  });

  const unitThresholds = {
    // important: the values here must be sorted from highest to lowest so the highest possible value is used for the "timeAgo"
    year: 60 * 60 * 24 * 365,
    month: 60 * 60 * 24 * 30,
    week: 60 * 60 * 24 * 7,
    day: 60 * 60 * 24,
    hour: 60 * 60,
    minute: 60,
  } satisfies Partial<Record<Intl.RelativeTimeFormatUnitSingular, number>>;

  /**
   * The current relative time unit (minute, hour etc.).
   * If undefined, the time is considered to be "now".
   */
  const currentUnit = computed(() => {
    return (Object.keys(unitThresholds) as (keyof typeof unitThresholds)[]).find(
      (unit) => Math.abs(secondsPassed.value) >= unitThresholds[unit],
    );
  });

  const timeAgo = computed(() => {
    if (!currentUnit.value) return t.value("now");
    const passedTime = secondsPassed.value / unitThresholds[currentUnit.value];
    const value = passedTime < 0 ? Math.ceil(passedTime) : Math.floor(passedTime);
    return format.value.format(value, currentUnit.value);
  });

  return {
    /**
     * Formatted relative time string.
     *
     * @example "42 minutes ago"
     */
    timeAgo,
  };
};
