import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxDatePicker from "./OnyxDatePicker.vue";
import TestCaseCt from "./TestCase.ct.vue";

const MOCK_NOW = new Date(2024, 9, 3);

const getMockDate = (offset: number) => {
  const date = new Date(MOCK_NOW);
  date.setDate(date.getDate() + offset);
  return date;
};

test.beforeEach(async ({ page }) => {
  await page.clock.install();
  await page.clock.setFixedTime(MOCK_NOW);
});

test.describe("Screenshot tests", () => {
  const date = getMockDate(3);
  const rangeDate = { start: date, end: getMockDate(6) };
  const multipleDates = [date, getMockDate(6)];

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
              fitParent={true}
              selectionMode={type}
              open={row === "open"}
            />
          );
        },
      });
    }
  }

  executeMatrixScreenshotTest({
    name: `DatePicker`,
    columns: DENSITIES,
    rows: ["bottomBar", "multiView"],
    component: (column, row) => {
      return (
        <TestCaseCt
          label="Test label"
          density={column}
          modelValue={rangeDate}
          style={{
            width: "18rem",
            marginBottom: row === "multiView" ? "24rem" : "28rem",
            marginRight: row === "multiView" ? "20rem" : "0",
          }}
          selectionMode={"range"}
          fitParent={row !== "multiView"}
          bottomBar={row === "bottomBar"}
          multiView={row === "multiView"}
          open={true}
        />
      );
    },
  });
});
