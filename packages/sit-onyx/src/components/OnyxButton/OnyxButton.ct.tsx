import { expect, test } from "../../playwright-axe";
import OnyxButton from "./OnyxButton.vue";

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
