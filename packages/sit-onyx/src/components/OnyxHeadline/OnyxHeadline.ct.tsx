import { expect, test } from "../../playwright-axe";
import OnyxHeadline from "./OnyxHeadline.vue";

test("should display h1-h6 headlines", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <div style="width: max-content">
      <OnyxHeadline is="h1">Hello World h1</OnyxHeadline>
      <OnyxHeadline is="h2">Hello World h2</OnyxHeadline>
      <OnyxHeadline is="h3">Hello World h3</OnyxHeadline>
      <OnyxHeadline is="h4">Hello World h4</OnyxHeadline>
      <OnyxHeadline is="h5">Hello World h5</OnyxHeadline>
      <OnyxHeadline is="h6">Hello World h6</OnyxHeadline>
    </div>,
  );

  // ASSERT
  await expect(component).toContainText("Hello World h1");
  await expect(component).toContainText("Hello World h2");
  await expect(component).toContainText("Hello World h3");
  await expect(component).toContainText("Hello World h4");
  await expect(component).toContainText("Hello World h5");
  await expect(component).toContainText("Hello World h6");
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should display monospace h1-h6 headlines", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <div style="width: max-content">
      <OnyxHeadline is="h1" monospace>
        Hello World monospace h1
      </OnyxHeadline>
      <OnyxHeadline is="h2" monospace>
        Hello World monospace h2
      </OnyxHeadline>
      <OnyxHeadline is="h3" monospace>
        Hello World monospace h3
      </OnyxHeadline>
      <OnyxHeadline is="h4" monospace>
        Hello World monospace h4
      </OnyxHeadline>
      <OnyxHeadline is="h5" monospace>
        Hello World monospace h5
      </OnyxHeadline>
      <OnyxHeadline is="h6" monospace>
        Hello World monospace h6
      </OnyxHeadline>
    </div>,
  );

  // ASSERT
  await expect(component).toContainText("Hello World monospace h1");
  await expect(component).toContainText("Hello World monospace h2");
  await expect(component).toContainText("Hello World monospace h3");
  await expect(component).toContainText("Hello World monospace h4");
  await expect(component).toContainText("Hello World monospace h5");
  await expect(component).toContainText("Hello World monospace h6");
  await expect(component).toHaveScreenshot("monospace.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
