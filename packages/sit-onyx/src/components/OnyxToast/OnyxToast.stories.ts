import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import StorybookExample from "./StorybookExample.vue";
import StorybookExampleSourceCode from "./StorybookExample.vue?raw";

/**
 * The toast is used to display toast messages to the user.
 * For a full list of toast examples, you can check out the [OnyxToastMessage](/docs/support-toastmessage--docs) component.
 *
 * For a good user experience, make sure to not display too many toasts at the same time (we recommend a limit of 5 toasts).
 *
 * ### Setup
 *
 * #### Step 1: Use the `<OnyxToast />` component
 *
 * Place the `<OnyxToast />` component once anywhere in your application (e.g. in your App.vue file).
 * It will take care of displaying the toasts correctly.
 *
 * #### Step 2: Create the toast provider
 *
 * **If you are using the `createOnyx()` Vue plugin, you can skip this step since this will already be set up for you.**
 *
 * The toast works with Vue's [provide/inject](https://vuejs.org/guide/components/provide-inject) API so you need to create a toast provider once.
 * To do so, add the following code to your `main.ts` file to set up the toasts globally:
 *
 * ```ts
 * import { createToastProvider, TOAST_PROVIDER_INJECTION_KEY } from "sit-onyx";
 *
 * app.provide(TOAST_PROVIDER_INJECTION_KEY, createToastProvider());
 * ```
 *
 * Afterwards, toasts can be shown using the `useToast()` composable as shown in the example below.
 */
const meta: Meta<typeof StorybookExample> = {
  title: "Feedback/Toast",
  ...defineStorybookActionsAndVModels({
    component: StorybookExample,
    events: [],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="height: 24rem;"> <story /> </div>`,
      }),
    ],
  }),
  parameters: {
    docs: {
      source: {
        code: StorybookExampleSourceCode.replace('from "../.."', 'from "sit-onyx"'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StorybookExample>;

export const Default = { args: {} } satisfies Story;
