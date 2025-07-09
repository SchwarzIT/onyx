import { test } from "../../../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots.js";
import SortAction from "./SortAction.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    rows: ["none", "asc", "desc"],
    columns: ["default"],
    name: "Sort Action",
    component: (_, row) => <SortAction columnLabel="Column-Label" sortDirection={row} />,
  });
});
