import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxAccordionItem from "./OnyxAccordionItem.vue";

test.describe("ScreenshotTest", () => {
  executeMatrixScreenshotTest({
    name: "AccordionItem",
    columns: DENSITIES,
    rows: ["default", "open", "hover", "focus-visible", "disabled", "skeleton"],
    component: (column, row) => (
      <OnyxAccordionItem
        style="width: 200px;"
        density={column}
        skeleton={row === "skeleton"}
        disabled={row === "disabled"}
      >
        <template v-slot:header>Accordion Header</template>
        <template v-slot:panel>Accordion Panel</template>
      </OnyxAccordionItem>
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        if (row == "open") await component.locator(".onyx-accordion-item__header").click();
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test("should toggle open state on click", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxAccordionItem>
      <template v-slot:header>Accordion Header</template>
      <template v-slot:panel>Accordion Panel</template>
    </OnyxAccordionItem>,
  );

  // Locators
  const header = component.locator(".onyx-accordion-item__header");
  const panel = component.locator(".onyx-accordion-item__panel");

  await expect(panel).toBeHidden();
  await header.click();
  await expect(panel).toBeVisible();
  await header.click();
  await expect(panel).toBeHidden();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
test("should apply the disabled state", async ({ mount, makeAxeBuilder }) => {
  const component = await mount(
    <OnyxAccordionItem disabled>
      <template v-slot:header>Accordion Header</template>
      <template v-slot:panel>Accordion Panel</template>
    </OnyxAccordionItem>,
  );

  // Locators
  const header = component.locator(".onyx-accordion-item__header");
  await expect(header).toHaveAttribute("tabindex", "-1");

  const accessibilityScanResults = await makeAxeBuilder().analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
