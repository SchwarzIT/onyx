import mockIcon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import { describe, expect, test } from "vitest";
import { createIconSourceCodeTransformer } from "./storybook";

describe("storybook.ts", () => {
  test("should add import statement for icon property", () => {
    const transformer = createIconSourceCodeTransformer("icon");
    const originalSourceCode = `<OnyxButton icon="${mockIcon}" />`;

    const sourceCode = transformer(originalSourceCode, {
      args: {
        icon: mockIcon,
      },
    });

    expect(sourceCode).toBe(`<script lang="ts" setup>
import icon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
</script>
<OnyxButton :icon="icon" />`);
  });
});
