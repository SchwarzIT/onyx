import { test } from "@playwright/experimental-ct-vue";
import { menuButtonTesting } from "./createMenuButton.ct";
import TestMenuButton from "./TestMenuButton.vue";

test("menuButton", async ({ mount, page }) => {
  await mount(<TestMenuButton />);

  await menuButtonTesting({
    page,
    button: page.getByRole("button"),
    menu: page.locator("ul"),
    menuItem: await page.locator("li").all(),
  });
});
