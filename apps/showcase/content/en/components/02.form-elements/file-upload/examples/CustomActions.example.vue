<script lang="ts" setup>
import { iconPlaceholder, iconTrash } from "@sit-onyx/icons";
import {
  OnyxFileCard,
  OnyxFileUpload,
  OnyxFlyoutMenu,
  OnyxIconButton,
  OnyxMenuItem,
} from "sit-onyx";
import { ref } from "vue";

// create an initial dummy file for this example
const exampleFile = new File([iconPlaceholder], "icon-placeholder.svg", { type: "image/svg+xml" });

const files = ref<File[]>([exampleFile]);

const removeFile = (fileToRemove: File) => {
  files.value = files.value.filter((file) => file !== fileToRemove);
};

const handleActionClick = () => {
  // your logic here
};
</script>

<template>
  <OnyxFileUpload v-model="files" multiple>
    <template #default="{ file, props }">
      <OnyxFileCard v-bind="props">
        <template #actions>
          <OnyxFlyoutMenu label="Actions">
            <template #options>
              <OnyxMenuItem label="Open" @click="handleActionClick" />
              <OnyxMenuItem label="Print" @click="handleActionClick" />
              <OnyxMenuItem label="Share" @click="handleActionClick" />
            </template>
          </OnyxFlyoutMenu>

          <OnyxIconButton
            label="Remove File"
            :icon="iconTrash"
            color="danger"
            @click="removeFile(file)"
          />
        </template>
      </OnyxFileCard>
    </template>
  </OnyxFileUpload>
</template>
