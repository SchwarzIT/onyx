import { executeScreenshotsForAllStates, mockPlaywrightIcon } from "@/utils/playwright";
import { expect, test } from "../../playwright-axe";
import OnyxTooltip from "./OnyxTooltip.vue";

test("should pass accessibility checks", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  await mount(
    <div style={{ width: "max-content", padding: "3rem 1rem" }}>
      <OnyxTooltip text="Test tooltip" trigger={true}>
        Test slot content
      </OnyxTooltip>
    </div>,
  );

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should trigger with boolean", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxTooltip, {
    props: {
      text: "Test tooltip",
      trigger: false,
    },
  });

  const tooltip = component.getByRole("tooltip");

  // ASSERT
  await expect(tooltip).toBeHidden();

  // ACT
  await component.update({ props: { trigger: true } });

  // ASSERT
  await expect(tooltip).toBeVisible();
});

test("should trigger with hover", async ({ mount, page }) => {
  // ARRANGE
  let component = await mount(OnyxTooltip, {
    props: {
      text: "Test tooltip",
    },
    slots: {
      default: "Slot content",
    },
  });

  let tooltip = component.getByRole("tooltip");

  // ASSERT
  await expect(tooltip).toBeHidden();

  // ACT
  await component.hover();

  // ASSERT
  await expect(tooltip).toBeHidden(); // should use debounce to show tooltip only after a short delay
  await expect(tooltip).toBeVisible();

  await page.mouse.move(0, 0);
  await expect(tooltip).toBeVisible(); // should use debounce to hide tooltip only after a short delay
  await expect(tooltip).toBeHidden();

  // ACT
  await component.unmount();
  component = await mount(
    <OnyxTooltip text="Test tooltip">
      <span tabindex="0">Slot content</span>
    </OnyxTooltip>,
  );
  tooltip = component.getByRole("tooltip");

  await page.keyboard.press("Tab");
  await expect(tooltip).toBeVisible();

  await page.keyboard.press("Tab");
  await expect(tooltip).toBeHidden();
});

test("should trigger with click", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(OnyxTooltip, {
    props: {
      text: "Test tooltip",
      trigger: "click",
    },
    slots: {
      default: "Slot content",
    },
  });

  const tooltip = component.getByRole("tooltip");

  // ASSERT
  await expect(tooltip).toBeHidden();

  // ACT
  await component.click();

  // ASSERT
  await expect(tooltip).toBeVisible();

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  await expect(tooltip).toBeHidden();
});

const STATES = {
  variant: ["default", "bottom", "icon", "danger"],
  text: ["default", "long", "fitParent"],
} as const;

test.describe("state screenshot tests", () => {
  executeScreenshotsForAllStates(STATES, "tooltip", async ({ variant, text }, mount) => {
    const component = await mount(
      <div
        style={{
          width: "max-content",
        }}
      >
        <OnyxTooltip
          text={text === "long" ? "Lorem ipsum dolor sit amet ".repeat(3) : "Test tooltip"}
          color={variant === "danger" ? "danger" : undefined}
          position={variant === "bottom" ? "bottom" : undefined}
          icon={variant === "icon" ? mockPlaywrightIcon : undefined}
          fitParent={text === "fitParent"}
          trigger={true}
        >
          <span
            style={{
              fontFamily: "var(--onyx-font-family)",
              color: "var(--onyx-color-text-icons-neutral-intense)",
            }}
          >
            Here goes the slot content
          </span>
        </OnyxTooltip>
      </div>,
    );

    const tooltipSize = await component
      .getByRole("tooltip")
      .evaluate((element) => [element.clientHeight, element.clientWidth]);

    // set paddings to fit the full tooltip in the screenshot
    await component.evaluate(
      (element, { tooltipSize: [height, width], variant }) => {
        const verticalPadding = `${height + 12}px`;

        if (variant === "bottom") {
          element.style.paddingBottom = verticalPadding;
        } else {
          element.style.paddingTop = verticalPadding;
        }

        const widthDiff = width - element.clientWidth;
        if (widthDiff > 0) {
          const padding = `${widthDiff / 2 + 20}px`;
          element.style.paddingLeft = padding;
          element.style.paddingRight = padding;
        }
      },
      { tooltipSize, variant },
    );

    return component;
  });
});
