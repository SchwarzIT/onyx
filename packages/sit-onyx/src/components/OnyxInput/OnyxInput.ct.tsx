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

test("should show required marker", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<OnyxInput label="Label" style="width: 12rem;" required />);

  // ASSERT
  await expect(component).toHaveScreenshot("required.png");
});

test("should show optional marker", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxInput
      label="Very long label that should be truncated"
      style="width: 12rem;"
      class="onyx-use-optional"
    />,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("optional.png");
});

const STATES = {
  variant: ["default", "placeholder", "initialValue"],
  focusState: ["", "hover", "focus"],
} as const;

test(
  "State screenshot testing",
  createScreenshotsForAllStates(STATES, "button", async ({ variant, focusState }, mount) => {
    const component = await mount(
      <OnyxInput
        label="Label"
        modelValue={variant === "initialValue" ? "Test value" : undefined}
        placeholder={variant === "placeholder" ? "Placeholder..." : undefined}
        style="width: 12rem;"
      />,
    );

    const input = component.getByLabel("Label");

    if (focusState === "hover") await input.hover();
    if (focusState === "focus") await input.focus();
    return component;
  }),
);
