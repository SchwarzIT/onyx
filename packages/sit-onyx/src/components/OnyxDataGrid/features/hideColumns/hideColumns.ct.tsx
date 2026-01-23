import type { Locator } from "@playwright/test";
import { ref } from "vue";
import { expect, test } from "../../../../playwright/a11y.js";
import TestCase, { type Entry } from "./TestCase.ct.vue";

const expectColumnCount = async (dataGrid: Locator, count: number) => {
  await expect(dataGrid.getByRole("columnheader")).toHaveCount(count);
};

test("should hide and show columns", async ({ mount }) => {
  const state = ref<(keyof Entry)[]>([]);

  // ARRANGE
  const component = await mount(
    <TestCase onUpdate:state={(newState) => (state.value = newState)} />,
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
    expect(state.value).toStrictEqual(["b"]);
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
    expect(state.value).toStrictEqual(["b", "a", "d"]);
  });

  await test.step("Reveal all Columns", async () => {
    // ACT
    await revealButton.click();
    await expect(component).toHaveScreenshot("data-grid-hide-columns-reveal-button.png");
    await reveal("a");
    await revealButton.click();
    await reveal("b");
    await revealButton.click();
    await reveal("Labelled Column");

    // ASSERT
    await expectColumnCount(component, 4); // 4 Visible
    await expect(revealButton).toBeHidden();
    await expect(component).toHaveScreenshot(
      "data-grid-hide-columns-revealed-columns-should-be-last.png",
    );
    expect(state.value).toStrictEqual([]);
  });
});

test("last Column should not be hidable", async ({ mount }) => {
  const state = ref<(keyof Entry)[]>([]);

  // ARRANGE
  const component = await mount(
    <TestCase onUpdate:state={(newState) => (state.value = newState)} allHidable />,
  );
  const menuItem = component.getByRole("menuitem", { name: "Hide column" });
  const openMoreActions = async (name: string) =>
    component
      .getByRole("columnheader", { name: `${name} Toggle column actions`, exact: true })
      .getByLabel("Toggle column actions")
      .click();

  await openMoreActions("a");
  await menuItem.click();

  await openMoreActions("c");
  await menuItem.click();
  await openMoreActions("Labelled Column");
  await expect(menuItem).toBeDisabled();
  await menuItem.hover();
  await expect(component.getByRole("tooltip")).toBeVisible();

  await expect(component).toHaveScreenshot("data-grid-hide-columns-last-column-not-hidable.png");
});
