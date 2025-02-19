import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y";
import TestCase from "./TestCase.vue";

const getTestData = () => [
  { id: 1, a: "1", b: "a" },
  { id: 2, a: "1", b: "A" },
  { id: 3, a: "2", b: "A" },
  { id: 4, a: "2", b: "ab" },
  { id: 5, a: "3", b: "ca B" },
  { id: 6, a: "4", b: "Ab" },
];

test("set a filter", async ({ mount, page }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(<TestCase data={data} columns={["a", "b"]} />);

  const getFirstColumn = () => component.locator("tbody tr td:first-of-type");

  // ASSERT
  let rows = await getFirstColumn().all();
  expect(rows).toHaveLength(data.length);

  // ACT
  await component
    .getByRole("columnheader", { name: "a Toggle column actions" })
    .getByLabel("Toggle column actions")
    .click();
  await component.getByRole("textbox", { name: "filter-input-a" }).fill("3");
  await page.keyboard.press("Enter");

  // ASSERT
  rows = await getFirstColumn().all();
  expect(rows).toHaveLength(1);
});

test("combine two filter", async ({ mount, page }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(<TestCase data={data} columns={["a", "b"]} />);

  const getFirstColumn = () => component.locator("tbody tr td:first-of-type");

  // ASSERT
  let rows = await getFirstColumn().all();
  expect(rows).toHaveLength(data.length);

  // ACT
  await component
    .getByRole("columnheader", { name: "a Toggle column actions" })
    .getByLabel("Toggle column actions")
    .click();
  await component.getByRole("textbox", { name: "filter-input-a" }).fill("1");
  await page.keyboard.press("Enter");

  // ASSERT
  rows = await getFirstColumn().all();
  expect(rows).toHaveLength(2);

  await component
    .getByRole("columnheader", { name: "b Toggle column actions" })
    .getByLabel("Toggle column actions")
    .click();
  await component.getByRole("textbox", { name: "filter-input-b" }).fill("A");
  await page.keyboard.press("Enter");

  rows = await getFirstColumn().all();
  expect(rows).toHaveLength(2);
});

test("remove filter", async ({ mount, page }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(<TestCase data={data} columns={["a", "b"]} />);

  const getFirstColumn = () => component.locator("tbody tr td:first-of-type");

  // ASSERT
  let rows = await getFirstColumn().all();
  expect(rows).toHaveLength(data.length);

  // ACT
  await component
    .getByRole("columnheader", { name: "a Toggle column actions" })
    .getByLabel("Toggle column actions")
    .click();
  await component.getByRole("textbox", { name: "filter-input-a" }).fill("3");
  await page.keyboard.press("Enter");

  // ASSERT
  rows = await getFirstColumn().all();
  expect(rows).toHaveLength(1);

  await component.getByRole("button", { name: "a", exact: true }).click();

  rows = await getFirstColumn().all();
  expect(rows).toHaveLength(6);
});

const filterConfigs = [
  { caseSensitive: true },
  { exactMatch: true },
  { searchFromStart: true },
  { trimWhitespace: true },
];
const assertRowCount = (rows: Locator[], configName: string) => {
  const rowCountByConfig: { [key: string]: number } = {
    caseSensitive: 1,
    exactMatch: 2,
    searchFromStart: 2,
    trimWhitespace: 3,
  };
  const expectedCount = rowCountByConfig[configName];
  expect(rows).toHaveLength(expectedCount);
};

for (const filterConfig of filterConfigs) {
  const configName = Object.keys(filterConfig)[0];

  test(`should apply filterConfig: ${configName}`, async ({ mount, page }) => {
    const data = getTestData();
    const component = await mount(
      <TestCase data={data} columns={["a", "b"]} filterOptions={{ filterConfig }} />,
    );
    const getFirstColumn = () => component.locator("tbody tr td:first-of-type");

    // Initial assertion
    let rows = await getFirstColumn().all();
    expect(rows).toHaveLength(data.length);

    // Apply filter
    await component
      .getByRole("columnheader", { name: "b Toggle column actions" })
      .getByLabel("Toggle column actions")
      .click();
    await component.getByRole("textbox", { name: "filter-input-b" }).fill("ab");
    await page.keyboard.press("Enter");

    // Assert filtered rows
    rows = await getFirstColumn().all();
    assertRowCount(rows, configName);
  });
}
