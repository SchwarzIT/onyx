import { OnyxNavBar, OnyxNavItem } from "../..";
import { expect, test } from "../../playwright/a11y";
import {
  MOCK_PLAYWRIGHT_LOGO_URL,
  defineLogoMockRoutes,
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
} from "../../playwright/screenshots";
import { ONYX_BREAKPOINTS } from "../../types";
import OnyxAppLayout from "../OnyxAppLayout/OnyxAppLayout.vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
import OnyxPageLayout from "../OnyxPageLayout/OnyxPageLayout.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
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
      disablePadding: true,
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
              <OnyxUserMenu username="John Doe" />
            </template>
          )}
        </OnyxNavBar>
      ),
      beforeScreenshot: async (component, page) => {
        await page.setViewportSize({ width: breakpointWidth, height: 128 });
      },
    });
  }
});

test("Screenshot tests (mobile)", async ({ mount, page }) => {
  await page.setViewportSize({ height: 512, width: ONYX_BREAKPOINTS.sm });

  const clickEvents: string[] = [];

  const component = await mount(
    <OnyxNavBar appName="App name" logoUrl={MOCK_PLAYWRIGHT_LOGO_URL}>
      <OnyxNavItem href="/1" label="Item 1" onClick={(href) => clickEvents.push(href)} />
      <OnyxNavItem
        href="/2"
        label="Item 2"
        options={[
          {
            label: "Nested item 1",
            href: "/2/1",
          },
          {
            label: "Nested item 2",
            href: "/2/2",
            active: true,
          },
          {
            label: "Nested item 3",
            href: "/2/3",
          },
        ]}
        onClick={(href) => clickEvents.push(href)}
      >
        Item 2
        <OnyxBadge color="warning" dot />
      </OnyxNavItem>
      <OnyxNavItem
        href="https://onyx.schwarz"
        label="Item 3"
        onClick={(href) => clickEvents.push(href)}
      />

      <template v-slot:mobileActivePage>Nested item 2</template>

      <template v-slot:globalContextArea>
        <OnyxIconButton label="Search" icon={mockPlaywrightIcon} color="neutral" />
      </template>

      <template v-slot:contextArea>
        <OnyxIconButton label="Notification center" icon={mockPlaywrightIcon} color="neutral" />
        <OnyxTag icon={mockPlaywrightIcon} color="warning" label="QA stage" />

        <OnyxUserMenu username="John Doe" description="Company name">
          <OnyxListItem>
            <OnyxIcon icon={mockPlaywrightIcon} />
            Settings
          </OnyxListItem>

          <OnyxListItem color="danger">
            <OnyxIcon icon={mockPlaywrightIcon} />
            Logout
          </OnyxListItem>

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
  await component.getByLabel("Item 1").click();
  expect(clickEvents).toStrictEqual(["/1"]);

  // ACT
  await component.getByLabel("Item 2").click();

  // ASSERT
  await expect(page).toHaveScreenshot("burger-children.png");
  expect(clickEvents).toStrictEqual(["/1"]);

  // ACT
  await component.getByLabel("Item 2", { exact: true }).click();

  // ASSERT
  expect(clickEvents).toStrictEqual(["/1", "/2"]);

  // ACT
  await component.getByLabel("Nested item 1").click();

  // ASSERT
  expect(clickEvents).toStrictEqual(["/1", "/2", "/2/1"]);

  // ACT
  await component.getByRole("button", { name: "Back" }).click();

  // ASSERT
  await expect(component.getByLabel("Nested item 1")).toBeHidden();
  await expect(component.getByLabel("Nested item 2")).toBeHidden();
  await expect(component.getByLabel("Nested item 3")).toBeHidden();
  await expect(component.getByLabel("Item 1")).toBeVisible();
  await expect(component.getByLabel("Item 2")).toBeVisible();
  await expect(component.getByLabel("Item 3")).toBeVisible();

  // ACT
  await component.getByLabel("Toggle context menu").click();

  // ASSERT
  await expect(page).toHaveScreenshot("context.png");
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
