import { executeScreenshotsForAllStates, mockPlaywrightIcon } from "@/utils/playwright";
import { expect, test } from "../../playwright-axe";
import OnyxTooltip from "./OnyxTooltip.vue";

test("should pass accessibility checks", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  await mount(
    <div style={{ width: "max-content", padding: "3rem 1rem" }}>
      <OnyxTooltip text="Test tooltip">Test slot content</OnyxTooltip>
    </div>,
  );

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
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
