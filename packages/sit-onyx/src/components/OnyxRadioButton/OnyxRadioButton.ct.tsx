import { expect, test } from "../../playwright-axe";
import { TRUNCATION_TYPES } from "../../types/fonts";
import { createMatrixScreenshotTest } from "../../utils/playwright";
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

TRUNCATION_TYPES.forEach((truncation) => {
  test(`should truncate with ${truncation}`, async ({ mount }) => {
    const label = "Very long label that should be truncated";

    // ARRANGE
    const component = await mount(
      <OnyxRadioButton
        label={label}
        truncation={truncation}
        style="max-width: 10rem;"
        id={truncation}
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
    <OnyxRadioButton label="Test label" name="skeleton" id="1" skeleton />,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("skeleton.png");
});

const STATES = {
  state: ["default", "disabled", "invalid", "loading"],
  select: ["unselected", "selected"],
  focusState: ["none", "hover", "focus-visible"],
} as const;

test(
  "state screenshot testing",
  createMatrixScreenshotTest({
    states: STATES,
    component: OnyxRadioButton,
    baseName: "radio-button",
    props: ({ select, state }) => ({
      selected: select === "selected",
      disabled: state === "disabled",
      loading: state === "loading",
      errorMessage: state === "invalid" ? "invalid" : "",
      name: "name",
      label: "label",
      id: "id",
    }),
    onAfterUpdate: async ({ focusState }, { component, page }) => {
      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await component.hover();
    },
  }),
);
