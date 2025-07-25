import { useFocusStateHooks, type MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.js";
import OnyxFABItem from "../OnyxFABItem/OnyxFABItem.vue";
import OnyxFAB from "./OnyxFAB.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "FAB",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible", "skeleton"],
    component: (column, row) => (
      <OnyxFAB
        label="Label"
        hideLabel={true}
        icon={mockPlaywrightIcon}
        density={column}
        skeleton={row === "skeleton"}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await page.setViewportSize({ height: 128, width: 256 });
        await component.evaluate((element) => {
          element.style.height = `${document.documentElement.scrollHeight}px`;
          element.style.width = `${document.documentElement.scrollWidth}px`;
        });

        const button = component.getByRole("button", { name: "Label" });
        await useFocusStateHooks({ component: button, page, state: row });
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

    const button = component.getByRole("button", { name: "Label" });
    await useFocusStateHooks({ component: button, page, state: row });

    if (row === "focus-visible") {
      // eslint-disable-next-line playwright/no-standalone-expect -- test block is added by "executeMatrixScreenshotTest"
      await expect(component.getByRole("menuitem", { name: "Option 1" })).toBeVisible();
    }
  },
};

test.describe("Screenshot tests (options)", () => {
  executeMatrixScreenshotTest({
    name: "FAB (options)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxFAB label="Label" density={column}>
        <OnyxFABItem label="Option 3" icon={mockPlaywrightIcon} />
        <OnyxFABItem label="Option 2" icon={mockPlaywrightIcon} />
        <OnyxFABItem label="Option 1" icon={mockPlaywrightIcon} />
      </OnyxFAB>
    ),
    hooks: optionsHooks,
  });
});

test.describe("Screenshot tests (options, left aligned)", () => {
  executeMatrixScreenshotTest({
    name: "FAB (options, left aligned)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxFAB label="Label" density={column} alignment="left">
        <OnyxFABItem label="Option 3" icon={mockPlaywrightIcon} />
        <OnyxFABItem label="Option 2" icon={mockPlaywrightIcon} />
        <OnyxFABItem label="Option 1" icon={mockPlaywrightIcon} />
      </OnyxFAB>
    ),
    hooks: optionsHooks,
  });
});

test.describe("Screenshot tests (options, icons only)", () => {
  executeMatrixScreenshotTest({
    name: "FAB (options, icons only)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxFAB label="Label" density={column} alignment="left">
        <OnyxFABItem label="Option 3" hideLabel icon={mockPlaywrightIcon} />
        <OnyxFABItem label="Option 2" hideLabel icon={mockPlaywrightIcon} />
        <OnyxFABItem label="Option 1" hideLabel icon={mockPlaywrightIcon} />
      </OnyxFAB>
    ),
    hooks: optionsHooks,
  });
});
