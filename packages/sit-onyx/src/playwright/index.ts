import type { Locator, Page } from "@playwright/test";

/**
 * Drags the resize handle / mouse to a given position.
 */
export const dragResizeHandle = async ({
  page,
  to,
  preventUp,
  component,
}: {
  page: Page;
  to: number;
  preventUp?: boolean;
  component?: Locator;
}) => {
  const button = (component ?? page).getByRole("button", { name: "Drag to change width" });
  await button.hover();

  await page.mouse.down();
  await page.mouse.move(to, 0);
  if (!preventUp) await page.mouse.up();
};
