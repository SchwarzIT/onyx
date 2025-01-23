/* eslint-disable playwright/no-conditional-expect */
/* eslint-disable playwright/no-conditional-in-test */
import { expect, test } from "../../../../playwright/a11y";
import TestCase from "./TestCase.vue";

const getTestData = () => [
  { id: 1, a: "1", b: "b A" },
  { id: 2, a: "1", b: "B" },
  { id: 3, a: "2", b: "A" },
  { id: 4, a: "2", b: "B" },
  { id: 5, a: "3", b: "a" },
  { id: 6, a: "4", b: "ab" },
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
  await component.getByLabel("a", { exact: true }).fill("3");
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
  await component.getByLabel("a", { exact: true }).fill("1");
  await page.keyboard.press("Enter");

  // ASSERT
  rows = await getFirstColumn().all();
  expect(rows).toHaveLength(2);

  await component
    .getByRole("columnheader", { name: "b Toggle column actions" })
    .getByLabel("Toggle column actions")
    .click();
  await component.getByLabel("b", { exact: true }).fill("A");
  await page.keyboard.press("Enter");

  rows = await getFirstColumn().all();
  expect(rows).toHaveLength(1);
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
  await component.getByLabel("a", { exact: true }).fill("3");
  await page.keyboard.press("Enter");

  // ASSERT
  rows = await getFirstColumn().all();
  expect(rows).toHaveLength(1);

  await component.getByRole("button", { name: "a", exact: true }).click();

  rows = await getFirstColumn().all();
  expect(rows).toHaveLength(6);
});

test("filterOptions updateMode(onInput)", async ({ mount }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(
    <TestCase data={data} columns={["a", "b"]} filterOptions={{ updateMode: "onInput" }} />,
  );

  const getFirstColumn = () => component.locator("tbody tr td:first-of-type");

  // ASSERT
  let rows = await getFirstColumn().all();
  expect(rows).toHaveLength(data.length);

  // ACT
  await component
    .getByRole("columnheader", { name: "a Toggle column actions" })
    .getByLabel("Toggle column actions")
    .click();
  await component.getByLabel("a", { exact: true }).fill("3");

  // ASSERT
  rows = await getFirstColumn().all();
  expect(rows).toHaveLength(1);
});

const filterConfigs = [
  { caseSensitive: true },
  { exactMatch: true },
  { searchFromStart: true },
  { trimWhitespace: true, searchFromStart: true },
];
for (const filterConfig of filterConfigs) {
  const configName = Object.keys(filterConfig)[0];

  test(`should apply filterConfig: ${configName}`, async ({ mount, page }) => {
    // ARRANGE
    const data = getTestData();
    const component = await mount(
      <TestCase data={data} columns={["a", "b"]} filterOptions={{ filterConfig }} />,
    );

    const getFirstColumn = () => component.locator("tbody tr td:first-of-type");

    // ASSERT
    let rows = await getFirstColumn().all();
    expect(rows).toHaveLength(data.length);

    // ACT
    await component
      .getByRole("columnheader", { name: "b Toggle column actions" })
      .getByLabel("Toggle column actions")
      .click();
    await component.getByLabel("b", { exact: true }).fill("a");
    await page.keyboard.press("Enter");

    // ASSERT
    rows = await getFirstColumn().all();
    if (configName === "caseSensitive") {
      expect(rows).toHaveLength(2);
    } else if (configName === "exactMatch") {
      expect(rows).toHaveLength(2);
    } else if (configName === "searchFromStart") {
      expect(rows).toHaveLength(3);
    } else {
      await component.getByRole("button", { name: "b", exact: true }).click();
      await component
        .getByRole("columnheader", { name: "b Toggle column actions" })
        .getByLabel("Toggle column actions")
        .click();
      await component.getByLabel("b", { exact: true }).fill("bA");
      await page.keyboard.press("Enter");
      rows = await getFirstColumn().all();
      expect(rows).toHaveLength(1);
    }
  });
}
