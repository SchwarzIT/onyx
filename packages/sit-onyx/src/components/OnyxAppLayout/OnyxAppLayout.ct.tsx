import { expect, test } from "../../playwright-axe";
import OnyxAppLayout from "./OnyxAppLayout.vue";

const navStyle = "style='background-color: honeydew; height: 100%; width: 100%'";
const pageStyle = "style='background-color: floralwhite; height: 100%; width: 100%'";
const standardSlots = {
  navBar: `<div ${navStyle}>Nav</div>`,
  default: `<div ${pageStyle}>Page</div>`,
};

test("should render standard page", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(OnyxAppLayout, {
    slots: standardSlots,
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
      navBarAlignment: "left",
    },
    slots: standardSlots,
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
    props: {
      navBarAlignment: "left",
    },
    slots: {
      ...standardSlots,
      appOverlay: `<div style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
      <div style="background-color: white; padding: 1rem">App Overlay</div>
      </div>`,
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
    props: {
      navBarAlignment: "left",
    },
    slots: {
      ...standardSlots,
      pageOverlay: `<div style='background-color: ivory; height: 100%; width: 100%'>App Overlay</div>`,
    },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("page-overlay.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
