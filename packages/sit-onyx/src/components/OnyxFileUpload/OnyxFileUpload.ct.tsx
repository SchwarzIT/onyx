import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxFileUpload from "./OnyxFileUpload.vue";

const hooks: MatrixScreenshotTestOptions["hooks"] = {
  beforeEach: async (component, page, column, row) => {
    if (row === "hover") await component.hover();
    if (row === "focus-visible") await page.keyboard.press("Tab");
    if (row === "dragging") {
      await component.locator("label").evaluate((element) => {
        element.dispatchEvent(new DragEvent("dragenter"));
      });
    }
  },
};

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "File upload",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible", "dragging"],
    component: (column) => <OnyxFileUpload density={column} />,
    hooks,
  });
});

test.describe("Screenshot tests (disabled)", () => {
  executeMatrixScreenshotTest({
    name: "File upload (disabled)",
    columns: ["disabled"],
    rows: ["default", "hover", "focus-visible", "dragging"],
    component: () => <OnyxFileUpload disabled />,
    hooks,
  });
});

test.describe("Screenshot tests (max. file sizes)", () => {
  executeMatrixScreenshotTest({
    name: "File upload (max. file sizes)",
    columns: ["types", "size", "total", "count", "size-total", "types-size-total-count"],
    rows: ["default", "hover", "focus-visible", "dragging"],
    component: (column) => (
      <OnyxFileUpload
        accept={column.includes("types") ? [".pdf", ".jpg", ".png"] : undefined}
        maxSize={column.includes("size") ? "4Mi" : undefined}
        maxTotalSize={column.includes("total") ? "50Mi" : undefined}
        maxCount={column.includes("count") ? 8 : undefined}
        multiple
      />
    ),
    hooks,
  });
});

test("should select a single file", async ({ mount }) => {
  // ARRANGE
  let file: File | undefined;

  const component = await mount(
    <OnyxFileUpload onUpdate:modelValue={(newFile) => (file = newFile)} />,
  );

  // ACT
  await component.getByLabel("File").setInputFiles({
    name: "file.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("this is a test"),
  });

  // ASSERT
  await expect(() => expect(file).toBeDefined()).toPass();

  // ACT
  file = undefined;

  // ASSERT
  await expect(() => expect(file).not.toBeDefined()).toPass();

  // ACT
  const dataTransfer = await component.evaluateHandle(() => {
    const dt = new DataTransfer();
    dt.items.add(new File(["this is a test"], "file.txt", { type: "text/plain" }));
    return dt;
  });

  await component.dispatchEvent("drop", { dataTransfer });

  // ASSERT
  await expect(() => expect(file).toBeDefined()).toPass();
});

test("should select multiple files", async ({ mount }) => {
  // ARRANGE
  let files: File[] = [];

  const component = await mount(
    <OnyxFileUpload multiple onUpdate:modelValue={(newFiles) => (files = newFiles)} />,
  );

  // ACT
  await component.getByLabel("File").setInputFiles([
    {
      name: "file.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("this is a test"),
    },
    {
      name: "file2.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("this is a test 2"),
    },
  ]);

  // ASSERT
  await expect(() => expect(files).toHaveLength(2)).toPass();

  // ACT
  files = [];

  // ASSERT
  await expect(() => expect(files).toHaveLength(0)).toPass();

  // ACT
  const dataTransfer = await component.evaluateHandle(() => {
    const dt = new DataTransfer();
    dt.items.add(new File(["this is a test"], "file.txt", { type: "text/plain" }));
    dt.items.add(new File(["this is a test 2"], "file2.txt", { type: "text/plain" }));
    return dt;
  });

  await component.dispatchEvent("drop", { dataTransfer });

  // ASSERT
  await expect(() => expect(files).toHaveLength(2)).toPass();
});

test("should replace files", async ({ mount }) => {
  // ARRANGE
  let files: File[] = [];

  const on = {
    "update:modelValue": async (newFiles: File[]) => {
      files = newFiles;
      await component.update({ props: { modelValue: newFiles }, on });
    },
  };

  const component = await mount(OnyxFileUpload, {
    props: {
      multiple: true,
    },
    on,
  });

  // ACT
  await component.getByLabel("File").setInputFiles([
    {
      name: "file.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("this is a test"),
    },
    {
      name: "file2.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("this is a test 2"),
    },
  ]);

  // ASSERT
  await expect(() => expect(files).toHaveLength(2)).toPass();

  // ACT
  await component.getByLabel("File").setInputFiles([
    {
      name: "file3.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("this is a test 3"),
    },
  ]);

  // ASSERT
  await expect(() => expect(files).toHaveLength(3)).toPass();

  // ACT
  await component.update({ props: { replace: true }, on });

  await component.getByLabel("File").setInputFiles([
    {
      name: "file4.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("this is a test 4"),
    },
  ]);

  // ASSERT
  await expect(() => expect(files).toHaveLength(1)).toPass();
});
