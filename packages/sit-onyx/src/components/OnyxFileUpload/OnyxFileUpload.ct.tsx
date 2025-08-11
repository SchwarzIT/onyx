import type { Locator, Page } from "@playwright/test";
import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxFileUpload from "./OnyxFileUpload.vue";
import type { FileUploadSize } from "./types.js";

const hooks: MatrixScreenshotTestOptions["hooks"] = {
  beforeEach: async (component, page, column, row) => {
    if (row === "hover") await component.hover();
    if (row === "focus-visible") await page.keyboard.press("Tab");
    if (row === "dragging") {
      await component.locator("button").evaluate((element) => {
        element.dispatchEvent(new DragEvent("dragenter"));
      });
    }
  },
};
const FILE_UPLOAD_SIZES: FileUploadSize[] = ["small", "medium", "large"];

test.describe("Screenshot tests", () => {
  FILE_UPLOAD_SIZES.forEach((size) => {
    executeMatrixScreenshotTest({
      name: `File upload ${size}`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus-visible", "dragging", "disabled", "skeleton"],
      component: (column, row) => (
        <OnyxFileUpload
          density={column}
          size={size}
          disabled={row === "disabled"}
          skeleton={row === "skeleton"}
        />
      ),
      hooks,
    });
  });
});

test.describe("Screenshot tests (max. file sizes)", () => {
  FILE_UPLOAD_SIZES.forEach((size) => {
    executeMatrixScreenshotTest({
      name: `File upload ${size} (max. file sizes)`,
      columns: ["types", "size", "total", "count", "size-total", "types-size-total-count"],
      rows: ["default", "hover", "focus-visible", "dragging"],
      component: (column) => (
        <OnyxFileUpload
          size={size}
          accept={column.includes("types") ? [".pdf", ".jpg", ".png"] : undefined}
          maxSize={column.includes("size") ? "4MiB" : undefined}
          maxTotalSize={column.includes("total") ? "50MiB" : undefined}
          maxCount={column.includes("count") ? 8 : undefined}
          multiple
        />
      ),
      hooks,
    });
  });
});

const getFile = () => ({
  name: "file.txt",
  mimeType: "text/plain",
  buffer: Buffer.from("this is a test"),
});

const selectFiles = async (page: Page, button: Locator, count: number) => {
  const fileChooserPromise = page.waitForEvent("filechooser");
  await button.click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(Array.from({ length: count }, () => getFile()));
};

const dragAndDropFiles = async (page: Page, button: Locator, count: number) => {
  const dataTransfer = await page.evaluateHandle(
    ({ count: _count }) => {
      const dt = new DataTransfer();
      for (let i = 0; i < _count; i++) {
        dt.items.add(new File(["this is a test"], "file.txt", { type: "text/plain" }));
      }
      return dt;
    },
    { count },
  );

  await button.dispatchEvent("drop", { dataTransfer });
};

test("should select a single file", async ({ mount, page }) => {
  // ARRANGE
  let file: File | undefined;

  const component = await mount(
    <OnyxFileUpload onUpdate:modelValue={(newFile) => (file = newFile)} />,
  );
  const button = component.getByRole("button", { name: "Click to select" });

  // ACT
  await selectFiles(page, button, 1);

  // ASSERT
  await expect(() => expect(file).toBeDefined()).toPass();

  // ACT
  file = undefined;

  // ASSERT
  await expect(() => expect(file).not.toBeDefined()).toPass();

  // ACT
  await dragAndDropFiles(page, button, 1);

  // ASSERT
  await expect(() => expect(file).toBeDefined()).toPass();
  await expect(component).toHaveScreenshot("one-file-selected.png");
});

test("should select multiple files", async ({ mount, page }) => {
  // ARRANGE
  let files: File[] = [];

  const component = await mount(
    <OnyxFileUpload
      multiple
      maxHeight={"12rem"}
      onUpdate:modelValue={(newFiles) => (files = newFiles)}
    />,
  );
  const button = component.getByRole("button", { name: "Click to select" });
  const removeFirstFileButton = component.getByRole("button", { name: "Delete file" }).first();

  // ACT
  selectFiles(page, button, 2);

  // ASSERT
  await expect(() => expect(files).toHaveLength(2)).toPass();
  await expect(component).toHaveScreenshot("multiple-file-selected.png");

  // ACT
  files = [];

  // ASSERT
  await expect(() => expect(files).toHaveLength(0)).toPass();

  // ACT
  await dragAndDropFiles(page, button, 2);

  // ASSERT
  await expect(() => expect(files).toHaveLength(4)).toPass();
  await expect(component).toHaveScreenshot("max-height.png");

  // ACT
  await removeFirstFileButton.click();

  // ASSERT
  await expect(() => expect(files).toHaveLength(3)).toPass();
});

test("should replace files", async ({ mount, page }) => {
  // ARRANGE
  let files: File[] = [];

  const on = {
    "update:modelValue": async (newFiles: File[]) => {
      await component.update({ props: { modelValue: newFiles }, on });
      files = newFiles;
    },
  };

  const component = await mount(OnyxFileUpload, {
    props: {
      multiple: true,
    },
    on,
  });
  const button = component.getByRole("button", { name: "Click to select" });

  // ACT
  await selectFiles(page, button, 2);

  // ASSERT
  await expect(() => expect(files).toHaveLength(2)).toPass();

  // ACT
  await selectFiles(page, button, 1);

  // ASSERT
  await expect(() => expect(files).toHaveLength(3)).toPass();

  // ACT
  await component.update({ props: { replace: true }, on });

  await selectFiles(page, button, 1);

  // ASSERT
  await expect(() => expect(files).toHaveLength(1)).toPass();
});

test("should not support drag and drop when disabled", async ({ mount, page }) => {
  // ARRANGE
  let file: File | undefined;

  const component = await mount(
    <OnyxFileUpload onUpdate:modelValue={(newFile) => (file = newFile)} disabled />,
  );
  const button = component.getByRole("button", { name: "Click to select" });

  // ACT
  await dragAndDropFiles(page, button, 1);

  // ASSERT
  await expect(() => expect(file).not.toBeDefined()).toPass();
});

test("should has hide button", async ({ mount, page }) => {
  // ARRANGE
  let files: File[] = [];

  const component = await mount(
    <OnyxFileUpload
      multiple
      hasHideButton
      onUpdate:modelValue={(newFiles) => (files = newFiles)}
    />,
  );
  const button = component.getByRole("button", { name: "Click to select" });
  const hideButton = component.getByRole("button", { name: "Hide all files" });
  const revealButton = component.getByRole("button", { name: "Show all files" });
  //ASSERT
  await expect(hideButton).toBeHidden();
  await expect(revealButton).toBeHidden();
  // ACT
  selectFiles(page, button, 2);

  // ASSERT
  await expect(() => expect(files).toHaveLength(2)).toPass();
  await expect(component).toHaveScreenshot("hide-button.png");
  await expect(hideButton).toBeVisible();
  await expect(revealButton).toBeHidden();

  // ACT
  await hideButton.click();

  // ASSERT
  await expect(component).toHaveScreenshot("reveal-button.png");
  await expect(hideButton).toBeHidden();
  await expect(revealButton).toBeVisible();
});

test("should display actions if available", async ({ mount, page }) => {
  const component = await mount(
    <OnyxFileUpload
      multiple
      fileCardActions={[
        { label: "Print", onClick: () => {} },
        { label: "Download", onClick: () => {} },
      ]}
    />,
  );
  const button = component.getByRole("button", { name: "Click to select" });
  const moreActionButton = component.getByRole("button", { name: "Show more actions" }).first();
  const moreActionFlyoutMenu = component
    .getByRole("dialog", { name: "More actions" })
    .locator("div")
    .first();
  // ACT
  selectFiles(page, button, 2);

  // ASSERT
  await expect(moreActionButton).toBeVisible();
  await expect(moreActionFlyoutMenu).toBeHidden();

  await expect(component).toHaveScreenshot("file-card-action.png");

  // ACT
  await moreActionButton.click();

  // ASSERT
  await expect(moreActionFlyoutMenu).toBeVisible();
  await expect(component).toHaveScreenshot("file-card-action-expand.png");
});
