import type { Locator, Page } from "@playwright/test";

export type DragResizeHandleOptions = {
  /**
   * Playwright page.
   */
  page: Page;
  /**
   * Absolute x-coordinate position to drag the handle to.
   */
  to: number;
  /**
   * If `true`, the mouse wil not be lifted up after dragging.
   */
  preventUp?: boolean;
  /**
   * Optional locator to use to find the resize handle button.
   * If unset, the page will be used to locate the handle.
   */
  component?: Locator;
};

/**
 * Drags the resize handle / mouse to a given position.
 */
export const dragResizeHandle = async ({
  page,
  to,
  preventUp,
  component,
}: DragResizeHandleOptions) => {
  const button = (component ?? page).getByRole("button", { name: "Drag to change width" });
  await button.hover();

  await page.mouse.down();
  await page.mouse.move(to, 0);
  if (!preventUp) await page.mouse.up();
};
