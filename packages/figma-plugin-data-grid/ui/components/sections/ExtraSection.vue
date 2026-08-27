<script lang="ts" setup>
import { OnyxCard, OnyxHeadline, OnyxSelect, type SelectOption } from "sit-onyx";
import type { GenerateDataGridPayload } from "../../types/index.js";

const data = defineModel<GenerateDataGridPayload>({ required: true });

const listLabel = "Available options";

const headlineOptions = (["h1", "h2", "h3", "h4"] as const).map((headline) => {
  return { label: headline, value: headline } satisfies SelectOption;
});

const paginationOptions = [
  { label: "Select", value: "select" },
  { label: "Button", value: "button" },
] as const satisfies SelectOption[];
</script>

<template>
  <OnyxCard>
    <OnyxHeadline is="h3">Extra</OnyxHeadline>

    <div class="onyx-grid">
      <OnyxSelect
        v-model="data.headline"
        class="onyx-grid-span-4"
        label="Headline"
        :list-label
        :options="headlineOptions"
        placeholder="none"
      />

      <OnyxSelect
        v-model="data.pagination"
        class="onyx-grid-span-4"
        label="Pagination"
        :list-label
        :options="paginationOptions"
        placeholder="none"
      />
    </div>
  </OnyxCard>
</template>
