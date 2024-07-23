import { computed, reactive, ref, type Ref } from "vue";

export type RippleConfig = {
  trigger: Ref<HTMLElement | undefined>;
  color: string;
  terminateOnPointerUp: boolean;
  duration: string;
  durationLeave: string;
  container: Ref<HTMLElement | undefined>;
};

export type RippleInstance = {
  left: string;
  top: string;
  radius: string;
  time: number;
  backgroundColor: string;
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
      time: Date.now(),
      backgroundColor: config.value.color,
      rippleId: "d" + Date.now(),
      fadeIn: false,
    };

    ripples.set(obj.rippleId, obj);
  };

  const hideRipple = (el: HTMLElement) => {
    ripples.get(el.dataset.rippleid!)!.fadeIn = true;
    if (!isPointerDown.value) ripples.delete(el.dataset.rippleid!);
  };

  const hideRipples = () => {
    isPointerDown.value = false;
    ripples.forEach((r, key) => {
      if (r.fadeIn || config.value.terminateOnPointerUp) ripples.delete(key);
    });
  };

  function distanceToFurthestCorner(x: number, y: number, rect: DOMRect) {
    const dx = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const dy = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.hypot(dx, dy);
  }

  const getEvents = () => {
    // detect if NO pointer device exists, so we use touch events
    if (window.matchMedia("pointer: none").matches) {
      return {
        touchstart: startRipple,
        touchend: hideRipples,
        touchcancel: hideRipples,
      };
    }
    return {
      mousedown: startRipple,
      mouseleave: hideRipples,
      mouseup: hideRipples,
    };
  };

  return { isPointerDown, ripples, startRipple, hideRipples, hideRipple, events: getEvents() };
};
