import { expect, test } from "../../playwright-axe";
import { executeScreenshotsForAllStates, mockPlaywrightIcon } from "../../utils/playwright";
import OnyxBadge from "./OnyxBadge.vue";

test("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxBadge variation="secondary">Badge</OnyxBadge>);

  // ASSERT
  await expect(component).toContainText("Badge");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should truncate text", async ({ mount }) => {
  const label = "Very long label that should be truncated";

  // ARRANGE
  const component = await mount(<OnyxBadge variation="secondary">{label}</OnyxBadge>);

  // ASSERT
  await expect(component).toContainText(label);

  // ASSERT
  await expect(component).toHaveScreenshot("truncation-ellipsis.png");
});

test("should render badge with icon", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  await mount(<OnyxBadge variation="secondary" icon={mockPlaywrightIcon} />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

const STATES = {
  variation: ["primary", "secondary", "danger", "warning", "success", "info"],
  density: ["compact", "default", "cozy"],
} as const;

test.describe("state screenshot tests", () => {
  executeScreenshotsForAllStates(STATES, "badge", async ({ variation, density }, mount) => {
    const component = await mount(
      <OnyxBadge variation={variation} density={density}>
        Badge
      </OnyxBadge>,
    );
    return component;
  });
});

const ICONSTATE = {
  density: ["compact", "default", "cozy"],
} as const;

test.describe("icon screenshot tests", () => {
  executeScreenshotsForAllStates(ICONSTATE, "badge", async ({ density }, mount) => {
    const component = await mount(
      <OnyxBadge icon={mockPlaywrightIcon} variation="primary" density={density}></OnyxBadge>,
    );
    return component;
  });
});
