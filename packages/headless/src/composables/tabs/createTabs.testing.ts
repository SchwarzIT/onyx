import { expect } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";

export type TabsTestingOptions = {
  page: Page;
  /**
   * Locator of the tabs component.
   */
  tablist: Locator;
};

/**
 * Playwright utility for executing accessibility testing for tabs.
 * Will check aria attributes and keyboard shortcuts as defined in https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */
export const tabsTesting = async (options: TabsTestingOptions) => {
  await expect(options.tablist, 'tablist element must have role "tablist"').toHaveRole("tablist");
  await expect(options.tablist, "tablist must have an accessible label").toHaveAttribute(
    "aria-label",
  );

  const activeTab = options.tablist.locator('[aria-selected="true"]');
  await expect(activeTab, "must have an initially active tab").toBeVisible();

  const { tabId, panelId } = await expectTabAttributes(activeTab, true);
  await expectPanelAttributes(options.page.locator(`#${panelId}`), tabId);

  // ACT (switch tab)
  let tab2 = options.tablist.locator('[aria-selected="false"]').first();
  tab2 = options.tablist.locator(`#${await tab2.getAttribute("id")}`);
  await tab2.click();

  const { tabId: tabId2, panelId: panelId2 } = await expectTabAttributes(tab2, true);
  await expectPanelAttributes(options.page.locator(`#${panelId2}`), tabId2);

  await expect(options.page.getByRole("tabpanel"), "should hide previous panel").toHaveCount(1);
};

/**
 * Executes accessibility tests for a single tab.
 *
 * @param tab Locator of the tab.
 * @param selected Whether the tab is expected to be selected
 */
const expectTabAttributes = async (tab: Locator, selected: boolean) => {
  await expect(tab, 'tab must have role "tab"').toHaveRole("tab");
  await expect(tab, "tab must have an ID").toHaveAttribute("id");
  await expect(tab, 'tab must have "aria-selected" set').toHaveAttribute(
    "aria-selected",
    String(selected),
  );
  await expect(tab, 'tab must have "aria-controls" set').toHaveAttribute("aria-controls");

  if (selected) {
    await expect(tab, "selected tab should be focusable").toHaveAttribute("tabindex", "0");
  } else {
    await expect(tab, "unselected tab should NOT be focusable").toHaveAttribute("tabindex", "-1");
  }

  const tabId = (await tab.getAttribute("id"))!;
  const panelId = (await tab.getAttribute("aria-controls"))!;
  return { tabId, panelId };
};

/**
 * Executes accessibility tests for a single tab panel.
 *
 * @param panel Locator of the panel
 * @param tabId Corresponding tab id
 */
const expectPanelAttributes = async (panel: Locator, tabId: string) => {
  await expect(panel, "panel should be visible").toBeVisible();
  await expect(panel, 'panel must have role "tabpanel"').toHaveRole("tabpanel");
  await expect(panel, "panel must have an ID").toHaveAttribute("id");
  await expect(panel, 'panel must have "aria-labelledby" set').toHaveAttribute(
    "aria-labelledby",
    tabId,
  );
};
