import type { Page } from "@playwright/test";
import { DENSITIES } from "sit-onyx";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxTextEditor from "./OnyxTextEditor.vue";
import TestCaseCt from "./TestCase.ct.vue";

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
          message={{ shortMessage: message, longMessage: "Message tooltip" }}
        />
      );
    },
    hooks: {
      beforeEach: async (component) => {
        const editor = component.getByRole("textbox");
        await editor.fill("https://example.com/this/is/a/very/long/link/that/should/be/truncated");
        await editor.press("Space");

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

test.describe("extensions", () => {
  test.describe("heading", () => {
    test("should support h1-h4", async ({ mount, page }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" />);
      const editor = component.getByLabel("Test label");
      const headlineButton = component.getByRole("button", { name: "Headlines" });
      const headlineFlyout = component.getByRole("dialog", { name: "Headlines" });

      // ACT
      for (let i = 0; i < 4; i++) {
        const level = i + 1;
        const name = `Headline ${level}`;
        const option = headlineFlyout.getByRole("menuitem", { name });
        await headlineButton.hover();
        await option.click();

        await expectFlyoutOptionSelected(page, "Headlines", name);

        await editor.pressSequentially(name);
        await editor.press("Enter");

        // ASSERT
        await expect(editor.getByRole("heading", { name, level })).toBeVisible();
      }

      await editor.pressSequentially("Plain text");

      // ASSERT
      await expect(component).toHaveScreenshot("headlines.png");

      // ACT
      await editor.getByRole("heading", { level: 1 }).selectText();
      await headlineButton.hover();

      // ASSERT
      await expect(component).toHaveScreenshot("headlines-flyout.png");
    });

    test("should consider level options", async ({ mount }) => {
      // ARRANGE
      const component = await mount(
        <TestCaseCt label="Test label" options={{ heading: { levels: [1] } }} />,
      );
      const headlineButton = component.getByRole("button", { name: "Headlines" });
      const headlineFlyout = component.getByRole("dialog", { name: "Headlines" });

      // ACT
      await headlineButton.hover();

      // ASSERT
      await expect(headlineFlyout.getByRole("menuitem", { name: "Headline 1" })).toBeVisible();
      await expect(headlineFlyout.getByRole("menuitem", { name: "Text" })).toBeVisible();
      await expect(headlineFlyout.getByRole("menuitem", { name: "Headline 2" })).toBeHidden();
      await expect(headlineFlyout.getByRole("menuitem", { name: "Headline 3" })).toBeHidden();
      await expect(headlineFlyout.getByRole("menuitem", { name: "Headline 4" })).toBeHidden();
    });

    test("should hide action when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" options={{ heading: false }} />);
      const headlineButton = component.getByRole("button", { name: "Headlines" });

      // ASSERT
      await expect(headlineButton).toBeHidden();
    });
  });

  test.describe("lists", () => {
    test("should support bullet and numbered list", async ({ mount, page }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" />);
      const editor = component.getByLabel("Test label");
      const listButton = component.getByRole("button", { name: "Lists" });
      const listFlyout = component.getByRole("dialog", { name: "Lists" });

      // ACT
      await listButton.hover();
      await listFlyout.getByRole("menuitem", { name: "Bullet list" }).click();
      await expectFlyoutOptionSelected(page, "Lists", "Bullet list");
      await editor.pressSequentially("Bullet 1");
      await editor.press("Enter");
      await editor.pressSequentially("Bullet 2");
      await editor.press("Enter");
      await editor.press("Enter");
      await editor.press("Enter");

      // ACT
      await listButton.hover();
      await listFlyout.getByRole("menuitem", { name: "Numbered list" }).click();
      await expectFlyoutOptionSelected(page, "Lists", "NUmbered list");
      await editor.pressSequentially("Option 1");
      await editor.press("Enter");
      await editor.pressSequentially("Option 2");

      // ASSERT
      await expect(component).toHaveScreenshot("lists.png");

      // ACT
      await listButton.hover();

      // ASSERT
      await expect(component).toHaveScreenshot("lists-flyout.png");
    });

    test("should hide bulletList when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(
        <TestCaseCt label="Test label" options={{ bulletList: false }} />,
      );
      const listButton = component.getByRole("button", { name: "Lists" });
      const listFlyout = component.getByRole("dialog", { name: "Lists" });

      // ASSERT
      await expect(listButton).toBeVisible();

      // ACT
      await listButton.hover();

      // ASSERT
      await expect(listFlyout.getByRole("menuitem", { name: "Bullet list" })).toBeHidden();
      await expect(listFlyout.getByRole("menuitem", { name: "Numbered list" })).toBeVisible();
    });

    test("should hide numberedList when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(
        <TestCaseCt label="Test label" options={{ orderedList: false }} />,
      );
      const listButton = component.getByRole("button", { name: "Lists" });
      const listFlyout = component.getByRole("dialog", { name: "Lists" });

      // ASSERT
      await expect(listButton).toBeVisible();

      // ACT
      await listButton.hover();

      // ASSERT
      await expect(listFlyout.getByRole("menuitem", { name: "Numbered list" })).toBeHidden();
      await expect(listFlyout.getByRole("menuitem", { name: "Bullet list" })).toBeVisible();
    });

    test("should hide action when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(
        <TestCaseCt label="Test label" options={{ bulletList: false, orderedList: false }} />,
      );
      const listButton = component.getByRole("button", { name: "Lists" });

      // ASSERT
      await expect(listButton).toBeHidden();
    });
  });

  test.describe("bold", () => {
    test("should support bold", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" />);
      const editor = component.getByLabel("Test label");
      const button = component.getByRole("button", { name: "Bold" });

      // ACT
      await editor.pressSequentially("This is a ");
      await button.click();
      await editor.pressSequentially("bold text");
      await button.click();
      await editor.pressSequentially(" test case");
      await editor.getByText("bold text").selectText();

      // ASSERT
      await expect(component).toHaveScreenshot("bold.png");
    });

    test("should hide action when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" options={{ bold: false }} />);
      const button = component.getByRole("button", { name: "Bold" });

      // ASSERT
      await expect(button).toBeHidden();
    });
  });

  test.describe("italic", () => {
    test("should support italic", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" />);
      const editor = component.getByLabel("Test label");
      const button = component.getByRole("button", { name: "Italic" });

      // ACT
      await editor.pressSequentially("This is an ");
      await button.click();
      await editor.pressSequentially("italic text");
      await button.click();
      await editor.pressSequentially(" test case");
      await editor.getByText("italic text").selectText();

      // ASSERT
      await expect(component).toHaveScreenshot("italic.png");
    });

    test("should hide action when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" options={{ italic: false }} />);
      const button = component.getByRole("button", { name: "Italic" });

      // ASSERT
      await expect(button).toBeHidden();
    });
  });

  test.describe("underline", () => {
    test("should support underline", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" />);
      const editor = component.getByLabel("Test label");
      const button = component.getByRole("button", { name: "Underline" });

      // ACT
      await editor.pressSequentially("This is an ");
      await button.click();
      await editor.pressSequentially("underlined text");
      await button.click();
      await editor.pressSequentially(" test case");
      await editor.getByText("underlined text").selectText();

      // ASSERT
      await expect(component).toHaveScreenshot("underline.png");
    });

    test("should hide action when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(
        <TestCaseCt label="Test label" options={{ underline: false }} />,
      );
      const button = component.getByRole("button", { name: "Underline" });

      // ASSERT
      await expect(button).toBeHidden();
    });
  });

  test.describe("strike", () => {
    test("should support strike", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" />);
      const editor = component.getByLabel("Test label");
      const button = component.getByRole("button", { name: "Strike" });

      // ACT
      await editor.pressSequentially("This is a ");
      await button.click();
      await editor.pressSequentially("striked text");
      await button.click();
      await editor.pressSequentially(" test case");
      await editor.getByText("striked text").selectText();

      // ASSERT
      await expect(component).toHaveScreenshot("strike.png");
    });

    test("should hide action when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" options={{ strike: false }} />);
      const button = component.getByRole("button", { name: "Strike" });

      // ASSERT
      await expect(button).toBeHidden();
    });
  });

  test.describe("textAlign", () => {
    test("should support textAlign", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" />);
      const editor = component.getByLabel("Test label");

      const buttons = {
        left: component.getByRole("button", { name: "Left aligned" }),
        center: component.getByRole("button", { name: "Centered" }),
        right: component.getByRole("button", { name: "Right aligned" }),
        block: component.getByRole("button", { name: "Block aligned" }),
      };

      // ACT
      for (const alignment in buttons) {
        const button = buttons[alignment as keyof typeof buttons];

        await button.click();
        await editor.pressSequentially(`This is a ${alignment} aligned text`);
        // eslint-disable-next-line playwright/no-conditional-in-test -- used for the screenshot only
        if (alignment !== "block") {
          await editor.press("Enter");
        }
      }

      // ASSERT
      await expect(component).toHaveScreenshot("textAlign.png");
    });

    test("should consider options", async ({ mount }) => {
      // ARRANGE
      const component = await mount(
        <TestCaseCt
          label="Test label"
          options={{ textAlign: { alignments: ["left", "right"] } }}
        />,
      );

      // ASSERT
      await expect(component.getByRole("button", { name: "Left aligned" })).toBeVisible();
      await expect(component.getByRole("button", { name: "Right aligned" })).toBeVisible();
      await expect(component.getByRole("button", { name: "Centered" })).toBeHidden();
      await expect(component.getByRole("button", { name: "Block aligned" })).toBeHidden();
    });

    test("should hide action when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(
        <TestCaseCt label="Test label" options={{ textAlign: false }} />,
      );

      // ASSERT
      await expect(component.getByRole("button", { name: "Left aligned" })).toBeHidden();
      await expect(component.getByRole("button", { name: "Centered" })).toBeHidden();
      await expect(component.getByRole("button", { name: "Right aligned" })).toBeHidden();
      await expect(component.getByRole("button", { name: "Block aligned" })).toBeHidden();
    });
  });

  test.describe("blockquote", () => {
    test("should support blockquote", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" />);
      const editor = component.getByLabel("Test label");
      const button = component.getByRole("button", { name: "Blockquote" });

      // ACT
      await button.click();
      await editor.pressSequentially("This is a blockquote text test case");

      // ASSERT
      await expect(component).toHaveScreenshot("blockquote.png");
    });

    test("should hide action when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(
        <TestCaseCt label="Test label" options={{ blockquote: false }} />,
      );
      const button = component.getByRole("button", { name: "Blockquote" });

      // ASSERT
      await expect(button).toBeHidden();
    });
  });

  test.describe("link", () => {
    test("should support link", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" />);
      const editor = component.getByLabel("Test label");
      const button = component.getByRole("button", { name: "Link" });
      const dialog = component.getByRole("dialog", { name: "Edit link" });
      const textInput = dialog.getByLabel("Text");
      const linkInput = dialog.getByLabel("Link");
      const applyButton = dialog.getByRole("button", { name: "Apply" });

      // ACT
      await button.click();
      await textInput.fill("Example text");
      await linkInput.fill("https://example.com");
      await applyButton.click();

      // ASSERT
      let link = editor.getByRole("link", { name: "Example text" });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", "https://example.com");

      // ACT
      await link.selectText();
      await button.click();

      // ASSERT
      await expect(component).toHaveScreenshot("link-flyout.png");
      await expect(textInput, "should extract current text").toHaveValue("Example text");
      await expect(linkInput, "should extract current link").toHaveValue("https://example.com");

      // ACT
      await textInput.fill("Changed text");
      await applyButton.click();

      // ASSERT
      await expect(link, "should change text").toBeHidden();
      link = editor.getByRole("link", { name: "Changed text" });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", "https://example.com");

      // ACT
      await link.selectText();
      await button.click();
      await linkInput.fill("https://changed.example.com");
      await applyButton.click();

      // ASSERT
      await expect(link, "should change link").toHaveAttribute(
        "href",
        "https://changed.example.com",
      );

      // ACT
      await editor.pressSequentially(" followed by regular text");

      // ASSERT
      await expect(component).toHaveScreenshot("link.png");
    });

    test("should hide action when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" options={{ link: false }} />);
      const button = component.getByRole("button", { name: "Edit link" });

      // ASSERT
      await expect(button).toBeHidden();
    });
  });

  test.describe("undo / redo", () => {
    test("should support undo / redo", async ({ mount }) => {
      // ARRANGE
      const component = await mount(<TestCaseCt label="Test label" />);
      const editor = component.getByLabel("Test label");
      const undo = component.getByRole("button", { name: "Undo" });
      const redo = component.getByRole("button", { name: "Redo" });

      // ASSERT
      await expect(undo).toBeDisabled();
      await expect(redo).toBeDisabled();

      // ACT
      await editor.pressSequentially("Hello World");

      // ASSERT
      await expect(editor).toContainText("Hello World");
      await expect(undo).toBeEnabled();
      await expect(redo).toBeDisabled();

      // ACT
      await undo.click();

      // ASSERT
      await expect(editor).not.toContainText("Hello World");
      await expect(undo).toBeDisabled();
      await expect(redo).toBeEnabled();

      // ACT
      await redo.click();

      // ASSERT
      await expect(editor).toContainText("Hello World");
    });

    test("should hide action when disabled", async ({ mount }) => {
      // ARRANGE
      const component = await mount(
        <TestCaseCt label="Test label" options={{ undoRedo: false }} />,
      );

      // ASSERT
      await expect(component.getByRole("button", { name: "Undo" })).toBeHidden();
      await expect(component.getByRole("button", { name: "Redo" })).toBeHidden();
    });
  });
});

test("should disable all actions if editor is disabled", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxTextEditor, {
    props: {
      label: "Test label",
    },
  });

  const headingButton = component.getByRole("button", { name: "Headlines" });
  const headingFlyout = component.getByRole("dialog", { name: "Headlines" });
  const headingTooltip = component.getByRole("tooltip", { name: "Headlines" });

  // ACT
  await headingButton.hover();

  // ASSERT
  await expect(headingFlyout).toBeVisible();
  await expect(headingTooltip).toBeVisible();

  // ACT
  await component.update({ props: { disabled: true } });

  // ASSERT
  await expect(component.getByLabel("Test label")).toHaveAttribute("contenteditable", "false");

  const actions = component.locator(".onyx-text-editor__toolbar").getByRole("button");

  for (const action of await actions.all()) {
    // ASSERT
    await expect(action).toBeDisabled();
  }

  // ACT
  // eslint-disable-next-line playwright/no-force-option -- we want to test that the flyout/tooltip is hidden correctly even if the button is disabled
  await headingButton.hover({ force: true });

  // ASSERT
  await expect(headingFlyout).toBeHidden();
  await expect(headingTooltip).toBeHidden();
});

/**
 * Expects that the given editor toolbar flyout option is selected.
 */
async function expectFlyoutOptionSelected(page: Page, label: string, optionName: string) {
  // ACT
  // make sure the hover state is reset to fix potential issues
  await page.getByRole("document").hover({ position: { x: 0, y: 0 } });

  // ARRANGE
  const button = page.getByRole("button", { name: label });
  const flyout = page.getByRole("dialog", { name: label });

  // ACT
  await button.hover();

  // ASSERT
  const option = flyout.locator(".onyx-list-item", { hasText: optionName });
  await expect(option).toContainClass("onyx-list-item--active");

  // ACT
  await page.getByRole("document").hover({ position: { x: 0, y: 0 } }); // reset hover
}
