import fs from "node:fs";
import { beforeEach, describe, expect, test, vi } from "vitest";
import * as functions from "../index.js";
import { ImportCommandOptions, importCommandAction } from "./import-variables.js";

vi.mock("node:fs");

vi.mock("../index.js");

describe("import-variables.ts", () => {
  const mockOptions = {
    fileKey: "test-file-key",
    filename: "test-file-name",
    format: "CSS",
    token: "test-token",
    selector: ":root",
  } satisfies ImportCommandOptions;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => ({}));
    vi.spyOn(process, "cwd").mockReturnValue("test-cwd");
  });

  test("should throw error for unknown formats", () => {
    const promise = () => importCommandAction({ ...mockOptions, format: "does-not-exist" });
    expect(promise).rejects.toThrowError("Unknown format: does-not-exist. Supported: CSS, SCSS");
  });

  test("should throw error for unknown modes", () => {
    vi.spyOn(functions, "parseFigmaVariables").mockReturnValue([
      { modeName: "test-mode-1", variables: {} },
    ]);

    const promise = () =>
      importCommandAction({
        ...mockOptions,
        modes: ["test-mode-1", "does-not-exist"],
      });
    expect(promise).rejects.toThrowError(
      'Mode "does-not-exist" not found. Available modes: "test-mode-1"',
    );
  });

  test("should generate variables", async () => {
    vi.spyOn(functions, "parseFigmaVariables").mockReturnValue([
      { modeName: "test-mode-1", variables: {} },
      { modeName: "test-mode-2", variables: {} },
      { modeName: "test-mode-3", variables: {} },
    ]);

    vi.spyOn(functions, "generateAsCSS").mockReturnValue("mock-css-file-content");

    await importCommandAction({ ...mockOptions, modes: ["test-mode-1", "test-mode-2"] });

    expect(functions.fetchFigmaVariables).toHaveBeenCalledOnce();
    expect(functions.parseFigmaVariables).toHaveBeenCalledOnce();
    expect(functions.generateAsCSS).toHaveBeenCalledTimes(2);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(2);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "test-cwd/test-file-name-test-mode-1.css",
      "mock-css-file-content",
    );

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "test-cwd/test-file-name-test-mode-2.css",
      "mock-css-file-content",
    );
  });
});
