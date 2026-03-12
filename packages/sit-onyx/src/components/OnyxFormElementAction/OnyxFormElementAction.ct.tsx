import { iconPlaceholder } from "@sit-onyx/icons";
import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxFormElementAction from "./OnyxFormElementAction.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Form element action",
    columns: ["default", "disabled"],
    rows: ["default", "hover", "active"],
    component: (column, row) => (
      <OnyxFormElementAction
        label="Test label"
        icon={iconPlaceholder}
        disabled={column === "disabled"}
        style={{ marginBottom: row !== "default" ? "2rem" : undefined }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });

        if (row !== "default") {
          await expect(component.getByRole("tooltip")).toBeVisible();
        }
      },
    },
  });
});

test.describe("Screenshot tests (toggle)", () => {
  executeMatrixScreenshotTest({
    name: "Form element action (toggle)",
    columns: ["default", "disabled"],
    rows: ["default", "hover", "active"],
    component: (column, row) => (
      <OnyxFormElementAction
        label="Test label"
        icon={iconPlaceholder}
        disabled={column === "disabled"}
        type="toggle"
        style={{ marginBottom: row !== "default" ? "2rem" : undefined }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });

        if (row !== "default") {
          await expect(component.getByRole("tooltip")).toBeVisible();
        }
      },
    },
  });
});

test.describe("Screenshot tests (toggle, pressed)", () => {
  executeMatrixScreenshotTest({
    name: "Form element action (toggle, pressed)",
    columns: ["pressed", "disabled"],
    rows: ["default", "hover", "active"],
    component: (column, row) => (
      <OnyxFormElementAction
        label="Test label"
        icon={iconPlaceholder}
        disabled={column === "disabled"}
        type="toggle"
        pressed
        style={{ marginBottom: row !== "default" ? "2rem" : undefined }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });

        if (row !== "default") {
          await expect(component.getByRole("tooltip")).toBeVisible();
        }
      },
    },
  });
});
