<script lang="ts" setup>
import { iconMoreVertical, iconTrash } from "@sit-onyx/icons";
import { ref } from "vue";
import OnyxFileCard from "../../OnyxFileCard/OnyxFileCard.vue";
import OnyxIconButton from "../../OnyxIconButton/OnyxIconButton.vue";
import OnyxFlyoutMenu from "../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxFileUpload from "../OnyxFileUpload.vue";

const allFiles = ref<File[]>([]);

const removeFile = (fileToRemove: File) => {
  allFiles.value = allFiles.value.filter((file) => file !== fileToRemove);
};
</script>

<template>
  <OnyxFileUpload v-model="allFiles" :multiple="true" class="example-file-upload">
    <template #default="{ file, status }">
      <OnyxFileCard :filename="file.name" :size="file.size" :status="status">
        <template #actions>
          <OnyxFlyoutMenu label="Actions">
            <template #button="{ trigger }">
              <OnyxSystemButton v-bind="trigger" label="Toggle actions" :icon="iconMoreVertical" />
            </template>

            <template #options>
              <OnyxMenuItem>Open</OnyxMenuItem>
              <OnyxMenuItem>Print</OnyxMenuItem>
              <OnyxMenuItem>Share</OnyxMenuItem>
            </template>
          </OnyxFlyoutMenu>
          <OnyxIconButton
            color="danger"
            :icon="iconTrash"
            label="Remove File"
            @click="removeFile(file)"
          />
        </template>
      </OnyxFileCard>
    </template>
  </OnyxFileUpload>
</template>

<style lang="scss">
.example-file-upload {
  width: 30rem;
}
</style>
