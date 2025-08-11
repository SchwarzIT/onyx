import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../playwright/a11y.js";
import { dragResizeHandle } from "../../playwright/index.js";
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

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: `
    body { margin: 0; }
    .onyx-sidebar { height: 100vh; }
    `,
  });

  await page.setViewportSize({ height: 512, width: 512 });
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

["default", "temporary"].forEach((type) => {
  test(`should support resizing (${type})`, async ({ page, mount, makeAxeBuilder }) => {
    const viewportWidth = 512;

    await page.setViewportSize({ height: 256, width: viewportWidth });

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
    await dragResizeHandle({ page, to: viewportWidth });

    // ASSERT
    box = (await component.boundingBox())!;
    expect(box.width, "should have max width when resizing").toBe(viewportWidth - 16);

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

    const viewportWidth = 512;

    await page.setViewportSize({ height: 256, width: viewportWidth });

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
    expect(box.width, "should have max width when resizing").toBe(viewportWidth - 16);

    // ACT
    await dragResizeHandle({ page, to: viewportWidth, preventUp: true });

    // ASSERT
    box = (await component.boundingBox())!;
    expect(box.width, "should have min width when resizing").toBe(64);
  });
});

test("should render fab on small screens (left Sidebar)", async ({ mount, page }) => {
  // ARRANGE
  await page.setViewportSize({ height: ONYX_BREAKPOINTS.sm, width: 320 });

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
test("should render fab on small screens (right Sidebar)", async ({ mount, page }) => {
  // ARRANGE
  await page.setViewportSize({ height: ONYX_BREAKPOINTS.sm, width: 320 });

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
test("should render fab on small screens (left & right Sidebar)", async ({ mount, page }) => {
  // ARRANGE
  await page.setViewportSize({ height: ONYX_BREAKPOINTS.sm, width: 320 });

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
