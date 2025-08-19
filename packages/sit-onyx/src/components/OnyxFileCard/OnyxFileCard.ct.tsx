import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.js";
import { ONYX_COLORS } from "../../types/colors.js";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxFileCard from "./OnyxFileCard.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "File card",
    columns: DENSITIES,
    rows: ["default", "hover", "actions", "truncated", "skeleton"],
    component: (column, row) => (
      <OnyxFileCard
        filename="filename.pdf"
        type="application/pdf"
        size="42MiB"
        density={column}
        style={{ width: row === "truncated" ? "7rem" : undefined }}
        skeleton={row === "skeleton"}
      >
        {row === "actions" && (
          <template v-slot:actions>
            <OnyxIconButton label="Action 1" icon={mockPlaywrightIcon} color="neutral" />
            <OnyxIconButton label="Action 2" icon={mockPlaywrightIcon} color="neutral" />
          </template>
        )}
      </OnyxFileCard>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });
      },
    },
  });
});

test.describe("Screenshot tests (link)", () => {
  executeMatrixScreenshotTest({
    name: "File card (link)",
    columns: ["default", "truncated"],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxFileCard
        filename="filename.pdf"
        type="application/pdf"
        size="42MiB"
        style={{ width: column === "truncated" ? "7rem" : undefined }}
        link="#example-link"
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const link = component.getByRole("link", { name: "filename.pdf" });
        await useFocusStateHooks({ component: link, page, state: row });
      },
    },
  });
});

test.describe("Screenshot tests (status)", () => {
  executeMatrixScreenshotTest({
    name: "File card (status)",
    columns: ["default", "custom-icon", "truncated"],
    rows: ONYX_COLORS,
    component: (column, row) => (
      <OnyxFileCard
        filename="filename.pdf"
        type="application/pdf"
        size="42MiB"
        style={{ width: column === "truncated" ? "7rem" : undefined }}
        status={{ color: row, text: "Status message" }}
        icon={column === "custom-icon" ? mockPlaywrightIcon : undefined}
      />
    ),
  });
});

test.describe("Screenshot tests (progress)", () => {
  executeMatrixScreenshotTest({
    name: "File card (progress)",
    columns: ["default", "custom-icon", "truncated"],
    rows: ["default"],
    component: (column) => (
      <OnyxFileCard
        filename="filename.pdf"
        type="application/pdf"
        size="42MiB"
        style={{ width: column === "truncated" ? "7rem" : undefined }}
        status={{ color: "primary", text: "32%", progress: 32 }}
        icon={column === "custom-icon" ? mockPlaywrightIcon : undefined}
      />
    ),
  });
});
