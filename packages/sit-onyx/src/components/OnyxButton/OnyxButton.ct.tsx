import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.js";
import OnyxButton from "./OnyxButton.vue";
import { BUTTON_COLORS, BUTTON_MODES } from "./types.js";

const screenshotOptions = {
  rows: ["default", "hover", "active", "focus-visible"] as const,
  hooks: {
    beforeEach: async (component, page, column, row) => {
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
      if (row === "active") await page.mouse.down();
    },
  },
} satisfies Partial<MatrixScreenshotTestOptions>;

test.describe("Screenshot tests", () => {
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

    executeMatrixScreenshotTest({
      ...screenshotOptions,
      columns: BUTTON_COLORS,
      name: `Button (${mode}, with link)`,
      component: (column) => <OnyxButton label="Button" mode={mode} color={column} link="#test" />,
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

test.describe("Screenshot tests (right icon)", () => {
  executeMatrixScreenshotTest({
    name: "Button (right icon)",
    columns: ["default"],
    rows: ["default", "loading"],
    component: (column, row) => (
      <OnyxButton
        label="Button"
        icon={mockPlaywrightIcon}
        iconPosition="right"
        loading={row === "loading"}
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

test("should behave as link", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(<OnyxButton label="Test label" link="#test-section" />);

  // ASSERT
  await expect(component).toHaveRole("link");
  await expect(component).toHaveAccessibleName("Test label");

  // ACT
  await component.click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#test-section$/);
});
