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
          padding: text === "long" ? "4rem 6rem" : "3rem 1rem",
        }}
      >
        <OnyxTooltip
          text={text === "long" ? "Lorem ipsum dolor sit amet ".repeat(5) : "Test tooltip"}
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

    return component;
  });
});
