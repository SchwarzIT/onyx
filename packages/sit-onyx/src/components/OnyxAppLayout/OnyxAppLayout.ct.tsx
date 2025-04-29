import { expect, test } from "../../playwright/a11y";
import OnyxAppLayout from "./OnyxAppLayout.vue";

const demoElement = `<div style="min-width: 4rem; min-height: 4rem;"></div>`;
const defaultProps = {
  style: `
  --background-color-nav: peachpuff;
  --background-color-overlay-backdrop: rgba(125,125,125,0.5)
  `,
};
const defaultSlots = {
  navBar: demoElement,
  default: demoElement,
};
const defaultConfig = {
  props: defaultProps,
  slots: defaultSlots,
};

test("should render standard app", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(OnyxAppLayout, {
    ...defaultConfig,
  });

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render nav left", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(OnyxAppLayout, {
    props: {
      ...defaultProps,
      navAlignment: "left",
    },
    slots: defaultSlots,
  });

  // ASSERT
  await expect(component).toHaveScreenshot("nav-left.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render app overlay", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(OnyxAppLayout, {
    props: defaultProps,
    slots: {
      ...defaultSlots,
      appOverlay: demoElement,
    },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("app-overlay.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render page overlay", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(OnyxAppLayout, {
    props: defaultProps,
    slots: {
      ...defaultSlots,
      pageOverlay: `<div style='background-color: ivory; height: 100%; width: 100%'></div>`,
    },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("page-overlay.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
