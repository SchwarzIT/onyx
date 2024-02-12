import { expect, test } from "../../playwright-axe";
import OnyxCheckbox from "./OnyxCheckbox.vue";

type PlaywrightTestParameters = Parameters<Parameters<typeof test>[1]>[0];

/**
 * Executes default, hover and active tests for the given checkbox component.
 * Will also generate screenshots.
 */
const executeCheckboxTest = async (
  component: Awaited<ReturnType<PlaywrightTestParameters["mount"]>>,
  { page, makeAxeBuilder }: Pick<PlaywrightTestParameters, "page" | "makeAxeBuilder">,
  screenshotPrefix = "",
) => {
  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).toHaveScreenshot(`${screenshotPrefix}default.png`);

  // ACT
  await component.hover();

  // ASSERT
  await expect(component).toHaveScreenshot(`${screenshotPrefix}hover.png`);

  // ACT
  await page.mouse.down();

  // ASSERT
  await expect(component).toHaveScreenshot(`${screenshotPrefix}active.png`);
};

test("should render unchecked", async ({ page, mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxCheckbox label="Checkbox" />);
  await expect(component).not.toBeChecked();

  await executeCheckboxTest(component, { page, makeAxeBuilder });
});

test("should render checked", async ({ page, mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxCheckbox label="Checkbox" modelValue={true} />);
  await expect(component).toBeChecked();

  await executeCheckboxTest(component, { page, makeAxeBuilder }, "checked-");
});

test("should render indeterminate", async ({ page, mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxCheckbox label="Checkbox" indeterminate={true} />);
  await expect(component.getByLabel("Checkbox")).toHaveJSProperty("indeterminate", true);

  await executeCheckboxTest(component, { page, makeAxeBuilder }, "indeterminate-");
});
