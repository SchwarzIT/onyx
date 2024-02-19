import { expect, test } from "../../playwright-axe";
import OnyxButton from "./OnyxButton.vue";
import happyIcon from "@sit-onyx/icons/emoji-happy-2.svg?raw";

test("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxButton label="Button" variation="secondary" />);

  // ASSERT
  await expect(component).toContainText("Button");
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should display correctly when disabled", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxButton label="Button" variation="secondary" disabled />);

  // ASSERT
  await expect(component).toContainText("Button");
  await expect(component).toBeDisabled();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render button with icon", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxButton label="Button" variation="secondary" icon={happyIcon} />,
  );

  // ASSERT
  await expect(component).toContainText("Button");
  await expect(component).toHaveScreenshot("icon.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
