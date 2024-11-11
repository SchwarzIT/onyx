import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y";
import SortingDataGrid from "../../../examples/DataGrid/SortingDataGrid.vue";

const getTestArray = () => [
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

test("should render correctly", async ({ mount }) => {
  // ARRANGE
  const data = getTestArray();
  const component = await mount(<SortingDataGrid data={data} columns={["a", "b"]} />);

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
});
