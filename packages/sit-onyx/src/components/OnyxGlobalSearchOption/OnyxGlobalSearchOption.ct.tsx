import { iconMoreVerticalSmall, iconPlaceholder } from "@sit-onyx/icons";
import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxGlobalSearchOption from "./OnyxGlobalSearchOption.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Global search option",
    columns: DENSITIES,
    rows: ["default", "hover", "skeleton"],
    component: (column, row) => (
      <OnyxGlobalSearchOption
        style={{ width: "12rem" }}
        label="Label"
        value="value"
        icon={iconPlaceholder}
        density={column}
        skeleton={row === "skeleton"}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });
      },
    },
  });
});

test.describe("Screenshot tests (custom content)", () => {
  executeMatrixScreenshotTest({
    name: "Global search option (custom content)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxGlobalSearchOption
        style={{ width: "16rem" }}
        label="Label"
        value="value"
        density={column}
      >
        Custom label
        <template v-slot:trailing>
          <OnyxSystemButton label="Actions" icon={iconMoreVerticalSmall} />
        </template>
      </OnyxGlobalSearchOption>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });
      },
    },
  });
});

test.describe("Screenshot tests (other)", () => {
  executeMatrixScreenshotTest({
    name: "Global search option (other)",
    columns: ["default"],
    rows: ["truncation"],
    component: () => (
      <OnyxGlobalSearchOption
        style={{ width: "8rem" }}
        label="Example option label"
        value="value"
        icon={iconPlaceholder}
      />
    ),
  });
});
