<script lang="ts" setup>
import { iconBulletList } from "@sit-onyx/icons";
import type { Editor } from "@tiptap/vue-3";
import { injectI18n, OnyxFlyoutMenu, OnyxIcon, OnyxMenuItem, OnyxSystemButton } from "sit-onyx";
import { toRef } from "vue";
import { useEditorUtils } from "../../composables/useEditorUtils.js";

const props = defineProps<{
  editor?: Editor;
}>();

const { t } = injectI18n();

const { hasExtension } = useEditorUtils(toRef(props, "editor"));
</script>

<template>
  <OnyxFlyoutMenu :label="t('editor.lists.lists')">
    <template #button="{ trigger }">
      <OnyxSystemButton :label="t('editor.lists.lists')" :icon="iconBulletList" v-bind="trigger" />
    </template>

    <template #options>
      <OnyxMenuItem
        v-if="hasExtension('orderedList')"
        :active="props.editor?.isActive('orderedList')"
        @click="props.editor?.chain().focus().toggleOrderedList().run()"
      >
        <OnyxIcon :icon="iconBulletList" />
        {{ t("editor.lists.orderedList") }}
      </OnyxMenuItem>

      <OnyxMenuItem
        v-if="hasExtension('bulletList')"
        :active="props.editor?.isActive('bulletList')"
        @click="props.editor?.chain().focus().toggleBulletList().run()"
      >
        <OnyxIcon :icon="iconBulletList" />
        {{ t("editor.lists.unorderedList") }}
      </OnyxMenuItem>
    </template>
  </OnyxFlyoutMenu>
</template>
