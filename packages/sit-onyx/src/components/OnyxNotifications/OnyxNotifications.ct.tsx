import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../playwright/a11y";
import OnyxAppLayout from "../OnyxAppLayout/OnyxAppLayout.vue";
import OnyxNavBar from "../OnyxNavBar/OnyxNavBar.vue";
import PlaywrightTestWrapper from "./PlaywrightTestWrapper.ct.vue";

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({ content: "body { margin: 0; }" });
});

Object.entries(ONYX_BREAKPOINTS).forEach(([breakpoint, width]) => {
  test(`should render (${breakpoint})`, async ({ mount, makeAxeBuilder, page }) => {
    await page.setViewportSize({ width, height: 512 });

    // ARRANGE
    const component = await mount(<PlaywrightTestWrapper />);

    // ASSERT
    await expect(page).toHaveScreenshot(`breakpoint-${breakpoint}.png`);

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
    await expect(component).toContainText("Example notification 1");

    // ACT
    const firstNotification = component.getByRole("status", { name: "Example notification 1" });
    await firstNotification.hover();
    await firstNotification.getByRole("button", { name: "Close" }).click();

    // ASSERT
    await expect(component).not.toContainText("Example notification 1");
  });
});

test("should consider nav bar height for positioning", async ({ page, mount }) => {
  // ARRANGE
  await mount(
    <OnyxAppLayout>
      <template v-slot:navBar>
        <OnyxNavBar appName="Nav bar"></OnyxNavBar>
      </template>

      <PlaywrightTestWrapper />
    </OnyxAppLayout>,
  );

  // ASSERT
  await expect(page).toHaveScreenshot("nav-bar.png");
});
