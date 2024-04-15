import { test } from "@playwright/experimental-ct-vue";
import TestCombobox from "./TestCombobox.vue";
import { comboboxTesting } from "./createComboBox.ct";

test("combobox", async ({ mount, page }) => {
  await mount(<TestCombobox />);
  const listbox = page.getByRole("listbox");
  const combobox = page.getByRole("combobox");
  const button = page.getByRole("button");
  const options = page.getByRole("option");

  await comboboxTesting(page, listbox, combobox, button, options);
});
