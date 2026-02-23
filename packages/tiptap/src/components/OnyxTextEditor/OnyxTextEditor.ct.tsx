import { DENSITIES } from "sit-onyx";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxTextEditor from "./OnyxTextEditor.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Text editor",
    columns: ["default", "placeholder", "filled"],
    rows: ["default", "hover", "focus"],
    component: (column) => (
      <OnyxTextEditor
        label="Test label"
        modelValue={column === "filled" ? "Filled value" : undefined}
        placeholder={column === "placeholder" ? "Placeholder" : undefined}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const input = component.getByLabel("Test label");
        if (row === "hover") await input.hover();
        if (row === "focus") await input.click();
      },
    },
  });
});

test.describe("Screenshot tests (density)", () => {
  executeMatrixScreenshotTest({
    name: "Text editor (densities)",
    columns: ["default"],
    rows: DENSITIES,
    component: (column, row) => (
      <OnyxTextEditor label="Test label" density={row} modelValue="Filled value" />
    ),
  });
});

test.describe("Screenshot tests (truncation)", () => {
  executeMatrixScreenshotTest({
    name: "Text editor (truncation)",
    columns: ["default"],
    rows: ["default", "long", "hideLabel"],
    component: (column, row) => {
      const label = row === "long" ? "Very long label that should be truncated" : "Test label";
      const message =
        row === "long" ? "Very long message that should be truncated" : "Test message";

      return (
        <OnyxTextEditor
          style={{ maxWidth: "12.5rem" }}
          label={label}
          labelTooltip="Label tooltip"
          hideLabel={row === "hideLabel"}
          modelValue="Very long filled value of the text editor"
          message={{ shortMessage: message, longMessage: "Message tooltip" }}
        />
      );
    },
    hooks: {
      beforeEach: async (component) => {
        await component
          .locator(".onyx-text-editor__actions")
          .first()
          .getByRole("button")
          .last()
          .scrollIntoViewIfNeeded();
      },
    },
  });
});

test.describe("Screenshot tests (disabled)", () => {
  executeMatrixScreenshotTest({
    name: "Text editor (disabled)",
    columns: ["disabled"],
    rows: ["default", "hover", "focus"],
    component: (column) => (
      <OnyxTextEditor
        label="Test label"
        disabled={column === "disabled"}
        modelValue="Filled value"
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const input = component.getByLabel("Test label");
        if (row === "hover") await input.hover();
        if (row === "focus") await input.click();
      },
    },
  });
});

test.describe("Screenshot tests (toolbar position)", () => {
  executeMatrixScreenshotTest({
    name: "Text editor (toolbar position)",
    columns: ["default"],
    rows: ["top", "bottom"],
    component: (column, row) => <OnyxTextEditor label="Test label" toolbar={{ position: row }} />,
  });
});

test.describe("Screenshot tests (success)", () => {
  executeMatrixScreenshotTest({
    name: "Text editor (success)",
    columns: ["default"],
    rows: ["default"],
    component: () => (
      <OnyxTextEditor label="Test label" modelValue="Filled value" success="Success message" />
    ),
  });
});

test.describe("Screenshot tests (manual resize", () => {
  executeMatrixScreenshotTest({
    name: "Text editor (manual resize)",
    columns: ["default"],
    rows: ["default", "resized-larger", "resized-smaller"],
    component: () => (
      <OnyxTextEditor
        label="Test label"
        modelValue={Array.from({ length: 6 }, (_, index) => `<p>${index + 1}</p>`).join("\n")}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const editor = component.getByLabel("Test label");
        if (row === "resized-larger" || row === "resized-smaller") {
          const box = (await editor.boundingBox())!;

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
});

test.describe("Screenshot tests (autosize)", () => {
  executeMatrixScreenshotTest({
    name: "Text editor (autosize)",
    columns: ["initial-value", "user-typed"],
    rows: ["0", "3-rows", "10-rows", "12-rows"],
    component: (column, row) => {
      const modelValue = Array.from(
        { length: Number.parseInt(row) },
        (_, index) => `<p>Row ${index + 1}</p>`,
      ).join("\n");

      return (
        <OnyxTextEditor
          label="Test label"
          modelValue={column !== "user-typed" ? modelValue : undefined}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const editor = component.getByLabel("Test label");

        if (column === "user-typed") {
          const modelValue = Array.from(
            { length: Number.parseInt(row) },
            (_, index) => `Row ${index + 1}`,
          );

          for (let i = 0; i < modelValue.length; i++) {
            await editor.pressSequentially(modelValue[i] ?? "");
            if (i < modelValue.length - 1) {
              await editor.press("Enter");
            }
          }
        }

        if (row === "12-rows") {
          await editor.locator("p").last().scrollIntoViewIfNeeded();
        }
      },
    },
  });
});

test("should autofocus", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxTextEditor, {
    props: {
      label: "Test label",
    },
  });
  const editor = component.getByLabel("Test label");

  // ASSERT
  await expect(editor).not.toBeFocused();

  // ACT
  await component.update({ props: { autofocus: true } });

  // ASSERT
  await expect(editor).toBeFocused();
});
