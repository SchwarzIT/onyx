<script lang="ts" setup>
import {
  iconCircleX,
  iconCloudArrowUp,
  iconMediaPause,
  iconMediaPlay,
  iconMoreVerticalSmall,
  iconTrash,
} from "@sit-onyx/icons";
import { computed, onUnmounted, ref } from "vue";
import OnyxIconButton from "../../OnyxIconButton/OnyxIconButton.vue";
import OnyxFlyoutMenu from "../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxFileCard from "../OnyxFileCard.vue";
import type { FileCardStatus } from "../types.js";

type UploadStatus = "ready" | "paused" | "canceled" | "processing" | "done";
/**
 * Re-usable composable for managing the file upload state.
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

    // usually the upload progress would be given e.g. by the server ar the upload request
    // for this demo purpose, we will just use a interval
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
        color="primary"
        :icon="iconCloudArrowUp"
        label="start"
        @click="start()"
      />
      <OnyxIconButton
        v-if="status === 'processing'"
        color="neutral"
        :icon="iconMediaPause"
        label="pause"
        @click="pause()"
      />
      <OnyxIconButton
        v-if="status === 'paused'"
        color="neutral"
        :icon="iconMediaPlay"
        label="continue"
        @click="start()"
      />
      <OnyxIconButton
        v-if="status === 'processing' || status === 'paused'"
        color="neutral"
        :icon="iconCircleX"
        label="cancel"
        @click="cancel()"
      />

      <OnyxFlyoutMenu v-if="status === 'done'" label="More actions" trigger="click">
        <template #button="{ trigger }">
          <OnyxIconButton
            color="neutral"
            :icon="iconMoreVerticalSmall"
            label="Show more actions"
            v-bind="trigger"
          />
        </template>

        <template #options>
          <OnyxMenuItem label="Action 1" />
          <OnyxMenuItem label="Action 2" />
          <OnyxMenuItem label="Action 3" />
        </template>
      </OnyxFlyoutMenu>
      <OnyxIconButton
        v-if="status === 'done'"
        color="danger"
        :icon="iconTrash"
        label="Remove file"
      />
    </template>
  </OnyxFileCard>
</template>

<style lang="scss" scoped>
.onyx-file-card {
  max-width: 25rem;
}
</style>
