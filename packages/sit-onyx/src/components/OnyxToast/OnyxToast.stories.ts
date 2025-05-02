import type { Meta } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../utils/storybook";
import OnyxToast from "./OnyxToast.vue";

/**
 * Toasts provide immediate feedback to users after actions, offering concise, time-limited messages to confirm or notify without interrupting their workflow.
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
 * **If you are using the [createOnyx()](https://onyx.schwarz/development/#installation) Vue plugin, you can skip this step since this will already be set up for you.**
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
const meta: Meta<typeof OnyxToast> = {
  title: "Feedback/Toast",
  component: OnyxToast,
};

export default meta;

export const Default = createAdvancedStoryExample("OnyxToast", "ToastExample");
