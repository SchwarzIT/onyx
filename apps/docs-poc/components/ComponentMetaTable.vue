<script lang="ts" setup>
import markdownit from "markdown-it";
import { OnyxHeadline, OnyxTable } from "sit-onyx";

const props = defineProps<{
  headline: string;
  data: Awaited<ReturnType<typeof useComponentDocs>>["data"]["meta"][
    | "props"
    | "events"
    | "slots"
    | "exposed"];
}>();

const hasDefaultValues = computed(() => {
  return props.data.some((row) => "default" in row);
});

const EMPTY_VALUE = "-" as const;

const md = markdownit();
</script>

<template>
  <div>
    <OnyxHeadline
      is="h2"
      class="headline"
    >
      {{ props.headline }}
    </OnyxHeadline>
    <OnyxTable
      striped
      grid
    >
      <thead>
        <tr>
          <th>{{ $t("component.metaTable.name") }}</th>
          <th>{{ $t("component.metaTable.description") }}</th>
          <th v-if="hasDefaultValues">
            {{ $t("component.metaTable.defaultValue") }}
          </th>
          <th>{{ $t("component.metaTable.control") }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in props.data"
          :key="row.name"
        >
          <td :class="{ 'onyx-required-marker': 'required' in row && row.required }">
            {{ row.name }}
          </td>

          <td>
            <div class="description">
              <div
                v-if="row.description"
                v-html="md.renderInline(row.description)"
              ></div>
              <div class="code-snippet">
                {{ $t("component.metaTable.type") }}:
                {{ row.type.replaceAll("| undefined", "").trim() }}
              </div>
            </div>
          </td>

          <td v-if="hasDefaultValues">
            <span
              v-if="'default' in row && row.default != undefined"
              class="code-snippet"
            >
              {{ row.default }}
            </span>
            <span v-else>{{ EMPTY_VALUE }}</span>
          </td>

          <td>{{ EMPTY_VALUE }}</td>
        </tr>
      </tbody>
    </OnyxTable>
  </div>
</template>

<style lang="scss" scoped>
.headline {
  margin-bottom: var(--onyx-spacing-sm);
}

.description {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: var(--onyx-spacing-4xs);
  white-space: pre-line;
}
</style>
