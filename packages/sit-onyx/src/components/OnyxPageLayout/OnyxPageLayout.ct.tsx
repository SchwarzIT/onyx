import type { Locator } from "@playwright/test";
import { h, type Component } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import { expect, test } from "../../playwright/a11y";
import OnyxCheckbox from "../OnyxCheckbox/OnyxCheckbox.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import OnyxSwitch from "../OnyxSwitch/OnyxSwitch.vue";
import OnyxTextarea from "../OnyxTextarea/OnyxTextarea.vue";
import OnyxPageLayout from "./OnyxPageLayout.vue";

const demoSidebar = `<div style="min-width: 10rem;"></div>`;
const demoDefault = `<div style="height: 100%; width: 100%;"></div>`;
const demoFooter = `<div style="min-height: 4rem;"></div>`;
const defaultProps = {
  style: `
  --background-color-sidebar: peachpuff;
  --background-color-main: ivory;
  --background-color-footer: olivedrab;
  height: 100vh;
  width: 100vw;
  `,
};
const defaultConfig = {
  props: defaultProps,
  slots: { default: demoDefault },
};

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
    props: defaultProps,
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
    props: defaultProps,
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
    props: defaultProps,
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
    props: { ...defaultProps, footerAsideSidebar: true },
    slots: { default: demoDefault, sidebar: demoSidebar, footer: demoFooter },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("footer-aside-sidebar.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render form inside page", async ({ mount, page }) => {
  const inferProps = <TComp extends Component, TProps extends ComponentProps<TComp>>(
    component: TComp,
    props: TProps,
  ) => ({ component, props });

  const formElements = [
    inferProps(OnyxInput, { label: "OnyxInput" }),
    inferProps(OnyxStepper, { label: "OnyxStepper" }),
    inferProps(OnyxTextarea, { label: "OnyxTextarea" }),
    inferProps(OnyxCheckbox, { label: "OnyxCheckbox", value: "" }),
    inferProps(OnyxSwitch, { label: "OnyxSwitch" }),
  ];

  const expectForAll = async (expectation: (locator: Locator) => Promise<unknown>) => {
    for (const { props } of formElements) {
      // eslint-disable-next-line playwright/no-conditional-in-test
      const element = page.getByLabel(props.label, { exact: true });
      expect(element).toBeDefined();
      await expectation(element);
    }
  };

  const form = `<OnyxForm>${formElements.map(({ component, props }) => h(component as Component, props))}</OnyxForm>`;

  // ARRANGE
  const component = await mount(OnyxPageLayout, {
    props: defaultProps,
    slots: { default: form },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("form.png");
  await expectForAll((element) =>
    Promise.all([expect(element).toBeEnabled(), expect(element).toBeEditable()]),
  );

  // ARRANGE
  await mount(OnyxPageLayout, {
    props: { ...defaultProps, skeleton: true },
    slots: { default: form },
  });

  // ASSERT
  await expectForAll((element) => expect(element).toBeDisabled());
});
