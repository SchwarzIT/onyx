import type { Locator, Page } from "@playwright/test";

type PageLocater = Page | Locator;

export const tooltipUtils = (page: Page) => ({
  getTrigger: (type: "label" | "error" | "message", prev: PageLocater = page) =>
    prev.locator(`.onyx-form-element__${type}-tooltip figure`),
  getTooltipPopover: (type: "label" | "error" | "message", prev: PageLocater = page) =>
    prev.locator(`.onyx-form-element__${type}-tooltip`).getByRole("tooltip"),
});
