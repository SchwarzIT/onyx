import { createId } from "@sit-onyx/headless";
import { computed, onBeforeMount, reactive, ref, type Ref } from "vue";
import { distanceToFurthestCorner } from "../utils/math";

export type RippleConfig = {
  container: Ref<Pick<HTMLElement, "getBoundingClientRect"> | undefined>;
};

export type RippleInstance = {
  left: string;
  top: string;
  radius: string;
  rippleId: string;
  fadeIn: boolean;
};

export const useRipple = (config: Ref<RippleConfig>) => {
  const isPointerDown = ref(false);
  const ripples = reactive(new Map<string, RippleInstance>());

  const containerRect = computed(() => {
    return config.value.container.value?.getBoundingClientRect();
  });

  const startRipple = (event: MouseEvent) => {
    isPointerDown.value = true;

    const x = event.x;
    const y = event.y;

    if (!containerRect.value) return;

    const radius = distanceToFurthestCorner(x, y, containerRect.value);
    const offsetX = x - containerRect.value.left;
    const offsetY = y - containerRect.value.top;

    const obj = {
      left: offsetX - radius + "px",
      top: offsetY - radius + "px",
      radius: Math.round(radius * 2) + "px",
      rippleId: createId("ripple"),
      fadeIn: false,
    };

    ripples.set(obj.rippleId, obj);
  };

  const hideRipple = (el: Pick<HTMLElement, "dataset">) => {
    const rippleId = el.dataset.rippleid;
    if (rippleId == undefined) return;
    if (ripples.has(rippleId)) ripples.get(rippleId)!.fadeIn = true;
    if (!isPointerDown.value) ripples.delete(rippleId);
  };

  const hideRipples = () => {
    isPointerDown.value = false;
    ripples.forEach((r, key) => {
      if (r.fadeIn) ripples.delete(key);
    });
  };

  /**
   * Events used by the trigger element to start and stop ripples
   */
  const events = ref<Record<string, (event: MouseEvent) => void>>({});

  // we access "window.matchMedia" to get the events which is not available in server side rendering
  // so we need to make sure to only call it in "onBeforeMount"
  onBeforeMount(() => {
    // detect if NO pointer device exists, so we use touch events
    // we check if "window.matchMedia" exists first (with the ? operator) because it may not be available in e.g. unit tests
    if (window.matchMedia?.("pointer: none").matches) {
      events.value = {
        touchstart: startRipple,
        touchend: hideRipples,
        touchcancel: hideRipples,
      };
    } else {
      events.value = {
        mousedown: startRipple,
        mouseleave: hideRipples,
        mouseup: hideRipples,
      };
    }
  });

  return { isPointerDown, ripples, startRipple, hideRipples, hideRipple, events };
};
