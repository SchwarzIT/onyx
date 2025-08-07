import { iconEmojiHappy2 } from "@sit-onyx/icons";
import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxSelectDialog from "./OnyxSelectDialog.vue";
import type { SelectDialogOption } from "./types.js";

const OPTIONS: SelectDialogOption[] = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2", icon: iconEmojiHappy2 },
  { label: "Option 3", value: "option-3", description: "Example description" },
];

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Select dialog",
    columns: ["default"],
    rows: ["default", "hover", "many-options"],
    component: (column, row) => {
      const options =
        row === "many-options"
          ? Array.from({ length: 8 }, (_, index) => ({
              label: `Option ${index + 1}`,
              value: `option-${index + 1}`,
            }))
          : OPTIONS;

      return (
        <OnyxSelectDialog label="Example label" options={options} modelValue={"option-1"} open>
          <template v-slot:description>Lorem ipsum dolor sit amet</template>
        </OnyxSelectDialog>
      );
    },
    hooks: {
      // set component size to fully include the tooltip
      beforeEach: async (component, page, column, row) => {
        const size = await component
          .getByRole("dialog")
          .evaluate((element: HTMLElement) => [element.offsetHeight, element.offsetWidth]);

        const height = size[0] + 48;
        const width = size[1] + 16;

        await page.setViewportSize({ height, width });

        // set paddings to fit the full tooltip in the screenshot
        await component.evaluate(
          (element, { height, width }) => {
            element.style.height = `${height}px`;
            element.style.width = `${width}px`;
          },
          { height, width },
        );

        if (row === "hover") {
          await component.getByText("Option 1").hover();
        }

        if (row === "many-options") {
          await component.getByText("Option 8").scrollIntoViewIfNeeded();
        }
      },
    },
  });
});

test("should behave correctly", async ({ mount, page }) => {
  await page.setViewportSize({ width: 512, height: 640 });

  const onUpdateModelValue = createEmitSpy<typeof OnyxSelectDialog, "onUpdate:modelValue">();
  const onUpdateOpen = createEmitSpy<typeof OnyxSelectDialog, "onUpdate:open">();

  // ARRANGE
  const component = await mount(
    <OnyxSelectDialog
      label="Example label"
      options={OPTIONS}
      modelValue="option-2"
      open
      style={{ width: "48rem" }}
      onUpdate:modelValue={onUpdateModelValue}
      onUpdate:open={onUpdateOpen}
    />,
  );

  const clickOption = (label: string) => {
    return component.getByText(label).click();
  };

  // ASSERT (should be focussed initially)
  await expect(component.getByLabel("Option 2")).toBeFocused();

  // ACT
  await page.keyboard.press("ArrowDown");

  // ASSERT
  await expect(component.getByLabel("Option 3")).toBeFocused();

  // ACT
  await page.keyboard.press("Enter");

  // ASSERT
  expectEmit(onUpdateModelValue, 1, ["option-3"]);
  expectEmit(onUpdateOpen, 1, [false]);

  // ACT
  await clickOption("Option 1");

  // ASSERT
  expectEmit(onUpdateModelValue, 1, ["option-3"]);

  await component.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  expectEmit(onUpdateModelValue, 2, ["option-1"]);
  expectEmit(onUpdateOpen, 2, [false]);

  // ACT
  await clickOption("Option 2");
  await component.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  expectEmit(onUpdateModelValue, 3, ["option-2"]);
  expectEmit(onUpdateOpen, 3, [false]);

  // ACT
  await component.getByRole("button", { name: "Cancel" }).click();

  // ASSERT
  expectEmit(onUpdateOpen, 4, [false]);

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  expectEmit(onUpdateOpen, 5, [false]);
});
