<script lang="ts" setup>
import {
  iconCircleX,
  iconCloudArrowUp,
  iconMediaPause,
  iconMediaPlay,
  iconTrash,
} from "@sit-onyx/icons";
import { OnyxFileCard, OnyxIconButton, type FileCardStatus } from "sit-onyx";
import { computed, onUnmounted, ref } from "vue";

type UploadStatus = "ready" | "paused" | "canceled" | "processing" | "done";

/**
 * Re-usable composable for managing the file upload state.
 * Should be extracted to a different .ts file in a real project.
 */
const useFileUpload = () => {
  const progress = ref(0);
  const status = ref<UploadStatus>("ready");

  let intervalId: ReturnType<typeof setInterval> | undefined;

  const removeInterval = () => {
    clearInterval(intervalId);
    intervalId = undefined;
  };

  onUnmounted(removeInterval);

  const start = () => {
    if (intervalId != undefined) return;
    status.value = "processing";

    // TODO: implement your actual upload here
    // for this demo purpose, we will just use an interval
    intervalId = setInterval(() => {
      progress.value++;

      if (progress.value >= 100) {
        removeInterval();
        status.value = "done";
        progress.value = 0;
      }
    }, 50);
  };

  const pause = () => {
    removeInterval();
    status.value = "paused";
  };

  const cancel = () => {
    removeInterval();
    status.value = "canceled";
    progress.value = 0;
  };

  return { progress, status, start, pause, cancel };
};

const { status, progress, start, pause, cancel } = useFileUpload();

const cardStatus = computed<FileCardStatus>(() => {
  let _status: FileCardStatus;

  switch (status.value) {
    case "ready":
      _status = { text: "Ready to upload", color: "neutral" };
      break;
    case "paused":
      _status = { text: "Paused", color: "neutral" };
      break;
    case "canceled":
      _status = { text: "Canceled", color: "danger" };
      break;
    case "done":
      _status = { text: "Uploaded", color: "success" };
      break;
    default:
      _status = { text: `${progress.value}%`, color: "primary" };
  }

  return { ..._status, progress: progress.value };
});
</script>

<template>
  <OnyxFileCard filename="example.pdf" type="application/pdf" size="42MiB" :status="cardStatus">
    <template #actions>
      <OnyxIconButton
        v-if="status === 'ready' || status === 'canceled'"
        label="Start upload"
        :icon="iconCloudArrowUp"
        color="primary"
        @click="start()"
      />
      <OnyxIconButton
        v-if="status === 'processing'"
        label="Pause upload"
        :icon="iconMediaPause"
        color="neutral"
        @click="pause()"
      />
      <OnyxIconButton
        v-if="status === 'paused'"
        label="Continue upload"
        :icon="iconMediaPlay"
        color="neutral"
        @click="start()"
      />
      <OnyxIconButton
        v-if="status === 'processing' || status === 'paused'"
        label="Cancel upload"
        :icon="iconCircleX"
        color="neutral"
        @click="cancel()"
      />

      <OnyxIconButton
        v-if="status === 'done'"
        label="Delete file"
        :icon="iconTrash"
        color="danger"
      />
    </template>
  </OnyxFileCard>
</template>
