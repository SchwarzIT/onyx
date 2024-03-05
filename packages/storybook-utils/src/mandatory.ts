import { type Decorator } from "@storybook/vue3";
import { ref, watch } from "vue";
import type { StorybookGlobalType } from "./types";

type MandatoryIndicator = "required" | "optional";

export const mandatoryGlobalType = {
  mandatoryMode: {
    name: "Mandatory mode",
    description: "Switch between 'required' and 'optional' indicator",
    defaultValue: "required",
    toolbar: {
      icon: "flag",
      items: [
        { value: "required", right: "*", title: "Required indicator" },
        { value: "optional", right: "(optional)", title: "Optional indicator" },
      ],
    },
  } satisfies StorybookGlobalType<MandatoryIndicator>,
};

const mandatoryMode = ref<MandatoryIndicator>("required");

export const withMandatory: Decorator = (Story, context) => {
  watch(
    () => context.globals.mandatoryMode as MandatoryIndicator,
    (newMandatoryMode) => (mandatoryMode.value = newMandatoryMode),
    { immediate: true },
  );

  return {
    components: { Story },
    setup: () => ({ mandatoryMode }),
    template: `<div :class="{ ['onyx-use-optional']: mandatoryMode === 'optional' }"> <story /> </div>`,
  };
};
