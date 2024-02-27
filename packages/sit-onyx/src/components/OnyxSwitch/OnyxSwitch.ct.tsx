import { expect, test } from "../../playwright-axe";
import OnyxSwitch from "./OnyxSwitch.vue";

test("should render default OnyxSwitch", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxSwitch label="Switch" />);

  // ASSERT
  await expect(component).toContainText("Switch");
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render disabled OnyxSwitch", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxSwitch label="Switch" disabled />);

  // ASSERT
  await expect(component).toContainText("Switch");
  await expect(component).toHaveScreenshot("disabled.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render readonly OnyxSwitch", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxSwitch label="Switch" readonly />);

  // ASSERT
  await expect(component).toContainText("Switch");
  await expect(component).toHaveScreenshot("readonly.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
