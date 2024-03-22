import { test } from "@playwright/experimental-ct-vue";
import TestDropdown from "./TestDropdown.vue";
import { comboboxTesting } from "./createComboBox.ct";

test("combobox", async ({ mount, page }) => {
  await mount(<TestDropdown />);
  const listbox = page.getByRole("listbox");
  const combobox = page.getByRole("combobox");
  const button = page.getByRole("button");
  const options = page.getByRole("option");

  await comboboxTesting(page, listbox, combobox, button, options);
});
