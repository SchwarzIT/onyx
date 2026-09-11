import { test } from "@playwright/experimental-ct-vue";
import { tabsTesting } from "./createTabs.testing.js";
import TestTabs from "./TestTabs.vue";

test("tabs", async ({ mount, page }) => {
  const component = await mount(<TestTabs />);

  await tabsTesting({
    page,
    tablist: component.getByRole("tablist"),
  });
});
