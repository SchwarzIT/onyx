import type { ColorSchemeValue } from "src/components/OnyxNavBar/modules";
import { onMounted, watch, type Ref } from "vue";

export const useThemeTransition = (theme: Ref<ColorSchemeValue>) => {
  //onMounted because of Server-Side-Rendering
  onMounted(() => {
    watch([theme], () => {
      const root = document.documentElement;

      const handleTransitionEnd = () => {
        root.classList.remove("onyx-transition-active");
      };
      root.addEventListener("transitionend", handleTransitionEnd, { once: true });
      root.classList.add("onyx-transition-active");
    });
  });
};
