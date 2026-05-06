import { expect, test } from "../../playwright/a11y.js";
import { dragResizeHandle } from "../../playwright/index.js";
import { ONYX_BREAKPOINTS } from "../../utils/breakpoints.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxSidebar from "./OnyxSidebar.vue";
import PlaywrightTest from "./PlaywrightTest.vue";

const CONTENT = [
  <template v-slot:header> Header content </template>,

  <div style={{ padding: "var(--onyx-sidebar-padding)" }}>Body content</div>,

  <template v-slot:footer>
    <OnyxButton color="neutral" label="Button" />
    <OnyxButton label="Button" />
  </template>,
];

test.use({ viewport: { height: 512, width: 512 } });

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: `
    body { margin: 0; }
    .onyx-sidebar { height: 100vh; }
    `,
  });
});

test("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxSidebar label="Label" collapseSidebar={false}>
      {CONTENT}
    </OnyxSidebar>,
  );

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");
});

for (const type of ["left", "right", "floating"] as const) {
  test(`should render as temporary (${type})`, async ({ mount, page, makeAxeBuilder }) => {
    let closeEventCount = 0;

    // ARRANGE
    await mount(
      <OnyxSidebar
        label="Example headline"
        temporary={{ open: true, floating: type === "floating" }}
        onClose={() => closeEventCount++}
        alignment={type === "right" ? "right" : "left"}
      >
        {CONTENT}
      </OnyxSidebar>,
    );

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);

    // ASSERT
    await expect(page).toHaveScreenshot(`temporary-${type}.png`);
    expect(closeEventCount).toBe(0);

    // ACT
    await page.getByRole("button", { name: "Close dialog" }).click();

    // ASSERT
    expect(closeEventCount).toBe(1);
  });
}

test.describe("small screen", () => {
  const VIEWPORT_WIDTH = 512;
  test.use({ viewport: { height: 256, width: VIEWPORT_WIDTH } });

  ["default", "temporary"].forEach((type) => {
    test(`should support resizing (${type})`, async ({ page, mount, makeAxeBuilder }) => {
      // ARRANGE
      const component = await mount(
        <OnyxSidebar
          collapseSidebar={false}
          label="Label"
          temporary={type === "temporary" ? { open: true } : undefined}
          resizable
        >
          {CONTENT}
        </OnyxSidebar>,
      );

      // ACT
      const accessibilityScanResults = await makeAxeBuilder().analyze();

      // ASSERT
      expect(accessibilityScanResults.violations).toEqual([]);

      let box = (await component.boundingBox())!;
      expect(box.width).toBe(320);

      // ACT
      const resizeButton = component.getByRole("button", { name: "Drag to change width" });

      // ASSERT
      await expect(resizeButton).toBeVisible();

      // ACT
      await dragResizeHandle({ page, to: box.x + box.width + 100 });

      // ASSERT
      box = (await component.boundingBox())!;
      expect(box.width).toBe(420);

      // ACT
      await dragResizeHandle({ page, to: VIEWPORT_WIDTH });

      // ASSERT
      box = (await component.boundingBox())!;
      expect(box.width, "should have max width when resizing").toBe(VIEWPORT_WIDTH - 16);

      // ACT
      await dragResizeHandle({ page, to: 0, preventUp: true });

      // ASSERT
      box = (await component.boundingBox())!;
      expect(box.width, "should have min width when resizing").toBe(64);
    });
  });

  ["default", "temporary"].forEach((type) => {
    test(`should support resizing right aligned (${type})`, async ({
      page,
      mount,
      makeAxeBuilder,
    }) => {
      await page.addStyleTag({
        content: `body {
        display: flex;
        justify-content: flex-end;
      }`,
      });

      // ARRANGE
      const component = await mount(
        <OnyxSidebar
          label="Label"
          temporary={type === "temporary" ? { open: true } : undefined}
          alignment="right"
          resizable
          collapseSidebar={false}
        >
          {CONTENT}
        </OnyxSidebar>,
      );

      // ACT
      const accessibilityScanResults = await makeAxeBuilder().analyze();

      // ASSERT
      expect(accessibilityScanResults.violations).toEqual([]);

      let box = (await component.boundingBox())!;
      expect(box.width).toBe(320);

      // ACT
      const resizeButton = component.getByRole("button", { name: "Drag to change width" });

      // ASSERT
      await expect(resizeButton).toBeVisible();

      // ACT
      await dragResizeHandle({ page, to: box.x - 100 });

      // ASSERT
      box = (await component.boundingBox())!;
      expect(box.width).toBe(420);

      // ACT
      await dragResizeHandle({ page, to: 0 });

      // ASSERT
      box = (await component.boundingBox())!;
      expect(box.width, "should have max width when resizing").toBe(VIEWPORT_WIDTH - 16);

      // ACT
      await dragResizeHandle({ page, to: VIEWPORT_WIDTH, preventUp: true });

      // ASSERT
      box = (await component.boundingBox())!;
      expect(box.width, "should have min width when resizing").toBe(64);
    });
  });
});

test.describe("small screen", () => {
  test.use({ viewport: { height: ONYX_BREAKPOINTS.sm, width: 320 } });

  test("should render fab on small screens (left Sidebar)", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<PlaywrightTest sidebarLeft />);
    const FABLeftSidebar = component.getByRole("button", { name: "Sidebar Left" });
    const leftSidebar = component.getByRole("dialog", { name: "Sidebar Left" });
    // ASSERT
    await expect(FABLeftSidebar).toBeVisible();
    await expect(leftSidebar).toBeHidden();
    await expect(component).toHaveScreenshot("collapsed-left.png");

    // ACT
    await FABLeftSidebar.click();
    // ASSERT
    await expect(leftSidebar).toBeVisible();
  });

  test("should render fab on small screens (right Sidebar)", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<PlaywrightTest sidebarRight />);
    const FAB = component.getByRole("button", { name: "Sidebar Right" });
    const sidebar = component.getByRole("dialog", { name: "Sidebar Right" });
    // ASSERT
    await expect(FAB).toBeVisible();
    await expect(sidebar).toBeHidden();
    await expect(component).toHaveScreenshot("collapsed-right.png");

    // ACT
    await FAB.click();
    // ASSERT
    await expect(sidebar).toBeVisible();
  });

  test("should render fab on small screens (left & right Sidebar)", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<PlaywrightTest sidebarLeft sidebarRight />);

    const FAB = component.getByRole("button", { name: "Global actions" });
    const FABLeftSidebar = component.getByRole("menuitem", { name: "Sidebar Left" });
    const leftSidebar = component.getByRole("dialog", { name: "Sidebar Left" });
    const FABRightSidebar = component.getByRole("menuitem", { name: "Sidebar Right" });
    const rightSidebar = component.getByRole("dialog", { name: "Sidebar Right" });
    // ASSERT
    await expect(FAB).toBeVisible();
    await expect(leftSidebar).toBeHidden();
    await expect(rightSidebar).toBeHidden();
    await expect(component).toHaveScreenshot("collapsed-multible.png");

    // ACT
    await FAB.click();

    //ASSERT
    await expect(FABLeftSidebar).toBeVisible();
    await expect(FABRightSidebar).toBeVisible();

    await expect(component).toHaveScreenshot("collapsed-multible-extended.png");

    // ACT
    await FABLeftSidebar.click();
    // ASSERT
    await expect(leftSidebar).toBeVisible();
  });

  test("should close after navigation", async ({ mount }) => {
    // ARRANGE
    const component = await mount(PlaywrightTest, {
      props: {
        sidebarLeft: true,
      },
    });

    const fab = component.getByRole("button", { name: "Sidebar Left" });
    const sidebar = component.getByRole("dialog", { name: "Sidebar Left" });

    // ACT
    await fab.click();

    // ASSERT
    await expect(sidebar).toBeVisible();

    // ACT
    await component.update({ props: { currentRoute: "/changed-route" } });

    // ASSERT
    await expect(sidebar, "should hide temporary sidebar if route changes").toBeHidden();
  });
});
