import { StorybookGlobalType } from "@sit-onyx/storybook-utils";
import { type Decorator } from "@storybook/vue3";
import { ref, watch } from "vue";
import { ONYX_THEMES } from "../src";

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
  watch(
    () => context.globals.onyxTheme,
    (newTheme) => {
      currentOnyxTheme.value = newTheme;
    },
    { immediate: true },
  );

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
    template: ` <story /> `,
  };
};
