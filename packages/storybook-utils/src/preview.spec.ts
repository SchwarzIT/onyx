import { flagDE } from "@sit-onyx/flags";
import { iconBellRing, iconCalendar, iconPlaceholder } from "@sit-onyx/icons";
import { describe, expect, test } from "vitest";
import { replaceAll, sourceCodeTransformer } from "./preview.js";

describe("preview.ts", () => {
  test("should transform source code and add icon/onyx imports", async () => {
    // ACT
    const sourceCode = await sourceCodeTransformer(`<template>
<OnyxTest icon='${iconPlaceholder}' test='${iconBellRing}' :obj="{foo:'${replaceAll(iconCalendar, '"', "\\'")}'}" flag='${flagDE}' />
<OnyxOtherComponent />
<OnyxComp>Test</OnyxComp>
</template>`);

    // ASSERT
    expect(sourceCode).toBe(`<script lang="ts" setup>
import { OnyxComp, OnyxOtherComponent, OnyxTest } from "sit-onyx";
import { iconBellRing, iconCalendar, iconPlaceholder } from "@sit-onyx/icons";
import { flagDE } from "@sit-onyx/flags";
</script>

<template>
  <OnyxTest
    :icon="iconPlaceholder"
    :test="iconBellRing"
    :obj="{foo:iconCalendar}"
    :flag="flagDE"
  />
  <OnyxOtherComponent />
  <OnyxComp>Test</OnyxComp>
</template>`);
  });

  test("should not add imports twice", async () => {
    // ACT
    let sourceCode = await sourceCodeTransformer(`<template>
  <OnyxTest />
</template>`);

    // ASSERT
    const expectedCode = `<script lang="ts" setup>
import { OnyxTest } from "sit-onyx";
</script>

<template>
  <OnyxTest />
</template>`;

    expect(sourceCode).toBe(expectedCode);

    // ACT (call transformer twice)
    sourceCode = await sourceCodeTransformer(sourceCode);

    // ASSERT
    expect(sourceCode).toBe(expectedCode);
  });
});
