import { test } from "@playwright/experimental-ct-vue";
import TestListbox from "./TestListbox.vue";
import { listboxTesting } from "./createListbox.testing.js";

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
