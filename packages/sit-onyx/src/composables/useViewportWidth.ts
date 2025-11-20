import { onBeforeMount, onUnmounted, ref } from "vue";

/**
 * Composable that tracks the current viewport width.
 * Updates reactively when the window is resized.
 *
 * **NOTE** During server-side rendering, the width will be 0.
 */
export const useViewportWidth = () => {
  const width = ref(0);

  const updateWidth = () => {
    width.value = window.innerWidth;
  };

  /**
   * `useGlobalEventListener` cannot be used here because it is apply listeners on `document`,
   *  while we need to listen to `window` resize events.
   */
  onBeforeMount(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
  });

  return width;
};
