import { iconBellRing, iconCalendar, iconPlaceholder } from "@sit-onyx/icons";
import { describe, expect, test } from "vitest";
import { replaceAll, sourceCodeTransformer } from "./preview.js";

describe("preview.ts", () => {
  test("should transform source code and add icon/onyx imports", async () => {
    // ACT
    const sourceCode = await sourceCodeTransformer(`<template>
<OnyxTest icon='${iconPlaceholder}' test='${iconBellRing}' :obj="{foo:'${replaceAll(iconCalendar, '"', "\\'")}'}" />
<OnyxOtherComponent />
<OnyxComp>Test</OnyxComp>
</template>`);

    // ASSERT
    expect(sourceCode).toBe(`<script lang="ts" setup>
import { OnyxComp, OnyxOtherComponent, OnyxTest } from "sit-onyx";
import { iconBellRing, iconCalendar, iconPlaceholder } from "@sit-onyx/icons";
</script>

<template>
<OnyxTest :icon="iconPlaceholder" :test="iconBellRing" :obj="{foo:iconCalendar}" />
<OnyxOtherComponent />
<OnyxComp>Test</OnyxComp>
</template>`);
  });
});
