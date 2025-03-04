import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y";
import TestCase from "./TestCase.vue";

const getTestData = () => [
  { id: 1, a: "1", b: "a", c: "aa" },
  { id: 2, a: "2", b: "B", c: "bb" },
  { id: 3, a: "3", b: "C", c: "cc" },
];

const expectColumnCount = async (dataGrid: Locator, count: number) => {
  const headers = await dataGrid.getByRole("columnheader").count();
  return expect(headers).toBe(count);
};

test("should hide and show columns", async ({ mount }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(
    <TestCase
      data={data}
      columns={["a", "b", "c"]}
      hideColumnsOptions={{ columns: [{ name: "a" }, { name: "b", hidden: true }] }}
    />,
  );

  const revealButton = component.getByRole("button", { name: "change reveal" });
  const revealA = component.getByRole("menuitem", { name: "a" });
  const revealB = component.getByRole("menuitem", { name: "b" });
  const moreActionA = component
    .getByRole("columnheader", { name: "a Toggle column actions" })
    .getByLabel("Toggle column actions");

  const menuItem = component.getByRole("menuitem", { name: "Hide column" });

  await test.step("Initial state: verify visible columns and reveal button", async () => {
    // ACT
    await expect(revealButton).toBeVisible();
    await expectColumnCount(component, 3); // 2 Visible + Reveal column
    await expect(component).toHaveScreenshot("data-grid-hide-columns-initial.png");
  });

  await test.step("Hide multible columns", async () => {
    // ARRANGE
    await moreActionA.click();
    await expect(component).toHaveScreenshot("data-grid-hide-columns-hide-button.png");
    await menuItem.click();

    // ACT
    await expect(revealButton).toBeVisible();
    await expectColumnCount(component, 2); // 1 Visible + Reveal column
  });

  await test.step("Reveal all Columns", async () => {
    // ARRANGE
    await revealButton.click();
    await expect(component).toHaveScreenshot("data-grid-hide-columns-reveal-button.png");
    await revealA.click();
    await revealButton.click();
    await revealB.click();

    // ACT
    await expectColumnCount(component, 3); // 3 Visible
    await expect(revealButton).toBeHidden();
    await expect(component).toHaveScreenshot("data-grid-hide-columns-no-hidden-columns.png");
  });
});
