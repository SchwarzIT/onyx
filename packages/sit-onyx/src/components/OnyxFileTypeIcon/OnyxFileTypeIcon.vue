<script lang="ts" setup>
import {
  iconAudio,
  iconFile,
  iconFileArchive,
  iconFileCsv,
  iconFileDoc,
  iconFileGlobe,
  iconFilePdf,
  iconFilePpt,
  iconFileRtf,
  iconFileText,
  iconFileXls,
  iconFileXlsx,
  iconPicture,
  iconVideocam,
} from "@sit-onyx/icons";
import { computed } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxFileTypeIconProps } from "./types.js";

const props = defineProps<OnyxFileTypeIconProps>();

const FALLBACK_ICON = iconFile;

const icon = computed(() => {
  if (!props.type) return FALLBACK_ICON;
  if (props.type === "application/pdf") return iconFilePdf;
  if (props.type === "text/csv") return iconFileCsv;
  if (props.type.startsWith("audio/")) return iconAudio;
  if (props.type.startsWith("video/")) return iconVideocam;
  if (props.type.startsWith("image/")) return iconPicture;
  if (["application/rtf", "text/rtf"].includes(props.type)) return iconFileRtf;
  if (
    [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ].includes(props.type)
  ) {
    return iconFilePpt;
  }
  if (props.type === "application/vnd.ms-excel") return iconFileXls;
  if (props.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    return iconFileXlsx;
  }
  if (
    [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(props.type)
  ) {
    return iconFileDoc;
  }
  if (props.type === "text/html") return iconFileGlobe;
  if (
    [
      "application/zip",
      "application/vnd.rar",
      "application/x-7z-compressed",
      "application/x-tar",
      "application/gzip",
      "application/x-bzip2",
    ].includes(props.type)
  ) {
    return iconFileArchive;
  }
  if (props.type.startsWith("text/")) return iconFileText;

  return FALLBACK_ICON;
});
</script>

<template>
  <OnyxIcon v-bind="props" :icon="icon" />
</template>
