import { iconPlaceholder } from "@sit-onyx/icons";
import { DENSITIES } from "../../composables/density.js";
import type { FormMessages } from "../../composables/useFormElementError.js";
import { testMaxLengthBehavior } from "../../composables/useLenientMaxLengthValidation.ct-utils.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import { createFormElementUtils } from "../OnyxFormElement/OnyxFormElement.ct-utils.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "./OnyxInput.vue";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "placeholder", "with value", "slot content"] as const) {
    executeMatrixScreenshotTest({
      name: `Input (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus"],
      component: (column) => {
        const modelValue =
          state === "slot content" ? "test" : state === "with value" ? "Filled value" : undefined;

        return (
          <OnyxInput
            label="Test label"
            placeholder={state === "placeholder" ? "Test placeholder" : undefined}
            density={column}
            modelValue={modelValue}
            style="width: 16rem;"
          >
            {state === "slot content" && [
              <template v-slot:leading>https://</template>,
              <template v-slot:trailing>.com</template>,
              <template v-slot:leadingIcons>
                <OnyxIcon icon={iconPlaceholder} />
              </template>,
              <template v-slot:trailingIcons>
                <OnyxIcon icon={iconPlaceholder} />
              </template>,
            ]}
          </OnyxInput>
        );
      },
      hooks: {
        beforeEach: async (component, page, column, row) => {
          const input = component.getByLabel("Test label");
          if (row === "hover") await input.hover();
          if (row === "focus") await input.focus();
        },
      },
    });
  }

  executeMatrixScreenshotTest({
    name: "Input (required/optional, message/counter)",
    columns: ["default", "long-text", "hideLabel"],
    rows: ["required", "optional", "message", "counter"],
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very long label that should be truncated" : "Test label";
      const message = {
        shortMessage:
          column === "long-text" ? "Very long message that should be truncated" : "Test message",
      };

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
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very very long label that should be truncated" : "Test label";
      const message =
        column === "long-text" ? "Very long message that should be truncated" : "Test message";
      const labelTooltip = "More information";
      const messageTooltip = "Additional info message";
      const messageObj = {
        shortMessage: message,
        longMessage: `${row === "messageTooltip" ? messageTooltip : undefined}`,
      };

      return (
        <OnyxInput
          style="width: 12rem"
          label={label}
          message={row !== "labelTooltip" ? messageObj : undefined}
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
    name: "Input (message replacement on invalid)",
    columns: ["default", "long-text", "with-counter"],
    rows: ["messageTooltip", "error", "errorTooltip"],
    component: (column, row) => {
      const showLongMessage = column !== "default";
      const label = column === "long-text" ? "Test label that should be truncated" : "Test label";
      const errorMessage: FormMessages = {
        shortMessage: showLongMessage
          ? "Very long error preview that should be truncated"
          : "Test error",
        longMessage: row === "errorTooltip" ? "Extended error information" : undefined,
      };
      const message = {
        shortMessage: showLongMessage
          ? "Very long message that should be truncated"
          : "Test message",
        longMessage: "Additional info message",
      };

      return (
        <OnyxInput
          style="width: 12rem"
          label={label}
          message={message}
          error={row !== "messageTooltip" ? errorMessage : undefined}
          withCounter={column === "with-counter"}
          maxlength={column === "with-counter" ? 15 : undefined}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const input = component.getByLabel("Test label");
        const formElementUtils = createFormElementUtils(page);

        // invalid is only triggered after touched
        await input.fill("Filled value");
        await input.blur();

        await component.evaluate((element) => {
          element.style.padding = `0 5rem 3rem 2rem`;
        });

        if (row !== "error") {
          await formElementUtils.triggerTooltipVisible("message");
        }
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Input (required/optional) with label tooltip",
    columns: ["default", "long-text"],
    rows: ["required", "optional"],
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
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const input = component.getByLabel("Test label");
        if (row === "hover") await input.hover();
        if (row === "focus") await input.focus();
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Input (invalid)",
    columns: ["default"],
    rows: ["default", "hover", "focus"],
    component: () => <OnyxInput style="width: 12rem" label="Test label" error="Test error" />,
    hooks: {
      beforeEach: async (component, _page, column, row) => {
        const input = component.getByLabel("Test label");

        // invalid is only triggered after touched
        await input.fill("Filled value");
        await input.blur();

        if (row === "hover") await input.hover();
        if (row === "focus") await input.focus();
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Input (success)",
    columns: ["default"],
    rows: ["default", "hover", "focus"],
    component: () => (
      <OnyxInput
        style="width: 12rem"
        label="Test label"
        success={{ shortMessage: "Test success message", longMessage: "Test long success message" }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const input = component.getByLabel("Test label");
        const formElementUtils = createFormElementUtils(page);

        await component.evaluate((element) => {
          element.style.padding = `0 5rem 3rem 2rem`;
        });

        if (row === "hover") {
          await input.hover();
          await formElementUtils.triggerTooltipVisible("message");
        }
        if (row === "focus") await input.focus();
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Input readonly/default with highlighted text",
    columns: ["default", "readonly"],
    rows: ["default"],
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
    hooks: {
      beforeEach: async (component, _page, _column, _row) => {
        await component.getByRole("textbox").selectText();
      },
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
  };

  // ARRANGE
  const component = await mount(
    <OnyxInput
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
  await inputElement.pressSequentially("Test");

  // ASSERT
  await expect(inputElement).toHaveValue("Test");
  expect(events).toMatchObject({
    updateModelValue: ["T", "Te", "Tes", "Test"],
  });
});

test("should hide/show password", async ({ mount }) => {
  const component = await mount(
    <OnyxInput label="Label" modelValue={"test"} type="password" style={{ width: "15rem" }} />,
  );

  const input = component.getByLabel("Label");
  const eyeIcon = component.getByRole("button", { name: "Show Password" });
  const eyeClosedIcon = component.getByRole("button", { name: "Hide Password" });

  // ASSERT
  await expect(input).toHaveAttribute("type", "password");
  await expect(eyeIcon).toBeVisible();
  await expect(eyeClosedIcon).toBeHidden();
  await expect(component).toHaveScreenshot(`input-password-hidden.png`);

  //ACT
  await eyeIcon.click();

  // ASSERT
  await expect(input).toHaveAttribute("type", "text");
  await expect(eyeIcon).toBeHidden();
  await expect(eyeClosedIcon).toBeVisible();
  await expect(component).toHaveScreenshot(`input-password-shown.png`);
});

testMaxLengthBehavior(OnyxInput);
