import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxGlobalFAB from "./OnyxGlobalFAB.vue";

/**
 * The Global Floating Action Button (GlobalFAB) is designed for universal access, allowing any part of your application to add or manage its available options.
 *
 * ### Setup
 *
 * #### Step 1: Use the `<OnyxGlobalFAB />` component
 * **If you are using `OnyxAppLayout`, you can skip this step since this will alread be set up for you.**
 * Place the `<OnyxGlobalFAB />` component once anywhere in your application (e.g. in your App.vue file).
 * It will take care of displaying the global FAB correctly.
 *
 * #### Step 2: Create the global fab provider
 *
 * **If you are using the [createOnyx()](https://onyx.schwarz/development/#installation) Vue plugin, you can skip this step since this will already be set up for you.**
 *
 * The global FAB works with Vue's [provide/inject](https://vuejs.org/guide/components/provide-inject) API so you need to create a global FAB provider once.
 * To do so, add the following code to your `main.ts` file to set up the toasts globally:
 *
 * ```ts
 * import { createGlobalFABProvider, GLOBAL_FAB_PROVIDER_INJECTION_KEY } from "sit-onyx";
 *
 * app.provide(GLOBAL_FAB_PROVIDER_INJECTION_KEY, createGlobalFABProvider());
 * ```
 *
 * Afterwards, the global FAB can be filled using the `useGlobalFAB()` composable as shown in the example below.
 */
const meta: Meta<typeof OnyxGlobalFAB> = {
  title: "Buttons/GlobalFAB",
  component: OnyxGlobalFAB,
  tags: ["new:component"],
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="min-height: 12rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxGlobalFAB>;

export const Default = createAdvancedStoryExample("OnyxGlobalFAB", "GlobalExample") satisfies Story;
