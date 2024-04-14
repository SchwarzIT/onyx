import { expect, test } from "../../playwright-axe";
import { ONYX_COLORS } from "../../types/colors";
import { executeScreenshotsForAllStates, mockPlaywrightIcon } from "../../utils/playwright";
import OnyxTag from "./OnyxTag.vue";

/// [TODO] Skipped Reason: Need to get the color information to pass this analyze
test.skip("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxTag label="Tag" color="primary" />);

  // ASSERT
  await expect(component).toContainText("Tag");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

ONYX_COLORS.forEach((color) => {
  test(`should render tag with ${color} color`, async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxTag label="Tag" color={color} />);

    // ASSERT
    await expect(component).toHaveScreenshot(`${color}.png`);
  });
});

/// [TODO] Skipped Reason: Need to get the color information to pass this analyze
test.skip("should render tag with icon", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxTag label="Tag" icon={mockPlaywrightIcon} />);

  // ASSERT
  await expect(component).toContainText("Tag");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should truncate text", async ({ mount }) => {
  const label = "Very long label that should be truncated";

  // ARRANGE
  const component = await mount(<OnyxTag label={label} style="max-width: 8rem;" />);

  // ASSERT
  await expect(component).toContainText(label);

  // ASSERT
  await expect(component).toHaveScreenshot("truncation-ellipsis.png");
});

const DENSITYSTATES = {
  density: ["compact", "default", "cozy"],
  focusState: ["focus-visible"],
} as const;

test.describe("state density screenshot tests", () => {
  executeScreenshotsForAllStates(
    DENSITYSTATES,
    "button",
    async ({ density, focusState }, mount, page) => {
      const component = await mount(
        <OnyxTag label="Tag" color="primary" density={density} icon={mockPlaywrightIcon} />,
      );

      if (focusState === "focus-visible") await page.keyboard.press("Tab");

      return component;
    },
  );
});
