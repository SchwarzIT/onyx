<script lang="ts" setup>
import type { PropertyMetaSchema } from "vue-component-meta";
import type { ComponentMetaItem } from "./ComponentMetaDataGrid.vue";

const props = defineProps<{
  schema: PropertyMetaSchema;
}>();

type NormalizedSchemaItem = {
  label: string;
  objectProperties?: ComponentMetaItem[];
};

const normalizedSchema = computed<NormalizedSchemaItem[]>(() => {
  if (typeof props.schema === "string") return [{ label: props.schema }];

  if (props.schema.kind === "enum") {
    const types = splitTypeUnion(props.schema.type);

    const nestedSchemas = props.schema.schema ?? [];

    return types.map<NormalizedSchemaItem>((type) => {
      const nestedSchema = nestedSchemas.find(
        (schema) => typeof schema !== "string" && schema.type === type && schema.kind === "object",
      );

      let objectProperties: ComponentMetaItem[] = [];

      if (nestedSchema && typeof nestedSchema !== "string" && nestedSchema.kind === "object") {
        objectProperties = Object.values(nestedSchema?.schema ?? {});
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

/**
 * Splits a given type string into its separate union types.
 * Will handle nested union types correctly so e.g. `FormInjected<"required" | "optional">` is not split.
 */
function splitTypeUnion(typeStr: string): string[] {
  const result: string[] = [];
  let currentPart = "";

  // Track nesting depth of brackets, parentheses, and braces
  let depth = 0;

  // Track if we are inside a string literal (e.g., "my | string")
  let inQuote: string | null = null;

  for (let i = 0; i < typeStr.length; i++) {
    const char = typeStr[i];

    // 1. Handle String Literals
    if (inQuote) {
      // If we see the matching quote and it's not escaped, exit quote state
      if (char === inQuote && typeStr[i - 1] !== "\\") {
        inQuote = null;
      }
      currentPart += char;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inQuote = char;
      currentPart += char;
      continue;
    }

    // 2. Handle Nesting Depth
    if (char === "<" || char === "{" || char === "(" || char === "[") {
      depth++;
    } else if (char === ">" || char === "}" || char === ")" || char === "]") {
      depth--;
    }

    // 3. Split on Pipe (ONLY if at top level)
    if (char === "|" && depth === 0) {
      result.push(currentPart.trim());
      currentPart = ""; // Reset for the next type
    } else {
      currentPart += char;
    }
  }

  // Push the final remaining part
  if (currentPart.trim()) {
    result.push(currentPart.trim());
  }

  return result.filter((type) => type !== "undefined");
}
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
