import type { MountResultJsx } from "@playwright/experimental-ct-vue";
import { type Locator, type Page } from "@playwright/test";
import { expect } from "../../playwright/a11y";

type PageOrLocator = Page | Locator | MountResultJsx;
type FormElementTooltip = "label" | "error" | "message";

export const createFormElementUtils = function (page: PageOrLocator) {
  const context = {
    getRoot: (prev: PageOrLocator = page) => prev.locator(".onyx-form-element"),
    getTooltipTrigger: (type: FormElementTooltip, prev: PageOrLocator = page) =>
      context.getRoot(prev).locator(`.onyx-form-element__${type}-tooltip figure`),
    getTooltipPopover: (type: FormElementTooltip, prev: PageOrLocator = page) =>
      context
        .getRoot(prev)
        .locator(`.onyx-form-element__${type}-tooltip`)
        .getByRole("tooltip", { includeHidden: true }),
    triggerTooltipVisible: async (type: FormElementTooltip, prev: PageOrLocator = page) => {
      await context.getTooltipTrigger(type, prev).hover();
      await expect(context.getTooltipPopover(type, prev)).toBeVisible();
    },
  };
  return context;
};
