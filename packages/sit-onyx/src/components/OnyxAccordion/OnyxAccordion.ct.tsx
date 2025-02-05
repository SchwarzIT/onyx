import { DENSITIES } from "../../composables/density";
import { OnyxAccordionItem } from "../../index.ts";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";

import OnyxAccordion from "./OnyxAccordion.vue";

test.describe("ScreenshotTest", () => {
  executeMatrixScreenshotTest({
    name: "Accordion",
    columns: DENSITIES,
    rows: ["default", "open", "hover", "focus-visible", "disabled", "skeleton"],
    component: (column, row) => (
      <OnyxAccordion
        style="width: 20rem"
        density={column}
        skeleton={row === "skeleton"}
        disabled={row === "disabled"}
      >
        <OnyxAccordionItem value="item-1">
          <template v-slot:header>Accordion Header 1</template>
          Accordion Panel 1
        </OnyxAccordionItem>
        <OnyxAccordionItem value="item-2">
          <template v-slot:header>Accordion Header 2</template>
          Accordion Panel 2
        </OnyxAccordionItem>
      </OnyxAccordion>
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        if (row === "open") {
          await component.evaluate((element) => {
            element.style.padding = `auto 5rem`;
          });
          await component.getByRole("button", { name: "Accordion Header 1" }).click();
        }
        if (row === "hover")
          await component.getByRole("button", { name: "Accordion Header 1" }).hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
  executeMatrixScreenshotTest({
    name: "Accordion (disabled)",
    columns: ["closed", "open"],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxAccordion
        style="width: 16rem;"
        modelValue={column === "open" ? ["item-1"] : undefined}
        disabled
      >
        <OnyxAccordionItem value="item-1">
          <template v-slot:header>Accordion Header 1</template>
          Accordion Panel 1
        </OnyxAccordionItem>
        <OnyxAccordionItem value="item-2">
          <template v-slot:header>Accordion Header 2</template>
          Accordion Panel 2
        </OnyxAccordionItem>
      </OnyxAccordion>
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test("should open only one item at a time in exclusive mode", async ({ mount, makeAxeBuilder }) => {
  const component = await mount(
    <OnyxAccordion exclusive>
      <OnyxAccordionItem value="item-1">
        <template v-slot:header>Accordion Header 1</template>
        Accordion Panel 1
      </OnyxAccordionItem>
      <OnyxAccordionItem value="item-2">
        <template v-slot:header>Accordion Header 2</template>
        Accordion Panel 2
      </OnyxAccordionItem>
    </OnyxAccordion>,
  );

  const firstHeader = component.getByRole("button", { name: "Accordion Header 1" });
  const secondHeader = component.getByRole("button", { name: "Accordion Header 2" });
  const firstPanel = component.getByLabel("Accordion Header 1");
  const secondPanel = component.getByLabel("Accordion Header 2");

  await firstHeader.click();
  await expect(firstPanel).toBeVisible();
  await expect(secondPanel).toBeHidden();

  await secondHeader.click();
  await expect(firstPanel).toBeHidden();
  await expect(secondPanel).toBeVisible();

  const accessibilityScanResults = await makeAxeBuilder().analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
