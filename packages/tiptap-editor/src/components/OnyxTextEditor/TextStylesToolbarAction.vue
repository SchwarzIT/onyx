<script lang="ts" setup>
import { iconToolText } from "@sit-onyx/icons";
import type { StarterKitOptions } from "@tiptap/starter-kit";
import type { Editor } from "@tiptap/vue-3";
import { injectI18n, OnyxFlyoutMenu, OnyxMenuItem, OnyxSystemButton } from "sit-onyx";
import { computed } from "vue";

type HeadingOptions = Extract<StarterKitOptions["heading"], object>;
type Level = NonNullable<HeadingOptions["levels"]>[number];

const props = defineProps<{
  editor?: Editor;
}>();

const { t } = injectI18n();

const toggleLevel = (level: number) => {
  props.editor
    ?.chain()
    .focus()
    .toggleHeading({ level: level as Level })
    .run();
};

const isLevelActive = computed(() => {
  return (level: number) => props.editor?.isActive("heading", { level });
});

const hasLevelExtension = computed(() => {
  return (level: number) => {
    if (!props.editor) return true;
    const extension = props.editor.extensionManager.extensions.find((e) => e.name === "heading");
    if (!extension) return false;
    return (extension.options as HeadingOptions).levels?.includes(level as Level) ?? false;
  };
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
          v-if="hasLevelExtension(i)"
          :label="t('editor.headings.level', { n: i })"
          :active="isLevelActive(i)"
          @click="toggleLevel(i)"
        />
      </template>
    </template>
  </OnyxFlyoutMenu>
</template>
