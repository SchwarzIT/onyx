import { reactive, ref, type Ref } from "vue";

export type RippleConfig = {
  trigger: Ref<HTMLElement | undefined>;
  color: string;
  terminateOnPointerUp: boolean;
  duration: string;
  durationLeave: string;
};

export type RippleInstance = {
  x: number;
  y: number;
  radius: number;
  time: number;
  backgroundColor: string;
  rippleId: string;
  fadeIn: boolean;
};

export const useRipple = (config: Ref<RippleConfig>) => {
  const isPointerDown = ref(false);

  const ripples = reactive(new Map<string, RippleInstance>());

  const startRipple = () => {
    isPointerDown.value = true;

    const obj = {
      x: Math.random() * 50,
      y: 10,
      radius: 80,
      time: Date.now(),
      backgroundColor: config.value.color,
      rippleId: self.crypto.randomUUID(),
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

  const events = {
    mousedown: startRipple,
    touchstart: startRipple,
    mouseup: hideRipples,
    mouseleave: hideRipples,
    touchend: hideRipples,
    touchcancel: hideRipples,
  };

  return { isPointerDown, ripples, startRipple, hideRipples, hideRipple, events };
};
