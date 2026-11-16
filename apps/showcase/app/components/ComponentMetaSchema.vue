<script lang="ts" setup>
import { iconCircleInformation } from "@sit-onyx/icons";
import { FORM_INJECTED_SYMBOL, SKELETON_INJECTED_SYMBOL } from "sit-onyx";
import type { PropertyMetaSchema } from "vue-component-meta";

type MappedSchema = {
  label: string;
  /**
   * Optional description to display inside a tooltip.
   */
  description?: string;
};

const props = defineProps<{
  schema: PropertyMetaSchema;
}>();

/**
 * A map of descriptions for specific schemas to add additional context / help for the user
 */
const descriptionMap: Record<string, string> = {
  [FORM_INJECTED_SYMBOL.description ?? ""]:
    "Inherits the value from the parent OnyxForm component if one exists.",
  [SKELETON_INJECTED_SYMBOL.description ?? ""]:
    "Inherits the value from the parent OnyxForm or OnyxPageLayout component if one exists.",
  SkeletonInjected: `Set a boolean to enable/disable the skeleton. For components that render multiple skeletons (such as the checkbox group, accordion etc.), you can also set a number to customize the skeleton count. When set to the "${SKELETON_INJECTED_SYMBOL.description}" symbol, the skeleton state is inherited by the parent OnyxForm or OnyxPageLayout component if one exists.`,
};

const items = computed<MappedSchema[]>(() => {
  function getRawItems() {
    if (typeof props.schema === "string") return [props.schema];

    // special handling for enums / union types
    if (props.schema.kind === "enum") return splitTypeUnion(props.schema.type);

    return [props.schema.type];
  }

  const items = getRawItems();

  return items.map<MappedSchema>((item) => {
    return {
      label: item,
      description: descriptionMap[item],
    };
  });
});

/**
 * Splits a given type string into its separate union types.
 * Handles nested union types (e.g., `FormInjected<"required" | "optional">`)
 * and filters out "undefined" and empty segments.
 */
function splitTypeUnion(typeStr: string): string[] {
  const result: string[] = [];

  let depth = 0;
  let inQuote: string | null = null;
  let startIndex = 0;

  for (let i = 0; i < typeStr.length; i++) {
    const char = typeStr[i];

    // 1. Handle String Literals
    if (inQuote) {
      if (char === inQuote && typeStr[i - 1] !== "\\") {
        inQuote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inQuote = char;
      continue;
    }

    // 2. Handle Nesting Depth
    if (char === "<" || char === "{" || char === "(" || char === "[") {
      depth++;
      continue;
    }

    if (char === ">" || char === "}" || char === ")" || char === "]") {
      depth--;
      continue;
    }

    // 3. Split on Pipe (ONLY if at top level)
    if (char === "|" && depth === 0) {
      const part = typeStr.slice(startIndex, i).trim();

      // Avoid pushing empty strings (from leading pipes) or "undefined"
      if (part && part !== "undefined") {
        result.push(part);
      }
      startIndex = i + 1; // Move start index past the pipe
    }
  }

  // 4. Push the final remaining part
  const finalPart = typeStr.slice(startIndex).trim();
  if (finalPart && finalPart !== "undefined") {
    result.push(finalPart);
  }

  return result;
}
</script>

<template>
  <div class="schema">
    <OnyxTooltip
      v-for="item in items"
      :key="item.label"
      :disabled="!item.description"
      :text="item.description"
      class="schema__tooltip"
    >
      <template #default="{ trigger }">
        <OnyxTag
          v-bind="trigger"
          :label="item.label"
          :icon="item.description ? iconCircleInformation : undefined"
          density="compact"
        />
      </template>
    </OnyxTooltip>
  </div>
</template>

<style lang="scss" scoped>
.schema {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-xs);
  flex-wrap: wrap;

  &__tooltip {
    max-width: 100%;
  }
}
</style>
