import { test } from "@playwright/experimental-ct-vue";
import { menuButtonTesting } from "./createMenuButton.testing.js";
import TestMenuButton from "./TestMenuButton.vue";

test("menuButton", async ({ mount, page }) => {
  await mount(<TestMenuButton />);

  await menuButtonTesting({
    page,
    button: page.getByRole("button"),
    menu: page.locator("ul"),
    menuItems: page.getByRole("menuitem"),
  });
});
