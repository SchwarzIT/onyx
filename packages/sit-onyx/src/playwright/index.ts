import type { Locator, Page } from "@playwright/test";
import type { PopoverPosition } from "../components/OnyxSupportPopover/types.js";

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

export const POPOVER_POSITION_TEST_CASES = {
  top: ["top left", "top center", "top right", "top span-left", "top span-x-end", "top span-all"],
  bottom: [
    "bottom left",
    "bottom center",
    "bottom right",
    "bottom span-left",
    "bottom span-x-end",
    "bottom span-all",
  ],
  left: ["center left", "left span-top", "left span-bottom", "left span-all"],
  right: ["center right", "right span-top", "right span-bottom", "right span-all"],
} satisfies Record<string, PopoverPosition[]>;
