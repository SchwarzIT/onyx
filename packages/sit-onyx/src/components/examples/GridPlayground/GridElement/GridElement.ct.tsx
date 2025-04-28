import { expect, test } from "../../../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
} from "../../../../playwright/screenshots";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import GridElement from "../GridElement/GridElement.vue";

test.describe("screenshot tests", () => {
  for (const mode of ["default", "outline"] as const) {
    executeMatrixScreenshotTest({
      name: `Grid element (${mode})`,
      columns: ["default", "with-content"],
      rows: ["default", "hover", "active", "focus-visible"],
      component: (column) => (
        <GridElement columnCount={1} label="Label" mode={mode} style={{ width: "8rem" }}>
          {column === "with-content" && <OnyxIcon icon={mockPlaywrightIcon} />}
        </GridElement>
      ),
      hooks: {
        beforeEach: async (component, page, column, row) => {
          if (row === "hover") await component.hover();
          if (row === "focus-visible") await page.keyboard.press("Tab");
          if (row === "active") {
            const box = (await component.boundingBox())!;
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
          }
        },
      },
    });
  }
});

test("should behave correctly", async ({ mount }) => {
  // ARRANGE

  const component = await mount(GridElement, {
    props: {
      label: "Label",
      columnCount: 2,
    },
  });

  // ACT
  await component.click();

  // ASSERT
  await expect(component).toHaveClass("onyx-grid-span-2");
  await expect(component).toHaveAccessibleName("Label");
  await expect(component).toBeEnabled();

  // ARRANGE
  await component.update({
    props: {
      breakpoints: {
        md: 1,
        lg: 4,
      },
    },
  });

  // ASSERT
  await expect(component).toHaveClass("onyx-grid-span-2 onyx-grid-md-span-1 onyx-grid-lg-span-4");
});
