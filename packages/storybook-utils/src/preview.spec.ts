import bellRing from "@sit-onyx/icons/bell-ring.svg?raw";
import calendar from "@sit-onyx/icons/calendar.svg?raw";
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { describe, expect, test, vi } from "vitest";
import { replaceAll, sourceCodeTransformer } from "./preview";
import * as sourceCodeGenerator from "./source-code-generator";

describe("preview.ts", () => {
  test("should transform source code and add icon/onyx imports", () => {
    // ARRANGE
    const generatorSpy = vi.spyOn(sourceCodeGenerator, "generateSourceCode")
      .mockReturnValue(`<template>
<OnyxTest icon='${placeholder}' test='${bellRing}' :obj="{foo:'${replaceAll(calendar, '"', "\\'")}'}" />
<OnyxOtherComponent />
</template>`);

    // ACT
    const sourceCode = sourceCodeTransformer("", { title: "OnyxTest", args: {} });

    // ASSERT
    expect(generatorSpy).toHaveBeenCalledOnce();
    expect(sourceCode).toBe(`<script lang="ts" setup>
import { OnyxOtherComponent, OnyxTest } from "sit-onyx";
import bellRing from "@sit-onyx/icons/bell-ring.svg?raw";
import calendar from "@sit-onyx/icons/calendar.svg?raw";
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
</script>

<template>
<OnyxTest :icon="placeholder" :test="bellRing" :obj="{foo:calendar}" />
<OnyxOtherComponent />
</template>`);
  });
});
