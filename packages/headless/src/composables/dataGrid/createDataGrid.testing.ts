import { expect } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";

const expectLabel = async (page: Page, grid: Locator) => {
  const [labelledBy, label] = await Promise.all([
    grid.getAttribute("aria-labelledby"),
    grid.getAttribute("aria-label"),
  ]);

  if (labelledBy) {
    expect(
      label,
      `"aria-labelledby" and "aria-label" must not both be defined on the grid element!`,
    ).toBeFalsy();
    expect(
      page.locator(`#${labelledBy}`),
      `"aria-labelledby" must point to an existing element!`,
    ).toBeAttached();
  } else {
    expect(
      label,
      `The grid element must have an accessible label: Either "aria-labelledby" and "aria-label" must be used!`,
    ).toBeTruthy();
    expect(
      labelledBy,
      `"aria-labelledby" and "aria-label" must not both be defined on the grid element!`,
    ).toBeFalsy();
  }
};

const expectMaybeDescription = async (page: Page, grid: Locator) => {
  const describedBy = await grid.getAttribute("aria-describedby");
  const caption = await grid.getByRole("caption");

  if (describedBy) {
    expect(
      caption,
      `The "aria-describedby" attribute on the grid element and a caption element must not both be defined!`,
    ).toBeFalsy();
    expect(
      page.locator(`#${describedBy}`),
      `"aria-describedby" must point to an existing element!`,
    ).toBeAttached();
  }
  if (caption) {
    const text = await caption.innerText();
    expect(text, `Caption element must not be empty!`).toBeTruthy();
  }
};

/**
 * Test an implementation of the data grid based on https://www.w3.org/WAI/ARIA/apg/patterns/grid/
 */
export const dataGridTesting = async (page: Page, grid: Locator, rows: Locator) => {
  // Based on https://www.w3.org/WAI/ARIA/apg/patterns/grid/

  // The grid container has role grid.
  await expect(grid).toHaveAttribute("role", "grid");

  // Each row container has role row and is either a DOM descendant of or owned by the grid element or an element with role rowgroup.
  // TODO: aria-owns support
  for (const row of await rows.all()) {
    expect(grid.locator(row)).toBeAttached();
  }

  await expectLabel(page, grid);
  await expectMaybeDescription(page, grid);
  await expectKeyboardSupport(page, grid);
};

type ExpectNthCellToBeFocusedOptions = {
  page: Page;
  row: Locator;
  nth: number;
};
const expectNthCellToBeFocused = async (
  { page, nth, row }: ExpectNthCellToBeFocusedOptions,
  message?: string,
) =>
  expect(async () => {
    const focused = page.locator("*:focus");
    const cells = row.getByRole("cell");
    const targetHandle = await cells.nth(nth).elementHandle();
    expect(await focused.evaluate((a, b) => a === b, targetHandle), message).toEqual(true);
  }).toPass();

const expectKeyboardSupport = async (page: Page, grid: Locator) => {
  await page.keyboard.press("Tab");
  const focused = page.locator("*:focus");
  await expect(focused).toHaveRole("cell");

  const allRows = grid.getByRole("row").filter({ has: page.getByRole("cell") });
  const firstRow = allRows.first();

  await expectNthCellToBeFocused(
    { page, row: firstRow, nth: 0 },
    "First cell should be focused when tabbing into the data grid",
  );

  await page.keyboard.press("ArrowRight");
  await expectNthCellToBeFocused(
    { page, row: firstRow, nth: 1 },
    "Second cell should be focused when pressing arrow right",
  );

  await page.keyboard.press("ArrowLeft");
  await expectNthCellToBeFocused(
    { page, row: firstRow, nth: 0 },
    "First cell should be focused again when pressing arrow left",
  );

  await page.keyboard.press("ArrowLeft");
  await expectNthCellToBeFocused(
    { page, row: firstRow, nth: 0 },
    "First cell should still be focused when pressing arrow in the first cell",
  );

  await page.keyboard.press("End");
  await expectNthCellToBeFocused(
    { page, row: firstRow, nth: -1 },
    "Last cell of the row should be focused when pressing End",
  );

  await page.keyboard.press("Home");
  await expectNthCellToBeFocused(
    { page, row: firstRow, nth: 0 },
    "First cell of the row should be focused when pressing Home",
  );

  await page.keyboard.press("ArrowUp");
  await expectNthCellToBeFocused(
    { page, row: firstRow, nth: 0 },
    "First row should still be focused when pressing arrow up in the first row",
  );

  await page.keyboard.press("ArrowDown");
  const secondRow = allRows.nth(1);
  await expectNthCellToBeFocused(
    { page, row: secondRow, nth: 0 },
    "Second row should be focused when pressing arrow down",
  );

  await page.keyboard.press("ArrowUp");
  await expectNthCellToBeFocused(
    { page, row: firstRow, nth: 0 },
    "First row should be focused again when pressing arrow up",
  );

  await page.keyboard.press("Control+End");
  const lastRow = allRows.last();
  await expectNthCellToBeFocused(
    { page, row: lastRow, nth: -1 },
    "Last cell in the last row should be focused when pressing Control+End",
  );

  await page.keyboard.press("Control+Home");
  await expectNthCellToBeFocused(
    { page, row: firstRow, nth: 0 },
    "First cell in the first row should be focused when pressing Control+Home",
  );
};
