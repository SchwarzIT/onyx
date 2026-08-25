import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
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
  test.use({ timezoneId: "UTC" });

  test("should select single date", async ({ mount }) => {
    // ARRANGE
    const onUpdateModelValue = createEmitSpy<typeof OnyxDatePickerV2, "onUpdate:modelValue">();
    const component = await mount(
      <OnyxDatePickerV2
        label="Test label"
        selectionMode="single"
        open={true}
        onUpdate:modelValue={onUpdateModelValue}
        style={{
          width: "18rem",
        }}
      />,
    );

    await test.step("select date on click", async () => {
      // ACT
      const targetDay = component.getByRole("button", { name: "Tuesday, October 15," });
      await targetDay.click();

      // ASSERT
      await expectEmit(onUpdateModelValue, 1, [new Date(2024, 9, 15)]);
    });

    await test.step("select new date in next month", async () => {
      // ACT
      await component.getByRole("button", { name: "Next month" }).click();
      await component.getByRole("button", { name: "Friday, November 15," }).click();

      // ASSERT
      await expectEmit(onUpdateModelValue, 2, [new Date(2024, 10, 15)]);
    });

    await test.step("select new date from first week of the following month", async () => {
      // ACT
      await component.getByRole("button", { name: "Sunday, December 1," }).click();

      // ASSERT
      await expectEmit(onUpdateModelValue, 3, [new Date(2024, 11, 1)]);
    });

    await test.step("select new date from year and month selection", async () => {
      // ACT
      await component.getByRole("button", { name: "December 2024" }).click();
      await component.getByRole("button", { name: "2012" }).click();
      await component.getByRole("button", { name: "Dec", exact: true }).click();
      await component.getByRole("button", { name: "Friday, December 21," }).click();

      // ASSERT
      await expectEmit(onUpdateModelValue, 4, [new Date(2012, 11, 21)]);
    });

    await test.step("select new date using the 'today' button", async () => {
      // ACT
      await component.getByRole("button", { name: "Today" }).click();
      await component.getByRole("button", { name: "Thursday, October 31," }).click();

      // ASSERT
      await expectEmit(onUpdateModelValue, 5, [new Date(2024, 9, 31)]);
    });
  });

  test("should select multiple dates", async ({ mount }) => {
    // ARRANGE
    const onUpdateModelValue = createEmitSpy<typeof OnyxDatePickerV2, "onUpdate:modelValue">();
    const component = await mount(
      <OnyxDatePickerV2
        label="Test label"
        selectionMode="multiple"
        open={true}
        onUpdate:modelValue={onUpdateModelValue}
        style={{
          width: "18rem",
        }}
      />,
    );

    // ACT
    const targetDay = component.getByRole("button", { name: "Tuesday, October 15," });
    const targetDay2 = component.getByRole("button", { name: "Wednesday, October 16," });

    await targetDay.click();
    await expectEmit(onUpdateModelValue, 1, [[new Date(2024, 9, 15)]]);

    await targetDay2.click();
    await expectEmit(onUpdateModelValue, 2, [[new Date(2024, 9, 15), new Date(2024, 9, 16)]]);
  });

  test("should select date range", async ({ mount }) => {
    // ARRANGE
    const onUpdateModelValue = createEmitSpy<typeof OnyxDatePickerV2, "onUpdate:modelValue">();
    const onUpdateViewMonth = createEmitSpy<typeof OnyxDatePickerV2, "onUpdate:viewMonth">();
    const component = await mount(
      <OnyxDatePickerV2
        label="Test label"
        selectionMode="range"
        open={true}
        multiView
        onUpdate:modelValue={onUpdateModelValue}
        onUpdate:viewMonth={onUpdateViewMonth}
        style={{
          width: "18rem",
        }}
      />,
    );

    await test.step("select range in current month", async () => {
      // ACT
      await component.getByRole("button", { name: "Saturday, October 5," }).click();

      // ASSERT
      await expectEmit(onUpdateViewMonth, 1, [MOCK_NOW]);
      await expectEmit(onUpdateModelValue, 1, [{ start: new Date(2024, 9, 5), end: undefined }]);

      // ACT
      await component.getByRole("button", { name: "Tuesday, October 15," }).click();

      // ASSERT
      await expectEmit(onUpdateModelValue, 2, [
        {
          start: new Date(2024, 9, 5),
          end: new Date(2024, 9, 15),
        },
      ]);
    });

    await test.step("select range in current and next month", async () => {
      // ACT
      await component.getByRole("button", { name: "Saturday, October 26," }).click();

      // ASSERT
      await expectEmit(onUpdateModelValue, 3, [{ start: new Date(2024, 9, 26), end: undefined }]);

      // ACT
      await component.getByRole("button", { name: "Wednesday, November 13," }).click();

      // ASSERT
      await expectEmit(onUpdateModelValue, 4, [
        { start: new Date(2024, 9, 26), end: new Date(2024, 10, 13) },
      ]);
    });

    await test.step("select range using next month button", async () => {
      // ACT
      await component.getByRole("button", { name: "Saturday, November 30," }).click();

      // ASSERT
      await expectEmit(onUpdateModelValue, 5, [{ start: new Date(2024, 10, 30), end: undefined }]);

      // ACT
      await component.getByRole("button", { name: "Next month" }).nth(1).click();
      await component.getByRole("button", { name: "Thursday, December 19," }).click();

      // ASSERT
      await expectEmit(onUpdateModelValue, 6, [
        { start: new Date(2024, 10, 30), end: new Date(2024, 11, 19) },
      ]);
      await expectEmit(onUpdateViewMonth, 2, [new Date(2024, 10, 1)]);
    });

    await test.step("should always show neighboring months", async () => {
      // ACT
      await component.getByRole("button", { name: "Next month" }).nth(1).click();

      // ASSERT
      await expect(component.getByRole("button", { name: "December 2024" })).toBeVisible();
      await expect(component.getByRole("button", { name: "January 2025" })).toBeVisible();
      await expectEmit(onUpdateViewMonth, 3, [new Date(2024, 11, 1)]);

      // ACT
      await component.getByRole("button", { name: "Previous month" }).nth(1).click();

      // ASSERT
      await expect(component.getByRole("button", { name: "November 2024" })).toBeVisible();
      await expect(component.getByRole("button", { name: "December 2024" })).toBeVisible();
      await expectEmit(onUpdateViewMonth, 4, [new Date(2024, 10, 1)]);
    });
  });
});
