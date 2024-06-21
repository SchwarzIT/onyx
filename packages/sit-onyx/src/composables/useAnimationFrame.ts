import { onUnmounted, ref } from "vue";

/**
 * Composable for using `requestAnimationFrame()`.
 * Will ensure that loop is stopped when the component is unmounted to prevent dangling animation frame loops.
 */
export const useAnimationFrame = (callback: () => void) => {
  const frameId = ref<ReturnType<typeof requestAnimationFrame>>();

  const loop: FrameRequestCallback = () => {
    callback();
    frameId.value = requestAnimationFrame(loop);
  };

  frameId.value = requestAnimationFrame(loop);

  /**
   * Stops the animation frame loop.
   */
  const stop = () => {
    if (!frameId.value) return;
    cancelAnimationFrame(frameId.value);
  };

  onUnmounted(() => stop());

  return { stop };
};
