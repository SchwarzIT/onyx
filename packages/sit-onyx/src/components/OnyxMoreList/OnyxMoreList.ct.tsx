import { expect, test } from "../../playwright/a11y";
import TestWrapperCt from "./TestWrapper.ct.vue";

test("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(TestWrapperCt, {
    props: {
      count: 2.5,
    },
  });

  const expectVisible = (label: string) => {
    return expect(component.getByLabel(label, { exact: true })).toBeInViewport({
      ratio: 1,
    });
  };

  const expectHidden = (label: string) => {
    return expect(component.getByLabel(label, { exact: true })).toBeHidden();
  };

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expectVisible("Element 1");
  await expectVisible("Element 2");
  await expectHidden("Element 3");

  // ACT
  await component.update({ props: { count: 1 } });

  // ASSERT
  await expectVisible("Element 1");
  await expectHidden("Element 2");

  // ACT
  await component.update({ props: { count: 4.25 } });

  // ASSERT
  await expectVisible("Element 1");
  await expectVisible("Element 2");
  await expectVisible("Element 3");
  await expectVisible("Element 4");
  await expectHidden("Element 5");
});
