import { expect, test } from "../../playwright-axe";
import type { SelectionOption } from "../OnyxRadioButton/types";
import OnyxRadioButtonGroup from "./OnyxRadioButtonGroup.vue";

const EXAMPLE_OPTIONS: SelectionOption<string>[] = [
  { label: "dummy.1", value: "1", id: "1" },
  { label: "dummy.2", value: "2", id: "2" },
  { label: "dummy.3", value: "3", id: "3" },
  { label: "Loading", value: "4", id: "4", loading: true },
  { label: "Readonly", value: "5", id: "5", readonly: true },
  { label: "Disabled", value: "6", id: "6", disabled: true },
];

test("should display correctly", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(
    <OnyxRadioButtonGroup
      options={EXAMPLE_OPTIONS}
      headline="radio group label"
      name="radio-selection"
    />,
  );

  // ASSERT
  await expect(page.getByRole("group", { name: "radio group label" })).toBeAttached();
  await expect(page.getByText("radio group label")).toBeAttached();
  expect(await page.getByRole("radio").all()).toHaveLength(6);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should display correctly when preselected", async ({ mount, makeAxeBuilder, page }) => {
  const updates: SelectionOption<unknown>[] = [];

  // ARRANGE
  await mount(
    <OnyxRadioButtonGroup
      options={EXAMPLE_OPTIONS}
      headline="radio group label"
      name="radio-selection"
      modelValue={EXAMPLE_OPTIONS[0]}
      onUpdate:modelValue={(u) => updates.push(u)}
    />,
  );

  // ASSERT
  await expect(page.getByRole("radio", { name: EXAMPLE_OPTIONS[0].label })).toBeChecked();

  // ACT
  await page.getByRole("radio", { name: EXAMPLE_OPTIONS[1].label }).click();

  // ASSERT
  await expect(page.getByRole("radio", { name: EXAMPLE_OPTIONS[1].label })).toBeChecked();
  expect(updates).toEqual([EXAMPLE_OPTIONS[1]]);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

// TODO: add further test cases and screenshot tests
