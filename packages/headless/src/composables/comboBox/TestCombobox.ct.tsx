import { test } from "@playwright/experimental-ct-vue";
import { comboboxSelectOnlyTesting, comboboxTesting } from "./createComboBox.testing.js";
import SelectOnlyCombobox from "./SelectOnlyCombobox.vue";
import TestCombobox from "./TestCombobox.vue";

test("combobox", async ({ mount, page }) => {
  await mount(<TestCombobox />);
  const listbox = page.getByRole("listbox");
  const combobox = page.getByRole("combobox");
  const button = page.getByRole("button");
  const options = page.getByRole("option");

  await comboboxTesting(page, listbox, combobox, button, options);
});

test("select only combobox", async ({ mount, page }) => {
  await mount(<SelectOnlyCombobox />);
  const listbox = page.getByRole("listbox");
  const combobox = page.getByRole("combobox");

  await comboboxSelectOnlyTesting(page, listbox, combobox, (loc) =>
    loc.evaluate((e) => e.classList.contains("active")),
  );
});
