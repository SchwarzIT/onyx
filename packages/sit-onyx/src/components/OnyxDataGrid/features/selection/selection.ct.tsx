import { expect, test } from "../../../../playwright/a11y.js";
import TestCase, { type TransferableEmit } from "./TestCase.ct.vue";

const getTestData = () => [
  { id: 3, a: "4", b: "3-Start" },
  { id: 4, a: "3", b: "4-Start" },
  { id: 1, a: "6", b: "1-End" },
  { id: 2, a: "5", b: "2-End" },
  { id: 5, a: "2", b: "5-End" },
  { id: 6, a: "1", b: "6-End" },
];

test("useSelection", async ({ page, mount }) => {
  // ARRANGE
  await page.setViewportSize({ width: 400, height: 400 });
  const selectionEvents: TransferableEmit[] = [];
  const component = await mount(
    <TestCase
      onSelectionChange={(e) => selectionEvents.push(e)}
      dataGrid={{ data: getTestData(), columns: ["a", "b"] }}
      selectionOption={{ hover: false }}
    />,
  );

  await test.step("initial rendering", async () => {
    // ASSERT
    const columns = component.locator("th");
    await expect(columns).toHaveCount(3);
    await expect(component).toHaveScreenshot("data-grid-selection-initial.png");
  });

  await test.step("select an row", async () => {
    // ACT
    await page.getByRole("checkbox", { name: "Add row with ID '4' to the selection." }).click();

    // ASSERT
    expect(selectionEvents).toHaveLength(1);
    expect(selectionEvents.at(-1)?.selectMode).toBe("include");
    expect(selectionEvents.at(-1)?.contingent).toMatchObject([4]);
    await expect(component).toHaveScreenshot("data-grid-selection-one-selected.png");
  });

  await test.step("select all", async () => {
    // ACT
    await page.getByRole("checkbox", { name: "Select all rows" }).click();

    // ASSERT
    expect(selectionEvents).toHaveLength(2);
    expect(selectionEvents.at(-1)?.selectMode).toBe("exclude");
    expect(selectionEvents.at(-1)?.contingent).toMatchObject([]);
  });

  await test.step("deselect all", async () => {
    // ACT
    await page.getByRole("checkbox", { name: "Deselect all rows" }).click();

    // ASSERT
    expect(selectionEvents).toHaveLength(3);
    expect(selectionEvents.at(-1)?.selectMode).toBe("include");
    expect(selectionEvents.at(-1)?.contingent).toMatchObject([]);
  });
  await test.step("select all manually", async () => {
    const selectAllCheckbox = page.getByRole("checkbox", { name: "Select all rows" });

    await page.getByRole("checkbox", { name: "Add row with ID '1' to the" }).click();
    await page.getByRole("checkbox", { name: "Add row with ID '2' to the" }).click();
    await page.getByRole("checkbox", { name: "Add row with ID '3' to the" }).click();
    await page.getByRole("checkbox", { name: "Add row with ID '4' to the" }).click();
    await page.getByRole("checkbox", { name: "Add row with ID '5' to the" }).click();
    await expect(selectAllCheckbox).not.toBeChecked();
    await page.getByRole("checkbox", { name: "Add row with ID '6' to the" }).click();

    await expect(selectAllCheckbox).toBeChecked();
  });
});

test("useSelection with hover", async ({ page, mount }) => {
  // ARRANGE
  await page.setViewportSize({ width: 400, height: 400 });
  const selectionEvents: TransferableEmit[] = [];
  const component = await mount(
    <TestCase
      onSelectionChange={(e) => selectionEvents.push(e)}
      dataGrid={{ data: getTestData(), columns: ["a", "b"] }}
      selectionOption={{ hover: true }}
    />,
  );

  await test.step("initial rendering", async () => {
    // ASSERT
    const columns = component.locator("th");
    await expect(columns).toHaveCount(3);
    await expect(component).toHaveScreenshot("data-grid-selection-initial-hover-mode.png");
  });

  await test.step("hover an row", async () => {
    // ACT
    await page.getByRole("cell", { name: "4", exact: true }).hover();

    // ASSERT
    await expect(component).toHaveScreenshot("data-grid-selection-one-hovered.png");
  });

  await test.step("select an row", async () => {
    // ACT
    await page.getByRole("checkbox", { name: "Add row with ID '3' to the selection." }).click();
    await page.getByRole("cell", { name: "2", exact: true }).hover();

    // ASSERT
    expect(selectionEvents).toHaveLength(1);
    expect(selectionEvents.at(-1)?.selectMode).toBe("include");
    expect(selectionEvents.at(-1)?.contingent).toMatchObject([3]);
    await expect(component).toHaveScreenshot("data-grid-selection-one-selected-one-hovered.png");
  });
});

test("useSelection with disabled", async ({ mount }) => {
  // ARRANGE
  const component = await mount(TestCase, {
    props: {
      dataGrid: { data: getTestData(), columns: ["a", "b"] },
      selectionOption: { enabled: false, hover: true },
    },
  });

  await test.step("initial rendering", async () => {
    // ASSERT
    const columns = component.locator("th");
    await expect(columns).toHaveCount(2);
  });

  await test.step("set enabled", async () => {
    // ARRANGE
    await component.update({
      props: {
        selectionOption: { enabled: true, hover: true },
      },
    });

    // ASSERT
    const columns = component.locator("th");
    await expect(columns).toHaveCount(3);
  });
});

test("should not check header checkbox when table is empty", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<TestCase dataGrid={{ data: [], columns: ["a", "b"] }} />);

  const headerCheckbox = component.getByRole("checkbox", { name: "Select all rows" });

  // ASSERT
  await expect(headerCheckbox).not.toBeChecked();
  await expect(headerCheckbox).toBeDisabled();
  await expect(headerCheckbox).toHaveJSProperty("indeterminate", false);
});
