import { test } from "../../../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
} from "../../../../playwright/screenshots";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxMenuItem from "./OnyxMenuItem.vue";

test.describe("Screenshot tests", () => {
  for (const enabledType of ["enabled", "disabled"] as const) {
    executeMatrixScreenshotTest({
      name: `Menu item (${enabledType})`,
      columns: ["default", "active", "danger", "link"],
      rows: ["default", "hover", "focus-visible"],
      component: (column) => (
        <ul role="menu" style={{ display: "contents" }}>
          <OnyxMenuItem
            active={column === "active"}
            color={column === "danger" ? "danger" : undefined}
            link={column === "link" ? "#test-link" : undefined}
            disabled={enabledType === "disabled"}
          >
            <OnyxIcon icon={mockPlaywrightIcon} />
            Menu item
          </OnyxMenuItem>
        </ul>
      ),
      hooks: {
        beforeEach: async (component, page, column, row) => {
          if (row === "hover") {
            const box = (await component.boundingBox())!;
            await component.hover({
              position: { x: box.x + box.width / 2, y: box.y + box.height / 2 },
            });
          }
          if (row === "focus-visible") await page.keyboard.press("Tab");
        },
      },
    });
  }
});
