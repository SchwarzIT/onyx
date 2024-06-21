import { OnyxNavBar, OnyxNavItem } from "../..";
import { expect, test } from "../../playwright/a11y";
import {
  MOCK_PLAYWRIGHT_LOGO_URL,
  defineLogoMockRoutes,
  executeMatrixScreenshotTest,
} from "../../playwright/screenshots";
import { ONYX_BREAKPOINTS } from "../../types";
import OnyxAppLayout from "../OnyxAppLayout/OnyxAppLayout.vue";
import OnyxPageLayout from "../OnyxPageLayout/OnyxPageLayout.vue";
import OnyxUserMenu from "../OnyxUserMenu/OnyxUserMenu.vue";

test.beforeEach(async ({ page }) => {
  await defineLogoMockRoutes(page);
});

test.describe("Screenshot tests", () => {
  for (const [breakpoint, breakpointWidth] of Object.entries(ONYX_BREAKPOINTS)) {
    executeMatrixScreenshotTest({
      name: `Navigation bar (${breakpoint})`,
      columns: ["default"],
      rows: ["default", "back", "context", "context-back"],
      // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      disabledAccessibilityRules: ["color-contrast"],
      component: (column, row) => (
        <OnyxNavBar
          style={{ width: `${breakpointWidth}px` }}
          appName="App name"
          logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}
          withBackButton={row.includes("back")}
        >
          <OnyxNavItem label="Item" active />
          <OnyxNavItem label="Item" />

          <template v-slot:mobileActivePage>Item</template>

          {row.includes("context") && (
            <template v-slot:contextArea>
              <OnyxUserMenu username="John Doe" />
            </template>
          )}
        </OnyxNavBar>
      ),
    });
  }
});

test("should behave correctly", async ({ mount }) => {
  let appAreaClickEvents = 0;
  let backButtonClickEvents = 0;

  let component = await mount(
    <OnyxNavBar
      style={{ width: `${ONYX_BREAKPOINTS.md}px` }}
      appName="App name"
      logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}
      withBackButton
      onAppAreaClick={() => appAreaClickEvents++}
      onBackButtonClick={() => backButtonClickEvents++}
    />,
  );

  await component.getByRole("button", { name: "Go to Home" }).click();
  expect(appAreaClickEvents).toBe(1);

  await component.getByRole("button", { name: "Go back" }).click();
  expect(backButtonClickEvents).toBe(1);

  component = await mount(
    <OnyxNavBar
      style={{ width: `${ONYX_BREAKPOINTS.md}px` }}
      appAreaLabel="custom action"
      withBackButton
    >
      <template v-slot:appArea>Custom app area</template>
    </OnyxNavBar>,
  );

  await expect(component.getByRole("button", { name: "custom action" })).toBeVisible();
  await expect(component.getByText("Custom app area")).toBeVisible();
});

test("should be aligned with the grid in a full app layout", async ({ page, mount }) => {
  await defineLogoMockRoutes(page);
  await page.setViewportSize({ width: ONYX_BREAKPOINTS.xl, height: 400 });

  await page.addStyleTag({
    content: "body { margin: 0; }",
  });

  await mount(
    <OnyxAppLayout>
      <OnyxNavBar appName="App name" logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}>
        <OnyxNavItem label="Item" active />
        <OnyxNavItem label="Item" />

        <template v-slot:mobileActivePage>Item</template>

        <template v-slot:contextArea>
          <OnyxUserMenu username="John Doe" />
        </template>
      </OnyxNavBar>

      <OnyxPageLayout>
        <div class="onyx-grid-container onyx-grid">
          <div
            class="onyx-grid-span-16"
            style={{ backgroundColor: "var(--onyx-color-base-info-200)" }}
          >
            Page content...
          </div>
        </div>
      </OnyxPageLayout>
    </OnyxAppLayout>,
  );

  await expect(page).toHaveScreenshot("grid-default.png");

  const app = page.locator(".onyx-app");

  await app.evaluate((element) => element.classList.add("onyx-grid-max-md"));
  await expect(page).toHaveScreenshot("grid-max-width.png");

  await app.evaluate((element) => element.classList.add("onyx-grid-center"));
  await expect(page).toHaveScreenshot("grid-max-center.png");
});
