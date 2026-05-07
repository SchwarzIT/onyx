<script lang="ts" setup>
import type { PropertyMetaSchema } from "vue-component-meta";
import type { MetaItem } from "./ComponentMetaDataGrid.vue";

const props = defineProps<{
  schema: PropertyMetaSchema;
}>();

type NormalizedSchemaItem = {
  label: string;
  objectProperties?: MetaItem[];
};

const normalizedSchema = computed<NormalizedSchemaItem[]>(() => {
  if (typeof props.schema === "string") return [{ label: props.schema }];

  if (props.schema.kind === "enum") {
    const types = props.schema.type
      .split("|")
      .map((type) => type.trim())
      .filter((type) => type !== "undefined");

    const nestedSchemas = props.schema.schema ?? [];

    return types.map<NormalizedSchemaItem>((type) => {
      const nestedSchema = nestedSchemas.find(
        (schema) => typeof schema !== "string" && schema.type === type && schema.kind === "object",
      );

      let objectProperties: MetaItem[] = [];

      if (nestedSchema && typeof nestedSchema !== "string" && nestedSchema.kind === "object") {
        objectProperties = Object.entries(nestedSchema?.schema ?? {}).map<MetaItem>(
          ([key, value]) => {
            return { ...value, name: key };
          },
        );
      }

      return {
        label: type,
        objectProperties: objectProperties.length > 0 ? objectProperties : undefined,
      };
    });
  }

  // fallback - no special handling for schema kind
  return [{ label: props.schema.type }];
});
</script>

<template>
  <div class="schema">
    <template v-for="item in normalizedSchema" :key="item.label">
      <OnyxTag v-if="!item.objectProperties" class="schema__tag" :label="item.label" />

      <OnyxDialog v-else class="dialog" :label="item.label">
        <template #trigger="{ trigger }">
          <OnyxTag
            class="schema__tag--clickable"
            v-bind="trigger"
            :label="item.label"
            color="primary"
          />
        </template>

        <div class="dialog__content">
          <ComponentMetaDataGrid
            :headline="$t('components.property', 2)"
            :items="item.objectProperties"
          />
        </div>
      </OnyxDialog>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.schema {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-sm);
  flex-wrap: wrap;

  &__tag {
    &--clickable {
      cursor: pointer;
    }
  }
}

.dialog {
  :deep(.onyx-basic-popover__dialog) {
    width: 32rem;
  }

  &__content {
    padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);
  }
}
</style>
