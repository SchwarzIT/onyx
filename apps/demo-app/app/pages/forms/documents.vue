<script lang="ts" setup>
import { useToast } from "sit-onyx";

const toast = useToast();
const { t } = useI18n();

const selectedFiles = ref<File[]>([]);
const uploadedFiles = ref<File[]>([]);

const removeFile = (file: File) => {
  selectedFiles.value = selectedFiles.value.filter((f) => f !== file);
};

const handleFileUploaded = (file: File) => {
  removeFile(file);
  uploadedFiles.value.push(file);

  toast.show({
    headline: t("documents.toasts.upload.success"),
    description: t("noDemoDataUpdated"),
    color: "success",
  });
};
</script>

<template>
  <div class="page">
    <OnyxHeadline is="h1">{{ $t("documents.document", 2) }}</OnyxHeadline>

    <div class="onyx-grid">
      <OnyxInfoCard
        class="onyx-grid-span-8 onyx-grid-lg-span-4"
        :headline="$t('documents.disclaimer.headline')"
        color="warning"
      >
        {{ $t("documents.disclaimer.description") }}
      </OnyxInfoCard>
    </div>

    <div class="onyx-grid">
      <OnyxFileUpload
        v-model="selectedFiles"
        class="onyx-grid-span-8 onyx-grid-lg-span-4"
        max-size="12MiB"
        list-type="maxHeight"
        multiple
      >
        <template #default="{ file, props }">
          <UploadFileCard
            v-bind="props"
            @done="handleFileUploaded(file)"
            @remove="removeFile(file)"
          />
        </template>
      </OnyxFileUpload>
    </div>

    <FileDataGrid :files="uploadedFiles" />
  </div>
</template>
