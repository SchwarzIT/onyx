import { expect, test } from "../../playwright/a11y";
import OnyxVisuallyHidden from "./OnyxVisuallyHidden.vue";

test("should not be visible", async ({ mount }) => {
  const component = await mount(<OnyxVisuallyHidden>test text</OnyxVisuallyHidden>);

  await expect(component).toHaveScreenshot("not-visible.png");
  await expect(component).toBeHidden();
});
