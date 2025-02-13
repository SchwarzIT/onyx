import { DENSITIES } from "../../composables/density";
import { OnyxAccordionItem } from "../../index.ts";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";

test.describe("ScreenshotTest", () => {
  executeMatrixScreenshotTest({
    name: "AccordionItem",
    columns: DENSITIES,
    rows: ["default", "open", "hover", "focus-visible", "disabled", "skeleton"],
    component: (column, row) => (
      <OnyxAccordionItem
        style="width: 20rem"
        value="item"
        density={column}
        skeleton={row === "skeleton"}
        disabled={row === "disabled"}
      >
        <template v-slot:header>Accordion Header</template>
        Accordion Panel
      </OnyxAccordionItem>
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        if (row == "open")
          await component.getByRole("button", { name: "Accordion Header" }).click();
        if (row === "hover")
          await component.getByRole("button", { name: "Accordion Header" }).hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test("should toggle open state on click", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxAccordionItem value="item">
      <template v-slot:header>Accordion Header</template>
      Accordion Panel
    </OnyxAccordionItem>,
  );

  // Locators
  const header = component.getByRole("button", { name: "Accordion Header" });
  const panel = component.getByLabel("Accordion Header");

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

test("should apply the disabled state", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(
    <OnyxAccordionItem value="item" disabled>
      <template v-slot:header>Accordion Header</template>
      Accordion Panel
    </OnyxAccordionItem>,
  );

  const header = component.getByRole("button", { name: "Accordion Header" });

  // ACT
  await page.keyboard.press("Tab");

  // ASSERT
  await expect(header).not.toBeFocused();
  await expect(header).toBeDisabled();
});
