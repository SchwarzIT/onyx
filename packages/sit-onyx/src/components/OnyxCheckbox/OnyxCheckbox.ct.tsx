import { expect, test } from "../../playwright-axe";
import { TRUNCATION_TYPES } from "../../types/fonts";
import { executeScreenshotsForAllStates } from "../../utils/playwright";
import OnyxCheckbox from "./OnyxCheckbox.vue";

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxCheckbox label="Test label" hideLabel />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});

TRUNCATION_TYPES.forEach((truncation) => {
  test(`should truncate with ${truncation}`, async ({ mount }) => {
    const label = "Very long label that should be truncated";

    // ARRANGE
    const component = await mount(
      <OnyxCheckbox label={label} truncation={truncation} style="max-width: 10rem;" />,
    );

    // ASSERT
    await expect(component).toContainText(label);
    await expect(component).toHaveScreenshot(`truncation-${truncation}.png`);
  });
});

test("should render skeleton", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <div style="display:grid; width:max-content;">
      <OnyxCheckbox label="Test label" skeleton />
      <OnyxCheckbox label="Test label hidden" skeleton hideLabel />
    </div>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("skeleton.png");
});

const STATES = {
  state: ["default", "disabled", "required", "optional", "invalid"],
  select: ["unselected", "selected", "indeterminate"],
  density: ["compact", "default", "cozy"],
  focusState: ["", "hover", "focus-visible"],
  labeled: ["labeled", "unlabeled"],
} as const;

test.describe("state screenshot tests", () => {
  /* eslint-disable playwright/no-standalone-expect */

  executeScreenshotsForAllStates(
    STATES,
    "checkbox",
    async ({ select, state, labeled, density, focusState }, mount, page) => {
      const component = await mount(
        <OnyxCheckbox
          modelValue={select === "selected"}
          label="label"
          indeterminate={select === "indeterminate"}
          density={density}
          disabled={state === "disabled"}
          required={state === "required"}
          hideLabel={labeled === "unlabeled"}
          customError={state === "invalid" ? "Test error" : undefined}
        />,
        { useOptional: state === "optional" },
      );

      const checkbox = component.getByLabel("label");

      if (state === "disabled") {
        await expect(checkbox).toBeDisabled();
      }

      if (select === "selected") {
        await expect(checkbox).toBeChecked();
      } else if (select === "unselected") {
        await expect(checkbox).not.toBeChecked();
      }

      if (state === "invalid") {
        // invalid only shows after interaction
        await checkbox.check();
        await checkbox.uncheck();
        await checkbox.blur();
      }

      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await component.hover();
      return component;
    },
  );

  /* eslint-enable playwright/no-standalone-expect */
});
