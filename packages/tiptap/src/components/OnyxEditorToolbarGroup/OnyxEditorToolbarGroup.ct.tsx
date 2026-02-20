import { iconPlaceholder } from "@sit-onyx/icons";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxEditorToolbarAction from "../OnyxEditorToolbarAction/OnyxEditorToolbarAction.vue";
import OnyxEditorToolbarGroup from "./OnyxEditorToolbarGroup.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Editor toolbar group",
    columns: ["default"],
    rows: ["1", "2", "3"],
    component: (column, row) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--onyx-density-xs)",
        }}
      >
        {Array.from({ length: Number.parseInt(row) }, () => (
          <OnyxEditorToolbarGroup>
            <OnyxEditorToolbarAction label="Action" icon={iconPlaceholder} />
            <OnyxEditorToolbarAction label="Action" icon={iconPlaceholder} />
          </OnyxEditorToolbarGroup>
        ))}
      </div>
    ),
  });
});

test("should hide if group is empty", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<OnyxEditorToolbarGroup />);

  // ASSERT
  await expect(component).toBeHidden();
  await expect(component).toHaveCSS("display", "none");
});
