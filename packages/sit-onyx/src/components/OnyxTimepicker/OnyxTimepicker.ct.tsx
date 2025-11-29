import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxTimepicker from "./OnyxTimepicker.vue";
test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: `TimePicker`,
    columns: ["HH:MM:SS", "HH:MM", "HH", "MM:SS"],
    rows: ["closed", "open"],
    component: (column) => {
      return (
        <OnyxTimepicker
          label="Test label"
          segments={{
            hour: column.includes("HH"),
            minute: column.includes("MM"),
            second: column.includes("SS"),
          }}
          style={{ width: "16rem", marginBottom: "6rem" }}
        />
      );
    },
    hooks: {
      beforeEach: async (component, _page, _column, row) => {
        const input = component.getByLabel("Test label");
        if (row === "open") await input.focus();
      },
    },
  });

  for (const state of ["default", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `TimePicker (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus", "inputFocus", "skeleton", "disabled", "loading"],
      component: (column, row) => {
        return (
          <OnyxTimepicker
            label="Test label"
            density={column}
            disabled={row === "disabled"}
            loading={row === "loading"}
            skeleton={row === "skeleton"}
            modelValue={state === "with value" ? 72420 : undefined}
            style={{ width: "16rem", marginBottom: "6rem" }}
          />
        );
      },
      hooks: {
        beforeEach: async (component, _page, _column, row) => {
          const input = component.getByLabel("Test label");
          if (row === "hover") await input.hover();
          if (row === "focus") await input.focus();
          if (row === "inputFocus") {
            await input.focus();
            await input.focus();
          }
        },
      },
    });
  }
});

test.describe("Keyboard tests", () => {
  test("TimePicker keyboard navigation", async ({ mount }) => {
    const component = await mount(<OnyxTimepicker label="Test label" />);
    const input = component.getByRole("textbox", { name: "Test label" });
    const hourInput = component.getByRole("spinbutton", { name: "Hour" });
    const minuteInput = component.getByRole("spinbutton", { name: "Minute" });

    await input.focus();

    await expect(hourInput).toBeVisible();
    await expect(minuteInput).toBeVisible();
    await expect(hourInput).toBeFocused();

    await component.press("ArrowRight");
    await expect(minuteInput).toBeFocused();
    await component.press("ArrowLeft");

    await expect(hourInput).toBeFocused();

    await component.press("ArrowUp");

    await expect(hourInput).toHaveValue("1");

    await component.press("ArrowDown");
    await expect(hourInput).toHaveValue("0");
    await component.press("ArrowDown");
    await expect(hourInput).toHaveValue("23");

    await component.press("ArrowRight");
    await component.press("ArrowRight");
    await expect(hourInput).toBeHidden();
    await expect(minuteInput).toBeHidden();
  });
});
