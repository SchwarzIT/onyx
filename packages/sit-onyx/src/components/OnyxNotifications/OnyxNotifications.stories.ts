import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../utils/storybook";
import OnyxNotifications from "./OnyxNotifications.vue";

/**
 * The notifications are used to display notification messages to the user.
 * For a full list of notification examples, you can check out the [OnyxNotificationMessage](/docs/support-notificationmessage--docs) component.
 * The notifications can e.g. be used to build a [notification center](/story/examples-notificationcenter--default).
 *
 * For a good user experience, make sure to not display too many notifications at the same time (we recommend a limit of 5 notifications).
 *
 * ### Setup
 *
 * #### Step 1: Use the `<OnyxNotifications />` component
 *
 * Place the `<OnyxNotifications />` component once anywhere in your application (e.g. in your App.vue file).
 * It will take care of displaying the notifications correctly.
 *
 * #### Step 2: Create the notifications provider
 *
 * **If you are using the [createOnyx()](https://onyx.schwarz/development/#installation) Vue plugin, you can skip this step since this will already be set up for you.**
 *
 * The notifications work with Vue's [provide/inject](https://vuejs.org/guide/components/provide-inject) API so you need to create a notifications provider once.
 * To do so, add the following code to your `main.ts` file to set up the notifications globally:
 *
 * ```ts
 * import { createNotificationsProvider, NOTIFICATIONS_PROVIDER_INJECTION_KEY } from "sit-onyx";
 *
 * app.provide(NOTIFICATIONS_PROVIDER_INJECTION_KEY, createNotificationsProvider());
 * ```
 *
 * Afterwards, notifications can be shown using the `useNotification()` composable as shown in the example below.
 */
const meta: Meta<typeof OnyxNotifications> = {
  title: "Feedback/Notifications",
  component: OnyxNotifications,
  tags: ["new:component"],
};

export default meta;
type Story = StoryObj<typeof OnyxNotifications>;

export const Default = createAdvancedStoryExample(
  "OnyxNotifications",
  "DefaultExample",
) satisfies Story;
