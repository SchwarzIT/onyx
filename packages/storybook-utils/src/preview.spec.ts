import { describe, expect, test } from "vitest";
import { sourceCodeTransformer } from "./preview";

describe("preview.ts", () => {
  test("should transform source code", () => {
    // ARRANGE
    // mix double and single quotes to test that both are supported
    const originalSourceCode = `<OnyxTest v-on:test="someFunction" @empty='()=>({})' v-bind="{}" :disabled='true' :readonly="false" test="true" />`;

    const expectedOutput = `<OnyxTest @test="someFunction" disabled :readonly="false" test />`;

    // ACT
    const output = sourceCodeTransformer(originalSourceCode);

    // ASSERT
    expect(output).toBe(expectedOutput);
  });
});
