import { createScreenshotsForAllStates } from "@/utils/playwright";
import { expect, test } from "../../playwright-axe";
import OnyxInput from "./OnyxInput.vue";

test("should emit events", async ({ mount, makeAxeBuilder }) => {
  const events = {
    updateModelValue: [] as string[],
    change: [] as string[],
    focusCount: 0,
    blurCount: 0,
  };

  // ARRANGE
  const component = await mount(
    <OnyxInput
      label="Label"
      onUpdate:modelValue={(value) => events.updateModelValue.push(value)}
      onChange={(value) => events.change.push(value)}
      onFocus={() => events.focusCount++}
      onBlur={() => events.blurCount++}
    />,
  );

  // should not emit initial events
  expect(events).toMatchObject({
    updateModelValue: [],
    change: [],
    focusCount: 0,
    blurCount: 0,
  });

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  const inputElement = component.getByLabel("Label");

  // ACT
  await inputElement.pressSequentially("Test");

  // ASSERT
  await expect(inputElement).toHaveValue("Test");
  expect(events).toMatchObject({
    updateModelValue: ["T", "Te", "Tes", "Test"],
    change: [],
    focusCount: 1,
    blurCount: 0,
  });

  // ACT
  await inputElement.blur();
  expect(events).toMatchObject({
    updateModelValue: ["T", "Te", "Tes", "Test"],
    change: ["Test"],
    focusCount: 1,
    blurCount: 1,
  });
});

const STATES = {
  variant: ["default", "placeholder", "initialValue"],
  focusState: ["", "hover", "focus-visible"],
} as const;

test(
  "State screenshot testing",
  createScreenshotsForAllStates(STATES, "button", async ({ variant, focusState }, mount, page) => {
    const component = await mount(
      <OnyxInput
        label="Label"
        modelValue={variant === "initialValue" ? "Test value" : undefined}
        placeholder={variant === "placeholder" ? "Placeholder..." : undefined}
      />,
    );

    if (focusState === "focus-visible") await page.keyboard.press("Tab");
    if (focusState === "hover") await component.hover();
    return component;
  }),
);
