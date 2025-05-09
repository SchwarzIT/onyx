import type { Page } from "@playwright/test";

/**
 * Drags the resize handle / mouse to a given position.
 */
export const dragResizeHandle = async ({
  page,
  to,
  preventUp,
}: {
  page: Page;
  to: number;
  preventUp?: boolean;
}) => {
  const button = page.getByRole("button", { name: "Drag to change width" });
  await button.hover();

  await page.mouse.down();
  await page.mouse.move(to, 0);
  if (!preventUp) await page.mouse.up();
};
