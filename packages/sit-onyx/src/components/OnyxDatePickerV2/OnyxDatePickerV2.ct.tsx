import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxDatePicker from "./OnyxDatePickerV2.vue";

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

const date = getMockDate(3);
const rangeDate = { start: date, end: getMockDate(6) };
const multipleDates = [date, getMockDate(6)];

test.describe("Screenshot tests", () => {
  for (const type of ["single", "multiple", "range"] as const) {
    executeMatrixScreenshotTest({
      name: `DatePicker (${type})`,
      columns: DENSITIES,
      rows: ["default", "open"],
      component: (column, row) => {
        return (
          <OnyxDatePicker
            label="Test label"
            density={column}
            modelValue={type === "range" ? rangeDate : type === "multiple" ? multipleDates : date}
            style={{
              width: "18rem",
              marginBottom: row === "open" ? "26rem" : "0",
            }}
            fitParent={true}
            selectionMode={type}
            open={row === "open"}
          />
        );
      },
    });
  }
});

test.describe("Screenshot tests (multiView)", () => {
  executeMatrixScreenshotTest({
    name: "DatePicker (multiView)",
    columns: DENSITIES,
    rows: ["default"],
    component: (column) => {
      return (
        <OnyxDatePicker
          label="Test label"
          density={column}
          modelValue={rangeDate}
          style={{
            width: "18rem",
            marginBottom: "24rem",
            marginRight: "20rem",
          }}
          selectionMode="range"
          open={true}
          multiView
        />
      );
    },
  });
});

test("asd", () => {
  //
});
