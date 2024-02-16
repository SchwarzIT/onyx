import { createMatrixScreenshot } from "../../utils/playwright";
import { expect, test } from "../../playwright-axe";
import OnyxRadioButton from "./OnyxRadioButton.vue";

test("should display correctly", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(
    <OnyxRadioButton id="my-id" label="radio label" name="radio form" value="radio-value" />,
  );

  // ASSERT
  await expect(page.getByRole("radio")).toBeAttached();
  await expect(page.getByLabel("radio label")).toBeAttached();
  await expect(page.getByText("radio label")).toBeAttached();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should display correctly when selected", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(
    <OnyxRadioButton
      id="my-id"
      label="radio label"
      name="radio form"
      value="radio-value"
      selected
    />,
  );

  // ASSERT
  await expect(page.getByRole("radio")).toBeChecked();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should display correctly when disabled", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(
    <OnyxRadioButton
      id="my-id"
      label="radio label"
      name="radio form"
      value="radio-value"
      selected
      disabled
    />,
  );

  // ASSERT
  await expect(page.getByRole("radio")).toBeDisabled();
  await expect(page.getByRole("radio")).toBeChecked();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should display correctly when invalid", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(
    <OnyxRadioButton
      id="my-id"
      label="radio label"
      name="radio form"
      value="radio-value"
      errorMessage="radio error"
      selected
    />,
  );

  // ASSERT
  await expect(page.locator("input:invalid")).toBeAttached();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

const STATES = {
  state: ["default", "disabled", "invalid", "required", "optional"],
  select: ["unselected", "selected"],
  focusState: ["", "hover", "focus-visible"],
} as const;

test(
  "Screenshot test",
  createMatrixScreenshot(STATES, "radio-button-matrix.png", ({ select, state }, i) => (
    <OnyxRadioButton
      selected={select === "selected"}
      disabled={state === "disabled"}
      required={state === "required"}
      errorMessage={state === "invalid" ? "invalid" : ""}
      name={`name-${i}`}
      label="label"
      id={`id-${i}`}
    />
  )),
);
