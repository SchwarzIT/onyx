import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxAppLayout from "../OnyxAppLayout/OnyxAppLayout.vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxPageLayout from "../OnyxPageLayout/OnyxPageLayout.vue";
import OnyxBottomBar from "./OnyxBottomBar.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Bottom Bar",
    columns: ["default"],
    rows: ["right", "left", "left-and-right", "hidden-border"],
    component: (_column, row) => {
      return (
        <OnyxBottomBar hideBorder={row === "hidden-border"} style={{ width: "32rem" }}>
          {(row.includes("left") || row === "hidden-border") && (
            <template v-slot:left>
              <OnyxButton label="Button" mode="plain" color="neutral"></OnyxButton>
              <OnyxButton label="Button"></OnyxButton>
            </template>
          )}

          {(row.includes("right") || row === "hidden-border") && [
            <OnyxButton label="Button" mode="plain" color="neutral"></OnyxButton>,
            <OnyxButton label="Button"></OnyxButton>,
          ]}
        </OnyxBottomBar>
      );
    },
  });
});

Object.entries(ONYX_BREAKPOINTS).forEach(([breakpoint, width]) => {
  test(`should be aligned with the grid in a full app layout (${breakpoint})`, async ({
    page,
    mount,
  }) => {
    await page.setViewportSize({ width, height: 400 });

    await page.addStyleTag({
      content: "body { margin: 0; }",
    });

    await mount(
      <OnyxAppLayout>
        <OnyxPageLayout>
          <div class="onyx-grid-container onyx-grid">
            <div
              class="onyx-grid-span-16"
              style={{ backgroundColor: "var(--onyx-color-base-info-200)" }}
            >
              Page content...
            </div>
          </div>

          <OnyxBottomBar v-slot:footer>
            <OnyxButton label="Cancel" mode="plain" color="neutral"></OnyxButton>
            <OnyxButton label="Approve"></OnyxButton>
          </OnyxBottomBar>
        </OnyxPageLayout>
      </OnyxAppLayout>,
    );

    await expect(page).toHaveScreenshot(`grid-default-${breakpoint}.png`);

    /* eslint-disable playwright/no-conditional-in-test, playwright/no-conditional-expect -- prevent useless screenshots for breakpoints that don't have a max width */
    if (width > ONYX_BREAKPOINTS.md) {
      const app = page.locator(".onyx-app");

      await app.evaluate((element) => element.classList.add("onyx-grid-max-md"));
      await expect(page).toHaveScreenshot(`grid-max-width-${breakpoint}.png`);

      await app.evaluate((element) => element.classList.add("onyx-grid-center"));
      await expect(page).toHaveScreenshot(`grid-max-center-${breakpoint}.png`);
    }
    /* eslint-enable */
  });
});
