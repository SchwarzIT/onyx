import type { Locator, Page } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y.js";
import TestCase from "./TestCase.ct.vue";

async function expectOrder(component: Locator, order: string[]) {
  await expect(component.locator("tbody").getByRole("row")).toHaveCount(order.length);

  for (let i = 0; i < order.length; i++) {
    await expect(component.locator("tbody").getByRole("row").nth(i)).toContainText(order[i]!);
  }
}

type DragAndDropOptions = {
  page: Page;
  from: string;
  to: string;
  position: "before" | "after";
  /**
   * If set, `drop` and `dragend` are NOT dispatched. Instead, a `finish`
   * function is returned that the caller must invoke to complete the drag.
   * Useful for capturing screenshots while a drag is in progress.
   */
  preventUp?: boolean;
};

/**
 * Drags the row with {from} name and drops it before/after the row with {to} name.
 *
 * The component relies on native HTML5 drag events (`dragstart`, `dragover`, `drop`).
 * Playwright's `page.mouse.down/move/up` does not trigger HTML5 drag events reliably,
 * so we dispatch the drag events directly via the DOM. This mirrors the pattern used
 * in `OnyxFileUpload.ct.tsx`.
 */
async function dragAndDrop({
  page,
  from,
  to,
  preventUp,
  position,
}: DragAndDropOptions): Promise<{ finish: () => Promise<void> } | void> {
  const dragHandle = page
    .locator("tbody")
    .getByRole("row")
    .filter({ hasText: from })
    .getByRole("cell")
    .first();

  const targetRow = page.locator("tbody").getByRole("row").filter({ hasText: to });

  // ASSERT
  await expect(dragHandle).toBeVisible();
  await expect(targetRow).toBeVisible();

  const targetBox = (await targetRow.boundingBox())!;
  const clientX = targetBox.x + targetBox.width / 2;
  const clientY =
    position === "before"
      ? targetBox.y + targetBox.height * 0.25
      : targetBox.y + targetBox.height * 0.75;

  // A single shared DataTransfer, as browsers would provide it during a real drag.
  const dataTransfer = await page.evaluateHandle(() => new DataTransfer());

  // ACT: start the drag on the handle
  await dragHandle.dispatchEvent("dragstart", { dataTransfer });

  // Dispatch `dragover` on the target row. The composable throttles dragover
  // via `requestAnimationFrame`, so we wait one frame afterwards to make sure
  // the internal `targetOrder` state has been updated before we drop / assert.
  await targetRow.dispatchEvent("dragover", { dataTransfer, clientX, clientY });
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

  const finish = async () => {
    await targetRow.dispatchEvent("drop", { dataTransfer, clientX, clientY });
    await dragHandle.dispatchEvent("dragend", { dataTransfer });
  };

  if (preventUp) return { finish };
  await finish();
}

test("should rearrange rows", async ({ mount, page }) => {
  // ARRANGE
  let state: Record<number, number> = {};

  const component = await mount(<TestCase onUpdate:state={(value) => (state = value)} />);

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");
  await expectOrder(component, ["Alice", "Charlie", "Bob", "Robin", "John"]);

  // ACT
  await component.getByRole("button", { name: "Rearrange rows" }).click();

  // ASSERT
  await expect(component).toHaveScreenshot("active.png");

  // ACT
  const drag = await dragAndDrop({
    page,
    from: "Robin",
    to: "Charlie",
    position: "before",
    preventUp: true,
  });

  // ASSERT
  await expect(component).toHaveScreenshot("dragging.png");

  // ACT
  await drag?.finish();

  // ASSERT
  await expectOrder(component, ["Alice", "Robin", "Charlie", "Bob", "John"]);
  expect(state).toStrictEqual({ 4: 2 });

  // ACT
  await dragAndDrop({ page, from: "Alice", to: "Bob", position: "before" });

  // ASSERT
  await expectOrder(component, ["Robin", "Charlie", "Alice", "Bob", "John"]);
  expect(state).toStrictEqual({ 4: 1, 1: 3 });

  // ACT
  await dragAndDrop({
    page,
    from: "John",
    to: "Robin",
    position: "before",
  });

  await expectOrder(component, ["John", "Robin", "Charlie", "Alice", "Bob"]);
  expect(state).toStrictEqual({ 4: 2, 1: 4, 5: 1 });
});

test("should support to reset changes", async ({ mount, page }) => {
  // ARRANGE
  let state: Record<number, number> = {};

  const component = await mount(<TestCase onUpdate:state={(value) => (state = value)} />);
  const rearrangeButton = component.getByRole("button", { name: "Rearrange rows" });

  // ASSERT
  await expectOrder(component, ["Alice", "Charlie", "Bob", "Robin", "John"]);

  // ACT
  await rearrangeButton.click();

  // ACT
  await dragAndDrop({
    page,
    from: "Robin",
    to: "Charlie",
    position: "before",
  });

  // ASSERT
  await expectOrder(component, ["Alice", "Robin", "Charlie", "Bob", "John"]);
  expect(state).toStrictEqual({ 4: 2 });

  // ACT
  await dragAndDrop({ page, from: "Alice", to: "Bob", position: "before" });

  // ASSERT
  await expectOrder(component, ["Robin", "Charlie", "Alice", "Bob", "John"]);
  expect(state).toStrictEqual({ 4: 1, 1: 3 });

  // ACT
  await component.getByRole("button", { name: "Reset changes" }).click();

  // ASSERT
  await expectOrder(component, ["Alice", "Charlie", "Bob", "Robin", "John"]);
  expect(state).toStrictEqual({});
  await expect(rearrangeButton).toBeHidden();
});

test("should support to cancel rearrange mode", async ({ mount, page }) => {
  // ARRANGE
  let state: Record<number, number> = {};

  const component = await mount(<TestCase onUpdate:state={(value) => (state = value)} />);
  const rearrangeButton = component.getByRole("button", { name: "Rearrange rows" });

  // ASSERT
  await expectOrder(component, ["Alice", "Charlie", "Bob", "Robin", "John"]);

  // ACT
  await rearrangeButton.click();

  // ACT
  await dragAndDrop({
    page,
    from: "Robin",
    to: "Charlie",
    position: "before",
  });

  // ASSERT
  await expectOrder(component, ["Alice", "Robin", "Charlie", "Bob", "John"]);
  expect(state).toStrictEqual({ 4: 2 });

  // ACT
  await component.getByRole("button", { name: "Cancel" }).click();

  // ASSERT
  await expectOrder(component, ["Alice", "Charlie", "Bob", "Robin", "John"]);
  expect(state).toStrictEqual({});
  await expect(rearrangeButton).toBeVisible();
});

test("should support save button", async ({ mount, page }) => {
  // ARRANGE
  let state: Record<number, number> = {};

  const component = await mount(<TestCase onUpdate:state={(value) => (state = value)} />);
  const rearrangeButton = component.getByRole("button", { name: "Rearrange rows" });

  // ASSERT
  await expectOrder(component, ["Alice", "Charlie", "Bob", "Robin", "John"]);

  // ACT
  await rearrangeButton.click();

  // ACT
  await dragAndDrop({
    page,
    from: "Robin",
    to: "Charlie",
    position: "before",
  });

  // ASSERT
  await expectOrder(component, ["Alice", "Robin", "Charlie", "Bob", "John"]);
  expect(state).toStrictEqual({ 4: 2 });

  // ACT
  await component.getByRole("button", { name: "Save" }).click();

  // ASSERT
  await expectOrder(component, ["Alice", "Robin", "Charlie", "Bob", "John"]);
  expect(state).toStrictEqual({ 4: 2 });
  await expect(rearrangeButton).toBeVisible();
});
