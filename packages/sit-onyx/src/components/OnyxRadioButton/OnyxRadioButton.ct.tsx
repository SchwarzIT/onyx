import { expect, test } from "../../playwright-axe";
import { TRUNCATION_TYPES } from "../../types/fonts";
import { executeScreenshotsForAllStates } from "../../utils/playwright";
import OnyxRadioButton from "./OnyxRadioButton.vue";

test("should display correctly", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(<OnyxRadioButton value="1" label="radio label" name="radio form" />);

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
  await mount(<OnyxRadioButton value="1" label="radio label" name="radio form" selected />);

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
    <OnyxRadioButton value="1" label="radio label" name="radio form" selected disabled />,
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
      value="1"
      label="radio label"
      name="radio form"
      customError="radio error"
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

TRUNCATION_TYPES.forEach((truncation) => {
  test(`should truncate with ${truncation}`, async ({ mount }) => {
    const label = "Very long label that should be truncated";

    // ARRANGE
    const component = await mount(
      <OnyxRadioButton
        label={label}
        truncation={truncation}
        style="max-width: 10rem;"
        value={truncation}
        name={truncation}
      />,
    );

    // ASSERT
    await expect(component).toContainText(label);
    await expect(component).toHaveScreenshot(`truncation-${truncation}.png`);
  });
});

test("should render skeleton", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxRadioButton label="Test label" name="skeleton" value="1" skeleton />,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("skeleton.png");
});

const STATES = {
  state: ["default", "disabled", "invalid"],
  select: ["unselected", "selected"],
  density: ["compact", "default", "cozy"],
  focusState: ["none", "hover", "focus-visible"],
} as const;

test.describe("state screenshot tests", () => {
  executeScreenshotsForAllStates(
    STATES,
    "radio-button",
    async ({ select, state, density, focusState }, mount, page) => {
      const component = await mount(
        <OnyxRadioButton
          selected={select === "selected"}
          density={density}
          disabled={state === "disabled"}
          customError={state === "invalid" ? "test error" : ""}
          name="name"
          label="label"
          value="1"
        />,
      );

      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await component.hover();
      return component;
    },
  );
});
