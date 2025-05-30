import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y";
import TestCase from "./TestCase.vue";

const getTestData = () => [
  { id: 1, a: "1", b: "a", c: "aa", d: "dd" },
  { id: 2, a: "2", b: "B", c: "bb", d: "dd" },
  { id: 3, a: "3", b: "C", c: "cc", d: "dd" },
];

const expectColumnCount = async (dataGrid: Locator, count: number) => {
  await expect(dataGrid.getByRole("columnheader")).toHaveCount(count);
};

test("should hide and show columns", async ({ mount }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(
    <TestCase
      data={data}
      columns={["a", "b", "c", { key: "d", label: "Labelled Column" }]}
      hideColumnsOptions={{
        columns: {
          b: { hidden: true },
          c: { enabled: false },
        },
      }}
    />,
  );

  const revealButton = component.getByRole("button", { name: "Show hidden columns" });
  const reveal = async (name: string) =>
    component.getByRole("menuitem", { name, exact: true }).click();

  const openMoreActions = async (name: string) =>
    component
      .getByRole("columnheader", { name: `${name} Toggle column actions`, exact: true })
      .getByLabel("Toggle column actions")
      .click();

  const menuItem = component.getByRole("menuitem", { name: "Hide column" });

  await test.step("Initial state: verify visible columns and reveal button", async () => {
    // ACT
    await expect(revealButton).toBeVisible();
    await expectColumnCount(component, 4); // 3 Visible + Reveal column
    await expect(component).toHaveScreenshot("data-grid-hide-columns-initial.png");
  });

  await test.step("Hide multiple columns", async () => {
    // ARRANGE
    await openMoreActions("a");
    await expect(component).toHaveScreenshot("data-grid-hide-columns-hide-button.png");
    await menuItem.click();

    await openMoreActions("Labelled Column");
    await menuItem.click();

    // ACT
    await expect(revealButton).toBeVisible();
    await expectColumnCount(component, 2); // 1 Visible + Reveal column
  });

  await test.step("Reveal all Columns", async () => {
    // ARRANGE
    await revealButton.click();
    await expect(component).toHaveScreenshot("data-grid-hide-columns-reveal-button.png");
    await reveal("a");
    await revealButton.click();
    await reveal("b");
    await revealButton.click();
    await reveal("Labelled Column");

    // ACT
    await expectColumnCount(component, 4); // 4 Visible
    await expect(revealButton).toBeHidden();
    await expect(component).toHaveScreenshot(
      "data-grid-hide-columns-revealed-columns-should-be-last.png",
    );
  });
});
