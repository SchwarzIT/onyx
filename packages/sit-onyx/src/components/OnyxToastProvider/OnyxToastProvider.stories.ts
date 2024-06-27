import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxToastProvider from "./OnyxToastProvider.vue";
import { useToast } from "./useToast";

const codeTemplate = `
  <div>
    <OnyxButton label="Show toast" @click="showExampleToast" />
    <OnyxToastProvider />
  </div>
`;

/**
 * Toast provider that is used to display toasts inside the application.
 *
 * ### Setup
 *
 * #### Step 1: Use the `<OnyxToastProvider />` component
 *
 * Place the `<OnyxToastProvider />` component once anywhere in your application (e.g. in your App.vue file).
 * It will take care of displaying the toasts correctly.
 *
 * #### Step 2: Create the toast provider
 *
 * **If you are using the `createOnyx()` Vue plugin, you can skip this step since this will already be set up for you.**
 *
 * The toast provider works with Vue's [provide/inject](https://vuejs.org/guide/components/provide-inject) API so you need to provide the toast provider once.
 * To do so, add the following code to your `main.ts` file to set up the toasts globally:
 *
 * ```ts
 * import { createToastProvider, TOAST_PROVIDER_INJECTION_KEY } from "sit-onyx";
 *
 * app.provide(TOAST_PROVIDER_INJECTION_KEY, createToastProvider());
 * ```
 */
const meta: Meta<typeof OnyxToastProvider> = {
  title: "Feedback/ToastProvider",
  ...defineStorybookActionsAndVModels({
    component: OnyxToastProvider,
    events: [],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="height: 24rem;"> <story /> </div>`,
      }),
    ],
    render: (args) => ({
      setup: () => {
        const toast = useToast();

        const showExampleToast = () => {
          toast.show({ headline: "Example toast" });
        };

        return { args, showExampleToast };
      },
      components: { OnyxButton, OnyxToastProvider },
      template: codeTemplate,
    }),
  }),
  parameters: {
    docs: {
      source: {
        code: `<script lang="ts" setup>
import { OnyxButton, OnyxToastProvider, useToast } from "sit-onyx";

const toast = useToast();

const showExampleToast = () => {
  toast.show({ headline: "Example toast" });
};
</script>

<template>${codeTemplate}</template>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxToastProvider>;

export const Default = { args: {} } satisfies Story;
