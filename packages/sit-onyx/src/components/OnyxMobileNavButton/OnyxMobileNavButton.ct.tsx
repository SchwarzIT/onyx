import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import OnyxMobileNavButton from "./OnyxMobileNavButton.vue";

test("should render without errors", async ({ mount, makeAxeBuilder }) => {
  await mount(
    <OnyxMobileNavButton
      label="Label"
      icon={mockPlaywrightIcon}
      open
      // playwright sets 8px on the body which interfers with the positioning of the flyout
      style="--top-position: 4rem"
    >
      Lorem ipsum dolor sit amet consectetur. Non in felis erat velit consectetur. Sed integer non
      hac viverra nibh vehicula risus ultrices. Molestie cras lobortis vitae gravida et ut. Turpis
      nisl pharetra amet ante eu sagittis sit elementum ut.
    </OnyxMobileNavButton>,
  );

  // accessibility tests
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  expect(accessibilityScanResults.violations, "should pass accessibility checks").toEqual([]);
});

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Mobile nav button",
    columns: ["default", "open"],
    rows: ["default", "hover", "active", "focus-visible", "disabled"],
    removePadding: true,
    component: (column, row) => (
      <OnyxMobileNavButton
        label="Label"
        icon={mockPlaywrightIcon}
        open={column === "open"}
        disabled={row === "disabled"}
        // playwright sets 8px on the body which interfers with the positioning of the flyout
        style="--top-position: 4rem"
      >
        Flyout slot content...
      </OnyxMobileNavButton>
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

        await page.setViewportSize({ width: 600, height: 850 });
        await component.evaluate((element) => {
          element.style.height = "150px";
          element.style.width = "200px";
        });
      },
    },
  });
});
