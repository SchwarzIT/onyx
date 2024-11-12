import { test } from "../../../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots";
import SortAction from "./SortAction.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    rows: ["none", "asc", "desc"],
    columns: ["default"],
    name: "Sort Action",
    component: (_, row) => <SortAction columnLabel="Column-Label" sortDirection={row} />,
  });
});
