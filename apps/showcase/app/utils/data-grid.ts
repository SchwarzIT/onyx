import { ComponentMetaSchema, MDC } from "#components";
import { createFeature, DataGridFeatures, type DataGridEntry, type TypeRenderMap } from "sit-onyx";
import type { PropertyMetaSchema } from "vue-component-meta";
import "./data-grid.scss";

export type RequiredTypeRendererOptions<TEntry extends DataGridEntry> = {
  /**
   * Callback to decide whether the given cell should be marked as required.
   */
  required?: (row: TEntry) => boolean;
};

export const customDataGridColumnTypes = createFeature(<TEntry extends DataGridEntry>() => ({
  name: Symbol("customTypes"),
  typeRenderer: {
    markdown: DataGridFeatures.createTypeRenderer<object, TEntry>({
      cell: {
        component: ({ modelValue }) => {
          if (typeof modelValue !== "string" || !modelValue) return "-";
          return h(MDC, { value: modelValue, class: "markdown-cell" });
        },
      },
    }),
    required: DataGridFeatures.createTypeRenderer<RequiredTypeRendererOptions<TEntry>, TEntry>({
      cell: {
        component: ({ row, metadata, modelValue }) => {
          const required = metadata?.typeOptions?.required?.(row);
          if (!required) return modelValue;
          return h("span", { class: { "onyx-required-marker": row.required } }, String(modelValue));
        },
      },
    }),
    propertyMetaSchema: DataGridFeatures.createTypeRenderer<object, TEntry>({
      cell: {
        component: ({ modelValue }) => {
          if (!modelValue) return "-";
          return h(ComponentMetaSchema, { schema: modelValue as PropertyMetaSchema });
        },
      },
    }),
  } satisfies TypeRenderMap<TEntry>,
}));
