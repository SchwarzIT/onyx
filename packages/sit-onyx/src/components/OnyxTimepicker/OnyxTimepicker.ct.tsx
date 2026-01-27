import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxTimepicker from "./OnyxTimepicker.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: `TimePicker`,
    columns: ["HH:MM:SS", "HH:MM"],
    rows: ["closed"],
    component: (column) => {
      return (
        <OnyxTimepicker
          label="Test label"
          showSeconds={column === "HH:MM:SS"}
          style={{ width: "16rem", marginBottom: "6rem" }}
        />
      );
    },
  });

  for (const state of ["default", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `TimePicker (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus", "skeleton", "disabled", "loading"],
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
          if (row === "hover") await input.hover();
          if (row === "focus") await input.focus();
        },
      },
    });
  }
  for (const state of ["default", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `TimePicker Select(${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus", "open", "skeleton", "disabled", "loading"],
      component: (column, row) => {
        return (
          <OnyxTimepicker
            type="select"
            min="8:00"
            max="10:00"
            label="Test label"
            density={column}
            disabled={row === "disabled"}
            loading={row === "loading"}
            skeleton={row === "skeleton"}
            modelValue={state === "with value" ? "09:30" : undefined}
            style={{ width: "16rem", marginBottom: row === "open" ? "16rem" : "0rem" }}
          />
        );
      },
      hooks: {
        beforeEach: async (component, _page, _column, row) => {
          const input = component.getByRole("combobox", { name: "Test label" });
          if (row === "hover") await input.hover();
          if (row === "focus") await input.focus();
          if (row === "open") {
            await input.click();
          }
        },
      },
    });
  }
});

test.describe("Keyboard tests", () => {
  // TODO: Skipped because the 'default' type currently uses the native input.
  // Re-enable this test once the custom flyout is implemented for range selection.
  test.skip("TimePicker keyboard navigation", async ({ mount }) => {
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

test.describe("Time tests", () => {
  test("should truncate milliseconds and timezones from modelValue, min, and max (HH:MM)", async ({
    mount,
  }) => {
    const component = await mount(
      <OnyxTimepicker
        label="Test label"
        modelValue="08:11:21.30Z"
        min="07:30:30.30Z"
        max="17:30:30.11111"
      />,
    );
    const input = component.getByRole("textbox", { name: "Test label" });

    await expect(input).toHaveAttribute("min", "07:30");
    await expect(input).toHaveAttribute("max", "17:30");
    await expect(input).toHaveValue("08:11");
  });

  test("should truncate milliseconds and timezones from modelValue, min, and max (HH:MM:SS)", async ({
    mount,
  }) => {
    const component = await mount(
      <OnyxTimepicker
        label="Test label"
        modelValue="08:11:21.30Z"
        min="07:30:30.30Z"
        max="17:30:30.11111"
        showSeconds
      />,
    );
    const input = component.getByRole("textbox", { name: "Test label" });

    await expect(input).toHaveAttribute("min", "07:30:30");
    await expect(input).toHaveAttribute("max", "17:30:30");
    await expect(input).toHaveValue("08:11:21");
  });
});
