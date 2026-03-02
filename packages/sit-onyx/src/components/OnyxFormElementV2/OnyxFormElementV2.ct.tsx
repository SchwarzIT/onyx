import { iconPlaceholder } from "@sit-onyx/icons";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import TestCase from "./TestCase.ct.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Form element v2",
    columns: ["default", "placeholder", "filled"],
    rows: ["default", "hover", "focus"],
    component: (column) => (
      <TestCase
        label="Test label"
        placeholder={column === "placeholder" ? "Placeholder" : undefined}
        modelValue={column === "filled" ? "Filled value" : undefined}
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
});

test.describe("Screenshot tests (icons)", () => {
  executeMatrixScreenshotTest({
    name: "Form element v2 (icons)",
    columns: ["leading", "trailing", "leading+trailing"],
    rows: ["default", "hover", "focus"],
    component: (column) => (
      <TestCase label="Test label" modelValue="Filled value">
        {column.includes("leading") && (
          <template v-slot:leadingIcons>
            <OnyxIcon icon={iconPlaceholder} />
            <OnyxIcon icon={iconPlaceholder} />
          </template>
        )}

        {column.includes("trailing") && (
          <template v-slot:trailingIcons>
            <OnyxIcon icon={iconPlaceholder} />
            <OnyxIcon icon={iconPlaceholder} />
          </template>
        )}
      </TestCase>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const input = component.getByLabel("Test label");
        if (row === "hover") await input.hover();
        if (row === "focus") await input.focus();
      },
    },
  });
});

test.describe("Screenshot tests (slots)", () => {
  executeMatrixScreenshotTest({
    name: "Form element v2 (slots)",
    columns: ["leading", "trailing", "leading+trailing"],
    rows: ["default", "hover", "focus"],
    component: (column) => (
      <TestCase label="Test label" modelValue="Filled value">
        {column.includes("leading") && (
          <template v-slot:leading>
            <OnyxSelect
              label="Select"
              listLabel="List label"
              options={[]}
              hideLabel
              placeholder="+49"
            />
          </template>
        )}

        {column.includes("trailing") && (
          <template v-slot:trailing>
            <OnyxSelect
              label="Select"
              listLabel="List label"
              options={[]}
              hideLabel
              placeholder="+49"
            />
          </template>
        )}
      </TestCase>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const input = component.getByLabel("Test label");
        if (row === "hover") await input.hover();
        if (row === "focus") await input.focus();
      },
    },
  });
});

test.describe("Screenshot tests (truncation)", () => {
  executeMatrixScreenshotTest({
    name: "Form element v2 (truncation)",
    columns: ["default"],
    rows: ["required", "optional", "message", "bottomRight", "message+bottomRight"],
    component: (column, row) => (
      <TestCase
        style={{ width: "12rem" }}
        label={{ label: "Test label ".repeat(4), tooltipText: "Label tooltip" }}
        message={
          row.includes("message")
            ? { label: "Message ".repeat(4), tooltipText: "Message tooltip" }
            : undefined
        }
        required={row === "required"}
        requiredMarker={row === "optional" ? "optional" : undefined}
        modelValue={"Filled value ".repeat(4)}
      >
        {row.includes("bottomRight") && <template v-slot:bottomRight>0/64</template>}
      </TestCase>
    ),
  });
});

test.describe("Screenshot tests (popover)", () => {
  executeMatrixScreenshotTest({
    name: "Form element v2 (popover)",
    columns: ["default", "message", "slots"],
    rows: ["default", "hover", "focus"],
    component: (column) => (
      <TestCase
        label="Test label"
        style={{ marginBottom: "2rem" }}
        message={column === "message" ? "Example message" : undefined}
      >
        <template v-slot:popover>Popover content</template>

        {column === "slots" && (
          <template v-slot:leading>
            <OnyxSelect
              label="Select"
              listLabel="List label"
              options={[]}
              hideLabel
              placeholder="+49"
            />
          </template>
        )}

        {column === "slots" && (
          <template v-slot:leadingIcons>
            <OnyxIcon icon={iconPlaceholder} />
            <OnyxIcon icon={iconPlaceholder} />
          </template>
        )}

        {column === "slots" && (
          <template v-slot:trailingIcons>
            <OnyxIcon icon={iconPlaceholder} />
            <OnyxIcon icon={iconPlaceholder} />
          </template>
        )}

        {column === "slots" && (
          <template v-slot:trailing>
            <OnyxSelect
              label="Select"
              listLabel="List label"
              options={[]}
              hideLabel
              placeholder="kg"
            />
          </template>
        )}
      </TestCase>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const input = component.getByRole("textbox", { name: "Test label" });
        if (row === "hover") await input.hover();
        if (row === "focus") await input.click();

        if (row === "focus") {
          await expect(component.getByRole("dialog", { name: "Test label" })).toBeVisible();
        }
      },
    },
  });
});

test.describe("Screenshot tests (label positions)", () => {
  executeMatrixScreenshotTest({
    name: "Form element v2 (label positions)",
    columns: ["top", "left", "right"],
    rows: ["required", "optional", "message"],
    component: (column, row) => (
      <TestCase
        label={{ label: "Test label", position: column }}
        required={row === "required"}
        requiredMarker={row === "optional" ? "optional" : undefined}
        message={row === "message" ? "Example message" : undefined}
      />
    ),
  });
});

test("should show/hide messages correctly", async ({ mount }) => {
  // ARRANGE
  const component = await mount(TestCase, {
    props: {
      label: "Test label",
      error: "Error",
      success: "Success",
      message: "Message",
      required: true,
      showError: true,
    },
  });

  const input = component.getByLabel("Test label");
  const message = component.getByText("Message").first();
  const error = component.getByText("Error").first();
  const success = component.getByText("Success").first();

  // ASSERT
  await expect(error, "should immediately show error when showError prop is set").toBeVisible();
  await expect(message).toBeHidden();
  await expect(success).toBeHidden();

  // ACT
  await component.update({ props: { showError: "touched" } });

  // ASSERT
  await expect(success, "should show only success message").toBeVisible();
  await expect(error).toBeHidden();
  await expect(message).toBeHidden();

  // ACT
  await input.pressSequentially("Value");
  await input.blur();
  await input.clear();

  // ASSERT
  await expect(error, "should show error when touched").toBeVisible();
  await expect(message).toBeHidden();
  await expect(success).toBeHidden();

  // ACT
  await component.update({ props: { showError: false } });

  // ASSERT
  await expect(error, "should hide error when showError prop is false").toBeHidden();
  await expect(message).toBeHidden();
  await expect(success, "should show success when error exists but is not shown").toBeVisible();

  // ACT
  await component.update({ props: { success: undefined } });

  // ASSERT
  await expect(error, "should hide error when showError prop is false").toBeHidden();
  await expect(message, "should show message when error exists but is not shown").toBeVisible();
  await expect(success).toBeHidden();

  // ACT
  await component.update({ props: { message: undefined } });

  // ASSERT
  await expect(error).toBeHidden();
  await expect(message).toBeHidden();
  await expect(success).toBeHidden();

  // ACT
  await component.update({ props: { showError: "touched" } });

  // ASSERT
  await expect(error).toBeVisible();
  await expect(message).toBeHidden();
  await expect(success).toBeHidden();

  // ACT
  await input.fill("Value");

  // ASSERT
  await expect(error).toBeHidden();
  await expect(message).toBeHidden();
  await expect(success).toBeHidden();
});
