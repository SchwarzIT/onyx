import { expect, test } from "../../playwright-axe";
import OnyxHeadline from "./OnyxHeadline.vue";
import { HEADLINE_TYPES } from "./types";

test("should display h1-h6 headlines", async ({ mount, makeAxeBuilder }) => {
  for (const type of HEADLINE_TYPES) {
    // ARRANGE
    const component = await mount(<OnyxHeadline is={type}>Hello World</OnyxHeadline>);

    // ASSERT
    await expect(component).toContainText("Hello World");
    await expect(component).toHaveScreenshot(`${type}.png`);

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  }
});

test("should display monospace h1-h6 headlines", async ({ mount, makeAxeBuilder }) => {
  for (const type of HEADLINE_TYPES) {
    // ARRANGE
    const component = await mount(
      <OnyxHeadline is={type} monospace>
        Hello World
      </OnyxHeadline>,
    );

    // ASSERT
    await expect(component).toContainText("Hello World");
    await expect(component).toHaveScreenshot(`monospace-${type}.png`);

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  }
});
