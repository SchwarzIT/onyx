import { DENSITIES } from "../../composables/density";
import type { FormErrorMessages } from "../../composables/useCustomValidity";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { createFormElementUtils } from "../OnyxFormElement/OnyxFormElement.ct-utils";
import OnyxInput from "./OnyxInput.vue";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "placeholder", "with value", "autofill"] as const) {
    executeMatrixScreenshotTest({
      name: `Input (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus"],
      component: (column) => {
        return (
          <OnyxInput
            label="Test label"
            placeholder={state === "placeholder" ? "Test placeholder" : undefined}
            density={column}
            modelValue={state === "with value" || state === "autofill" ? "Filled value" : undefined}
            style="width: 12rem;"
          />
        );
      },
      beforeScreenshot: async (component, page, column, row) => {
        const input = component.getByLabel("Test label");
        if (row === "hover") await input.hover();
        if (row === "focus") await input.focus();
        if (state == "autofill") {
          await input.evaluate((node) => node.setAttribute("data-test-autofill", ""));
        }
      },
    });
  }

  executeMatrixScreenshotTest({
    name: "Input (required/optional, message/counter)",
    columns: ["default", "long-text", "hideLabel"],
    rows: ["required", "optional", "message", "counter"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very long label that should be truncated" : "Test label";
      const message =
        column === "long-text" ? "Very long message that should be truncated" : "Test message";

      return (
        <OnyxInput
          style="width: 12rem"
          label={label}
          hideLabel={column === "hideLabel"}
          required={row === "required"}
          requiredMarker={row === "optional" ? "optional" : undefined}
          message={row === "message" ? message : undefined}
          maxlength={row === "counter" ? 16 : undefined}
          modelValue={row === "counter" ? "Filled value" : undefined}
          withCounter={row === "counter"}
        />
      );
    },
  });

  executeMatrixScreenshotTest({
    name: "Input (labelTooltip/messageTooltip)",
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
        <OnyxInput
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
    name: "Input (message replacement on invalid)",
    columns: ["default", "long-text", "with-counter"],
    rows: ["messageTooltip", "error", "errorTooltip"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => {
      const showLongMessage = column !== "default";
      const label = column === "long-text" ? "Test label that should be truncated" : "Test label";
      const message = showLongMessage
        ? "Very long message that should be truncated"
        : "Test message";
      const errorMessages: FormErrorMessages = {
        shortMessage: showLongMessage
          ? "Very long error preview that should be truncated"
          : "Test error",
        longMessage: row === "errorTooltip" ? "Extended error information" : undefined,
      };
      const messageTooltip = "Additional info message";

      return (
        <OnyxInput
          style="width: 12rem"
          label={label}
          message={message}
          customError={row !== "messageTooltip" ? errorMessages : undefined}
          messageTooltip={messageTooltip}
          withCounter={column === "with-counter"}
          maxlength={column === "with-counter" ? 15 : undefined}
        />
      );
    },
    beforeScreenshot: async (component, page, _column, row) => {
      const input = component.getByLabel("Test label");
      const formElementUtils = createFormElementUtils(page);

      // invalid is only triggered after touched
      await input.fill("Filled value");
      await input.blur();

      await component.evaluate((element) => {
        element.style.padding = `0 5rem 3rem 2rem`;
      });

      if (row !== "error") {
        await formElementUtils.triggerTooltipVisible(row === "errorTooltip" ? "error" : "message");
      }
    },
  });

  executeMatrixScreenshotTest({
    name: "Input (required/optional) with label tooltip",
    columns: ["default", "long-text"],
    rows: ["required", "optional"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very long label that should be truncated" : "Test label";
      const labelTooltip = "More information";

      return (
        <OnyxInput
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
    name: "Input (readonly, disabled, loading)",
    columns: ["readonly", "disabled", "loading"],
    rows: ["default", "hover", "focus"],
    component: (column) => (
      <OnyxInput
        style="width: 12rem"
        label="Test label"
        placeholder="Test placeholder"
        readonly={column === "readonly"}
        disabled={column === "disabled"}
        loading={column === "loading"}
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      const input = component.getByLabel("Test label");
      if (row === "hover") await input.hover();
      if (row === "focus") await input.focus();
    },
  });

  executeMatrixScreenshotTest({
    name: "Input (invalid)",
    columns: ["default", "autofill"],
    rows: ["default", "hover", "focus"],
    component: () => <OnyxInput style="width: 12rem" label="Test label" customError="Test error" />,
    beforeScreenshot: async (component, _page, column, row) => {
      const input = component.getByLabel("Test label");

      // invalid is only triggered after touched
      await input.fill("Filled value");
      await input.blur();

      if (row === "hover") await input.hover();
      if (row === "focus") await input.focus();
      if (column == "autofill") {
        await input.evaluate((node) => node.setAttribute("data-test-autofill", ""));
      }
    },
  });

  executeMatrixScreenshotTest({
    name: "Input readonly/default with highlighted text",
    columns: ["default", "readonly"],
    rows: ["default"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, _row) => {
      return (
        <OnyxInput
          class="dark"
          style="width: 12rem"
          label="Test Label"
          hideLabel
          readonly={column === "readonly"}
          modelValue="Filled Text"
        />
      );
    },
    beforeScreenshot: async (component, _page, _column, _row) => {
      await component.getByRole("textbox").selectText();
    },
  });

  executeMatrixScreenshotTest({
    name: "Input (skeleton)",
    columns: DENSITIES,
    rows: ["default", "hideLabel"],
    component: (column, row) => (
      <OnyxInput
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
  // ASSERT
  expect(events).toMatchObject({
    updateModelValue: ["T", "Te", "Tes", "Test"],
    change: ["Test"],
    focusCount: 1,
    blurCount: 1,
  });
});

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxInput label="Test label" style="width: 12rem;" hideLabel />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});

test("should show error message after interaction", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxInput label="Demo" style="width: 12rem;" required />);
  const formElementUtils = createFormElementUtils(component);
  const input = component.getByLabel("Demo");
  const errorPreview = component.getByText("Required");
  const fullError = formElementUtils
    .getTooltipPopover("error")
    .getByText("Please fill in this field.");

  // ASSERT: initially no error shows
  await expect(errorPreview).toBeHidden();
  await expect(fullError).toBeHidden();

  // ACT: interact with the input
  await input.click();
  await input.fill("x");
  await input.fill("");
  await input.blur();

  // ASSERT: after interaction, the error preview shows
  await expect(errorPreview).toBeVisible();
  await expect(formElementUtils.getTooltipTrigger("error")).toBeVisible();
  await expect(fullError).toBeHidden();

  // ACT
  await formElementUtils.triggerTooltipVisible("error");
  // ASSERT: the full error message shows
  await expect(fullError).toBeVisible();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
