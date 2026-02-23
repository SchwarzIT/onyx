import { iconPlaceholder } from "@sit-onyx/icons";
import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import enUS from "../../i18n/locales/en-US.json" with { type: "json" };
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import { BUTTON_COLORS, BUTTON_MODES } from "../OnyxButton/types.js";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSplitButton from "./OnyxSplitButton.vue";
import TestCase from "./TestCase.vue";

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
          const button = component.getByRole("button", { name: "Option 1" });
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

test("Split button interactions", async ({ page, mount }) => {
  // ARRANGE
  const onClicked = createEmitSpy<typeof TestCase, "onClicked">();
  await mount(TestCase, { on: { onClicked } });

  // ACT
  const mainOption = page.getByRole("button", { name: "Option 1" });
  await mainOption.click();

  // ASSERT
  expectEmit(onClicked, 1, ["Option 1"]);

  // ACT
  const toggleButton = page.getByRole("button", { name: enUS.flyoutMenu.toggleActions.click });
  const popover = page.getByRole("dialog", { name: enUS.flyoutMenu.moreActions });
  await toggleButton.click();

  // ASSERT
  await expect(popover).toBeVisible();

  // ACT
  const secondOption = page.getByRole("menuitem", { name: "Option 2" });
  await secondOption.click();

  // ASSERT
  expectEmit(onClicked, 2, ["Option 2"]);
  await expect(popover).toBeHidden();
});
