import { OnyxAccordionItem } from "../../index.ts";
import { expect, test } from "../../playwright/a11y";

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
