import { expect, test } from "../playwright/a11y.js";
import AutoFocusTestCase from "./AutoFocusTestCase.ct.vue";

test("should autofocus", async ({ mount }) => {
  // ARRANGE
  const component = await mount(AutoFocusTestCase, {
    props: {
      autofocus: true,
    },
  });

  // ASSERT
  await expect(component).toBeFocused();
});

test("should not autofocus when visually hidden", async ({ mount }) => {
  // ARRANGE
  const component = await mount(AutoFocusTestCase, {
    props: {
      autofocus: true,
      hidden: true,
    },
  });

  // ASSERT
  await expect(component).not.toBeFocused();
});
