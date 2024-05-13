import { OnyxNavBar, OnyxNavItem } from "../..";
import { expect, test } from "../../playwright/a11y";
import {
  MOCK_PLAYWRIGHT_LOGO_URL,
  defineLogoMockRoutes,
  executeMatrixScreenshotTest,
} from "../../playwright/screenshots";
import { ONYX_BREAKPOINTS } from "../../types";
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
          showBackButton={row.includes("back")}
        >
          <OnyxNavItem label="Item" active />
          <OnyxNavItem label="Item" />

          {row.includes("context") && (
            <template v-slot:contextArea>
              <OnyxUserMenu username="John Doe" options={[]} />
            </template>
          )}
        </OnyxNavBar>
      ),
    });
  }

  executeMatrixScreenshotTest({
    name: "Navigation bar (lg, grid max-width md)",
    columns: ["default"],
    rows: ["default", "centered"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => (
      <OnyxNavBar
        style={{
          width: `${ONYX_BREAKPOINTS.lg}px`,
          "--onyx-grid-max-width": `${ONYX_BREAKPOINTS.md}px`,
        }}
        class={{ "onyx-grid-center": row === "centered" }}
        appName="App name"
        logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}
        showBackButton={row.includes("back")}
      >
        <OnyxNavItem label="Item" active />
        <OnyxNavItem label="Item" />

        {row.includes("context") && (
          <template v-slot:contextArea>
            <OnyxUserMenu username="John Doe" options={[]} />
          </template>
        )}
      </OnyxNavBar>
    ),
    beforeScreenshot: async (component, page) => {
      // colorize background so the max-width can be seen easily
      await page.addStyleTag({
        content: `
          .onyx-nav-bar {
            background-color: var(--onyx-color-base-danger-200);
          }
          .onyx-nav-bar__content {
            background-color: var(--onyx-color-base-background-blank);
          }
        `,
      });
    },
  });
});

test("should behave correctly", async ({ mount }) => {
  let appAreaClickEvents = 0;
  let backButtonClickEvents = 0;

  let component = await mount(
    <OnyxNavBar
      style={{ width: `${ONYX_BREAKPOINTS.md}px` }}
      appName="App name"
      logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}
      showBackButton
      onAppAreaClick={() => appAreaClickEvents++}
      onBackButtonClick={() => backButtonClickEvents++}
    />,
  );

  await component.getByRole("button", { name: "App name" }).click();
  expect(appAreaClickEvents).toBe(1);

  await component.getByRole("button", { name: "Go back" }).click();
  expect(backButtonClickEvents).toBe(1);

  component = await mount(
    <OnyxNavBar style={{ width: `${ONYX_BREAKPOINTS.md}px` }} showBackButton>
      <template v-slot:appArea>Custom app area</template>
    </OnyxNavBar>,
  );

  await expect(component.getByRole("button", { name: "Custom app area" })).toBeVisible();
});
