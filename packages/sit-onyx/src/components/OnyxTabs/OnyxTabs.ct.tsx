import { tabsTesting } from "@sit-onyx/headless/playwright";
import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxTab from "../OnyxTab/OnyxTab.vue";
import OnyxTabs from "./OnyxTabs.vue";
import TestWrapperCt from "./TestWrapper.ct.vue";

for (const type of ["default", "stretched"] as const) {
  test.describe(`Screenshot tests (${type})`, () => {
    executeMatrixScreenshotTest({
      name: `Tabs (${type})`,
      columns: DENSITIES,
      rows: ["default", "hover", "active", "focus-visible"],
      // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      disabledAccessibilityRules: ["color-contrast"],
      component: (column) => {
        return (
          <OnyxTabs
            label="Example tabs"
            modelValue="tab-1"
            density={column}
            stretched={type === "stretched"}
            style={{ width: type === "stretched" ? "40rem" : undefined }}
          >
            <OnyxTab label="Tab 1" value="tab-1">
              Panel content 1...
            </OnyxTab>
            <OnyxTab label="Tab 2" value="tab-2">
              Panel content 2...
            </OnyxTab>
            <OnyxTab label="Tab 3 (disabled)" value="tab-3" disabled>
              Panel content 3...
            </OnyxTab>
          </OnyxTabs>
        );
      },
      beforeScreenshot: async (component, page, column, row) => {
        const tab1 = component.getByRole("tab", { name: "Tab 1" });
        if (row === "hover") await tab1.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
        if (row === "active") {
          const box = (await tab1.boundingBox())!;
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
        }
      },
    });
  });
}

test.describe("Screenshot tests (custom content)", () => {
  executeMatrixScreenshotTest({
    name: "Tabs (custom content)",
    columns: DENSITIES,
    rows: ["icon", "badge", "icon-badge"],
    component: (column, row) => {
      return (
        <OnyxTabs label="Example tabs" modelValue="tab-1" density={column}>
          <OnyxTab value="tab-1">
            <span>Panel content 1...</span>

            <template v-slot:tab>
              {row.includes("icon") && <OnyxIcon icon={mockPlaywrightIcon} />}
              <span>Tab 1</span>
              {row.includes("badge") && <OnyxBadge color="warning" dot />}
            </template>
          </OnyxTab>

          <OnyxTab value="tab-2">
            <span>Panel content 2...</span>

            <template v-slot:tab>
              {row.includes("icon") && <OnyxIcon icon={mockPlaywrightIcon} />}
              <span>Tab 2</span>
              {row.includes("badge") && <OnyxBadge color="warning" dot />}
            </template>
          </OnyxTab>
        </OnyxTabs>
      );
    },
  });
});

test("should pass accessibility tests", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  const component = await mount(<TestWrapperCt />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder()
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    .disableRules(["color-contrast"])
    .analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  await tabsTesting({
    page,
    tablist: component.getByRole("tablist"),
  });
});
