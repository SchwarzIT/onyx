<script lang="ts" setup>
import type { TocLink } from "@nuxtjs/mdc";

const props = defineProps<{
  links: TocLink[];
}>();
</script>

<template>
  <OnyxUnstableTableOfContents>
    <OnyxUnstableTableOfContentsItem
      v-for="link in props.links"
      :key="link.id"
      :link="`#${link.id}`"
    >
      {{ link.text }}

      <template v-if="link.children?.length" #children>
        <OnyxUnstableTableOfContentsItem
          v-for="child in link.children"
          :key="child.id"
          :link="`#${child.id}`"
        >
          {{ child.text }}
        </OnyxUnstableTableOfContentsItem>
      </template>
    </OnyxUnstableTableOfContentsItem>
  </OnyxUnstableTableOfContents>
</template>
