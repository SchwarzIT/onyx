<script lang="ts" setup>
import { iconTrash } from "@sit-onyx/icons";
import { ref } from "vue";
import OnyxFileCard from "../../OnyxFileCard/OnyxFileCard.vue";
import OnyxIconButton from "../../OnyxIconButton/OnyxIconButton.vue";
import OnyxModal from "../../OnyxModal/OnyxModal.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxFileUpload from "../OnyxFileUpload.vue";

const allFiles = ref<File[]>([]);
const isOpen = ref(false);

const removeFile = (fileToRemove: File) => {
  allFiles.value = allFiles.value.filter((file) => file !== fileToRemove);
};
</script>

<template>
  <OnyxFileUpload v-model="allFiles" :multiple="true"> </OnyxFileUpload>
  <OnyxModal v-model:open="isOpen" label="Files">
    <template #default>
      <div v-if="allFiles.length" class="file-list">
        <OnyxFileCard
          v-for="file in allFiles"
          :key="file.name"
          :filename="file.name"
          :size="file.size"
        >
          <template #actions>
            <OnyxIconButton
              color="danger"
              :icon="iconTrash"
              label="Remove File"
              @click="
                () => {
                  removeFile(file);
                }
              "
            />
          </template>
        </OnyxFileCard>
      </div>
      <div v-else class="file-list--empty">
        <p>No File Selected</p>
      </div>
    </template>
  </OnyxModal>
  <OnyxSystemButton class="open-modal-button" label="Show Files" @click="isOpen = true" />
</template>

<style lang="scss">
.onyx-basic-dialog__content {
  min-width: 20rem;
  min-height: 10rem;
}
.open-modal-button {
  margin: var(--onyx-density-md) 0;
}
.file-list {
  padding: var(--onyx-density-sm) var(--onyx-modal-padding-inline);
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-sm);
  &--empty {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
