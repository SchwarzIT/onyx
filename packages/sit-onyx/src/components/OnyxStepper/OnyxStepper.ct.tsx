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
      component: (column) => {
        return <OnyxStepper label="Test label" density={column} style="width: 12rem;" />;
      },
      hooks: {
        beforeEach: async (component, page, column, row) => {
          const input = component.getByLabel("Test label");
          if (row === "hover") await input.hover();
          if (row === "focus") await input.focus();
          if (state == "autofill") {
            await input.fill("10");
            await input.evaluate((node) => node.setAttribute("data-test-autofill", ""));
          }
        },
      },
    });
  }

  executeMatrixScreenshotTest({
    name: "Stepper (required/optional)",
    columns: ["default", "long-text", "hideLabel"],
    rows: ["required", "optional", "message"],
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very long label that should be truncated" : "Test label";
      const message = {
        shortMessage:
          column === "long-text" ? "Very long message that should be truncated" : "Test message",
      };

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
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very very long label that should be truncated" : "Test label";
      const message = {
        shortMessage:
          column === "long-text" ? "Very long message that should be truncated" : "Test message",
        longMessage: "Additional info message",
      };
      const labelTooltip = "More information";

      return (
        <OnyxStepper
          style="width: 12rem"
          label={label}
          message={row === "messageTooltip" ? message : undefined}
          labelTooltip={row === "labelTooltip" ? labelTooltip : undefined}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, _column, _row) => {
        await component.evaluate((element) => {
          element.style.padding = `3rem 5rem`;
        });

        await createFormElementUtils(page).triggerTooltipVisible(
          _row === "labelTooltip" ? "label" : "message",
        );
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Stepper (message replacement on invalid)",
    columns: ["default", "long-text"],
    rows: ["messageTooltip", "error", "errorTooltip"],
    component: (column, row) => {
      const showLongMessage = column !== "default";
      const label = column === "long-text" ? "Test label that should be truncated" : "Test label";
      const message = {
        shortMessage: showLongMessage
          ? "Very long message that should be truncated"
          : "Test message",
        longMessage: "Additional info message",
      };
      const errorMessage: FormMessages = {
        shortMessage: showLongMessage
          ? "Very long error preview that should be truncated"
          : "Test error",
        longMessage: row === "errorTooltip" ? "Extended error information" : undefined,
      };

      return (
        <OnyxStepper
          style="width: 12rem"
          label={label}
          message={message}
          customError={row !== "messageTooltip" ? errorMessage : undefined}
          modelValue={10}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const input = component.getByLabel("Test label");

        // invalid is only triggered after touched
        await input.fill("10");
        await input.blur();

        await component.evaluate((element) => {
          element.style.padding = `0 5rem 3rem 2rem`;
        });

        if (row !== "error") {
          await createFormElementUtils(page).triggerTooltipVisible("message");
        }
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Stepper (required/optional) with label tooltip",
    columns: ["default", "long-text"],
    rows: ["required", "optional"],
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
    hooks: {
      beforeEach: async (component, page, _column, _row) => {
        await component.evaluate((element) => {
          element.style.padding = `3rem 5rem`;
        });

        await createFormElementUtils(page).triggerTooltipVisible("label");
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Stepper (readonly, disabled, loading)",
    columns: ["readonly", "disabled", "loading"],
    rows: ["default", "hover", "focus"],
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
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
        if (row === "focus" && column !== "loading")
          await component.getByLabel("Test label").focus();
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Stepper (invalid)",
    columns: ["default", "autofill"],
    rows: ["default", "hover", "focus"],
    component: () => (
      <OnyxStepper
        style="width: 12rem"
        label="Test label"
        customError={{ shortMessage: "Test error", longMessage: "Test long message error" }}
        modelValue={10}
      />
    ),
    hooks: {
      beforeEach: async (component, _page, column, row) => {
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
    },
  });

  executeMatrixScreenshotTest({
    name: "Stepper (skeleton)",
    columns: DENSITIES,
    rows: ["default", "hideLabel"],
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

test("should emit events", async ({ mount }) => {
  const events = {
    updateModelValue: [] as (number | undefined)[],
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

test("should increment/decrement value on counter button click", async ({ mount }) => {
  // ARRANGE
  const on = {
    "update:modelValue": (newValue?: number) => {
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
  const incrementButton = component.getByLabel("Increment by 2");
  const decrementButton = component.getByLabel("Decrement by 2");

  // ASSERT
  await expect(input).toHaveValue("");

  await incrementButton.click();
  await expect(input).toHaveValue("2");

  await decrementButton.click();
  await expect(input).toHaveValue("0");
});

test("should not allow entering value over the max value that has been set", async ({ mount }) => {
  // ARRANGE
  const on = {
    "update:modelValue": (newValue?: number) => {
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
      max: 3,
      stepSize: 2,
    },
    on,
  });

  const input = component.getByLabel("Test label");
  const addButton = component.getByLabel("Increment by 2");

  // ASSERT
  await addButton.click();
  await expect(input).toHaveValue("2");

  await addButton.click();
  await expect(input).toHaveValue("3");
  await expect(addButton).toBeDisabled();
});

test("should not allow entering value lower the min value that has been set", async ({ mount }) => {
  // ARRANGE
  const on = {
    "update:modelValue": (newValue?: number) => {
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
      stepSize: 2,
      modelValue: 5,
    },
    on,
  });

  const input = component.getByLabel("Test label");
  const substractButton = component.getByLabel("Decrement by 2");

  // ASSERT
  await substractButton.click();
  await expect(input).toHaveValue("3");

  await substractButton.click();
  await expect(input).toHaveValue("2");
  await expect(substractButton).toBeDisabled();
});

test("Should correctly display decimal places according to the defined precision", async ({
  mount,
}) => {
  const modelValueUpdates = [] as (number | undefined)[];

  // ARRANGE
  const on = {
    "update:modelValue": (newValue?: number) => {
      modelValueUpdates.push(newValue);
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
      precision: 2,
      modelValue: 1,
    },
    on,
  });

  const input = component.getByLabel("Test label");

  // ASSERT
  await expect(input).toHaveValue("1.00");

  // ACT
  await input.fill("3.1");
  await input.blur();

  // ASSERT
  await expect(input).toHaveValue("3.10");
  expect(modelValueUpdates).toStrictEqual([3.1]);

  // ACT
  await input.fill("3.106");
  await input.blur();

  // ASSERT
  await expect(input).toHaveValue("3.11");
  expect(modelValueUpdates).toStrictEqual([3.1, 3.11]);

  // ACT
  await component.update({ props: { precision: 1 }, on });

  // ASSERT
  await expect(input).toHaveValue("3.1");

  // ACT
  await component.update({ props: { precision: -1 }, on });
  await input.fill("6");
  await input.blur();

  // ASSERT
  await expect(input).toHaveValue("10");
  expect(modelValueUpdates).toStrictEqual([3.1, 3.11, 10]);
});

test("Should display an error if the value is not a multiple of validStepSize", async ({
  page,
  mount,
}) => {
  // ARRANGE
  const on = {
    "update:modelValue": (newValue?: number) => {
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
      validStepSize: 0.5,
    },
    on,
  });

  const input = component.getByLabel("Test label");
  const errorMessage = component.locator(".onyx-form-element__error-message");

  // ACT
  await input.fill("1");
  await page.keyboard.press("Enter");

  // ASSERT
  await expect(errorMessage).toBeHidden();

  // ACT
  await input.fill("3.6");
  await page.keyboard.press("Enter");

  // ASSERT
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText("Invalid number");
  await expect(errorMessage).toContainText(
    "Please enter a valid number, that is a multiple of 0.5.",
  );
});

test("should hide buttons", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxStepper, {
    props: {
      label: "Label",
    },
  });

  const decrementButton = component.getByRole("button", { name: "Decrement" });
  const incrementButton = component.getByRole("button", { name: "Increment" });

  // ASSERT
  await expect(decrementButton).toBeVisible();
  await expect(incrementButton).toBeVisible();

  // ACT
  await component.update({ props: { hideButtons: true } });

  // ASSERT
  await expect(decrementButton).toBeHidden();
  await expect(incrementButton).toBeHidden();
});
