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
