import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright-axe";
import {
  executeMatrixScreenshotTest,
  type MatrixScreenshotTestOptions,
} from "../../playwright/screenshots";
import { mockPlaywrightIcon } from "../../utils/playwright";
import OnyxButton from "./OnyxButton.vue";
import { BUTTON_MODES } from "./types";

test.describe("Screenshot tests", () => {
  const screenshotOptions = {
    columns: DENSITIES,
    rows: ["default", "hover", "active", "focus-visible"] as const,
    beforeScreenshot: async (component, page, column, row) => {
      await expect(component).toContainText("Button");
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
      if (row === "active") await page.mouse.down();
    },
  } satisfies Partial<MatrixScreenshotTestOptions>;

  for (const mode of BUTTON_MODES) {
    executeMatrixScreenshotTest({
      ...screenshotOptions,
      name: `Button (${mode})`,
      component: (density) => <OnyxButton label="Button" density={density} mode={mode} />,
    });
  }

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    columns: BUTTON_MODES,
    name: "Button (disabled)",
    component: (mode) => <OnyxButton label="Button" mode={mode} disabled />,
    beforeScreenshot: async (component, page, column, row) => {
      await expect(component.getByRole("button", { name: "Button" })).toBeDisabled();
      await screenshotOptions.beforeScreenshot(component, page, column, row);
    },
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Button (with icon)",
    columns: DENSITIES,
    rows: BUTTON_MODES,
    component: (density, mode) => (
      <OnyxButton label="Button" density={density} mode={mode} icon={mockPlaywrightIcon} />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Button (other)",
    columns: DENSITIES,
    rows: ["truncation", "skeleton"],
    component: (density, row) => {
      const label = row === "truncation" ? "Very long label that should be truncated" : "Button";

      return (
        <OnyxButton
          label={label}
          density={density}
          skeleton={row === "skeleton"}
          style={row === "truncation" ? "max-width: 8rem;" : undefined}
        />
      );
    },
  });
});

test("should render button inline aligned with text", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <p class="onyx-text" style="line-height: 60px; width: max-content;">
      before
      <OnyxButton label="Test label" />
      between
      <OnyxButton label="Test label" skeleton />
      after
    </p>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("inline-aligned.png");
});
