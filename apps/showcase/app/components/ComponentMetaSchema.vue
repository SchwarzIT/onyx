<script lang="ts" setup>
import type { PropertyMetaSchema } from "vue-component-meta";

const props = defineProps<{
  schema: PropertyMetaSchema;
}>();

const items = computed<string[]>(() => {
  if (typeof props.schema === "string") return [props.schema];

  // special handling for enums / union types
  if (props.schema.kind === "enum") return splitTypeUnion(props.schema.type);

  return [props.schema.type];
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
    <OnyxTag v-for="item in items" :key="item" class="schema__tag" :label="item" />
  </div>
</template>

<style lang="scss" scoped>
.schema {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-sm);
  flex-wrap: wrap;
}
</style>
