import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import type { Component } from "vue";
import { expect, test } from "../../playwright/a11y.js";
import { ONYX_BREAKPOINTS } from "../../utils/breakpoints.js";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import TestWrapper from "../OnyxTooltip/TestWrapper.ct.vue";
import OnyxBasicDialog from "./OnyxBasicDialog.vue";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 128 });
});

test("should render", async ({ mount, makeAxeBuilder, page }) => {
  await mount(
    <OnyxBasicDialog label="Label" open>
      Content
    </OnyxBasicDialog>,
  );

  // accessibility tests
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  expect(accessibilityScanResults.violations, "should pass accessibility checks").toEqual([]);

  await expect(page).toHaveScreenshot("default.png");
});

const BACKDROPS = ["soft", "medium"] as const;

for (const backdrop of BACKDROPS) {
  test(`should render in modal with ${backdrop} backdrop`, async ({
    mount,
    makeAxeBuilder,
    page,
  }) => {
    await mount(
      <OnyxBasicDialog label="Label" open modal backdrop={backdrop}>
        Content
      </OnyxBasicDialog>,
    );

    const accessibilityScanResults = await makeAxeBuilder().analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    await expect(page).toHaveScreenshot(`modal-${backdrop}.png`);
  });
}

test("should render with long content", async ({ mount, makeAxeBuilder, page }) => {
  await mount(
    <OnyxBasicDialog label="Label" open>
      {"Test".repeat(64)}
    </OnyxBasicDialog>,
  );

  // accessibility tests
  const accessibilityScanResults = await makeAxeBuilder()
    // the interactive/focusable content is provided by the project
    .disableRules(["scrollable-region-focusable"])
    .analyze();
  expect(accessibilityScanResults.violations, "should pass accessibility checks").toEqual([]);

  await expect(page).toHaveScreenshot("long-content.png");
});

Object.entries(ONYX_BREAKPOINTS).forEach(([breakpoint, width]) => {
  test(`should render max size ${breakpoint}`, async ({ mount, page }) => {
    await page.setViewportSize({ width, height: 300 });

    await mount(
      <OnyxBasicDialog label="Label" open style={{ width: "100%", height: "100%" }} modal>
        Max size, breakpoint {breakpoint} ({width}px)
      </OnyxBasicDialog>,
    );

    await expect(page).toHaveScreenshot(`breakpoint-${breakpoint}.png`);
  });
});

for (const alignment of ["left", "right"] as const) {
  test(`should align ${alignment}`, async ({ mount, page, makeAxeBuilder }) => {
    await page.setViewportSize({ width: 256, height: 512 });

    // ARRANGE
    await mount(
      <OnyxBasicDialog label="Label" alignment={alignment} open modal>
        Content
      </OnyxBasicDialog>,
    );

    // ASSERT
    await expect(page).toHaveScreenshot(`alignment-${alignment}.png`);

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}

test("modal should be closeable", async ({ mount, page }) => {
  // ARRANGE
  await page.setViewportSize({ width: 512, height: 1028 });

  const onClose = createEmitSpy<typeof OnyxBasicDialog, "onClose">();
  const onUpdateOpen = createEmitSpy<typeof OnyxBasicDialog, "onUpdate:open">();

  await mount(
    <OnyxBasicDialog
      label="Label"
      open
      modal
      {...{ onClose: onClose, "onUpdate:open": onUpdateOpen }}
    >
      Example modal dialog
      <OnyxSelect
        label="Select"
        listLabel="List label"
        options={Array.from({ length: 32 }, (_, index) => ({
          label: `Option ${index + 1}`,
          value: index + 1,
        }))}
      />
    </OnyxBasicDialog>,
  );

  const dialog = page.getByRole("dialog", { name: "Label" });
  const select = dialog.getByLabel("Select", { exact: true });

  // ASSERT
  await expect(dialog).toBeVisible();

  // ACT
  await select.click();
  await dialog.getByRole("option", { name: "Option 1", exact: true }).click();

  // ASSERT
  await expect(select).toHaveValue("Option 1");
  await expectEmit(onUpdateOpen, 0);

  await test.step("Close on backdrop click", async () => {
    // ACT
    await page.mouse.click(1, 1);

    // ASSERT
    await expect(dialog).toBeVisible();
    await expectEmit(onClose, 0);
    await expectEmit(onUpdateOpen, 1, [false]);
  });

  await test.step("Close on Escape press", async () => {
    // ACT
    await page.keyboard.press("Escape");

    // ASSERT
    await expect(dialog).toBeVisible();
    await expectEmit(onClose, 0);
    await expectEmit(onUpdateOpen, 2, [false]);
  });
});

test(`dialog should be closeable`, async ({ mount, page }) => {
  // ARRANGE
  await page.setViewportSize({ width: 512, height: 1028 });

  const onClose = createEmitSpy<typeof OnyxBasicDialog, "onClose">();
  const onUpdateOpen = createEmitSpy<typeof OnyxBasicDialog, "onUpdate:open">();

  await mount(
    <OnyxBasicDialog label="Label" open {...{ onClose: onClose, "onUpdate:open": onUpdateOpen }}>
      Example dialog
      <OnyxSelect
        label="Select"
        listLabel="List label"
        options={Array.from({ length: 32 }, (_, index) => ({
          label: `Option ${index + 1}`,
          value: index + 1,
        }))}
      />
    </OnyxBasicDialog>,
  );

  const dialog = page.getByRole("dialog", { name: "Label" });
  const select = dialog.getByLabel("Select", { exact: true });

  // ASSERT
  await expect(dialog).toBeVisible();

  // ACT
  await select.click();
  await dialog.getByRole("option", { name: "Option 1", exact: true }).click();

  // ASSERT
  await expect(select).toHaveValue("Option 1");
  await expectEmit(onUpdateOpen, 0);

  await test.step("Do not close on backdrop click", async () => {
    // ACT
    await page.mouse.click(1, 1);

    // ASSERT
    await expect(dialog).toBeVisible();
    await expectEmit(onClose, 0);
    await expectEmit(onUpdateOpen, 0);
  });

  await test.step("Close on Escape press", async () => {
    // ACT
    await page.keyboard.press("Escape");

    // ASSERT
    await expect(dialog).toBeVisible();
    await expectEmit(onClose, 0);
    await expectEmit(onUpdateOpen, 1, [false]);
  });
});

test.describe("should not be closable when nonDismissible is set", () => {
  ["modal", "dialog"].forEach((type) =>
    test(`OnyxBasicDialog as ${type}`, async ({ mount, page }) => {
      // ARRANGE
      await page.setViewportSize({ width: 512, height: 1028 });

      const onClose = createEmitSpy<Component, "close">();
      const onUpdateOpen = createEmitSpy<typeof OnyxBasicDialog, "onUpdate:open">();

      await mount(
        <OnyxBasicDialog
          label="Label"
          open
          modal={type === "modal"}
          nonDismissible
          {...{ onClose: onClose, "onUpdate:open": onUpdateOpen }}
        >
          Example modal dialog
        </OnyxBasicDialog>,
      );

      const dialog = page.getByRole("dialog", { name: "Label" });

      // ASSERT
      await expect(dialog).toBeVisible();

      await test.step("Don't close on multiple Escape presses", async () => {
        // This is a special browser behavior, which seems to be intended and supported by multiple browser: https://issues.chromium.org/issues/41491338

        // ACT
        await page.keyboard.press("Escape");
        await page.keyboard.press("Escape");
        // usually two presses would be enough, but for good measure we add more
        await page.keyboard.press("Escape");
        await page.keyboard.press("Escape");

        // ASSERT
        await expect(dialog).toBeVisible();
        await expectEmit(onClose, 0);
        await expectEmit(onUpdateOpen, 0);
      });

      await test.step("Don't close on backdrop click", async () => {
        // ACT
        await page.mouse.click(1, 1);

        // ASSERT
        await expect(dialog).toBeVisible();
        await expectEmit(onClose, 0);
        await expectEmit(onUpdateOpen, 0);
      });
    }),
  );
});

test("tooltip inside dialog", async ({ mount, makeAxeBuilder, page }) => {
  await mount(
    <OnyxBasicDialog label="Label" open modal>
      <TestWrapper text="Test tooltip" trigger="hover" />
    </OnyxBasicDialog>,
  );

  // accessibility tests
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  expect(accessibilityScanResults.violations, "should pass accessibility checks").toEqual([]);

  await expect(page).toHaveScreenshot("with-tooltip.png");
});
