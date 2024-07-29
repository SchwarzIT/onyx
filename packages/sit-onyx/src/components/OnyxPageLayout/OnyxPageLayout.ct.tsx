import { expect, test } from "../../playwright/a11y";
import OnyxPageLayout from "./OnyxPageLayout.vue";

const demoSidebar = `<div style="min-width: 10rem;"></div>`;
const demoDefault = `<div style="height: 100%; width: 100%;"></div>`;
const demoFooter = `<div style="min-height: 4rem;"></div>`;
const defaultConfig = {
  slots: { default: demoDefault },
};

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: `
    body, #root { height: 100vh; width: 100vw; margin: 0; }
    .onyx-page {
      --background-color-sidebar: peachpuff;
      --background-color-main: ivory;
      --background-color-footer: olivedrab;
    }
    `,
  });
});

test("should render standard page", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(OnyxPageLayout, {
    ...defaultConfig,
  });

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with sidebar", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(OnyxPageLayout, {
    slots: { default: demoDefault, sidebar: demoSidebar },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("sidebar.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with footer", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(OnyxPageLayout, {
    slots: { default: demoDefault, footer: demoFooter },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("footer.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with footer below sidebar", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(OnyxPageLayout, {
    slots: { default: demoDefault, sidebar: demoSidebar, footer: demoFooter },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("footer-below-sidebar.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with footer aside sidebar", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(OnyxPageLayout, {
    props: { footerAsideSidebar: true },
    slots: { default: demoDefault, sidebar: demoSidebar, footer: demoFooter },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("footer-aside-sidebar.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
