import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
  type MatrixScreenshotTestOptions,
} from "../../playwright/screenshots";
import OnyxButton from "./OnyxButton.vue";
import { BUTTON_COLORS, BUTTON_MODES } from "./types";

test.describe("Screenshot tests", () => {
  const screenshotOptions = {
    rows: ["default", "hover", "active", "focus-visible"] as const,
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
      if (row === "active") await page.mouse.down();
    },
  } satisfies Partial<MatrixScreenshotTestOptions>;

  for (const mode of BUTTON_MODES) {
    executeMatrixScreenshotTest({
      ...screenshotOptions,
      columns: BUTTON_COLORS,
      name: `Button (${mode})`,
      component: (column) => <OnyxButton label="Button" mode={mode} color={column} />,
    });

    executeMatrixScreenshotTest({
      ...screenshotOptions,
      columns: BUTTON_COLORS,
      name: `Button (${mode}, disabled)`,
      component: (column) => <OnyxButton label="Button" mode={mode} color={column} disabled />,
    });

    executeMatrixScreenshotTest({
      ...screenshotOptions,
      columns: BUTTON_COLORS,
      name: `Button (${mode}, with icon)`,
      component: (column) => (
        <OnyxButton label="Button" mode={mode} color={column} icon={mockPlaywrightIcon} />
      ),
    });

    executeMatrixScreenshotTest({
      ...screenshotOptions,
      columns: BUTTON_COLORS,
      name: `Button (${mode}, loading)`,
      component: (column) => <OnyxButton label="Button" mode={mode} color={column} loading />,
    });
  }

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    columns: DENSITIES,
    rows: [...BUTTON_MODES, "skeleton"],
    name: `Button (densities)`,
    component: (column, row) => (
      <OnyxButton
        label="Button"
        density={column}
        mode={row !== "skeleton" ? row : undefined}
        skeleton={row === "skeleton"}
      />
    ),
  });
});

test("should truncate text", async ({ mount }) => {
  const label = "Very long label that should be truncated";

  // ARRANGE
  const component = await mount(<OnyxButton label={label} style="max-width: 8rem;" />);

  // ASSERT
  await expect(component).toContainText(label);

  // ASSERT
  await expect(component).toHaveScreenshot("truncation-ellipsis.png");
});

test("should render button inline aligned with text", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <p
      class="onyx-text"
      style="line-height: 60px; width: max-content; font-family: var(--onyx-font-family);"
    >
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

test("should trigger some ripples", async ({ mount, page }) => {
  await page.addStyleTag({
    content: `.onyx-ripple__element {
    animation-duration: 5s;
  }`,
  });

  // ARRANGE
  const component = await mount(<OnyxButton label="Button" />);

  await component.click({ clickCount: 2 });
  await component.click({ clickCount: 1 });

  // ASSERT
  await expect(component.locator(".onyx-ripple__element")).toHaveCount(3);
});
