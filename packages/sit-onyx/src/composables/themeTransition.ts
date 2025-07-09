import { onMounted, watch, type Ref } from "vue";
import type { ColorSchemeValue } from "../components/OnyxNavBar/modules/index.js";

export const useThemeTransition = (theme: Ref<ColorSchemeValue>) => {
  //onMounted because of Server-Side-Rendering
  onMounted(() => {
    watch([theme], () => {
      const root = document.documentElement;

      const className = "onyx-transition-active";

      const handleTransitionEnd = () => {
        root.classList.remove(className);
      };
      root.addEventListener("transitionend", handleTransitionEnd, { once: true });
      root.classList.add(className);
    });
  });
};
