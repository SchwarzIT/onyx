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
