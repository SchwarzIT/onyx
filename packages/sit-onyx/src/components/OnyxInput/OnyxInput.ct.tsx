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
  variant: ["default", "placeholder", "initialValue", "loading", "autofill"],
  writeMode: ["write", "readonly", "disabled"],
  focusState: ["", "hover", "focus"],
} as const;

test("should show message", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxInput label="Label" message="Test message" style="width: 12rem;" />,
  );
  const input = component.getByLabel("Label");

  // ACT
  await component.getByText("Test message").focus();

  // ASSERT
  await expect(component).toContainText("Test message");
  await expect(input).not.toBeFocused();
  await expect(component).toHaveScreenshot("message.png");
});

test("should show counter", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxInput label="Label" maxlength={16} modelValue="Test" withCounter style="width: 12rem;" />,
  );

  // ASSERT
  await expect(component).toContainText("4/16");
  await expect(component).toHaveScreenshot("counter.png");
});

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxInput label="Test label" style="width: 12rem;" hideLabel />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
  await expect(component).toHaveScreenshot();
});

test(
  "State screenshot testing",
  createScreenshotsForAllStates(
    STATES,
    "input",
    async ({ variant, writeMode, focusState }, mount) => {
      const component = await mount(
        <OnyxInput
          label="Label"
          modelValue={["initialValue", "loading"].includes(variant) ? "Test value" : undefined}
          placeholder={variant === "placeholder" ? "Placeholder..." : undefined}
          readonly={writeMode === "readonly"}
          disabled={writeMode === "disabled"}
          loading={variant === "loading"}
          autocomplete={variant === "autofill" ? "name" : undefined}
          style="width: 12rem;"
        />,
      );

      const input = component.getByLabel("Label");

      if (variant == "autofill") {
        await input.evaluate((node) => node.setAttribute("data-test-autofill", ""));
      }

      if (focusState === "hover") await input.hover();
      if (focusState === "focus") await input.focus();
      return component;
    },
  ),
);
