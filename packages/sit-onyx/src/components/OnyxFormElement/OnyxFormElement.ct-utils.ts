import type { MountResultJsx } from "@playwright/experimental-ct-vue";
import { type Locator, type Page } from "@playwright/test";
import { expect } from "../../playwright/a11y.js";

type PageOrLocator = Page | Locator | MountResultJsx;
type FormElementTooltip = "label" | "message";

export const createFormElementUtils = function (page: PageOrLocator) {
  const context = {
    getRoot: (prev: PageOrLocator = page) =>
      prev.locator(".onyx-form-element,.onyx-form-element-v2"),
    getTooltipTrigger: (type: FormElementTooltip, prev: PageOrLocator = page) => {
      // support both OnyxFormElement and OnyxFormElementV2
      const locators = {
        v1:
          type === "label"
            ? `.onyx-form-element__${type}-tooltip figure`
            : `.onyx-form-${type}__tooltip`,
        v2: `.onyx-form-element-v2__${type} .onyx-form-element-v2__tooltip figure`,
      };

      return context.getRoot(prev).locator(`${locators.v1},${locators.v2}`);
    },
    getTooltipPopover: (type: FormElementTooltip, prev: PageOrLocator = page) => {
      // support both OnyxFormElement and OnyxFormElementV2
      const locators = {
        v1:
          type === "label" ? `.onyx-form-element__${type}-tooltip` : `.onyx-form-${type}__tooltip`,
        v2: `.onyx-form-element-v2__${type} .onyx-form-element-v2__tooltip`,
      };

      return context
        .getRoot(prev)
        .locator(`${locators.v1},${locators.v2}`)
        .getByRole("tooltip", { includeHidden: true });
    },
    triggerTooltipVisible: async (type: FormElementTooltip, prev: PageOrLocator = page) => {
      await context.getTooltipTrigger(type, prev).first().hover();
      await expect(context.getTooltipPopover(type, prev).first()).toBeVisible();
    },
  };
  return context;
};

// .onyx-form-element-v2__${type} .onyx-form-element-v2__tooltip figure
