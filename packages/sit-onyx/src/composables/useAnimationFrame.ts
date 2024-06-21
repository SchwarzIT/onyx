import { onMounted, onUnmounted, ref } from "vue";

/**
 * Composable for using `requestAnimationFrame()`.
 * Will ensure that loop is stopped when the component is unmounted to prevent dangling animation frame loops.
 */
export const useAnimationFrame = (callback: () => void) => {
  const frameId = ref<ReturnType<typeof requestAnimationFrame>>();

  const loop: FrameRequestCallback = () => {
    callback();
    if (frameId.value != undefined) {
      // restart loop if not stopped
      frameId.value = requestAnimationFrame(loop);
    }
  };

  const stop = () => {
    if (!frameId.value) return;
    cancelAnimationFrame(frameId.value);
    frameId.value = undefined;
  };

  onMounted(() => (frameId.value = requestAnimationFrame(loop)));
  onUnmounted(() => stop());

  return {
    /**
     * Stops the animation frame loop.
     */
    stop,
  };
};
