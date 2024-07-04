import { StorybookGlobalType } from "@sit-onyx/storybook-utils";
import type { Decorator } from "@storybook/vue3";
import { ref, watch, watchEffect } from "vue";

const themes = import.meta.glob("../src/styles/themes//*.css", { eager: true });
export const ONYX_THEMES = Object.keys(themes)
  .map((filePath) => filePath.split("/").at(-1)!.replace(".css", ""))
  .sort((a, b) => {
    if (a === "onyx") return -1;
    if (b === "onyx") return 1;
    return a.localeCompare(b);
  });

export const onyxThemeGlobalType = {
  onyxTheme: {
    name: "Theme",
    description: "Select which onyx theme should be used",
    toolbar: {
      title: "Theme",
      icon: "paintbrush",
      items: ONYX_THEMES.map((theme, index) => ({
        value: theme,
        title: theme,
        right: index === 0 ? "default" : undefined,
      })),
    },
  } satisfies StorybookGlobalType<string>,
};

const currentOnyxTheme = ref<string>();

export const withOnyxTheme: Decorator = (Story, context) => {
  watchEffect(() => {
    const theme = context.globals.onyxTheme ?? ONYX_THEMES[0];
    currentOnyxTheme.value = theme === ONYX_THEMES[0] ? "default" : theme;
  });

  return {
    components: { Story },
    setup: () => {
      watch(
        currentOnyxTheme,
        (newTheme, oldTheme) => {
          document.documentElement.classList.remove(`onyx-theme-${oldTheme}`);
          document.documentElement.classList.add(`onyx-theme-${newTheme}`);
        },
        { immediate: true },
      );

      return { currentOnyxTheme };
    },
    template: `<story />`,
  };
};
