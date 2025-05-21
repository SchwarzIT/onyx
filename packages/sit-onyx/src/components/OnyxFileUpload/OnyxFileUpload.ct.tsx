import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density";
import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxFileUpload from "./OnyxFileUpload.vue";

const hooks: MatrixScreenshotTestOptions["hooks"] = {
  beforeEach: async (component, page, column, row) => {
    if (row === "hover") await component.hover();
    if (row === "focus-visible") await page.keyboard.press("Tab");
    if (row === "dragging") {
      await component.locator("label").evaluate((element) => {
        element.dispatchEvent(new DragEvent("dragenter"));
      });
    }
  },
};

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "File upload",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible", "dragging"],
    component: (column) => <OnyxFileUpload density={column} />,
    hooks,
  });
});

test.describe("Screenshot tests (disabled)", () => {
  executeMatrixScreenshotTest({
    name: "File upload (disabled)",
    columns: ["disabled"],
    rows: ["default", "hover", "focus-visible", "dragging"],
    component: () => <OnyxFileUpload disabled />,
    hooks,
  });
});

test.describe("Screenshot tests (max. file sizes)", () => {
  executeMatrixScreenshotTest({
    name: "File upload (max. file sizes)",
    columns: ["types", "size", "total", "count", "size-total", "types-size-total-count"],
    rows: ["default", "hover", "focus-visible", "dragging"],
    component: (column) => (
      <OnyxFileUpload
        accept={column.includes("types") ? [".pdf", ".jpg", ".png"] : undefined}
        maxSize={column.includes("size") ? "4Mi" : undefined}
        maxTotalSize={column.includes("total") ? "50Mi" : undefined}
        maxCount={column.includes("count") ? 8 : undefined}
        multiple
      />
    ),
    hooks,
  });
});
