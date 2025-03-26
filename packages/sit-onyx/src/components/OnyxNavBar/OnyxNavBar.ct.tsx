import { navigationTesting } from "@sit-onyx/headless/playwright";
import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../playwright/a11y";
import {
  MOCK_PLAYWRIGHT_LOGO_URL,
  defineLogoMockRoutes,
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
} from "../../playwright/screenshots";
import OnyxAppLayout from "../OnyxAppLayout/OnyxAppLayout.vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxPageLayout from "../OnyxPageLayout/OnyxPageLayout.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import OnyxMenuItem from "./modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxNavItem from "./modules/OnyxNavItem/OnyxNavItem.vue";
import OnyxUserMenu from "./modules/OnyxUserMenu/OnyxUserMenu.vue";
import OnyxNavBar from "./OnyxNavBar.vue";

test.beforeEach(async ({ page }) => {
  await defineLogoMockRoutes(page);
});

test("accessibility test", async ({ mount }) => {
  const component = await mount(
    <OnyxNavBar appName="App name" logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}>
      <OnyxNavItem label="Main One">
        <template v-slot:children>
          <OnyxNavItem label="First" />
          <OnyxNavItem label="Second" />
        </template>
      </OnyxNavItem>
      <OnyxNavItem label="Main Two">
        <template v-slot:children>
          <OnyxNavItem label="Third" />
          <OnyxNavItem label="Fourth" />
        </template>
      </OnyxNavItem>
    </OnyxNavBar>,
  );
  const nav = component.getByRole("navigation");
  const buttons = nav.getByRole("menuitem");

  await expect(nav).toBeVisible();

  await navigationTesting({ nav, buttons });
});

test.describe("Screenshot tests", () => {
  for (const [breakpoint, breakpointWidth] of Object.entries(ONYX_BREAKPOINTS)) {
    executeMatrixScreenshotTest({
      name: `Navigation bar (${breakpoint})`,
      columns: ["default"],
      rows: ["default", "back", "context", "context-back"],
      removePadding: true,
      component: (column, row) => (
        <OnyxNavBar
          appName="App name"
          logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}
          style={{ width: `${breakpointWidth}px` }}
          withBackButton={row.includes("back")}
        >
          <OnyxNavItem label="Item" active />
          <OnyxNavItem label="Item" />

          <template v-slot:mobileActivePage>Item</template>

          {row.includes("context") && (
            <template v-slot:contextArea>
              <OnyxUserMenu fullName="John Doe" />
            </template>
          )}
        </OnyxNavBar>
      ),
      hooks: {
        beforeEach: async (component, page) => {
          await page.setViewportSize({ width: breakpointWidth, height: 128 });
        },
      },
    });
  }
});

test("Screenshot tests (mobile)", async ({ mount, page }) => {
  await page.addStyleTag({ content: "body { margin: 0 }" });
  await page.setViewportSize({ height: 512, width: ONYX_BREAKPOINTS.sm - 1 });

  const component = await mount(
    <OnyxNavBar appName="App name" logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}>
      <OnyxNavItem link="#1" label="Item 1" />
      <OnyxNavItem link="#2" label="Item 2">
        Item 2
        <OnyxBadge color="warning" dot />
        <template v-slot:children>
          <OnyxNavItem label="Nested item 1" link="#2-1" />
          <OnyxNavItem label="Nested item 2" link="#2-2" active />
          <OnyxNavItem label="Nested item 3" link="#2-3" />
        </template>
      </OnyxNavItem>
      <OnyxNavItem link="https://onyx.schwarz" label="Item 3" />

      <template v-slot:mobileActivePage>Nested item 2</template>

      <template v-slot:globalContextArea>
        <OnyxIconButton label="Search" icon={mockPlaywrightIcon} color="neutral" />
      </template>

      <template v-slot:contextArea>
        <OnyxIconButton label="Notification center" icon={mockPlaywrightIcon} color="neutral" />
        <OnyxTag icon={mockPlaywrightIcon} color="warning" label="QA stage" />

        <OnyxUserMenu fullName="John Doe" description="Company name">
          <OnyxMenuItem>
            <OnyxIcon icon={mockPlaywrightIcon} />
            Settings
          </OnyxMenuItem>

          <OnyxMenuItem color="danger">
            <OnyxIcon icon={mockPlaywrightIcon} />
            Logout
          </OnyxMenuItem>

          <template v-slot:footer>
            App version
            <span class="onyx-text--monospace">1.0.0</span>
          </template>
        </OnyxUserMenu>
      </template>
    </OnyxNavBar>,
  );

  // ACT
  await component.getByLabel("Toggle burger menu").click();

  // ASSERT
  await expect(page).toHaveScreenshot("burger.png");

  // ACT
  await component.getByRole("menuitem", { name: "Item 1" }).click();
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#1$/);

  // ACT
  await component.getByRole("menuitem", { name: "Item 2" }).click();
  await component.hover({ position: { x: 0, y: 0 } }); // reset mouse

  // ASSERT
  await expect(page).toHaveScreenshot("burger-children.png");
  await expect(page, "should not open parent link if it has children").toHaveURL(
    /^http:\/\/localhost:\d*\/#1$/,
  );

  // ACT
  await component.getByRole("menuitem", { name: "Item 2", exact: true }).click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#2$/);

  // ACT
  await component.getByText("Nested item 1").click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#2-1$/);

  // ACT
  await component.getByRole("button", { name: "Back" }).click();

  // ASSERT
  await expect(component.getByRole("menuitem", { name: "Nested item 1" })).toBeHidden();
  await expect(component.getByRole("menuitem", { name: "Nested item 2" })).toBeHidden();
  await expect(component.getByRole("menuitem", { name: "Nested item 3" })).toBeHidden();
  await expect(component.getByRole("menuitem", { name: "Item 1" })).toBeVisible();
  await expect(component.getByRole("menuitem", { name: "Item 2" })).toBeVisible();
  await expect(component.getByRole("menuitem", { name: "Item 3" })).toBeVisible();

  // ACT
  await component.getByLabel("Toggle context menu").click();

  // ASSERT
  await expect(page).toHaveScreenshot("context.png");
});

["", " with context"].forEach((showContext) => {
  test(`Screenshot tests (mobile truncated labels${showContext})`, async ({ mount, page }) => {
    await page.addStyleTag({ content: "body { margin: 0 }" });
    await page.setViewportSize({ height: 350, width: ONYX_BREAKPOINTS["2xs"] });
    const longLabel = "Item with a very long truncated name";

    const component = await mount(
      <OnyxNavBar appName="App with a very long truncated name" logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}>
        <OnyxNavItem link="#1" label={longLabel} active />
        <OnyxNavItem link="#2" label="Other item" />
        <template v-slot:mobileActivePage>{longLabel}</template>

        {showContext && (
          <template v-slot:globalContextArea>
            <OnyxIconButton label="Search" icon={mockPlaywrightIcon} color="neutral" />
          </template>
        )}
        {showContext && <template v-slot:contextArea> test </template>}
      </OnyxNavBar>,
    );
    // ASSERT
    await expect(page).toHaveScreenshot(
      `truncated-page-name${showContext ? "-with-context" : ""}.png`,
    );

    // ACT
    await component.getByLabel("Toggle burger menu").click();

    // ASSERT
    await expect(page).toHaveScreenshot(
      `truncated-app-name${showContext ? "-with-context" : ""}.png`,
    );
  });
});

test("should behave correctly", async ({ mount, page }) => {
  // ARRANGE
  let backButtonClickEvents = 0;

  let component = await mount(
    <OnyxNavBar
      style={{ width: `${ONYX_BREAKPOINTS.md}px` }}
      appName="App name"
      logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}
      appArea={{ link: "#app-area" }}
      withBackButton
      onNavigateBack={() => backButtonClickEvents++}
    >
      <OnyxNavItem link="#1" label="Item 1" />
      <OnyxNavItem link="#2" label="Item 2">
        Item 2
        <template v-slot:children>
          <OnyxNavItem label="Nested item 1" link="#2-1" />
        </template>
      </OnyxNavItem>
    </OnyxNavBar>,
  );

  // ACT
  await component.getByRole("link", { name: "Go to Home" }).click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#app-area$/);

  // ACT
  await component.getByRole("button", { name: "Go back" }).click();

  // ASSERT
  expect(backButtonClickEvents).toBe(1);

  // ACT
  await component.getByRole("menuitem", { name: "Item 1" }).click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#1$/);

  // ACT
  await component.getByRole("menuitem", { name: "Item 2" }).click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#2$/);

  // ACT
  await component.getByRole("menuitem", { name: "Item 2" }).hover();
  await component.getByRole("menuitem", { name: "Nested item 1" }).click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#2-1$/);

  // ARRANGE
  component = await mount(
    <OnyxNavBar
      style={{ width: `${ONYX_BREAKPOINTS.md}px` }}
      appArea={{ label: "custom action" }}
      withBackButton
    >
      <template v-slot:appArea>Custom app area</template>
    </OnyxNavBar>,
  );

  // ASSERT
  await expect(component.getByRole("link", { name: "custom action" })).toContainText(
    "Custom app area",
  );
});

Object.entries(ONYX_BREAKPOINTS).forEach(([breakpoint, width]) => {
  test(`should be aligned with the grid in a full app layout (${breakpoint})`, async ({
    page,
    mount,
  }) => {
    await defineLogoMockRoutes(page);
    await page.setViewportSize({ width, height: 400 });

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
            <OnyxUserMenu fullName="John Doe" />
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

    await expect(page).toHaveScreenshot(`grid-default-${breakpoint}.png`);

    // eslint-disable-next-line playwright/no-conditional-in-test -- prevent useless screenshots for breakpoints that don't have a max width
    if (width > ONYX_BREAKPOINTS.md) {
      const app = page.locator(".onyx-app");

      await app.evaluate((element) => element.classList.add("onyx-grid-max-md"));
      // eslint-disable-next-line playwright/no-conditional-expect
      await expect(page).toHaveScreenshot(`grid-max-width-${breakpoint}.png`);

      await app.evaluate((element) => element.classList.add("onyx-grid-center"));
      // eslint-disable-next-line playwright/no-conditional-expect
      await expect(page).toHaveScreenshot(`grid-max-center-${breakpoint}.png`);
    }
  });
});
