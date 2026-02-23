import { iconPlaceholder } from "@sit-onyx/icons";
import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import { BUTTON_COLORS, BUTTON_MODES } from "../OnyxButton/types.js";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSplitButton from "./OnyxSplitButton.vue";

const OPTIONS = () => [
  <OnyxMenuItem label="Option 2" icon={iconPlaceholder} />,
  <OnyxMenuItem label="Option 3" icon={iconPlaceholder} />,
];

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Split button",
    columns: DENSITIES,
    rows: BUTTON_COLORS,
    component: (column, row) => (
      <OnyxSplitButton label="Option 1" density={column} color={row}>
        {{ options: OPTIONS }}
      </OnyxSplitButton>
    ),
  });

  executeMatrixScreenshotTest({
    name: "Split button (modes)",
    columns: DENSITIES,
    rows: BUTTON_MODES,
    component: (column, row) => (
      <OnyxSplitButton label="Option 1" density={column} mode={row}>
        {{ options: OPTIONS }}
      </OnyxSplitButton>
    ),
  });

  const states = [
    "disabled",
    "loading",
    "skeleton",
    "hover",
    "focus",
    "hover-flyout",
    "focus-flyout",
  ];

  states.forEach((state) => {
    executeMatrixScreenshotTest({
      name: `Split button (${state})`,
      columns: DENSITIES,
      rows: BUTTON_COLORS,
      component: (column, row) => (
        <OnyxSplitButton
          label="Option 1"
          density={column}
          color={row}
          disabled={state === "disabled"}
          loading={state === "loading"}
          skeleton={state === "skeleton"}
          style={{ margin: "0 2rem 2rem 0" }}
        >
          {{ options: OPTIONS }}
        </OnyxSplitButton>
      ),
      hooks: {
        beforeEach: async (component) => {
          const button = component.getByRole("button", { name: "Option" });
          const flyoutButton = component.getByRole("button", {
            name: "Hover/Focus to toggle action",
          });

          if (state === "hover") {
            await button.hover();
          }

          if (state === "focus") {
            await button.focus();
          }
          if (state === "hover-flyout") {
            await flyoutButton.hover();
          }

          if (state === "focus-flyout") {
            await flyoutButton.focus();
          }
        },
      },
    });
  });
});
