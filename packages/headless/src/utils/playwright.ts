import type { Locator, Page } from "@playwright/test";

export const createFocusCatcher = async (
  page: Page,
  target: Locator,
  location: "before" | "after" = "after",
) => {
  const testid = crypto.randomUUID();
  const catcher = page.getByTestId(testid);
  await target.evaluate(
    (g, { testid, location }) => {
      const input = document.createElement("input");
      input.dataset.testid = testid;
      input.addEventListener("focusout", () => input.focus());
      g[location](input);
    },
    { testid, location },
  );

  return {
    catcher,
    cleanUp: async () => catcher.evaluate((c) => c.remove()),
  };
};
