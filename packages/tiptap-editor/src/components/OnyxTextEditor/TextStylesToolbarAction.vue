<script lang="ts" setup>
import { iconToolText } from "@sit-onyx/icons";
import type { Editor } from "@tiptap/vue-3";
import { injectI18n, OnyxFlyoutMenu, OnyxMenuItem, OnyxSystemButton } from "sit-onyx";
import { computed, toRef } from "vue";
import { type HeadingLevel, useEditorUtils } from "../../composables/useEditorUtils.js";

const props = defineProps<{
  editor?: Editor;
}>();

const { t } = injectI18n();

const { hasHeadingLevelExtension } = useEditorUtils(toRef(props, "editor"));

const toggleLevel = (level: number) => {
  props.editor
    ?.chain()
    .focus()
    .toggleHeading({ level: level as HeadingLevel })
    .run();
};

const isLevelActive = computed(() => {
  return (level: number) => props.editor?.isActive("heading", { level });
});
</script>

<template>
  <OnyxFlyoutMenu :label="t('editor.headings.headlines')">
    <template #button="{ trigger }">
      <OnyxSystemButton
        :label="t('editor.headings.headlines')"
        :icon="iconToolText"
        v-bind="trigger"
      />
    </template>

    <template #options>
      <template v-for="i in 6" :key="i">
        <OnyxMenuItem
          v-if="hasHeadingLevelExtension(i)"
          :label="t('editor.headings.level', { n: i })"
          :active="isLevelActive(i)"
          @click="toggleLevel(i)"
        />
      </template>
    </template>
  </OnyxFlyoutMenu>
</template>
