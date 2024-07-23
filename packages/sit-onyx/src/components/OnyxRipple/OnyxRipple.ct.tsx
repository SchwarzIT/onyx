import { expect, test } from "../../playwright/a11y";
import OnyxRipple from "./OnyxRipple.vue";

test("should trigger some ripples", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxRipple enter-duration="2000ms" style="width: 500px; height: 500px;" />,
  );

  await component.click({ clickCount: 2, position: { x: 0, y: 50 } });
  await component.click({ clickCount: 1, position: { x: 250, y: 0 } });

  // ASSERT
  await expect(component.locator(".onyx-ripple__element")).toHaveCount(3);
});
