import { DENSITIES } from "../../composables/density";
import type { FormMessages } from "../../composables/useCustomValidity";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { createFormElementUtils } from "../OnyxFormElement/OnyxFormElement.ct-utils";
import OnyxStepper from "./OnyxStepper.vue";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "autofill"] as const) {
    executeMatrixScreenshotTest({
      name: `Stepper (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus"],
      // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      disabledAccessibilityRules: ["color-contrast"],
      component: (column) => {
        return <OnyxStepper label="Test label" density={column} style="width: 12rem;" />;
      },
      beforeScreenshot: async (component, page, column, row) => {
        const input = component.getByLabel("Test label");
        if (row === "hover") await input.hover();
        if (row === "focus") await input.focus();
        if (state == "autofill") {
          await input.fill("10");
          await input.evaluate((node) => node.setAttribute("data-test-autofill", ""));
        }
      },
    });
  }

  executeMatrixScreenshotTest({
    name: "Stepper (required/optional)",
    columns: ["default", "long-text", "hideLabel"],
    rows: ["required", "optional", "message"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very long label that should be truncated" : "Test label";
      const message =
        column === "long-text" ? "Very long message that should be truncated" : "Test message";

      return (
        <OnyxStepper
          style="width: 12rem"
          label={label}
          hideLabel={column === "hideLabel"}
          required={row === "required"}
          requiredMarker={row === "optional" ? "optional" : undefined}
          message={row === "message" ? message : undefined}
        />
      );
    },
  });

  executeMatrixScreenshotTest({
    name: "Stepper (labelTooltip/messageTooltip)",
    columns: ["default", "long-text"],
    rows: ["labelTooltip", "messageTooltip"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very very long label that should be truncated" : "Test label";
      const message =
        column === "long-text" ? "Very long message that should be truncated" : "Test message";
      const labelTooltip = "More information";
      const messageTooltip = "Additional info message";

      return (
        <OnyxStepper
          style="width: 12rem"
          label={label}
          message={row === "messageTooltip" ? message : undefined}
          labelTooltip={row === "labelTooltip" ? labelTooltip : undefined}
          messageTooltip={row === "messageTooltip" ? messageTooltip : undefined}
        />
      );
    },
    beforeScreenshot: async (component, page, _column, _row) => {
      await component.evaluate((element) => {
        element.style.padding = `3rem 5rem`;
      });

      await createFormElementUtils(page).triggerTooltipVisible(
        _row === "labelTooltip" ? "label" : "message",
      );
    },
  });

  executeMatrixScreenshotTest({
    name: "Stepper (message replacement on invalid)",
    columns: ["default", "long-text"],
    rows: ["messageTooltip", "error", "errorTooltip"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => {
      const showLongMessage = column !== "default";
      const label = column === "long-text" ? "Test label that should be truncated" : "Test label";
      const message = showLongMessage
        ? "Very long message that should be truncated"
        : "Test message";
      const errorMessages: FormMessages = {
        shortMessage: showLongMessage
          ? "Very long error preview that should be truncated"
          : "Test error",
        longMessage: row === "errorTooltip" ? "Extended error information" : undefined,
      };
      const messageTooltip = "Additional info message";

      return (
        <OnyxStepper
          style="width: 12rem"
          label={label}
          message={message}
          customError={row !== "messageTooltip" ? errorMessages : undefined}
          messageTooltip={messageTooltip}
          modelValue={10}
        />
      );
    },
    beforeScreenshot: async (component, page, _column, row) => {
      const input = component.getByLabel("Test label");

      // invalid is only triggered after touched
      await input.fill("10");
      await input.blur();

      await component.evaluate((element) => {
        element.style.padding = `0 5rem 3rem 2rem`;
      });

      if (row !== "error") {
        await createFormElementUtils(page).triggerTooltipVisible(
          row === "errorTooltip" ? "error" : "message",
        );
      }
    },
  });

  executeMatrixScreenshotTest({
    name: "Stepper (required/optional) with label tooltip",
    columns: ["default", "long-text"],
    rows: ["required", "optional"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very long label that should be truncated" : "Test label";
      const labelTooltip = "More information";

      return (
        <OnyxStepper
          style="width: 12rem"
          label={label}
          required={row === "required"}
          requiredMarker={row === "optional" ? "optional" : undefined}
          labelTooltip={labelTooltip}
        />
      );
    },
    beforeScreenshot: async (component, page, _column, _row) => {
      await component.evaluate((element) => {
        element.style.padding = `3rem 5rem`;
      });

      await createFormElementUtils(page).triggerTooltipVisible("label");
    },
  });

  executeMatrixScreenshotTest({
    name: "Stepper (readonly, disabled, loading)",
    columns: ["readonly", "disabled", "loading"],
    rows: ["default", "hover", "focus"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column) => (
      <OnyxStepper
        style="width: 12rem"
        label="Test label"
        placeholder="0"
        readonly={column === "readonly"}
        disabled={column === "disabled"}
        loading={column === "loading"}
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "hover") await component.hover();
      if (row === "focus" && column !== "loading") await component.getByLabel("Test label").focus();
    },
  });

  executeMatrixScreenshotTest({
    name: "Stepper (invalid)",
    columns: ["default", "autofill"],
    rows: ["default", "hover", "focus"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: () => (
      <OnyxStepper
        style="width: 12rem"
        label="Test label"
        customError="Test error"
        modelValue={10}
      />
    ),
    beforeScreenshot: async (component, _page, column, row) => {
      const input = component.getByLabel("Test label");

      // invalid is only triggered after touched
      await input.fill("10");
      await input.blur();

      if (row === "hover") await input.hover();
      if (row === "focus") await input.focus();
      if (column == "autofill") {
        await input.evaluate((node) => node.setAttribute("data-test-autofill", ""));
      }
    },
  });

  executeMatrixScreenshotTest({
    name: "Stepper (skeleton)",
    columns: DENSITIES,
    rows: ["default", "hideLabel"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => (
      <OnyxStepper
        style="width: 12rem"
        label="Test label"
        density={column}
        hideLabel={row === "hideLabel"}
        skeleton
      />
    ),
  });
});

test("should emit events", async ({ mount, makeAxeBuilder }) => {
  const events = {
    updateModelValue: [] as string[],
  };

  // ARRANGE
  const component = await mount(
    <OnyxStepper
      label="Label"
      onUpdate:modelValue={(value) => events.updateModelValue.push(value)}
    />,
  );

  // should not emit initial events
  expect(events).toMatchObject({
    updateModelValue: [],
  });

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  const inputElement = component.getByLabel("Label");

  // ACT
  await inputElement.pressSequentially("10");

  // ASSERT
  // The initial value is 0.
  await expect(inputElement).toHaveValue("10");

  // ACT
  await inputElement.blur();
  // ASSERT
  expect(events).toMatchObject({
    updateModelValue: [10],
  });
});

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxStepper label="Test label" style="width: 12rem;" hideLabel />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});

test("should increment/decrement value by one on counter button click", async ({
  mount,
  makeAxeBuilder,
}) => {
  // ARRANGE
  const on = {
    "update:modelValue": (newValue) => {
      component.update({
        props: {
          modelValue: newValue,
        },
        on,
      });
    },
  };

  const component = await mount(OnyxStepper, {
    props: {
      label: "Test label",
      style: "width: 12rem;",
    },
    on,
  });

  const input = component.getByLabel("Test label");
  const incrementButton = component.getByLabel("Increment by 1");
  const decrementButton = component.getByLabel("Decrement by 1");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(component.getByLabel("Test label")).toBeAttached();

  await input.click();
  await input.fill("0");
  await expect(input).toHaveValue("0");

  await incrementButton.click();
  await expect(input).toHaveValue("1");

  await decrementButton.click();
  await expect(input).toHaveValue("0");
});

test("should increment/decrement value by step on counter button click", async ({
  mount,
  makeAxeBuilder,
}) => {
  // ARRANGE
  const on = {
    "update:modelValue": (newValue) => {
      component.update({
        props: {
          modelValue: newValue,
        },
        on,
      });
    },
  };

  const component = await mount(OnyxStepper, {
    props: {
      label: "Test label",
      style: "width: 12rem;",
      stepSize: 2,
    },
    on,
  });

  const input = component.getByLabel("Test label");
  const addButton = component.getByLabel("Increment");
  const substractButton = component.getByLabel("Decrement by 2");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(component.getByLabel("Test label")).toBeAttached();

  await input.click();
  await input.fill("0");
  await expect(input).toHaveValue("0");

  await addButton.click();
  await expect(input).toHaveValue("2");

  await substractButton.click();
  await expect(input).toHaveValue("0");
});

test("should not allow entering value over the max value that has been set", async ({
  mount,
  makeAxeBuilder,
}) => {
  // ARRANGE
  const on = {
    "update:modelValue": (newValue) => {
      component.update({
        props: {
          modelValue: newValue,
        },
        on,
      });
    },
  };

  const component = await mount(OnyxStepper, {
    props: {
      label: "Test label",
      style: "width: 12rem;",
      max: 2,
    },
    on,
  });

  const input = component.getByLabel("Test label");
  const addButton = component.getByLabel("Increment by 1");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(component.getByLabel("Test label")).toBeAttached();

  await input.click();
  await input.fill("0");
  await expect(input).toHaveValue("0");

  await addButton.click();
  await expect(input).toHaveValue("1");

  await addButton.click();
  await expect(input).toHaveValue("2");

  await expect(addButton).toBeDisabled();
});

test("should not allow entering value lower the min value that has been set", async ({
  mount,
  makeAxeBuilder,
}) => {
  // ARRANGE
  const on = {
    "update:modelValue": (newValue) => {
      component.update({
        props: {
          modelValue: newValue,
        },
        on,
      });
    },
  };

  const component = await mount(OnyxStepper, {
    props: {
      label: "Test label",
      style: "width: 12rem;",
      min: 2,
      modelValue: 4,
    },
    on,
  });

  const input = component.getByLabel("Test label");
  const substractButton = component.getByLabel("Decrement by 1");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(component.getByLabel("Test label")).toBeAttached();

  await substractButton.click();
  await expect(input).toHaveValue("3");

  await substractButton.click();
  await expect(input).toHaveValue("2");

  await expect(substractButton).toBeDisabled();
});

test("Should display the same number of decimal places as the smallest possible step", async ({
  mount,
  makeAxeBuilder,
}) => {
  // ARRANGE
  const on = {
    "update:modelValue": (newValue) => {
      component.update({
        props: {
          modelValue: newValue,
        },
        on,
      });
    },
  };

  const component = await mount(OnyxStepper, {
    props: {
      label: "Test label",
      style: "width: 12rem;",
      precision: 0.01,
    },
    on,
  });

  const input = component.locator("input");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  await input.fill("1");
  await input.dispatchEvent("change");
  await expect(input).toHaveValue("1.00");
});

test("Should display an error if the value is not a multiple of the precision", async ({
  page,
  mount,
  makeAxeBuilder,
}) => {
  // ARRANGE
  const on = {
    "update:modelValue": (newValue: number) => {
      component.update({
        props: {
          modelValue: newValue,
        },
        on,
      });
    },
  };

  const component = await mount(OnyxStepper, {
    props: {
      label: "Test label",
      style: "width: 12rem;",
      modelValue: 1,
      precision: 0.5,
    },
    on,
  });

  const input = component.getByLabel("Test label");
  const errorMessage = component.locator(".onyx-form-element__error-message");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  await input.fill("1");
  await page.keyboard.press("Enter");

  await expect(errorMessage).toBeHidden();
  await page.keyboard.press("Enter");

  await input.fill("3.6");
  await page.keyboard.press("Enter");

  await expect(errorMessage).toBeVisible();
});

test("Should revert to the last valid input if the current input is invalid in stripStep mode", async ({
  page,
  mount,
}) => {
  // ARRANGE
  const on = {
    "update:modelValue": (newValue: number) => {
      component.update({
        props: {
          modelValue: newValue,
        },
        on,
      });
    },
  };

  const component = await mount(OnyxStepper, {
    props: {
      label: "Test label",
      style: "width: 12rem;",
      precision: 0.5,
      stripStep: true,
    },
    on,
  });

  const input = component.locator("input");

  await input.fill("1");
  await page.keyboard.press("Enter");
  await expect(input).toHaveValue("1.0");
  await page.keyboard.press("Enter");
  await input.fill("1.6");
  await page.keyboard.press("Enter");
  await expect(input).toHaveValue("1.0");
});
