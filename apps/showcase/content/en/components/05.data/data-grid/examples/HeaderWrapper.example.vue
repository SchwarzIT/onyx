<script setup lang="ts">
import { createFeature, OnyxDataGrid, OnyxTooltip, type ColumnConfig } from "sit-onyx";
import { computed, defineComponent, h } from "vue";

type Entry = {
  id: number;
  name: string;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice" },
    { id: 2, name: "Charlie" },
    { id: 3, name: "Bob" },
    { id: 4, name: "Robin" },
    { id: 5, name: "John" },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [{ key: "name", label: "Name" }];
});

const withHeaderTooltip = createFeature(() => ({
  name: Symbol("headerTooltip"),
  header: {
    wrapper: (column) => {
      // ideally you create a dedicated .vue file for the component and import it here
      const TooltipHeaderWrapper = defineComponent({
        props: {
          tooltipText: {
            type: String,
            required: true,
          },
        },
        setup(props, { slots }) {
          return () => {
            return h(OnyxTooltip, { text: props.tooltipText }, {
              default: ({ trigger }) => h("div", { ...trigger }, slots),
            } as InstanceType<typeof OnyxTooltip>["$slots"]);
          };
        },
      });

      return h(TooltipHeaderWrapper, { tooltipText: column.label });
    },
  },
}));

const features = [withHeaderTooltip];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
