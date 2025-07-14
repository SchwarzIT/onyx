import { test } from "@playwright/experimental-ct-vue";
import { navigationTesting } from "./createMenu.testing.js";
import TestMenu from "./TestMenu.vue";

test("navigationMenu", async ({ mount, page }) => {
  await mount(<TestMenu />);

  await navigationTesting({
    buttons: page.getByRole("button"),
    nav: page.getByRole("navigation"),
  });
});
