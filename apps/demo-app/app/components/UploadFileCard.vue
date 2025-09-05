<script lang="ts" setup>
import {
  iconCircleX,
  iconCloudArrowUp,
  iconMediaPause,
  iconMediaPlay,
  iconTrash,
} from "@sit-onyx/icons";
import { type FileCardStatus, type OnyxFileCardProps } from "sit-onyx";
import { computed } from "vue";

const props = defineProps<OnyxFileCardProps>();

const emit = defineEmits<{
  /**
   * Emitted when the upload is done.
   */
  done: [];
  /**
   * Emitted when the file should be removed.
   */
  remove: [];
}>();

const { t } = useI18n();
const { status, progress, start, pause, cancel } = useFileUpload();

const cardStatus = computed<FileCardStatus>(() => {
  let _status: FileCardStatus;

  switch (status.value) {
    case "ready":
      _status = { text: t("documents.file.ready"), color: "neutral" };
      break;
    case "paused":
      _status = { text: t("documents.file.paused"), color: "neutral" };
      break;
    case "canceled":
      _status = { text: t("documents.file.canceled"), color: "danger" };
      break;
    case "done":
      _status = { text: t("documents.file.done"), color: "success" };
      break;
    default:
      _status = { text: `${progress.value}%`, color: "primary" };
  }

  return { ..._status, progress: progress.value };
});

watchEffect(() => {
  if (status.value === "done") emit("done");
});
</script>

<template>
  <OnyxFileCard v-bind="props" :status="props.status ?? cardStatus">
    <template #actions>
      <OnyxIconButton
        v-if="status === 'ready' || status === 'canceled'"
        color="primary"
        :icon="iconCloudArrowUp"
        :label="$t('documents.file.actions.upload')"
        @click="start"
      />
      <OnyxIconButton
        v-if="status === 'processing'"
        color="neutral"
        :icon="iconMediaPause"
        :label="$t('documents.file.actions.pause')"
        @click="pause"
      />
      <OnyxIconButton
        v-if="status === 'paused'"
        color="neutral"
        :icon="iconMediaPlay"
        :label="$t('documents.file.actions.continue')"
        @click="start"
      />
      <OnyxIconButton
        v-if="status === 'processing' || status === 'paused'"
        color="neutral"
        :icon="iconCircleX"
        :label="$t('documents.file.actions.cancel')"
        @click="cancel"
      />
      <OnyxIconButton
        v-if="status === 'canceled'"
        color="danger"
        :icon="iconTrash"
        :label="$t('documents.file.actions.remove')"
        @click="emit('remove')"
      />
    </template>
  </OnyxFileCard>
</template>
