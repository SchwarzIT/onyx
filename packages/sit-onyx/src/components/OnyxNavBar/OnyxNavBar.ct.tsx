import type { Page } from "@playwright/test";
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
import AsyncTestCase from "./AsyncTestCase.vue";
import OnyxMenuItem from "./modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxNavItem from "./modules/OnyxNavItem/OnyxNavItem.vue";
import OnyxUserMenu from "./modules/OnyxUserMenu/OnyxUserMenu.vue";
import OnyxNavBar from "./OnyxNavBar.vue";
import TestCase from "./TestCase.vue";
import type { OnyxNavBarProps } from "./types";

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
          <OnyxNavItem label="Item" />
          <OnyxNavItem label="Item" />
          <OnyxNavItem label="Item" />
          <OnyxNavItem label="Item" />
          <OnyxNavItem label="Item" />
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
      content: `body {
        margin: 0;
        font-family: var(--onyx-font-family);
        color: var(--onyx-color-text-icons-neutral-intense);
      }`,
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
          <div class="onyx-grid">
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

const expectNMenuItemsToBeVisible = async (n: number, page: Page) => {
  for (let i = 1; i < n; i++) {
    await expect(page.getByRole("menuitem", { name: `Menuitem ${i}` })).toBeVisible();
  }
};

test("should display More Items correctly", async ({ mount, page }) => {
  // ARRANGE
  let navItemClickEvents = 0;

  await page.setViewportSize({ width: ONYX_BREAKPOINTS.lg, height: 400 });

  const component = await mount(
    <OnyxNavBar
      appName="App name"
      logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}
      appArea={{ link: "#app-area" }}
    >
      <OnyxNavItem link="#1" label="Menuitem 0" />
      <OnyxNavItem link="#1" label="Menuitem 1" />
      <OnyxNavItem link="#2" label="Menuitem 2" />
      <OnyxNavItem link="#3" label="Menuitem 3" />
      <OnyxNavItem link="#4" label="Menuitem 4" />
      <OnyxNavItem link="#5" onClick={() => navItemClickEvents++} label="Menuitem 5" />
    </OnyxNavBar>,
  );

  const moreMenuItem = component.getByRole("menuitem", { name: /\+\d More/ });
  const firstMenuItem = component.getByRole("menuitem", { name: "Menuitem 0" });
  const lastMenuItem = component.getByRole("menuitem", { name: "Menuitem 5" });

  await test.step("on a wide screen all menuitems should visible", async () => {
    // ACT
    await lastMenuItem.click();

    // ASSERT
    expect(navItemClickEvents).toBe(1);
    await expect(moreMenuItem).toBeHidden();
    await expectNMenuItemsToBeVisible(5, page);
  });

  await test.step("smaller screen should move menuitem into nested menu", async () => {
    // ACT
    await firstMenuItem.hover();
    await page.setViewportSize({ width: ONYX_BREAKPOINTS.md, height: 400 });

    // ASSERT
    expect(navItemClickEvents).toBe(1);
    await expect(moreMenuItem).toBeVisible();
    await expect(lastMenuItem).toBeHidden();
    await expectNMenuItemsToBeVisible(4, page);

    // ACT
    await moreMenuItem.hover();

    // ASSERT
    await expect(moreMenuItem).toBeVisible();
    await expect(moreMenuItem).toHaveAttribute("aria-expanded", "true");
    await expect(moreMenuItem).toHaveAttribute("aria-haspopup", "true");
    await expect(lastMenuItem).toBeVisible();

    // ACT
    await lastMenuItem.click();

    // ASSERT
    await expect(moreMenuItem).toBeVisible();
    await expect(moreMenuItem).toHaveAttribute("aria-expanded", "false");
    await expect(moreMenuItem).toHaveAttribute("aria-haspopup", "true");
    await expect(lastMenuItem).toBeHidden();
    expect(navItemClickEvents).toBe(2);
  });

  await test.step("on mobile breakpoint the mobile menu should work as expected", async () => {
    // ACT
    await page.setViewportSize({ width: ONYX_BREAKPOINTS.sm, height: 800 });
    await component.getByLabel("Toggle burger menu").click();

    // ASSERT
    await expect(moreMenuItem).toBeHidden();
    await expectNMenuItemsToBeVisible(5, page);

    // ACT
    await lastMenuItem.click();

    // ASSERT
    expect(navItemClickEvents).toBe(3);
  });

  await test.step("on desktop breakpoint everything should work as expected again", async () => {
    // ACT
    await page.setViewportSize({ width: ONYX_BREAKPOINTS.lg, height: 400 });
    await lastMenuItem.click();

    // ASSERT
    await expectNMenuItemsToBeVisible(5, page);
    expect(navItemClickEvents).toBe(4);
  });
});

test("should work with async nav items", async ({ mount, page }) => {
  await page.setViewportSize({ width: ONYX_BREAKPOINTS.sm, height: 400 });

  const component = await mount(AsyncTestCase);

  await expect(component.getByRole("menuitem").count()).resolves.toBe(0);
  await component.getByRole("button", { name: "Load Async" }).click();

  const menuItemButton = component.getByRole("menuitem", { name: "MenuItem Button" });
  await expect(menuItemButton).toBeVisible();

  const menuItemLinks = await component.getByRole("menuitem", { name: "MenuItem Link" }).all();
  expect(menuItemLinks).toHaveLength(3);
  for (const link of menuItemLinks) {
    await expect(link).toBeVisible();
  }

  const moreMenuButton = component.getByRole("menuitem", { name: "+1 More" });
  await moreMenuButton.click();

  const menuItemNested = component.getByRole("menuitem", { name: "MenuItem Nested" });
  await expect(menuItemNested).toBeVisible();
});

test("should switch to mobile correctly", async ({ mount, page }) => {
  const component = await mount(TestCase);

  type TestCase = {
    setting: OnyxNavBarProps["mobile"];
    viewportWidth: number;
    expectedMobile: boolean;
  };

  const testCases = [
    {
      setting: true,
      expectedMobile: true,
      viewportWidth: ONYX_BREAKPOINTS.xl,
    },
    {
      setting: false,
      expectedMobile: false,
      viewportWidth: ONYX_BREAKPOINTS.xs,
    },
    {
      setting: 1001,
      expectedMobile: true,
      viewportWidth: 1000,
    },
    {
      setting: 999,
      expectedMobile: false,
      viewportWidth: 1000,
    },
    {
      setting: "md",
      expectedMobile: true,
      viewportWidth: ONYX_BREAKPOINTS.sm,
    },
    {
      setting: "sm",
      expectedMobile: false,
      viewportWidth: ONYX_BREAKPOINTS.md,
    },
  ] as TestCase[];

  for (const { setting, expectedMobile, viewportWidth } of testCases) {
    // eslint-disable-next-line playwright/no-conditional-in-test -- conditional is only used in test title
    await test.step(`should${expectedMobile ? "" : " not"} render in mobile for mobile prop "${setting}" and a viewport width of ${viewportWidth}px`, async () => {
      await page.setViewportSize({ width: viewportWidth, height: 400 });
      await component.update({
        props: { mobile: setting },
      });
      await expect(component.getByLabel("Toggle burger menu")).toBeAttached({
        attached: expectedMobile,
      });
    });
  }
});
