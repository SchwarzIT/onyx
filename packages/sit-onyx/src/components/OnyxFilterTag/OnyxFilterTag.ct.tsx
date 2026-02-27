import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxFilterTag from "./OnyxFilterTag.vue";

test.describe("Screenshot tests", () => {
  const state = ["default", "hover", "focus-visible", "active"];
  executeMatrixScreenshotTest({
    name: "Filter tag",
    columns: DENSITIES,
    rows: state,
    component: (column, row) => (
      <OnyxFilterTag
        label="Tag"
        density={column}
        active={row === "active"}
        style={{ margin: "2rem 3rem" }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const tag = component.getByRole("button", { name: "Tag" });
        await useFocusStateHooks({ page, component: tag, state: row });
        if (row !== "default") {
          await expect(component.getByRole("tooltip")).toBeVisible();
        }
      },
    },
  });
});
