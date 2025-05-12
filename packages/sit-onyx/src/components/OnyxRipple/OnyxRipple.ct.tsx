import { expect, test } from "../../playwright/a11y";
import RippleTestWrapper from "./RippleTestWrapper.ct.vue";

test("should trigger some ripples", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<RippleTestWrapper />);

  await component.click({ clickCount: 1, position: { x: 0, y: 50 } });
  await component.click({ clickCount: 1, position: { x: 100, y: 100 } });
  await component.click({ clickCount: 1, position: { x: 250, y: 0 } });

  // ASSERT
  await expect(component.locator(".onyx-ripple__element")).toHaveCount(3);
});
