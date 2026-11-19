import { describe, expect, test } from "vitest";
import { createPlaygroundUrl } from "../../app/utils/playground.js";

describe("playground.ts", () => {
  test("should create encoded link to playground", () => {
    const url = createPlaygroundUrl(`<script lang="ts" setup>
const message = "Hello World";
</script>

<template>
  <p>{{ message }}</p>
</template>
      `);

    expect(url).toBe(
      "https://playground.onyx.schwarz#eyJzcmMvQXBwLnZ1ZSI6IjxzY3JpcHQgbGFuZz1cInRzXCIgc2V0dXA+XG5jb25zdCBtZXNzYWdlID0gXCJIZWxsbyBXb3JsZFwiO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+e3sgbWVzc2FnZSB9fTwvcD5cbjwvdGVtcGxhdGU+XG4gICAgICAifQ==",
    );
  });
});
