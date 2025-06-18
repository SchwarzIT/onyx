import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { ORIENTATIONS } from "../../types";
import OnyxProgressSteps from "./OnyxProgressSteps.vue";
import type { ControlledProgressStep } from "./types";

const STEPS: ControlledProgressStep[] = [
  { label: "Cart" },
  { label: "Shipping" },
  { label: "Payment" },
];

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Progress steps",
    columns: ORIENTATIONS,
    rows: DENSITIES,
    component: (column, row) => (
      <OnyxProgressSteps density={row} orientation={column} steps={STEPS} modelValue={2} />
    ),
  });
});

test.describe("Screenshot tests (visited)", () => {
  executeMatrixScreenshotTest({
    name: "Progress steps (visited steps)",
    columns: ORIENTATIONS,
    rows: DENSITIES,
    component: (column, row) => (
      <OnyxProgressSteps density={row} orientation={column} steps={STEPS} highestValue={3} />
    ),
  });
});

test.describe("Screenshot tests (skeleton)", () => {
  executeMatrixScreenshotTest({
    name: "Progress steps (skeleton)",
    columns: ORIENTATIONS,
    rows: DENSITIES,
    component: (column, row) => (
      <OnyxProgressSteps density={row} orientation={column} steps={STEPS} skeleton />
    ),
  });
});

test.describe("Screenshot tests (max size)", () => {
  executeMatrixScreenshotTest({
    name: "Progress steps (max size)",
    columns: ["default", "scrolled", "focus-visible"],
    rows: ORIENTATIONS,
    component: (column, row) => (
      <OnyxProgressSteps
        orientation={row}
        steps={STEPS}
        style={{ maxWidth: "9rem", maxHeight: "7rem" }}
        modelValue={2}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column) => {
        if (column === "scrolled") {
          await component
            .getByRole("button", { name: STEPS.at(-1)!.label })
            .scrollIntoViewIfNeeded();
        }
        if (column === "focus-visible") {
          await page.keyboard.press("Tab");
        }
      },
    },
  });
});

test("should behave correctly", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxProgressSteps, {
    props: {
      steps: STEPS,
    },
  });

  const buttons = {
    1: component.getByRole("button", { name: "Cart" }),
    2: component.getByRole("button", { name: "Shipping" }),
    3: component.getByRole("button", { name: "Payment" }),
  };

  // ASSERT
  await expect(buttons[1]).toBeEnabled();
  await expect(buttons[2]).toBeDisabled();
  await expect(buttons[3]).toBeDisabled();

  // ACT
  await component.update({ props: { modelValue: 2 } });

  // ASSERT
  await expect(buttons[1]).toBeEnabled();
  await expect(buttons[2]).toBeEnabled();
  await expect(buttons[3]).toBeDisabled();

  // ACT
  await component.update({ props: { modelValue: 3 } });

  // ASSERT
  await expect(buttons[1]).toBeEnabled();
  await expect(buttons[2]).toBeEnabled();
  await expect(buttons[3]).toBeEnabled();

  // ACT
  await component.update({ props: { modelValue: 1, highestValue: 3 } });

  // ASSERT
  await expect(buttons[1]).toBeEnabled();
  await expect(buttons[2]).toBeEnabled();
  await expect(buttons[3]).toBeEnabled();
});
