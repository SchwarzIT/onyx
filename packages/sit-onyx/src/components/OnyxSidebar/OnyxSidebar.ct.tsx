import { dragResizeHandle } from "../../playwright";
import { expect, test } from "../../playwright/a11y";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxSidebar from "./OnyxSidebar.vue";

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
  const component = await mount(<OnyxSidebar label="Label">{CONTENT}</OnyxSidebar>);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");
});

test("should render as drawer", async ({ mount, page, makeAxeBuilder }) => {
  let closeEventCount = 0;

  // ARRANGE
  await mount(
    <OnyxSidebar label="Example headline" drawer={{ open: true }} onClose={() => closeEventCount++}>
      {CONTENT}
    </OnyxSidebar>,
  );

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(page).toHaveScreenshot("drawer.png");
  expect(closeEventCount).toBe(0);

  // ACT
  await page.getByRole("button", { name: "Close dialog" }).click();

  // ASSERT
  expect(closeEventCount).toBe(1);
});

["default", "drawer"].forEach((type) => {
  test(`should support resizing (${type})`, async ({ page, mount, makeAxeBuilder }) => {
    const viewportWidth = 512;

    await page.setViewportSize({ height: 256, width: viewportWidth });

    // ARRANGE
    const component = await mount(
      <OnyxSidebar label="Label" drawer={type === "drawer" ? { open: true } : undefined} resizable>
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

["default", "drawer"].forEach((type) => {
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
        drawer={type === "drawer" ? { open: true } : undefined}
        alignment="right"
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
