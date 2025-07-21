import bellRing from "@sit-onyx/icons/bell-ring.svg?raw";
import calendar from "@sit-onyx/icons/calendar.svg?raw";
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { describe, expect, test } from "vitest";
import { replaceAll, sourceCodeTransformer } from "./preview.js";

describe("preview.ts", () => {
  test("should transform source code and add icon/onyx imports", () => {
    // ACT
    const sourceCode = sourceCodeTransformer(`<template>
<OnyxTest icon='${placeholder}' test='${bellRing}' :obj="{foo:'${replaceAll(calendar, '"', "\\'")}'}" />
<OnyxOtherComponent />
<OnyxComp>Test</OnyxComp>
</template>`);

    // ASSERT
    expect(sourceCode).toBe(`<script lang="ts" setup>
import { OnyxComp, OnyxOtherComponent, OnyxTest } from "sit-onyx";
import bellRing from "@sit-onyx/icons/bell-ring.svg?raw";
import calendar from "@sit-onyx/icons/calendar.svg?raw";
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
</script>

<template>
<OnyxTest :icon="placeholder" :test="bellRing" :obj="{foo:calendar}" />
<OnyxOtherComponent />
<OnyxComp>Test</OnyxComp>
</template>`);
  });
});
