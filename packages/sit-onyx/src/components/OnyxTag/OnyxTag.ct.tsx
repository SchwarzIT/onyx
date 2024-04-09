import { expect, test } from "../../playwright-axe";
import OnyxTag from "./OnyxTag.vue";

test("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxTag label="Tag" color="primary" />);

  // ASSERT
  await expect(component).toContainText("Tag");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
