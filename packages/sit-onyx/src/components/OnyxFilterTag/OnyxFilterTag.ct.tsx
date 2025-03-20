import { DENSITIES } from "../../composables/density";
import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxFilterTag from "./OnyxFilterTag.vue";

test.describe("Screenshot tests", () => {
  const state = ["default", "hover", "focus"];
  executeMatrixScreenshotTest({
    name: "Tag",
    columns: DENSITIES,
    rows: state,
    component: (column) => <OnyxFilterTag label="Tag" density={column} onClick={() => {}} />,
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const tag = component.getByRole("button", { name: "Tag" });
        if (row === "hover") await tag.hover();
        if (row === "focus") await tag.focus();
      },
    },
  });
});
