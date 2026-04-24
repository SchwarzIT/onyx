import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.js";
import { ONYX_COLORS } from "../../types/index.js";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxNavButton from "../OnyxNavButton/OnyxNavButton.vue";
import OnyxNotificationDot from "./OnyxNotificationDot.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Notification dot",
    columns: ["default", "icon-button", "nav-button", "hidden"],
    rows: ONYX_COLORS,
    component: (column, row) => (
      <OnyxNotificationDot color={row} hidden={column === "hidden"}>
        {column === "icon-button" ? (
          <OnyxIconButton icon={mockPlaywrightIcon} label="Label" color="neutral" />
        ) : column === "nav-button" ? (
          <OnyxNavButton label="Label" icon={mockPlaywrightIcon} hideLabel />
        ) : (
          <div
            style={{
              height: "1.5rem",
              width: "1.5rem",
              border: "1px solid var(--onyx-color-component-border-neutral)",
            }}
          ></div>
        )}
      </OnyxNotificationDot>
    ),
    hooks: {
      beforeEach: async (component, page, column) => {
        if (column === "icon-button" || column === "nav-button") {
          await component.getByRole("button", { name: "Label" }).hover();
        }
      },
    },
  });
});
