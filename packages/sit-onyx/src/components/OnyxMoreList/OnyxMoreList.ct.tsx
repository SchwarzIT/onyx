import { expect, test } from "../../playwright/a11y";
import TestWrapperCt from "./TestWrapper.ct.vue";
import type { MoreListSlotBindings } from "./types";

test("should render", async ({ mount, makeAxeBuilder }) => {
  const events: MoreListSlotBindings[] = [];

  const eventHandlers = {
    onVisibilityChange: (data: MoreListSlotBindings) => events.push(data),
  };

  // ARRANGE
  const component = await mount(TestWrapperCt, {
    props: {
      count: 2.5,
    },
    on: eventHandlers,
  });

  const expectVisible = (name: string) => {
    return expect(component.getByRole("menuitem", { name, exact: true })).toBeInViewport({
      ratio: 1,
    });
  };

  const expectHidden = (name: string) => {
    return expect(component.getByRole("menuitem", { name, exact: true })).toBeHidden();
  };

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expectVisible("Element 1");
  await expectVisible("Element 2");
  await expectHidden("Element 3");
  expect(events.at(-1)).toStrictEqual({ visibleElements: 2, hiddenElements: 22 });

  // ACT
  await component.update({ props: { count: 1 }, on: eventHandlers });

  // ASSERT
  await expectVisible("Element 1");
  await expectHidden("Element 2");
  expect(events.at(-1)).toStrictEqual({ visibleElements: 1, hiddenElements: 23 });

  // ACT
  await component.update({ props: { count: 4.25 }, on: eventHandlers });

  // ASSERT
  await expectVisible("Element 1");
  await expectVisible("Element 2");
  await expectVisible("Element 3");
  await expectVisible("Element 4");
  await expectHidden("Element 5");
  expect(events.at(-1)).toStrictEqual({ visibleElements: 4, hiddenElements: 20 });
});
