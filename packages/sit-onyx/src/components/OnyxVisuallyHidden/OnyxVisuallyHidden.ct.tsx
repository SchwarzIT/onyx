import { expect, test } from "../../playwright/a11y.js";
import OnyxVisuallyHidden from "./OnyxVisuallyHidden.vue";

test("should not be visible", async ({ mount }) => {
  const component = await mount(
    <div style={{ width: "max-content" }}>
      something before
      <OnyxVisuallyHidden data-testid="visually-hidden">
        <span>visually hidden text</span>
      </OnyxVisuallyHidden>
      something after
    </div>,
  );

  const visuallyHidden = component.getByTestId("visually-hidden");

  await expect(visuallyHidden).toBeAttached();
  await expect(visuallyHidden).toBeHidden();
  await expect(component).toHaveScreenshot("with-hidden-text.png");
});
