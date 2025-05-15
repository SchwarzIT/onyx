import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../playwright/a11y";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxBottomBar from "../OnyxBottomBar/OnyxBottomBar.vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxDrawer from "./OnyxDrawer.vue";

for (const alignment of ["left", "right"] as const) {
  test(`should align ${alignment}`, async ({ mount, page, makeAxeBuilder }) => {
    await page.setViewportSize({ width: ONYX_BREAKPOINTS.sm + 1, height: 320 });

    // ARRANGE
    await mount(
      <OnyxDrawer label="Example headline" alignment={alignment} open>
        Content
      </OnyxDrawer>,
    );

    // ASSERT
    await expect(page).toHaveScreenshot(`alignment-${alignment}.png`);

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}

test("should render with custom slots", async ({ mount, page, makeAxeBuilder }) => {
  await page.setViewportSize({ width: ONYX_BREAKPOINTS.sm + 1, height: 320 });

  // ARRANGE
  await mount(
    <OnyxDrawer label="Example headline" open>
      <template v-slot:headline>
        <OnyxHeadline is="h2">Headline</OnyxHeadline>
        <OnyxBadge density="compact">Badge</OnyxBadge>
        <OnyxBadge density="compact">Badge</OnyxBadge>
      </template>

      <template v-slot:description> This is an example description about the dialog. </template>

      <div>Content</div>

      <template v-slot:footer>
        <OnyxBottomBar>
          <OnyxButton label="Button" color="neutral" mode="plain" />
          <OnyxButton label="Button" />
        </OnyxBottomBar>
      </template>
    </OnyxDrawer>,
  );

  // ASSERT
  await expect(page).toHaveScreenshot("slots.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render without backdrop", async ({ mount, page, makeAxeBuilder }) => {
  await page.setViewportSize({ width: ONYX_BREAKPOINTS.sm + 1, height: 320 });

  // ARRANGE
  await mount(
    <OnyxDrawer label="Example headline" modal={false} open>
      <template v-slot:headline>
        <OnyxHeadline is="h2">Headline</OnyxHeadline>
        <OnyxBadge density="compact">Badge</OnyxBadge>
        <OnyxBadge density="compact">Badge</OnyxBadge>
      </template>

      <template v-slot:description> This is an example description about the dialog. </template>

      <div>Content</div>

      <template v-slot:footer>
        <OnyxBottomBar>
          <OnyxButton label="Button" color="neutral" mode="plain" />
          <OnyxButton label="Button" />
        </OnyxBottomBar>
      </template>
    </OnyxDrawer>,
  );

  // ASSERT
  await expect(page).toHaveScreenshot("no-backdrop.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
