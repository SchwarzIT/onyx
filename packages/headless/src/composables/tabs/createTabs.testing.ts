import { expect } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";

export type TabsTestingOptions = {
  page: Page;
  /**
   * Locator of the tabs component. Must have at least 3 tabs where the first one is initially selected.
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

  const firstTab = options.tablist.getByRole("tab").first();
  const secondTab = options.tablist.getByRole("tab").nth(1);
  const lastTab = options.tablist.getByRole("tab").last();

  const { tabId, panelId } = await expectTabAttributes(firstTab, true);
  await expectPanelAttributes(options.page.locator(`#${panelId}`), tabId);

  // ACT (switch tab)
  await secondTab.click();

  const { tabId: tabId2, panelId: panelId2 } = await expectTabAttributes(secondTab, true);
  await expectPanelAttributes(options.page.locator(`#${panelId2}`), tabId2);
  await expect(secondTab, "second tab should be focused").toBeFocused();

  await expect(options.page.getByRole("tabpanel"), "should hide previous panel").toHaveCount(1);

  // keyboard support
  await options.page.keyboard.press("ArrowLeft");
  await expect(firstTab, "should focus previous tab when pressing arrow left").toBeFocused();

  await options.page.keyboard.press("End");
  await expect(lastTab, "should focus last tab when pressing End").toBeFocused();

  await options.page.keyboard.press("ArrowRight");
  await expect(
    firstTab,
    "should focus first tab when last tab is focused and pressing arrow right",
  ).toBeFocused();

  await options.page.keyboard.press("ArrowRight");
  await expect(secondTab, "should focus next tab when pressing arrow right").toBeFocused();

  await options.page.keyboard.press("Home");
  await expect(firstTab, "should focus first tab when pressing Home").toBeFocused();

  await options.page.keyboard.press("ArrowLeft");

  await expect(
    lastTab,
    "should focus last tab when first tab is focused and pressing arrow left",
  ).toBeFocused();

  // should select when pressing Enter
  await options.page.keyboard.press("Enter");
  const { tabId: tabIdLast, panelId: panelIdLast } = await expectTabAttributes(lastTab, true);
  await expectPanelAttributes(options.page.locator(`#${panelIdLast}`), tabIdLast);

  // should select when pressing Space
  await firstTab.focus();
  await options.page.keyboard.press("Space");
  const { tabId: tabIdFirst, panelId: panelIdFirst } = await expectTabAttributes(firstTab, true);
  await expectPanelAttributes(options.page.locator(`#${panelIdFirst}`), tabIdFirst);

  // should skip disabled tabs when using the keyboard
  await firstTab.click();
  await secondTab.evaluate((element) => (element.ariaDisabled = "true"));
  await expect(secondTab, "should disable second tab when setting aria-disabled").toBeDisabled();

  await options.page.keyboard.press("ArrowRight");
  await expect(secondTab, "should not focus second tab if its aria-disabled").not.toBeFocused();
  await expect(
    options.tablist.getByRole("tab").nth(2),
    "should focus next tab after disabled one when pressing arrow right",
  ).toBeFocused();

  await options.page.keyboard.press("ArrowLeft");
  await expect(
    firstTab,
    "should focus tab before disabled one when pressing arrow left",
  ).toBeFocused();

  await secondTab.evaluate((element) => (element.ariaDisabled = null));
  await firstTab.evaluate((element) => (element.ariaDisabled = "true"));
  await options.page.keyboard.press("Home");
  await expect(
    secondTab,
    "should focus second tab when pressing Home if first tab is disabled",
  ).toBeFocused();

  await firstTab.evaluate((element) => (element.ariaDisabled = null));
  await lastTab.evaluate((element) => (element.ariaDisabled = "true"));
  await firstTab.focus();
  await options.page.keyboard.press("End");
  await expect(
    options.tablist.getByRole("tab").nth(-2),
    "should focus second last tab when pressing End if last tab is disabled",
  ).toBeFocused();
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
