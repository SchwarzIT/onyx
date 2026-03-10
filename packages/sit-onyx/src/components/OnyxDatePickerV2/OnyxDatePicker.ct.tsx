import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxDatePicker from "./OnyxDatePicker.vue";

test.describe("Screenshot tests", () => {
  const date = new Date(2024, 9, 23);
  const rangeDate = { start: date, end: new Date(2024, 9, 27) };
  const multipleDates = [date, new Date(2024, 9, 13), new Date(2024, 9, 27)];

  for (const type of ["single", "multiple", "range"] as const) {
    for (const state of ["default", "with value"] as const) {
      executeMatrixScreenshotTest({
        name: `DatePicker (${type}, ${state})`,
        columns: DENSITIES,
        rows: ["default", "open"],
        component: (column, row) => {
          return (
            <OnyxDatePicker
              label="Test label"
              density={column}
              modelValue={
                state === "with value"
                  ? type === "range"
                    ? rangeDate
                    : type === "multiple"
                      ? multipleDates
                      : date
                  : undefined
              }
              style={{
                width: "18rem",
                marginBottom: row === "open" ? "24rem" : "0",
              }}
              selectionMode={type}
              open={row === "open"}
            />
          );
        },
      });
    }
  }
});

test("should show min errors", async ({ mount }) => {
  // ARRANGE

  const component = await mount(
    <OnyxDatePicker
      label="Label"
      min={new Date(2024, 11, 10)}
      modelValue={new Date(2024, 11, 5)}
    />,
  );

  await expect(component).toBeVisible();

  // error is only shown after interaction so we need to interact first to see the error
  const input = component.getByRole("textbox", { name: "Label" });
  await input.click();
  await input.click();

  await expect(component).toContainText("Too low");
  await expect(component).toContainText("Input value must be greater than or equal to 12/10/2024");
});

test("should show max errors", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxDatePicker
      label="Label"
      max={new Date(2024, 11, 6)}
      modelValue={new Date(2024, 11, 20).toISOString()}
    />,
  );

  await expect(component).toBeVisible();

  // error is only shown after interaction so we need to interact first to see the error
  const input = component.getByLabel("Label");
  await input.click();
  await input.blur();

  await expect(component).toContainText("Too high");
  await expect(component).toContainText("Input value must be less than or equal to 12/06/2024");
});
