import mockIcon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import * as storybookUtils from "@sit-onyx/storybook-utils";
import type { StoryContext } from "@storybook/vue3";
import { describe, expect, test, vi } from "vitest";
import { createIconSourceCodeTransformer } from "./storybook";

describe("storybook.ts", () => {
  test("should add import statement for icon property", () => {
    const transformerSpy = vi.spyOn(storybookUtils, "sourceCodeTransformer");

    const transformer = createIconSourceCodeTransformer("icon");
    const originalSourceCode = `<OnyxButton icon="${mockIcon}" />`;

    const mockContext: Pick<StoryContext, "args"> = {
      args: {
        icon: mockIcon,
      },
    };

    const sourceCode = transformer(originalSourceCode, mockContext);

    expect(sourceCode).toBe(`<script lang="ts" setup>
import icon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
</script>
<OnyxButton :icon="icon" />`);

    expect(transformerSpy).toHaveBeenCalledWith(originalSourceCode);
  });

  test("should add import statement for icon property with v-bind syntax", () => {
    const transformerSpy = vi.spyOn(storybookUtils, "sourceCodeTransformer");

    const transformer = createIconSourceCodeTransformer("icon");
    const originalSourceCode = `<OnyxButton v-bind="{icon:'${mockIcon}'}" />`;

    const mockContext: Pick<StoryContext, "args"> = {
      args: {
        icon: mockIcon,
      },
    };

    const sourceCode = transformer(originalSourceCode, mockContext);

    expect(sourceCode).toBe(`<script lang="ts" setup>
import icon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
</script>
<OnyxButton v-bind="{icon}" />`);

    expect(transformerSpy).toHaveBeenCalledWith(originalSourceCode);
  });
});
