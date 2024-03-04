import { type Decorator } from "@storybook/vue3";
import { ref, watch } from "vue";

type MandatoryIndicator = "required" | "optional";
type MandatoryGlobalType = {
  name: string;
  description: string;
  defaultValue: MandatoryIndicator;
  toolbar: {
    icon: string;
    items: { value: MandatoryIndicator; right: string; title: string }[];
  };
};

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
  } satisfies MandatoryGlobalType,
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
