import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { DEFAULT_DISABLED_AXE_RULES, expect, test } from "../../playwright/a11y.js";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxBottomBar from "../OnyxBottomBar/OnyxBottomBar.vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import TestWrapperCt from "./TestWrapper.ct.vue";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: ONYX_BREAKPOINTS.xs + 1, height: 256 });
});

test("should behave correctly", async ({ mount, makeAxeBuilder, page }) => {
  const onOpenUpdate = createEmitSpy<typeof TestWrapperCt, "onUpdate:open">();

  // ARRANGE
  const component = await mount(<TestWrapperCt onUpdate:open={onOpenUpdate} />);
  const closeButton = component.getByRole("button", { name: "Close dialog" });

  // ASSERT
  await expect(page).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ACT
  await closeButton.click();

  // ASSERT
  expectEmit(onOpenUpdate, 1, [false]);
});

test("Screenshot test (custom headline)", async ({ mount, page, makeAxeBuilder }) => {
  // ARRANGE
  await mount(
    <TestWrapperCt style={{ width: "100%" }}>
      <template v-slot:headline>
        <OnyxHeadline is="h2">Headline</OnyxHeadline>
        <OnyxBadge density="compact">Badge</OnyxBadge>
        <OnyxBadge density="compact">Badge</OnyxBadge>
      </template>
    </TestWrapperCt>,
  );

  // ASSERT
  await expect(page).toHaveScreenshot("custom-headline.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("Screenshot test (footer)", async ({ mount, page, makeAxeBuilder }) => {
  await page.setViewportSize({ width: ONYX_BREAKPOINTS.sm + 1, height: 320 });

  // ARRANGE
  await mount(
    <TestWrapperCt>
      <template v-slot:footer>
        <OnyxBottomBar>
          <OnyxButton label="Button" color="neutral" mode="plain" />
          <OnyxButton label="Button" />
        </OnyxBottomBar>
      </template>
    </TestWrapperCt>,
  );

  // ASSERT
  await expect(page).toHaveScreenshot("footer.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("Screenshot test (overflowing content)", async ({ mount, page, makeAxeBuilder }) => {
  await page.setViewportSize({ width: ONYX_BREAKPOINTS.sm + 1, height: 320 });

  // ARRANGE
  await mount(
    <TestWrapperCt>
      {"This is a very long example test ".repeat(32)}

      <template v-slot:footer>
        <OnyxBottomBar>
          <OnyxButton label="Button" color="neutral" mode="plain" />
          <OnyxButton label="Button" />
        </OnyxBottomBar>
      </template>
    </TestWrapperCt>,
  );

  await page
    .getByText("This is a very long example test")
    .evaluate((element) => element.scrollIntoView({ block: "end" }));

  // ASSERT
  await expect(page).toHaveScreenshot("overflowing-content.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder()
    .disableRules([...DEFAULT_DISABLED_AXE_RULES, "scrollable-region-focusable"])
    .analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
