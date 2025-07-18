import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxComponent from "./OnyxComponent.vue";

// #region executeMatrixScreenshotTest
test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "OnyxComponent (densities)",
    rows: ["default", "hover", "active", "focus-visible", "skeleton"],
    columns: DENSITIES,
    hooks: {
      beforeEach: async (component, page, column, row) => {
        /**
         *  TODO: Prepare the component before the screenshot
         *  e.g.:
         */
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
        if (row === "active") await page.mouse.down();
      },
    },
    component: (column, row) => (
      // TODO: Set the props based on the given row and column
      <OnyxComponent propName="value" density={column} skeleton={row === "skeleton"} />
    ),
  });
});
// #endregion executeMatrixScreenshotTest

// #region toHaveScreenshot
test("should show hover effect", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<OnyxComponent propName={value} style="max-width: 8rem;" />);
  await component.hover();

  // ASSERT
  await expect(component).toHaveScreenshot("hover-effect.png");
});
// #endregion toHaveScreenshot
