import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y.js";
import TestCase from "./TestCase.vue";

const getTestData = () => [
  { id: 3, a: "4", b: "3-Start" },
  { id: 4, a: "3", b: "4-Start" },
  { id: 1, a: "6", b: "1-End" },
  { id: 2, a: "5", b: "2-End" },
  { id: 5, a: "2", b: "5-End" },
  { id: 6, a: "1", b: "6-End" },
];

const expectOrderedText = async (rows: Locator[], expectations: string[]) => {
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    const expected = expectations[index];
    await expect(row).toHaveText(expected);
  }
};

test("should render correctly", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(<TestCase data={data} columns={["a", "b"]} />);

  const getFirstColumn = () => component.locator("tbody tr td:first-of-type").all();

  // ASSERT
  const columns = component.locator("th");
  await expect(columns).toHaveCount(2);

  let rows = await getFirstColumn();
  expect(rows).toHaveLength(data.length);

  await expectOrderedText(
    rows,
    data.map((item) => item.a),
  );
  await expect(component).toHaveScreenshot("data-grid-sorting-initial.png");

  // ACT
  await component.getByLabel("Sort the table ascending by the a column.").click();

  // ASSERT
  rows = await getFirstColumn();
  expect(rows).toHaveLength(data.length);

  await expectOrderedText(rows, ["1", "2", "3", "4", "5", "6"]);
  await expect(component).toHaveScreenshot("data-grid-sorting-asc.png");

  // ACT
  await component.getByLabel("Sort the table descending by the a column.").click();

  // ASSERT
  rows = await getFirstColumn();
  expect(rows).toHaveLength(data.length);
  await expectOrderedText(rows, ["6", "5", "4", "3", "2", "1"]);
  await expect(component).toHaveScreenshot("data-grid-sorting-desc.png");

  // ACT
  await component.getByLabel("Reset sorting.").click();

  // ASSERT
  rows = await getFirstColumn();
  expect(rows).toHaveLength(data.length);
  await expectOrderedText(
    rows,
    data.map((item) => item.a),
  );
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  expect(accessibilityScanResults.violations, "should pass accessibility checks").toEqual([]);
});

test("should sort the default types correctly", async ({ mount }) => {
  // ARRANGE
  const data = [
    {
      id: 1,
      string: "abcdefgh",
      number: 12345,
      date: new Date("2022-01-01"),
      "datetime-local": new Date("2022-01-01"),
      time: new Date("2022-01-01 12:34"),
      timestamp: new Date(123456789),
    },
    {
      id: 2,
      string: "zxy",
      number: 987654,
      date: new Date("2024-01-01"),
      "datetime-local": new Date("2024-01-01"),
      time: new Date("2022-01-01 16:34"),
      timestamp: new Date(987654321),
    },
  ];

  const columnsConfig = [
    { key: "id", type: "number" },
    { key: "string", type: "string" },
    { key: "number", type: "number" },
    { key: "date", type: "date" },
    { key: "datetime-local", type: "datetime-local" },
    { key: "time", type: "time" },
    { key: "timestamp", type: "timestamp" },
  ];

  const component = await mount(<TestCase data={data} columns={columnsConfig} />);

  const getFirstColumn = () => component.getByRole("row").locator("td:first-of-type").all();

  // ASSERT
  const columns = component.getByRole("columnheader");
  await expect(columns).toHaveCount(7);

  let rows = await getFirstColumn();
  expect(rows).toHaveLength(data.length);

  for (const columnConfig of columnsConfig) {
    // ACT
    await component
      .getByLabel(`Sort the table ascending by the ${columnConfig.key} column.`)
      .click();

    // ASSERT
    rows = await getFirstColumn();
    expect(rows).toHaveLength(data.length);
    await expectOrderedText(rows, ["1", "2"]);

    // ACT
    await component
      .getByLabel(`Sort the table descending by the ${columnConfig.key} column.`)
      .click();

    // ASSERT
    rows = await getFirstColumn();
    expect(rows).toHaveLength(data.length);
    await expectOrderedText(rows, ["2", "1"]);
  }
});
