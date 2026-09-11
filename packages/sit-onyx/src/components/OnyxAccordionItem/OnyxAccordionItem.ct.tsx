import { iconPlaceholder } from "@sit-onyx/icons";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxAccordionItem from "../OnyxAccordionItem/OnyxAccordionItem.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Accordion item",
    columns: ["default"],
    rows: ["default"],
    component: () => (
      <OnyxAccordionItem value="1">
        <template v-slot:header>
          <OnyxIcon icon={iconPlaceholder} />
          Example label
        </template>
        Content
      </OnyxAccordionItem>
    ),
  });
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
