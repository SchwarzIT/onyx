/* eslint playwright/expect-expect: ["error", { "assertFunctionNames": ["expectRowCount"] }] -- We have some assertions in extra functions */
import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y.js";
import TestCase from "./TestCase.ct.vue";

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
  return expect(dataGrid.getByRole("row")).toHaveCount(count + 1);
};

test("testestestest", async ({ mount }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(
    <TestCase data={data} columns={[{ key: "a", type: "number" }, "b"]} />,
  );
  await expect(component).toBeAttached();
});
