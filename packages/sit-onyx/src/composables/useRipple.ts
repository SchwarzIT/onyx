import { onBeforeMount, reactive, ref, type ShallowRef } from "vue";

export type RippleInstance = {
  id: string;
  left: string;
  top: string;
  animationEnded: boolean;
};

export const useRipple = (container: Readonly<ShallowRef<HTMLSpanElement | null>>) => {
  /** Whether the mouse/pointer is currently hold down. */
  const isPointerDown = ref(false);
  const ripples = reactive(new Map<string, RippleInstance>());

  /**
   * Starts a new ripple on click.
   */
  const startRipple = (event: MouseEvent) => {
    const rect = container.value?.getBoundingClientRect();
    if (!rect) return;

    isPointerDown.value = true;

    const ripple: RippleInstance = {
      id: Date.now().toString(),
      left: `${event.x - rect.left}px`,
      top: `${event.y - rect.top}px`,
      animationEnded: false,
    };

    ripples.set(ripple.id, ripple);
    return ripple.id;
  };

  /**
   * Hides the given ripple. Should be called when the animation for the given ripple ended.
   */
  const hideRipple = (el: Pick<HTMLElement, "dataset">) => {
    const rippleId = el.dataset.rippleid;
    if (rippleId == undefined) return;
    if (ripples.has(rippleId)) ripples.get(rippleId)!.animationEnded = true;
    if (!isPointerDown.value) ripples.delete(rippleId);
  };

  /**
   * Deletes all ripples that have already been fully animated.
   */
  const hideRipples = () => {
    isPointerDown.value = false;
    ripples.forEach((r, key) => {
      if (r.animationEnded) ripples.delete(key);
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
