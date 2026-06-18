<script setup lang="ts">
import { useOutsideClick } from "@sit-onyx/headless";
import { computed, ref, useTemplateRef } from "vue";
import { injectI18n } from "../../../../i18n/index.js";
import OnyxBasicPopover from "../../../OnyxBasicPopover/OnyxBasicPopover.vue";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxInput from "../../../OnyxInput/OnyxInput.vue";

const props = defineProps<{
  /**
   * Value of the Link
   */
  modelValue?: string | { link: string; label?: string };
}>();

const open = ref(false);

const emit = defineEmits<{
  "update:modelValue": [value: { link: string; label?: string }];
}>();

const { t } = injectI18n();
const popover = useTemplateRef("popoverRef");

useOutsideClick({
  inside: popover,
  checkOnTab: true,
  disabled: computed(() => !open.value),
  onOutsideClick: () => (open.value = false),
});
const isObjectLink = computed(() => {
  return (
    typeof props.modelValue === "object" && props.modelValue !== null && "link" in props.modelValue
  );
});

const currentLink = computed({
  get: () =>
    isObjectLink.value
      ? (props.modelValue as { link: string }).link
      : ((props.modelValue as string) ?? ""),
  set: (newLink) => emit("update:modelValue", { link: newLink, label: currentLabel.value }),
});

const currentLabel = computed({
  get: () =>
    isObjectLink.value
      ? ((props.modelValue as { label?: string }).label ?? currentLink.value)
      : currentLink.value,
  set: (newLabel) => emit("update:modelValue", { link: currentLink.value, label: newLabel }),
});
</script>

<template>
  <OnyxBasicPopover
    v-model:open="open"
    class="onyx-component onyx-link-editor"
    :label="t('editor.link.edit')"
  >
    <template #default="{ trigger }">
      <OnyxButton
        class="onyx-link-editor__button"
        :label="currentLabel || currentLink || t('dataGrid.editing.addLink')"
        mode="plain"
        v-bind="trigger"
      />
    </template>

    <template #content>
      <div ref="popoverRef" class="onyx-link-editor__popover">
        <OnyxInput
          v-model="currentLabel"
          :label="t('dataGrid.editing.displayLabel')"
          type="text"
          :placeholder="t('dataGrid.editing.enterText')"
        />
        <OnyxInput v-model="currentLink" label="Link" placeholder="https://..." />
      </div>
    </template>
  </OnyxBasicPopover>
</template>

<style lang="scss">
.onyx-link-editor {
  width: 100%;
  &__button {
    width: 100%;
    justify-content: start;
  }
  &__popover {
    display: flex;
    width: 16rem;
    flex-direction: column;
    gap: var(--onyx-density-sm);
    padding: var(--onyx-density-sm);
  }
}
</style>
