<script lang="ts" setup>
import { iconTrash } from "@sit-onyx/icons";
import { ref } from "vue";
import OnyxFileCard from "../../OnyxFileCard/OnyxFileCard.vue";
import OnyxIconButton from "../../OnyxIconButton/OnyxIconButton.vue";
import OnyxFlyoutMenu from "../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxFileUpload from "../OnyxFileUpload.vue";

const allFiles = ref<File[]>([]);

const removeFile = (fileToRemove: File) => {
  allFiles.value = allFiles.value.filter((file) => file !== fileToRemove);
};
</script>

<template>
  <OnyxFileUpload v-model="allFiles" multiple class="example-file-upload">
    <template #default="{ file, props }">
      <OnyxFileCard v-bind="props">
        <template #actions>
          <OnyxFlyoutMenu label="Actions">
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

<style lang="scss" scoped>
.example-file-upload {
  width: 30rem;
}
</style>
