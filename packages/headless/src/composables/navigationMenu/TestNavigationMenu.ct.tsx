import { test } from "@playwright/experimental-ct-vue";
import { navigationMenuTesting } from "./createNavigationMenu.ct";
import TestNavigationMenu from "./TestNavigationMenu.vue";

test("navigationMenu", async ({ mount, page }) => {
  await mount(<TestNavigationMenu />);

  await navigationMenuTesting({
    page,
    navigationMenu: page.getByLabel("Navigation menu"),
    list: page.getByTitle("item"),
  });
});
