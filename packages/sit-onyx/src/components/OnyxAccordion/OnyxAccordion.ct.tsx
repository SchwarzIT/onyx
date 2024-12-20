import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxAccordionItem from "../OnyxAccordionItem/OnyxAccordionItem.vue";
import OnyxAccordion from "./OnyxAccordion.vue";

test.describe("ScreenshotTest", () => {
  executeMatrixScreenshotTest({
    name: "Accordion",
    columns: DENSITIES,
    rows: ["default", "open", "hover", "focus-visible", "disabled", "skeleton"],
    component: (column, row) => (
      <OnyxAccordion
        style="width: 200px;"
        density={column}
        skeleton={row === "skeleton"}
        disabled={row === "disabled"}
      >
        <OnyxAccordionItem>
          <template v-slot:header>Accordion Header 1</template>
          <template v-slot:panel>Accordion Panel 1</template>
        </OnyxAccordionItem>
        <OnyxAccordionItem>
          <template v-slot:header>Accordion Header 2</template>
          <template v-slot:panel>Accordion Panel 2</template>
        </OnyxAccordionItem>
      </OnyxAccordion>
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

// Test for exclusive mode
test("should open only one item at a time in exclusive mode", async ({ mount, makeAxeBuilder }) => {
  const component = await mount(
    <OnyxAccordion exclusive>
      <OnyxAccordionItem>
        <template v-slot:header>Accordion Header 1</template>
        <template v-slot:panel>Accordion Panel 1</template>
      </OnyxAccordionItem>
      <OnyxAccordionItem>
        <template v-slot:header>Accordion Header 2</template>
        <template v-slot:panel>Accordion Panel 2</template>
      </OnyxAccordionItem>
    </OnyxAccordion>,
  );

  const firstHeader = component.locator(".onyx-accordion-item__header").first();
  const secondHeader = component.locator(".onyx-accordion-item__header").nth(1);

  await firstHeader.click();
  await expect(component.locator(".onyx-accordion-item__panel").first()).toBeVisible();
  await expect(component.locator(".onyx-accordion-item__panel").nth(1)).toBeHidden();

  await secondHeader.click();
  await expect(component.locator(".onyx-accordion-item__panel").first()).toBeHidden();
  await expect(component.locator(".onyx-accordion-item__panel").nth(1)).toBeVisible();

  const accessibilityScanResults = await makeAxeBuilder().analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
