import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxTimepicker from "./OnyxTimepicker.vue";
test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: `TimePicker`,
    columns: ["HH:MM:SS", "HH:MM"],
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
        const iconButton = component.getByRole("button", { name: "Open Timepicker" });
        if (row === "open") await iconButton.click();
      },
    },
  });

  for (const state of ["default", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `TimePicker (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus", "open", "skeleton", "disabled", "loading"],
      component: (column, row) => {
        return (
          <OnyxTimepicker
            label="Test label"
            density={column}
            disabled={row === "disabled"}
            loading={row === "loading"}
            skeleton={row === "skeleton"}
            modelValue={state === "with value" ? "12:11" : undefined}
            style={{ width: "16rem", marginBottom: "6rem" }}
          />
        );
      },
      hooks: {
        beforeEach: async (component, _page, _column, row) => {
          const input = component.getByLabel("Test label");
          const iconButton = component.getByRole("button", { name: "Open Timepicker" });
          if (row === "hover") await input.hover();
          if (row === "focus") await input.focus();
          if (row === "open") {
            await iconButton.click();
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
    const iconButton = component.getByRole("button", { name: "Open Timepicker" });

    const hourInput = component.getByRole("spinbutton", { name: "Hour" });
    const minuteInput = component.getByRole("spinbutton", { name: "Minute" });

    await iconButton.click();

    await expect(hourInput).toBeVisible();
    await expect(minuteInput).toBeVisible();
    await expect(hourInput).toBeFocused();

    //keyboard navigation
    await component.press("ArrowRight");
    await expect(minuteInput).toBeFocused();
    await component.press("ArrowLeft");

    await expect(hourInput).toBeFocused();

    await component.press("ArrowUp");

    await expect(hourInput).toHaveValue("1");

    await component.press("ArrowDown");
    await expect(hourInput).toHaveValue("0");
    await component.press("ArrowDown");
    await expect(hourInput).toHaveValue("0");

    await component.press("ArrowRight");
    await component.press("ArrowRight");
    await expect(hourInput).toBeHidden();
    await expect(minuteInput).toBeHidden();

    //should close if input is clicked
    await iconButton.click();
    await expect(hourInput).toBeVisible();
    await expect(minuteInput).toBeVisible();
    await expect(hourInput).toBeFocused();

    await input.click();
    await expect(hourInput).toBeHidden();
    await expect(minuteInput).toBeHidden();
  });
});
