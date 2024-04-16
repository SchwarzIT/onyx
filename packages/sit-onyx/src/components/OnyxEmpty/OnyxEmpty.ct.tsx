import { expect, test } from "../../playwright-axe";
import { mockPlaywrightIcon } from "../../utils/playwright";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxEmpty from "./OnyxEmpty.vue";

test("should render", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<OnyxEmpty>Example empty text</OnyxEmpty>);

  // TODO: add accessibility test once contrast issue is fixed by UX

  // ASSERT
  await expect(component).toContainText("Example empty text");
  await expect(component).toHaveScreenshot("default.png");
});

test("should render with custom icon", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxEmpty>
      Example empty text
      <template v-slot:icon>
        <OnyxIcon icon={mockPlaywrightIcon} color="danger" size="48px" />
      </template>
    </OnyxEmpty>,
  );

  // ASSERT
  await expect(component).toContainText("Example empty text");
  await expect(component).toHaveScreenshot("custom-icon.png");
});

test("should truncate text with multiline", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxEmpty style={{ width: "12rem" }}>Very long text that will be wrapped</OnyxEmpty>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("truncation.png");
});
