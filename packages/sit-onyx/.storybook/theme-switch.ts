import type { StorybookGlobalType } from "@sit-onyx/storybook-utils";
import type { Decorator } from "@storybook/vue3";
import { ref, watch, watchEffect } from "vue";

const allThemes = import.meta.glob("../src/styles/variables/themes/*.css");
/**
 * Removes alles dark-themes from the listing
 */
const themes = Object.fromEntries(
  Object.entries(allThemes).filter(([key]) => !key.includes("dark") && !key.includes("Value")),
);

/**
 * Map of all available onyx themes. Default theme will be sorted first.
 * key = theme name, value = async function to dynamically import the CSS variables
 */
export const ONYX_THEMES = Object.entries(themes)
  .sort(([a], [b]) => {
    if (a.endsWith("onyx-light.css")) return -1;
    if (b.endsWith("onyx-light.css")) return 1;
    return a.localeCompare(b);
  })
  .reduce<typeof themes>((obj, [filePath, importFn]) => {
    const themeName = filePath.split("/").at(-1)!.replace("-light.css", "");
    obj[themeName] = importFn;
    return obj;
  }, {});

export const onyxThemeGlobalType = {
  onyxTheme: {
    name: "Theme",
    description: "Select which onyx theme should be used",
    toolbar: {
      title: "Theme",
      icon: "paintbrush",
      dynamicTitle: true,
      items: Object.keys(ONYX_THEMES).map((theme, index) => ({
        value: theme,
        title: theme,
        right: index === 0 ? "default" : undefined,
      })),
    },
  } satisfies StorybookGlobalType<string>,
};

const currentOnyxTheme = ref<string>();

export const withOnyxTheme: Decorator = (Story, context) => {
  watchEffect(async () => {
    const theme = context.globals.onyxTheme ?? ONYX_THEMES[0];
    currentOnyxTheme.value = theme === ONYX_THEMES[0] ? "default" : theme;
    await ONYX_THEMES[theme]?.();
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
