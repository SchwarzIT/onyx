import { unref, type MaybeRef } from "vue";
import { createId } from "../..";
import { createBuilder } from "../../utils/builder";
import { MathUtils } from "../../utils/math";

type CreateNavigationMenu = {
  /**
   * Name of the navigation landmark.
   * Usually this is the name of the website.
   */
  navigationName?: MaybeRef<string | undefined>;
};

/**
 * Based on https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
 */
export const createNavigationMenu = createBuilder(({ navigationName }: CreateNavigationMenu) => {
  const navId = createId("nav");

  const getMenuButtons = () => {
    const nav = document.getElementById(navId);
    if (!nav) return [];
    return [...nav.querySelectorAll<HTMLElement>("button[aria-expanded][aria-controls]")];
  };

  const focusRelative = (trigger: HTMLElement, next: "next" | "previous") => {
    const menuButtons = getMenuButtons();
    const index = menuButtons.indexOf(trigger);
    if (index === -1) return;
    const nextIndex = MathUtils.clamp(
      index + (next === "next" ? 1 : -1),
      0,
      menuButtons.length - 1,
    );
    menuButtons[nextIndex].focus();
  };

  return {
    elements: {
      nav: {
        "aria-label": unref(navigationName),
        id: navId,
        onKeydown: (event) => {
          switch (event.key) {
            case "ArrowRight":
              focusRelative(event.target as HTMLElement, "next");
              break;
            case "ArrowLeft":
              focusRelative(event.target as HTMLElement, "previous");
              break;
          }
        },
      },
    },
  };
});
