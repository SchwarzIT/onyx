import { test } from "@playwright/experimental-ct-vue";
import { listboxTesting } from "./createListbox.testing.js";
import TestListbox from "./TestListbox.vue";

test("listbox", async ({ mount, page }) => {
  await mount(<TestListbox />);

  await listboxTesting({
    page,
    listbox: page.getByRole("listbox"),
    options: page.getByRole("option"),
    isOptionActive: async (locator) => {
      const className = await locator.getAttribute("class");
      return className?.includes("focused") ?? false;
    },
  });
});
