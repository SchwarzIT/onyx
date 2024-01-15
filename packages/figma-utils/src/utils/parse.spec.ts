import { FigmaVariablesApiResponse, Variable, VariableValue } from "src/index.js";
import { describe, expect, test } from "vitest";
import {
  DEFAULT_MODE_NAME,
  normalizeVariableName,
  parseFigmaVariables,
  resolveFigmaVariableValue,
  rgbaToHex,
} from "./parse.js";

describe("parse.ts", () => {
  test("should convert RGBA to hex color", () => {
    let hex = rgbaToHex({ r: 1, g: 1, b: 1, a: 1 });
    expect(hex).toBe("#ffffff");

    hex = rgbaToHex({ r: 1, g: 0, b: 0, a: 1 });
    expect(hex).toBe("#ff0000");

    hex = rgbaToHex({ r: 0, g: 1, b: 0, a: 1 });
    expect(hex).toBe("#00ff00");

    hex = rgbaToHex({ r: 0, g: 0, b: 1, a: 1 });
    expect(hex).toBe("#0000ff");

    hex = rgbaToHex({ r: 0, g: 0, b: 0, a: 0 });
    expect(hex).toBe("#00000000");
  });

  test("should normalize variable name", () => {
    const name = normalizeVariableName("a/b c+d&e");
    expect(name).toBe("a-b-c-d-e");
  });

  test("should resolve color variable value", () => {
    const value: VariableValue = { r: 1, g: 1, b: 1, a: 1 };
    const resolvedValue = resolveFigmaVariableValue(value, {});
    expect(resolvedValue).toBe("#ffffff");
  });

  test("should resolve numeric value and convert to rem", () => {
    // with default rem base
    let resolvedValue = resolveFigmaVariableValue(16, {});
    expect(resolvedValue).toBe("1rem");

    // with individual rem base
    resolvedValue = resolveFigmaVariableValue(16, {}, 8);
    expect(resolvedValue).toBe("2rem");

    // without rem base (pixel value)
    resolvedValue = resolveFigmaVariableValue(16, {}, false);
    expect(resolvedValue).toBe("16px");
  });

  test("should resolve alias value", () => {
    const value: VariableValue = { type: "VARIABLE_ALIAS", id: "test-1" };
    const allVariables: Record<string, Variable> = {
      "test-1": {
        hiddenFromPublishing: false,
        name: "test-variable-1",
        valuesByMode: {},
        variableCollectionId: "collection-1",
      },
    };

    const resolvedValue = resolveFigmaVariableValue(value, allVariables);
    expect(resolvedValue).toBe("{test-variable-1}");

    // should throw error if alias can not be found
    expect(() =>
      resolveFigmaVariableValue({ type: "VARIABLE_ALIAS", id: "does-not-exist" }, allVariables),
    ).toThrowError();
  });

  test("should parse all Figma variables", () => {
    const apiResponse: FigmaVariablesApiResponse = {
      meta: {
        variableCollections: {
          "collection-1": {
            hiddenFromPublishing: false,
            defaultModeId: "test-1",
            modes: [
              { modeId: "test-1", name: "Test 1" },
              { modeId: "test-2", name: "Test 2" },
              { modeId: "test-3", name: "Test 3" },
            ],
          },
          "collection-2": {
            hiddenFromPublishing: false,
            defaultModeId: "test-2",
            modes: [
              { modeId: "test-1", name: "Test 1" },
              { modeId: "test-2", name: "Test 2" },
              { modeId: "test-3", name: "Test 3" },
            ],
          },
        },
        variables: {
          "variable-1": {
            hiddenFromPublishing: false,
            name: "variable-1",
            variableCollectionId: "collection-1",
            valuesByMode: {
              "test-1": { r: 1, g: 1, b: 1, a: 1 },
              "test-2": { type: "VARIABLE_ALIAS", id: "variable-2" },
              "test-3": 42,
            },
          },
          "variable-2": {
            hiddenFromPublishing: false,
            name: "variable-2",
            variableCollectionId: "collection-2",
            valuesByMode: {
              "test-1": { type: "VARIABLE_ALIAS", id: "variable-1" },
              "test-2": 42,
              "test-3": { r: 1, g: 1, b: 1, a: 1 },
            },
          },
        },
      },
    };

    const parsedVariables = parseFigmaVariables(apiResponse);

    expect(parsedVariables).toStrictEqual([
      {
        modeName: "Test 1",
        variables: {
          "variable-1": "#ffffff",
          "variable-2": "{variable-1}",
        },
      },
      {
        modeName: "Test 2",
        variables: {
          "variable-1": "{variable-2}",
          "variable-2": "2.625rem",
        },
      },
      {
        modeName: "Test 3",
        variables: {
          "variable-1": "2.625rem",
          "variable-2": "#ffffff",
        },
      },
    ]);
  });

  test("should ignore variables/collections that are hidden from publishing", () => {
    const apiResponse: FigmaVariablesApiResponse = {
      meta: {
        variableCollections: {
          "collection-1": {
            hiddenFromPublishing: true,
            defaultModeId: "test-1",
            modes: [{ modeId: "test-1", name: "Test 1" }],
          },
        },
        variables: {
          "variable-1": {
            hiddenFromPublishing: true,
            name: "variable-1",
            variableCollectionId: "collection-1",
            valuesByMode: {
              "test-1": 42,
            },
          },
          "variable-2": {
            hiddenFromPublishing: false,
            name: "variable-2",
            variableCollectionId: "collection-1",
            valuesByMode: {
              "test-1": 42,
            },
          },
        },
      },
    };

    const parsedVariables = parseFigmaVariables(apiResponse);

    expect(parsedVariables).toStrictEqual([]);
  });

  test("should clear mode name if its the default Figma mode name", () => {
    const apiResponse: FigmaVariablesApiResponse = {
      meta: {
        variableCollections: {
          "collection-1": {
            hiddenFromPublishing: false,
            defaultModeId: "test-1",
            modes: [{ modeId: "test-1", name: DEFAULT_MODE_NAME }],
          },
        },
        variables: {
          "variable-1": {
            hiddenFromPublishing: false,
            name: "variable-1",
            variableCollectionId: "collection-1",
            valuesByMode: {
              "test-1": 16,
            },
          },
        },
      },
    };

    const parsedVariables = parseFigmaVariables(apiResponse);

    expect(parsedVariables).toStrictEqual([
      {
        variables: {
          "variable-1": "1rem",
        },
      },
    ]);
  });
});
