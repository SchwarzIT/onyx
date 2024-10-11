import { expect, test } from "../../playwright/a11y";
import TestWrapper from "./TestWrapper.ct.vue";

test("should have unique ids", async ({ mount }) => {
  // ARRANGE
  const mounted = await mount(TestWrapper);

  const textboxes = mounted.getByRole("textbox");
  await expect(textboxes).toHaveCount(2);

  const firstId = await textboxes.first().evaluate((el) => el.id);
  const secondId = await textboxes.last().evaluate((el) => el.id);

  expect(firstId, "every form-element should have a unique id").not.toBe(secondId);
});
