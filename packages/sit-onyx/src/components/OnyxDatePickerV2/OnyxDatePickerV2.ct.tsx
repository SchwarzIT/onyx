import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxDatePickerV2 from "./OnyxDatePickerV2.vue";

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
          <OnyxDatePickerV2
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

test.describe("OnyxDatePickerV2 Interactions", () => {
  test("should select single date", async ({ mount }) => {
    // ARRANGE
    let emittedValue;
    const component = await mount(
      <OnyxDatePickerV2
        label="Test label"
        selectionMode="single"
        open={true}
        onUpdate:modelValue={(val) => (emittedValue = val)}
        style={{
          width: "18rem",
        }}
      />,
    );

    // ACT
    const targetDay = component.getByRole("button", { name: "Tuesday, October 15," });
    await targetDay.click();

    // ASSERT
    expect(emittedValue).toEqual(new Date(2024, 9, 15));
  });

  test("should select multiple dates", async ({ mount }) => {
    // ARRANGE
    let emittedValue;
    const component = await mount(
      <OnyxDatePickerV2
        label="Test label"
        selectionMode="multiple"
        open={true}
        onUpdate:modelValue={(val) => (emittedValue = val)}
        style={{
          width: "18rem",
        }}
      />,
    );

    // ACT
    const targetDay = component.getByRole("button", { name: "Tuesday, October 15," });
    const targetDay2 = component.getByRole("button", { name: "Wednesday, October 16," });

    await targetDay.click();
    await targetDay2.click();

    expect(emittedValue).toEqual([new Date(2024, 9, 15), new Date(2024, 9, 16)]);
  });

  test("should select date range", async ({ mount }) => {
    // ARRANGE
    let emittedValue;
    const component = await mount(
      <OnyxDatePickerV2
        label="Test label"
        selectionMode="range"
        open={true}
        onUpdate:modelValue={(val) => (emittedValue = val)}
        style={{
          width: "18rem",
        }}
      />,
    );

    const startDate = component.getByRole("button", { name: "Saturday, October 5," });
    await startDate.click();

    expect(emittedValue).toEqual({ start: new Date(2024, 9, 5), end: undefined });

    const endDate = component.getByRole("button", { name: "Tuesday, October 15," });
    await endDate.click();

    // ASSERT
    expect(emittedValue).toEqual({
      start: new Date(2024, 9, 5),
      end: new Date(2024, 9, 15),
    });
  });

  test("should not allow selection of disabled days", async ({ mount }) => {
    // ARRANGE

    let emittedValue = null;
    const component = await mount(
      <OnyxDatePickerV2
        label="Test label"
        selectionMode="single"
        open={true}
        disabledDays={(date) => date.getDay() === 0 || date.getDay() === 6}
        onUpdate:modelValue={(val) => (emittedValue = val)}
        style={{
          width: "18rem",
        }}
      />,
    );

    // ACT
    const disabledDay = component.getByRole("button", { name: "Saturday, October 5," });

    await expect(disabledDay).toBeDisabled();

    await disabledDay.click();

    // ASSERT
    expect(emittedValue).toBeNull();

    const validDay = component.getByRole("button", { name: "Tuesday, October 15," });
    await expect(validDay).toBeEnabled();
    await validDay.click();

    // ASSERT
    expect(emittedValue).toEqual(new Date(2024, 9, 15));
  });
});
