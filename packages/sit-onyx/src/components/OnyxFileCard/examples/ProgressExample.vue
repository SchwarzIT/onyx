<script lang="ts" setup>
import {
  iconCircleX,
  iconCloudArrowUp,
  iconMediaPause,
  iconMediaPlay,
  iconMoreVerticalSmall,
  iconTrash,
} from "@sit-onyx/icons";
import { computed, ref } from "vue";
import OnyxIconButton from "../../OnyxIconButton/OnyxIconButton.vue";
import OnyxFlyoutMenu from "../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxFileCard from "../OnyxFileCard.vue";

const colors = {
  ready: { color: "warning", progressColor: "neutral" },
  paused: { color: "warning", progressColor: "neutral" },
  canceled: { color: "danger", progressColor: "neutral" },
  proccessing: { color: "primary", progressColor: "primary" },
  done: { color: "primary", progressColor: "primary" },
};
const status = ref("ready");
const progress = ref(0);
const intervalId = ref<number | null>(null);

const start = () => {
  if (intervalId.value !== null) return;
  status.value = "proccessing";
  intervalId.value = window.setInterval(() => {
    progress.value += 1;
    if (progress.value >= 100) {
      clearInterval(intervalId.value!);
      intervalId.value = null;
      status.value = "done";
      progress.value = 0;
    }
  }, 50);
};

const pause = () => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
    status.value = "paused";
  }
};

const cancel = () => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
  status.value = "canceled";
  progress.value = 0;
};

const statusText = computed(() => {
  if (status.value === "proccessing") {
    return `${progress.value}%`;
  }
  if (status.value === "ready") {
    return "Ready to Upload";
  }
  if (status.value === "paused") {
    return "Paused";
  }
  if (status.value === "canceled") {
    return "Canceled";
  }
  if (status.value === "done") {
    return "File Uploaded";
  }
  return "";
});
</script>

<template>
  <OnyxFileCard
    filename="example.pdf"
    type="application/pdf"
    size="42MiB"
    :status="{
      color: colors[status].color,
      text: statusText,
      progress: { progress: progress, color: colors[status].progressColor },
    }"
  >
    <template #actions>
      <OnyxIconButton
        v-if="status === 'ready' || status === 'canceled'"
        color="primary"
        :icon="iconCloudArrowUp"
        label="start"
        @click="start()"
      />
      <OnyxIconButton
        v-if="status === 'proccessing'"
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
        v-if="status === 'proccessing' || status === 'paused'"
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
