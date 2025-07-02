import type { MountResultJsx } from "@playwright/experimental-ct-vue";
import { type Locator, type Page } from "@playwright/test";
import { expect } from "../../playwright/a11y.js";

type PageOrLocator = Page | Locator | MountResultJsx;
type FormElementTooltip = "label" | "message";

export const createFormElementUtils = function (page: PageOrLocator) {
  const context = {
    getRoot: (prev: PageOrLocator = page) => prev.locator(".onyx-form-element"),
    getTooltipTrigger: (type: FormElementTooltip, prev: PageOrLocator = page) =>
      context
        .getRoot(prev)
        .locator(
          type === "label"
            ? `.onyx-form-element__${type}-tooltip figure`
            : `.onyx-form-${type}__tooltip`,
        ),
    getTooltipPopover: (type: FormElementTooltip, prev: PageOrLocator = page) =>
      context
        .getRoot(prev)
        .locator(
          type === "label" ? `.onyx-form-element__${type}-tooltip` : `.onyx-form-${type}__tooltip`,
        )
        .getByRole("tooltip", { includeHidden: true }),
    triggerTooltipVisible: async (type: FormElementTooltip, prev: PageOrLocator = page) => {
      await context.getTooltipTrigger(type, prev).first().hover();
      await expect(context.getTooltipPopover(type, prev).first()).toBeVisible();
    },
  };
  return context;
};
