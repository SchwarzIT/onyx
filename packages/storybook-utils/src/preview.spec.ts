import { describe, expect, test } from "vitest";
import { sourceCodeTransformer } from "./preview";

describe("preview.ts", () => {
  test("should transform source code", () => {
    // ARRANGE
    // mix double and single quotes to test that both are supported
    const originalSourceCode = `<OnyxTest v-on:test="someFunction" @empty='()=>({})' v-bind="{}" :disabled='true' :readonly="false" test="true">
  <template #default>Slot content</template>
</OnyxTest>`;

    const expectedOutput = `<OnyxTest @test="someFunction" disabled :readonly="false" test>
  Slot content
</OnyxTest>`;

    // ACT
    const output = sourceCodeTransformer(originalSourceCode);

    // ASSERT
    expect(output).toBe(expectedOutput);
  });
});
