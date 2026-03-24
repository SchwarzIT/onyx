import { iconPlaceholder } from "@sit-onyx/icons";
import { createEmitSpy, expectEmit, useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import FocusTestCase from "./FocusTestCase.ct.vue";
import OnyxFormElementAction from "./OnyxFormElementAction.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Form element action",
    columns: ["default", "disabled", "highlighted"],
    rows: ["default", "hover", "active"],
    component: (column) => (
      <OnyxFormElementAction
        label="Test label"
        icon={iconPlaceholder}
        disabled={column === "disabled"}
        highlighted={column === "highlighted"}
        style={{ margin: "2rem" }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const button = component.getByRole("button", { name: "Test label" });
        await useFocusStateHooks({ component: button, page, state: row });

        if (row !== "default") {
          await expect(component.getByRole("tooltip")).toBeVisible();
        }
      },
    },
  });
});

test.describe("Screenshot tests (toggle)", () => {
  executeMatrixScreenshotTest({
    name: "Form element action (toggle)",
    columns: ["default", "disabled"],
    rows: ["default", "hover", "active"],
    component: (column) => (
      <OnyxFormElementAction
        label="Test label"
        icon={iconPlaceholder}
        disabled={column === "disabled"}
        type="toggle"
        style={{ margin: "2rem" }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const button = component.getByRole("button", { name: "Test label" });
        await useFocusStateHooks({ component: button, page, state: row });

        if (row !== "default") {
          await expect(component.getByRole("tooltip")).toBeVisible();
        }
      },
    },
  });
});

test.describe("Screenshot tests (toggle, pressed)", () => {
  executeMatrixScreenshotTest({
    name: "Form element action (toggle, pressed)",
    columns: ["pressed", "disabled"],
    rows: ["default", "hover", "active"],
    component: (column) => (
      <OnyxFormElementAction
        label="Test label"
        icon={iconPlaceholder}
        disabled={column === "disabled"}
        type="toggle"
        pressed
        style={{ margin: "2rem" }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const button = component.getByRole("button", { name: "Test label" });
        await useFocusStateHooks({ component: button, page, state: row });

        if (row !== "default") {
          await expect(component.getByRole("tooltip")).toBeVisible();
        }
      },
    },
  });
});

test("should show when form element is focused", async ({ mount }) => {
  // ARRANGE
  const actionClickSpy = createEmitSpy<typeof FocusTestCase, "onActionClick">();
  const component = await mount(<FocusTestCase onActionClick={actionClickSpy} />);

  const input = component.getByLabel("Test label");
  const actionButton = component.getByRole("button", { name: "Test action" });

  // ASSERT
  await expect(actionButton, "should hide when input is not focused").toBeHidden();

  // ACT
  await input.focus();

  // ASSERT
  await expect(actionButton, "should show when input is focused").toBeVisible();

  // ACT
  await actionButton.click();

  // ASSERT
  expectEmit(actionClickSpy, 1, []);
  await expect(actionButton).toBeVisible();
});
