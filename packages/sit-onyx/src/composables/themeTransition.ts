import type { ColorSchemeValue } from "src/components/OnyxNavBar/modules";
import { watch, type Ref } from "vue";

export const useThemeTransition = (theme: Ref<ColorSchemeValue>) => {
  watch([theme], () => {
    const root = document.documentElement;
    root.classList.add("transition-active");

    const handleTransitionEnd = () => {
      root.classList.remove("transition-active");
    };

    root.addEventListener("transitionend", handleTransitionEnd, { once: true });
  });
};
