<script lang="ts" setup>
import audio from "@sit-onyx/icons/audio.svg?raw";
import fileArchive from "@sit-onyx/icons/file-archive.svg?raw";
import fileCsv from "@sit-onyx/icons/file-csv.svg?raw";
import fileDoc from "@sit-onyx/icons/file-doc.svg?raw";
import fileGlobe from "@sit-onyx/icons/file-globe.svg?raw";
import filePdf from "@sit-onyx/icons/file-pdf.svg?raw";
import filePpt from "@sit-onyx/icons/file-ppt.svg?raw";
import fileRtf from "@sit-onyx/icons/file-rtf.svg?raw";
import fileText from "@sit-onyx/icons/file-text.svg?raw";
import fileXls from "@sit-onyx/icons/file-xls.svg?raw";
import fileXlsx from "@sit-onyx/icons/file-xlsx.svg?raw";
import file from "@sit-onyx/icons/file.svg?raw";
import picture from "@sit-onyx/icons/picture.svg?raw";
import videocam from "@sit-onyx/icons/videocam.svg?raw";
import { computed } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxFileTypeIconProps } from "./types.js";

const props = defineProps<OnyxFileTypeIconProps>();

const icon = computed(() => {
  if (props.type === "application/pdf") return filePdf;
  if (props.type === "text/csv") return fileCsv;
  if (props.type.startsWith("audio/")) return audio;
  if (props.type.startsWith("video/")) return videocam;
  if (props.type.startsWith("image/")) return picture;
  if (["application/rtf", "text/rtf"].includes(props.type)) return fileRtf;
  if (
    [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ].includes(props.type)
  ) {
    return filePpt;
  }
  if (props.type === "application/vnd.ms-excel") return fileXls;
  if (props.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    return fileXlsx;
  }
  if (
    [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(props.type)
  ) {
    return fileDoc;
  }
  if (props.type === "text/html") return fileGlobe;
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
    return fileArchive;
  }
  if (props.type.startsWith("text/")) return fileText;

  return file;
});
</script>

<template>
  <OnyxIcon v-bind="props" :icon="icon" />
</template>
