import { DENSITIES } from "../../composables/density.js";
import { testMaxLengthBehavior } from "../../composables/useLenientMaxLengthValidation.ct-utils.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import { createFormElementUtils } from "../OnyxFormElement/OnyxFormElement.ct-utils.js";
import OnyxTextarea from "./OnyxTextarea.vue";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "placeholder", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `Textarea (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus"],
      component: (column) => {
        return (
          <OnyxTextarea
            label="Test label"
            placeholder={state === "placeholder" ? "Test placeholder" : undefined}
            density={column}
            modelValue={state === "with value" ? "Filled value" : undefined}
            style="width: 12rem;"
          />
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
    name: "Textarea (required/optional, message/counter)",
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
        <OnyxTextarea
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
    name: "Textarea (readonly, disabled)",
    columns: ["readonly", "disabled"],
    rows: ["default", "hover", "focus"],
    component: (column) => (
      <OnyxTextarea
        style="width: 12rem"
        label="Test label"
        placeholder="Test placeholder"
        readonly={column === "readonly"}
        disabled={column === "disabled"}
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
    name: "Textarea (invalid)",
    columns: ["default"],
    rows: ["default", "hover", "focus"],
    component: () => (
      <OnyxTextarea style="width: 12rem" label="Test label" customError="Test error" />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
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
    name: "Textarea (success)",
    columns: ["default"],
    rows: ["default", "hover", "focus"],
    component: () => (
      <OnyxTextarea
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
    name: "Textarea (skeleton)",
    columns: DENSITIES,
    rows: ["default", "hideLabel", "autosize-min-6-rows"],
    component: (column, row) => (
      <OnyxTextarea
        style="width: 12rem"
        label="Test label"
        density={column}
        hideLabel={row === "hideLabel"}
        autosize={row === "autosize-min-6-rows" ? { min: 6 } : undefined}
        skeleton
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Textarea (manual resize)",
    columns: ["default", "filled"],
    rows: ["default", "resized-larger", "resized-smaller"],
    component: (column) => (
      <OnyxTextarea
        style="width: 12rem"
        label="Test label"
        modelValue={
          column === "filled"
            ? Array.from({ length: 6 }, (_, index) => index + 1).join("\n")
            : undefined
        }
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const textarea = component.getByLabel("Test label");
        if (row === "resized-larger" || row === "resized-smaller") {
          const box = (await textarea.boundingBox())!;

          const x = box.x + box.width - 4;
          const y = box.y + box.height - 4;

          await page.mouse.move(x, y);
          await page.mouse.down();

          if (row === "resized-larger") {
            await page.mouse.move(x, y + 72);
          } else {
            await page.mouse.move(x, y - 72);
          }
        }
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Textarea (autosize)",
    columns: ["initial-value", "user-typed"],
    rows: [
      "0",
      "1",
      "2-rows",
      "3-rows",
      "4-rows",
      "5-rows",
      "6-rows",
      "7-rows",
      "8-rows",
      "9-rows",
      "10-rows",
      "11-rows",
      "long-value",
    ],
    component: (column, row) => {
      let modelValue = "";

      if (row === "long-value") {
        modelValue = "Test".repeat(64);
      } else {
        modelValue = Array.from(
          { length: Number.parseInt(row) },
          (_, index) => `Row ${index + 1}`,
        ).join("\n");
      }

      return (
        <OnyxTextarea
          style="width: 12rem"
          label="Test label"
          modelValue={column !== "user-typed" ? modelValue : undefined}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const textarea = component.getByLabel("Test label");

        if (column === "user-typed") {
          if (row === "long-value") {
            await textarea.fill("Test".repeat(64));
          } else {
            const modelValue = Array.from(
              { length: Number.parseInt(row) },
              (_, index) => `Row ${index + 1}`,
            );

            for (let i = 0; i < modelValue.length; i++) {
              await textarea.pressSequentially(modelValue[i]);
              if (i < modelValue.length - 1) {
                await textarea.press("Enter");
              }
            }
          }
        }
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Textarea (labelTooltip/messageTooltip)",
    columns: ["default", "long-text"],
    rows: ["labelTooltip", "messageTooltip"],
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very long label that should be truncated" : "Test label";
      const message = {
        shortMessage:
          column === "long-text" ? "Very long message that should be truncated" : "Test message",
        longMessage: "Additional info message",
      };
      const labelTooltip = "More information";

      return (
        <OnyxTextarea
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
    name: "Textarea (required/optional) with label tooltip",
    columns: ["default", "long-text"],
    rows: ["required", "optional"],
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very long label that should be truncated" : "Test label";
      const labelTooltip = "More information";

      return (
        <OnyxTextarea
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
});

test("should emit events", async ({ mount, makeAxeBuilder }) => {
  const events = {
    updateModelValue: [] as string[],
  };

  // ARRANGE
  const component = await mount(
    <OnyxTextarea
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

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxTextarea label="Test label" hideLabel />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});

test("should autosize", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxTextarea, {
    props: {
      label: "Test label",
      hideLabel: true,
    },
  });

  const getHeight = () => component.evaluate((element) => element.clientHeight);

  const expectRows = async (rows: number) => {
    const actualHeight = await getHeight();
    // 24px line height, 2x8px padding, 2x1px border, 2px formelement-footer
    expect(actualHeight).toBe(rows * 24 + 16 + 2 + 2);
  };

  const generateModelValue = (rows: number) => {
    return Array.from({ length: rows }, (_, index) => `Row ${index + 1}`).join("\n");
  };

  await expectRows(3);

  let TEST_CASES = [
    { rows: 1, expectedHeight: 3 },
    { rows: 2, expectedHeight: 3 },
    { rows: 3, expectedHeight: 3 },
    { rows: 4, expectedHeight: 4 },
    { rows: 5, expectedHeight: 5 },
    { rows: 6, expectedHeight: 6 },
    { rows: 7, expectedHeight: 7 },
    { rows: 8, expectedHeight: 8 },
    { rows: 9, expectedHeight: 9 },
    { rows: 10, expectedHeight: 10 },
    { rows: 11, expectedHeight: 10 },
  ];

  for (const testCase of TEST_CASES) {
    await component.update({ props: { modelValue: generateModelValue(testCase.rows) } });
    await expectRows(testCase.expectedHeight);
  }

  // should be able to change min and max rows
  await component.update({ props: { autosize: { min: 4, max: 8 } } });

  TEST_CASES = [
    { rows: 1, expectedHeight: 4 },
    { rows: 2, expectedHeight: 4 },
    { rows: 3, expectedHeight: 4 },
    { rows: 4, expectedHeight: 4 },
    { rows: 5, expectedHeight: 5 },
    { rows: 6, expectedHeight: 6 },
    { rows: 7, expectedHeight: 7 },
    { rows: 8, expectedHeight: 8 },
    { rows: 9, expectedHeight: 8 },
  ];

  for (const testCase of TEST_CASES) {
    await component.update({ props: { modelValue: generateModelValue(testCase.rows) } });
    await expectRows(testCase.expectedHeight);
  }

  // should be able to have unlimited max
  await component.update({ props: { autosize: { min: 2 } } });

  TEST_CASES = [
    { rows: 1, expectedHeight: 2 },
    { rows: 2, expectedHeight: 2 },
    ...Array.from({ length: 32 }, (_, index) => {
      const row = index + 3;
      return { rows: row, expectedHeight: row };
    }),
  ];

  for (const testCase of TEST_CASES) {
    await component.update({ props: { modelValue: generateModelValue(testCase.rows) } });
    await expectRows(testCase.expectedHeight);
  }
});

test("should show error message after interaction", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxTextarea label="Demo" style="width: 12rem;" required />);
  const formElementUtils = createFormElementUtils(component);
  const textarea = component.getByLabel("Demo");
  const errorPreview = component.getByText("Required");
  const fullError = formElementUtils
    .getTooltipPopover("message")
    .getByText("The field is empty, it is mandatory and must be filled in.");

  // ASSERT: initially no error shows
  await expect(errorPreview).toBeHidden();
  await expect(fullError).toBeHidden();

  // ACT: interact with the input
  await textarea.click();
  await textarea.fill("x");
  await textarea.fill("");
  await textarea.blur();

  // ASSERT: after interaction, the error preview shows
  await expect(errorPreview).toBeVisible();
  await expect(formElementUtils.getTooltipTrigger("message")).toBeVisible();
  await expect(fullError).toBeHidden();

  // ACT
  await formElementUtils.triggerTooltipVisible("message");
  // ASSERT: the full error message shows
  await expect(fullError).toBeVisible();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should show correct message", async ({ mount }) => {
  const message = { shortMessage: "Test short message" };
  const successMessage = { shortMessage: "Test success short message" };
  const component = await mount(
    <OnyxTextarea label="Label" required success={successMessage} message={message} />,
  );

  const messageElement = component.getByText("Test short message");
  const successMessageElement = component.getByText("Test success short message");
  const errorMessageElement = component.getByText("Required");
  const input = component.getByLabel("Label");

  // ASSERT
  await expect(messageElement).toBeHidden();
  await expect(successMessageElement).toBeVisible();

  //ACT
  await input.click();
  await input.fill("x");
  await input.fill("");
  await input.blur();

  // ASSERT
  await expect(messageElement).toBeHidden();
  await expect(successMessageElement).toBeHidden();
  await expect(errorMessageElement).toBeVisible();
});

testMaxLengthBehavior(OnyxTextarea);
