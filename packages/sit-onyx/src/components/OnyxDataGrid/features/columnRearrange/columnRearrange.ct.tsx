import type { Locator, Page } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y.js";
import TestCase from "./TestCase.ct.vue";

async function expectOrder(component: Locator, order: string[]) {
  const headers = component.getByRole("columnheader");
  await expect(headers).toHaveCount(order.length);

  for (let i = 0; i < order.length; i++) {
    await expect(headers.nth(i)).toContainText(order[i]!);
  }
}

type DragAndDropOptions = {
  page: Page;
  from: string;
  to: string;
  position: "left" | "right";
  /**
   * If set, `drop` and `dragend` are NOT dispatched. Instead, a `finish`
   * function is returned that the caller must invoke to complete the drag.
   * Useful for capturing screenshots while a drag is in progress.
   */
  preventUp?: boolean;
};

/**
 * Drags the column header with {from} label and drops it to the left/right of the column header
 * with {to} label.
 */
async function dragAndDrop({
  page,
  from,
  to,
  preventUp,
  position,
}: DragAndDropOptions): Promise<{ finish: () => Promise<void> } | void> {
  const sourceTh = page.locator("thead").getByRole("columnheader", { name: from });
  const dragHandle = sourceTh.getByRole("button", { name: "Drag to move" });
  const targetTh = page.locator("thead").getByRole("columnheader", { name: to });

  // ASSERT
  await expect(dragHandle).toBeVisible();
  await expect(targetTh).toBeVisible();

  const targetBox = (await targetTh.boundingBox())!;
  const clientX =
    position === "left"
      ? targetBox.x + targetBox.width * 0.25
      : targetBox.x + targetBox.width * 0.75;
  const clientY = targetBox.y + targetBox.height / 2;

  // A single shared DataTransfer, as browsers would provide it during a real drag.
  const dataTransfer = await page.evaluateHandle(() => new DataTransfer());

  // ACT: trigger mousedown on handle to set internal handle click state
  await dragHandle.dispatchEvent("mousedown", { bubbles: true });

  // ACT: start the drag on the source header
  await sourceTh.dispatchEvent("dragstart", { dataTransfer });

  // Dispatch `dragover` on the target header. Wait one frame to ensure internal state update.
  await targetTh.dispatchEvent("dragover", { dataTransfer, clientX, clientY });
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

  const finish = async () => {
    await targetTh.dispatchEvent("drop", { dataTransfer, clientX, clientY });
    await sourceTh.dispatchEvent("dragend", { dataTransfer });
  };

  if (preventUp) return { finish };
  await finish();
}

test("should rearrange columns", async ({ mount, page }) => {
  // ARRANGE
  let state: Record<string, number> = {};

  const component = await mount(<TestCase onUpdate:state={(value) => (state = value)} />);

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");
  await expectOrder(component, ["Name", "Rank", "Birthday", "Is active?"]);

  // ACT
  await component.getByRole("button", { name: "Rearrange columns" }).click();

  // ASSERT
  await expect(component).toHaveScreenshot("active.png");

  // ACT
  const drag = await dragAndDrop({
    page,
    from: "Is active?",
    to: "Rank",
    position: "left",
    preventUp: true,
  });

  // ASSERT
  await expect(component).toHaveScreenshot("dragging.png");

  // ACT
  await drag?.finish();

  // ASSERT
  await expectOrder(component, ["Name", "Is active?", "Rank", "Birthday"]);
  expect(state).toStrictEqual({ isActive: 2 });

  // ACT
  await dragAndDrop({ page, from: "Name", to: "Rank", position: "right" });

  // ASSERT
  await expectOrder(component, ["Is active?", "Rank", "Name", "Birthday"]);
  expect(state).toStrictEqual({ isActive: 1, name: 3 });
});

test("should support to reset changes", async ({ mount, page }) => {
  // ARRANGE
  let state: Record<string, number> = {};

  const component = await mount(<TestCase onUpdate:state={(value) => (state = value)} />);
  const rearrangeButton = component.getByRole("button", { name: "Rearrange columns" });

  // ASSERT
  await expectOrder(component, ["Name", "Rank", "Birthday", "Is active?"]);

  // ACT
  await rearrangeButton.click();

  // ACT
  await dragAndDrop({
    page,
    from: "Is active?",
    to: "Rank",
    position: "left",
  });

  // ASSERT
  await expectOrder(component, ["Name", "Is active?", "Rank", "Birthday"]);
  expect(state).toStrictEqual({ isActive: 2 });

  // ACT
  await component.getByRole("button", { name: "Reset changes" }).click();

  // ASSERT
  await expectOrder(component, ["Name", "Rank", "Birthday", "Is active?"]);
  expect(state).toStrictEqual({});
});

test("should support to cancel rearrange mode", async ({ mount, page }) => {
  // ARRANGE
  let state: Record<string, number> = {};

  const component = await mount(<TestCase onUpdate:state={(value) => (state = value)} />);
  const rearrangeButton = component.getByRole("button", { name: "Rearrange columns" });

  // ASSERT
  await expectOrder(component, ["Name", "Rank", "Birthday", "Is active?"]);

  // ACT
  await rearrangeButton.click();

  // ACT
  await dragAndDrop({
    page,
    from: "Is active?",
    to: "Rank",
    position: "left",
  });

  // ASSERT
  await expectOrder(component, ["Name", "Is active?", "Rank", "Birthday"]);
  expect(state).toStrictEqual({ isActive: 2 });

  // ACT
  await component.getByRole("button", { name: "Cancel" }).click();

  // ASSERT
  await expectOrder(component, ["Name", "Rank", "Birthday", "Is active?"]);
  expect(state).toStrictEqual({});
  await expect(rearrangeButton).toBeVisible();
});

test("should support save button", async ({ mount, page }) => {
  // ARRANGE
  let state: Record<string, number> = {};

  const component = await mount(<TestCase onUpdate:state={(value) => (state = value)} />);
  const rearrangeButton = component.getByRole("button", { name: "Rearrange columns" });

  // ASSERT
  await expectOrder(component, ["Name", "Rank", "Birthday", "Is active?"]);

  // ACT
  await rearrangeButton.click();

  // ACT
  await dragAndDrop({
    page,
    from: "Is active?",
    to: "Rank",
    position: "left",
  });

  // ASSERT
  await expectOrder(component, ["Name", "Is active?", "Rank", "Birthday"]);
  expect(state).toStrictEqual({ isActive: 2 });

  // ACT
  await component.getByRole("button", { name: "Save" }).click();

  // ASSERT
  await expectOrder(component, ["Name", "Is active?", "Rank", "Birthday"]);
  expect(state).toStrictEqual({ isActive: 2 });
  await expect(rearrangeButton).toBeVisible();
});
