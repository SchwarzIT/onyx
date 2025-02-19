/* eslint-disable playwright/expect-expect -- expect is done by "expectRowCount" utility */
import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y";
import type { DataGridEntry } from "../../types";
import TestCase from "./TestCase.vue";
import type { FilterConfig } from "./types";
const getTestData = () => [
  { id: 1, a: "1", b: "a" },
  { id: 2, a: "1", b: "A" },
  { id: 3, a: "1", b: "B" },
  { id: 4, a: "2", b: "A" },
  { id: 5, a: "2", b: "ab" },
  { id: 6, a: "3", b: "ca B" },
  { id: 7, a: "4", b: "Ab" },
];

const expectRowCount = (dataGrid: Locator, count: number) => {
  // +1 = header row
  return expect(dataGrid.getByRole("row")).toHaveCount(count + 1);
};
test("should filter by single column", async ({ mount }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(<TestCase data={data} columns={["a", "b"]} />);

  // ASSERT
  await expectRowCount(component, data.length);
  // ACT
  await component.getByRole("columnheader").first().getByLabel("Toggle column actions").click();
  const searchInput = component.getByLabel("Search column a");
  await searchInput.fill("3");
  await searchInput.press("Enter");

  // ASSERT
  await expectRowCount(component, 1);

  // ACT

  await component.getByLabel("Remove search term for column a").click();

  // ASSERT
  await expectRowCount(component, data.length);
});

test("should filter by two columns", async ({ mount }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(<TestCase data={data} columns={["a", "b"]} />);

  // ASSERT
  await expectRowCount(component, data.length);

  // ACT
  await component.getByRole("columnheader").first().getByLabel("Toggle column actions").click();
  const searchInputA = component.getByLabel("Search column a");
  await searchInputA.fill("1");
  await searchInputA.press("Enter");

  // ASSERT
  await expectRowCount(component, 3);

  // ACT
  await component.getByRole("columnheader").nth(1).getByLabel("Toggle column actions").click();
  const searchInputB = component.getByLabel("Search column b");
  await searchInputB.fill("A");
  await searchInputB.press("Enter");
  await expectRowCount(component, 2);

  // ACT
  await component.getByLabel("Remove search term for column a").click();

  // ASSERT
  await expectRowCount(component, 6);

  // ACT
  await component.getByLabel("Remove search term for column b").click();

  // ASSERT
  await expectRowCount(component, data.length);
});

const FILTER_CONFIG_TEST_CASES = {
  caseSensitive: 1,
  exactMatch: 2,
  searchFromStart: 2,
  trimWhitespace: 3,
} satisfies Partial<Record<keyof FilterConfig<DataGridEntry>, number>>;
for (const configName in FILTER_CONFIG_TEST_CASES) {
  test(`should apply filterConfig: ${configName}`, async ({ mount }) => {
    // ARRANGE
    const data = getTestData();
    const component = await mount(
      <TestCase
        data={data}
        columns={["a", "b"]}
        filterOptions={{ filterConfig: { [configName]: true } }}
      />,
    );

    // ASSERT
    await expectRowCount(component, data.length);

    // ACT
    await component.getByRole("columnheader").nth(1).getByLabel("Toggle column actions").click();
    const searchInputB = component.getByLabel("Search column b");
    await searchInputB.fill("ab");
    await searchInputB.press("Enter");
    await expectRowCount(
      component,
      FILTER_CONFIG_TEST_CASES[configName as keyof typeof FILTER_CONFIG_TEST_CASES],
    );
  });
}
