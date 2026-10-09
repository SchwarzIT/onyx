import { readFile } from "node:fs/promises";
import type { FileBeforeParseHook } from "@nuxt/content";
import { describe, expect, test, vi } from "vitest";
import { type CustomHandlerMeta, inlineCodeExamples } from "./inline-code-examples.js";

vi.mock("node:fs/promises", () => ({
  readFile: vi.fn(),
}));

const createMockContext = (file: Partial<FileBeforeParseHook["file"]>): FileBeforeParseHook => ({
  file: {
    id: "content/en/test.md",
    body: "",
    extension: ".md",
    path: "content/en/test.md",
    title: "Test",
    stem: "test",
    ...file,
  } as FileBeforeParseHook["file"],
});

describe("inlineCodeExamples", () => {
  describe("file extension filtering", () => {
    test.each([".json", ".ts", ".vue", ".yaml", ".txt"])(
      "should ignore file with extension '%s'",
      async (extension) => {
        // ARRANGE
        const originalBody = "Some content\n<<< ./example.ts\n";
        const ctx = createMockContext({
          extension,
          body: originalBody,
        });

        // ACT
        await inlineCodeExamples(ctx);

        // ASSERT
        expect(readFile).not.toHaveBeenCalled();
        expect(ctx.file.body).toBe(originalBody);
      },
    );
  });

  describe("content parsing & default handler", () => {
    test("should leave body untouched when no inline code markers exist", async () => {
      // ARRANGE
      const originalBody = "# Heading\n\nThis is pure markdown with no markers.";
      const ctx = createMockContext({ body: originalBody });

      // ACT
      await inlineCodeExamples(ctx);

      // ASSERT
      expect(readFile).not.toHaveBeenCalled();
      expect(ctx.file.body).toBe(originalBody);
    });

    test("should ignore markers with empty path", async () => {
      // ARRANGE
      const originalBody = "# Heading\n<<< \n<<<    \nFooter";
      const ctx = createMockContext({ body: originalBody });

      // ACT
      await inlineCodeExamples(ctx);

      // ASSERT
      expect(readFile).not.toHaveBeenCalled();
      expect(ctx.file.body).toBe(originalBody);
    });

    test("should replace single inline marker with default code block", async () => {
      // ARRANGE
      const fileContent = "export const answer = 42;";
      vi.mocked(readFile).mockResolvedValue(fileContent);

      const ctx = createMockContext({
        dirname: "/project/docs",
        body: "# Header\n\n<<< ./example.ts\n\n# Footer",
      });

      // ACT
      await inlineCodeExamples(ctx);

      // ASSERT
      expect(readFile).toHaveBeenCalledWith("/project/docs/example.ts", "utf-8");
      expect(ctx.file.body).toBe(
        `# Header\n\n\n\`\`\`ts [example.ts] \n${fileContent}\n\`\`\`\n\n\n# Footer`,
      );
    });

    test("should include parameters in default code block header", async () => {
      // ARRANGE
      const fileContent = "<template><button /></template>";
      vi.mocked(readFile).mockResolvedValue(fileContent);

      const ctx = createMockContext({
        dirname: "/project/docs",
        body: "<<< ./Button.vue preview=true disabled id=test",
      });

      // ACT
      await inlineCodeExamples(ctx);

      // ASSERT
      expect(readFile).toHaveBeenCalledWith("/project/docs/Button.vue", "utf-8");
      expect(ctx.file.body).toBe(
        `\n\`\`\`vue [Button.vue] preview=true disabled id=test\n${fileContent}\n\`\`\`\n`,
      );
    });

    test("should replace multiple inline markers in reverse order without invalidating indices", async () => {
      // ARRANGE
      vi.mocked(readFile).mockImplementation(async (filePath) => {
        if (String(filePath).endsWith("First.vue")) {
          return "<template>First</template>";
        }
        if (String(filePath).endsWith("Second.ts")) {
          return "export const second = true;";
        }
        return "";
      });

      const ctx = createMockContext({
        dirname: "/project",
        body: "Start\n<<< ./First.vue\nMiddle\n<<< ./Second.ts opt=1\nEnd",
      });

      // ACT
      await inlineCodeExamples(ctx);

      // ASSERT
      expect(readFile).toHaveBeenCalledWith("/project/First.vue", "utf-8");
      expect(readFile).toHaveBeenCalledWith("/project/Second.ts", "utf-8");
      expect(ctx.file.body).toBe(
        "Start\n\n```vue [First.vue] \n<template>First</template>\n```\n\nMiddle\n\n```ts [Second.ts] opt=1\nexport const second = true;\n```\n\nEnd",
      );
    });
  });

  describe("directory resolution", () => {
    test("should resolve relative to dirname when dirname is defined", async () => {
      // ARRANGE
      vi.mocked(readFile).mockResolvedValue("code");
      const ctx = createMockContext({
        dirname: "/custom/base/dir",
        body: "<<< ../sibling/component.ts",
      });

      // ACT
      await inlineCodeExamples(ctx);

      // ASSERT
      expect(readFile).toHaveBeenCalledWith("/custom/base/sibling/component.ts", "utf-8");
    });

    test("should default dirname to '.' when undefined", async () => {
      // ARRANGE
      vi.mocked(readFile).mockResolvedValue("code");
      const ctx = createMockContext({
        dirname: undefined,
        body: "<<< ./demo.ts",
      });

      // ACT
      await inlineCodeExamples(ctx);

      // ASSERT
      expect(readFile).toHaveBeenCalledWith(expect.stringMatching(/[/\\]demo\.ts$/), "utf-8");
    });
  });

  describe("custom handlers", () => {
    test("should invoke custom handler matching file extension", async () => {
      // ARRANGE
      const vueContent = "<template>Custom</template>";
      vi.mocked(readFile).mockResolvedValue(vueContent);

      const customVueHandler = vi.fn(async (meta: CustomHandlerMeta) => {
        const content = await meta.getFileContent();
        return `CUSTOM_BLOCK: ${meta.fileName} (${meta.fileType}) [${meta.parameters.join(",")}]\n${content}`;
      });

      const ctx = createMockContext({
        dirname: "/app",
        body: "Intro\n<<< ./MyComp.vue param1 param2\nOutro",
      });

      // ACT
      await inlineCodeExamples(ctx, { vue: customVueHandler });

      // ASSERT
      expect(customVueHandler).toHaveBeenCalledTimes(1);
      expect(customVueHandler).toHaveBeenCalledWith({
        fileName: "MyComp.vue",
        filePath: "/app/MyComp.vue",
        fileType: "vue",
        getFileContent: expect.any(Function),
        parameters: ["param1", "param2"],
      });
      expect(ctx.file.body).toBe(
        "Intro\nCUSTOM_BLOCK: MyComp.vue (vue) [param1,param2]\n<template>Custom</template>\nOutro",
      );
    });

    test("should fall back to default handler when no matching custom handler exists", async () => {
      // ARRANGE
      vi.mocked(readFile).mockImplementation(async (filePath) => {
        if (String(filePath).endsWith("Comp.vue")) return "<template />";
        if (String(filePath).endsWith("script.ts")) return "const a = 1;";
        return "";
      });

      const customVueHandler = vi.fn(async ({ fileName }) => `VUE:${fileName}`);

      const ctx = createMockContext({
        dirname: "/app",
        body: "<<< ./Comp.vue\n<<< ./script.ts",
      });

      // ACT
      await inlineCodeExamples(ctx, { vue: customVueHandler });

      // ASSERT
      expect(customVueHandler).toHaveBeenCalledTimes(1);
      expect(ctx.file.body).toContain("VUE:Comp.vue");
      expect(ctx.file.body).toContain("```ts [script.ts] \nconst a = 1;\n```");
    });
  });

  describe("error handling", () => {
    test("should catch readFile failure, log warning, and not crash", async () => {
      // ARRANGE
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const readError = new Error("ENOENT: no such file or directory");
      vi.mocked(readFile).mockRejectedValue(readError);

      const ctx = createMockContext({
        id: "pages/index.md",
        dirname: "/app",
        body: "Header\n<<< ./missing.ts\nFooter",
      });

      // ACT
      await inlineCodeExamples(ctx);

      // ASSERT
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Unable to inline component example in file '",
        "pages/index.md",
        "' because of\n",
        readError,
      );
      // The body where error occurred remains untouched
      expect(ctx.file.body).toBe("Header\n<<< ./missing.ts\nFooter");

      consoleWarnSpy.mockRestore();
    });

    test("should catch custom handler error, log warning, and continue other matches", async () => {
      // ARRANGE
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const handlerError = new Error("Custom handler boom");
      const customVueHandler = vi.fn().mockRejectedValue(handlerError);

      vi.mocked(readFile).mockResolvedValue("export const ok = true;");

      const ctx = createMockContext({
        id: "pages/test.md",
        dirname: "/app",
        body: "<<< ./Failing.vue\n<<< ./Working.ts",
      });

      // ACT
      await inlineCodeExamples(ctx, { vue: customVueHandler });

      // ASSERT
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Unable to inline component example in file '",
        "pages/test.md",
        "' because of\n",
        handlerError,
      );
      // The working one was still processed
      expect(ctx.file.body).toContain("```ts [Working.ts] \nexport const ok = true;\n```");
      expect(ctx.file.body).toContain("<<< ./Failing.vue");

      consoleWarnSpy.mockRestore();
    });
  });
});
