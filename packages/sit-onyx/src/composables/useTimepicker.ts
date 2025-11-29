import { computed, ref, type Ref } from "vue";
import type { OnyxTimepickerProps } from "../components/OnyxTimepicker/types.js";

export type Segment = "hour" | "minute" | "second";

export function useTimepicker(props: OnyxTimepickerProps) {
  const hourInput = ref<number | null>(null);
  const minuteInput = ref<number | null>(null);
  const secondInput = ref<number | null>(null);

  const availableSegments = computed<Segment[]>(() => {
    const segments: Segment[] = [];
    if (props.segments?.hour) segments.push("hour");
    if (props.segments?.minute) segments.push("minute");
    if (props.segments?.second) segments.push("second");
    return segments;
  });

  const formatTimeSegment = (value: number | null): string => {
    if (value === null || value === undefined || isNaN(value)) return "00";
    const limitedValue = Math.max(0, Math.round(value));
    return String(limitedValue).padStart(2, "0");
  };

  const getSegmentBoundaries = (
    segments: Segment[],
  ): { start: number; end: number; segment: Segment }[] => {
    const boundaries: { start: number; end: number; segment: Segment }[] = [];
    let currentStart = 0;

    for (const segment of segments) {
      if (boundaries.length > 0) {
        currentStart += 1;
      }

      boundaries.push({ segment: segment, start: currentStart, end: currentStart + 2 });
      currentStart += 2;
    }
    return boundaries;
  };

  const getSegmentModel = (segment: Segment): Ref<number | null> => {
    switch (segment) {
      case "hour":
        return hourInput;
      case "minute":
        return minuteInput;
      case "second":
        return secondInput;
    }
  };

  const timeString = computed<string>({
    get() {
      const h = formatTimeSegment(hourInput.value);
      const m = formatTimeSegment(minuteInput.value);
      const s = formatTimeSegment(secondInput.value);

      const parts = [];
      const activeSegments = [];

      if (props.segments?.hour) {
        parts.push(h);
        activeSegments.push(h);
      }
      if (props.segments?.minute) {
        parts.push(m);
        activeSegments.push(m);
      }

      if (props.segments?.second) {
        parts.push(s);
        activeSegments.push(s);
      }

      const isAllZero = activeSegments.every((segment) => segment === "00");

      if (isAllZero) {
        return "";
      }
      return parts.join(":");
    },
    set(newValue: string) {
      if (newValue.trim() === "") {
        hourInput.value = null;
        minuteInput.value = null;
        secondInput.value = null;
        return;
      }

      const parts = newValue.split(":").map((p) => p.trim());
      let partIndex = 0;

      hourInput.value = null;
      minuteInput.value = null;
      secondInput.value = null;

      if (props.segments?.hour && partIndex < parts.length) {
        const numericValue = parseInt(parts[partIndex]!, 10);
        if (!isNaN(numericValue)) {
          hourInput.value = Math.max(0, Math.min(23, numericValue));
        }
        partIndex++;
      }

      if (props.segments?.minute && partIndex < parts.length) {
        const numericValue = parseInt(parts[partIndex]!, 10);
        if (!isNaN(numericValue)) {
          minuteInput.value = Math.max(0, Math.min(59, numericValue));
        }
        partIndex++;
      }

      if (props.segments?.second && partIndex < parts.length) {
        const numericValue = parseInt(parts[partIndex]!, 10);
        if (!isNaN(numericValue)) {
          secondInput.value = Math.max(0, Math.min(59, numericValue));
        }
        partIndex++;
      }
    },
  });

  return {
    hourInput,
    minuteInput,
    secondInput,
    timeString,
    availableSegments,
    formatTimeSegment,
    getSegmentBoundaries,
    getSegmentModel,
  };
}
