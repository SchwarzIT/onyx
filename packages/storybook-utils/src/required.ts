import { type Decorator } from "@storybook/vue3";
import { ref, watch } from "vue";
import type { StorybookGlobalType } from "./types";

type RequiredIndicator = "required" | "optional";

export const requiredGlobalType = {
  requiredMode: {
    name: "Required mode",
    description: "Switch between 'required' and 'optional' indicator",
    toolbar: {
      icon: "flag",
      items: [
        { value: "required", right: "*", title: "Required indicator" },
        { value: "optional", right: "(optional)", title: "Optional indicator" },
      ],
    },
  } satisfies StorybookGlobalType<RequiredIndicator>,
};

const requiredMode = ref<RequiredIndicator>("required");

export const withRequired: Decorator = (Story, context) => {
  watch(
    () => context.globals.requiredMode as RequiredIndicator,
    (newRequiredMode) => (requiredMode.value = newRequiredMode),
    { immediate: true },
  );

  return {
    components: { Story },
    setup: () => ({ requiredMode }),
    template: `<div :class="{ ['onyx-use-optional']: requiredMode === 'optional' }"> <story /> </div>`,
  };
};
