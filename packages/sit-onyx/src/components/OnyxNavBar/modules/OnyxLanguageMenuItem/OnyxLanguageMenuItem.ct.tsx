import { expect, test } from "../../../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots.js";
import OnyxLanguageMenuItem from "./OnyxLanguageMenuItem.vue";

const OPTIONS = [
  { value: "en-US", label: "English" },
  { value: "de-DE", label: "Deutsch" },
];

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Language menu item",
    columns: ["default"],
    rows: ["default", "hover"],
    component: () => (
      <ul style={{ listStyle: "none", padding: 0 }} role="menu">
        <OnyxLanguageMenuItem options={OPTIONS} modelValue={OPTIONS[0].value} />
      </ul>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "hover") await component.getByText("Language: English").hover();
      },
    },
  });
});

test("should behave correctly", async ({ page, mount }) => {
  const modelValueEvents: string[] = [];

  // ARRANGE
  const component = await mount(OnyxLanguageMenuItem, {
    props: {
      options: OPTIONS,
      modelValue: OPTIONS[0].value,
    },
    on: {
      "update:modelValue": (value: string) => modelValueEvents.push(value),
    },
  });

  // ASSERT
  await expect(component).toContainText("Language: English");

  // ACT
  await component.click();

  // ASSERT
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  // ACT
  await dialog.getByText("Deutsch").click();
  await dialog.getByRole("button", { name: "Apply" }).click();
  await component.update({ props: { modelValue: "de-DE" } });

  // ASSERT
  expect(modelValueEvents).toStrictEqual(["de-DE"]);
  await expect(component).toContainText("Language: Deutsch");
});
