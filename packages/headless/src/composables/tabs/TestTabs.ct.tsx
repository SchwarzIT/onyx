import { test } from "@playwright/experimental-ct-vue";
import TestTabs from "./TestTabs.vue";
import { tabsTesting } from "./createTabs.testing";

// eslint-disable-next-line playwright/expect-expect
test("tabs", async ({ mount, page }) => {
  const component = await mount(<TestTabs />);

  await tabsTesting({
    page,
    tablist: component.getByRole("tablist"),
  });
});
