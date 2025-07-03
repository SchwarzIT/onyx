import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import OnyxFabItem from "../OnyxFabItem/OnyxFabItem.vue";
import OnyxFab from "./OnyxFab.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Fab",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxFab label="Label" hideLabel={true} icon={mockPlaywrightIcon} density={column} />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await page.setViewportSize({ height: 128, width: 256 });
        await component.evaluate((element) => {
          element.style.height = `${document.documentElement.scrollHeight}px`;
          element.style.width = `${document.documentElement.scrollWidth}px`;
        });

        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

const optionsHooks: MatrixScreenshotTestOptions["hooks"] = {
  beforeEach: async (component, page, column, row) => {
    await page.setViewportSize({ height: 300, width: 256 });
    await component.evaluate((element) => {
      element.style.height = `${document.documentElement.scrollHeight}px`;
      element.style.width = `${document.documentElement.scrollWidth}px`;
    });

    if (row === "hover") {
      const button = page.getByRole("button", { name: "Label" });
      await button.hover();
    }
    if (row === "focus-visible") {
      await page.keyboard.press("Tab");
      // eslint-disable-next-line playwright/no-standalone-expect -- test block is added by "executeMatrixScreenshotTest"
      await expect(component.getByRole("menuitem", { name: "Option 1" })).toBeVisible();
    }
  },
};

test.describe("Screenshot tests (options)", () => {
  executeMatrixScreenshotTest({
    name: "Fab (options)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxFab label="Label" icon={mockPlaywrightIcon} density={column}>
        <OnyxFabItem label="Option 3" icon={mockPlaywrightIcon} />
        <OnyxFabItem label="Option 2" icon={mockPlaywrightIcon} />
        <OnyxFabItem label="Option 1" icon={mockPlaywrightIcon} />
      </OnyxFab>
    ),
    hooks: optionsHooks,
  });
});

test.describe("Screenshot tests (options, left aligned)", () => {
  executeMatrixScreenshotTest({
    name: "Fab (options, left aligned)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxFab label="Label" icon={mockPlaywrightIcon} density={column} alignment="left">
        <OnyxFabItem label="Option 3" icon={mockPlaywrightIcon} />
        <OnyxFabItem label="Option 2" icon={mockPlaywrightIcon} />
        <OnyxFabItem label="Option 1" icon={mockPlaywrightIcon} />
      </OnyxFab>
    ),
    hooks: optionsHooks,
  });
});

test.describe("Screenshot tests (options, icons only)", () => {
  executeMatrixScreenshotTest({
    name: "Fab (options, icons only)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxFab label="Label" icon={mockPlaywrightIcon} density={column} alignment="left">
        <OnyxFabItem label="Option 3" hideLabel icon={mockPlaywrightIcon} />
        <OnyxFabItem label="Option 2" hideLabel icon={mockPlaywrightIcon} />
        <OnyxFabItem label="Option 1" hideLabel icon={mockPlaywrightIcon} />
      </OnyxFab>
    ),
    hooks: optionsHooks,
  });
});
