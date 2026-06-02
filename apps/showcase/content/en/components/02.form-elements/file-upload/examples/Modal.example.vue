<script lang="ts" setup>
import { iconPlaceholder, iconTrash } from "@sit-onyx/icons";
import {
  MediaType,
  OnyxFileCard,
  OnyxFileUpload,
  OnyxIconButton,
  OnyxModal,
  OnyxSystemButton,
} from "sit-onyx";
import { ref } from "vue";

// create an initial dummy file for this example
const exampleFile = new File([iconPlaceholder], "icon-placeholder.svg", { type: "image/svg+xml" });

const files = ref<File[]>([exampleFile]);
const isModalOpen = ref(false);

const removeFile = (fileToRemove: File) => {
  files.value = files.value.filter((file) => file !== fileToRemove);
  if (!files.value.length) isModalOpen.value = false;
};
</script>

<template>
  <div class="upload">
    <OnyxFileUpload v-model="files" list-type="hidden" multiple />
    <OnyxSystemButton
      v-if="files.length"
      class="upload__button"
      label="Show files"
      @click="isModalOpen = true"
    />

    <OnyxModal v-model:open="isModalOpen" label="Selected files">
      <div class="files">
        <OnyxFileCard
          v-for="file in files"
          :key="file.name"
          :filename="file.name"
          :size="file.size"
          :type="file.type as MediaType"
        >
          <template #actions>
            <OnyxIconButton
              label="Remove file"
              :icon="iconTrash"
              color="danger"
              @click="removeFile(file)"
            />
          </template>
        </OnyxFileCard>
      </div>
    </OnyxModal>
  </div>
</template>

<style lang="scss" scoped>
.upload {
  width: max-content;
  max-width: 100%;

  &__button {
    display: block;
    margin-top: var(--onyx-density-xs);
    margin-inline: auto;
  }
}

.files {
  padding: var(--onyx-density-sm) var(--onyx-modal-padding-inline);
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-sm);
}
</style>
