<script lang="ts" setup generic="TMultiple extends boolean = false">
import { computed, ref } from "vue";
import { useDensity } from "../../composables/density";
import { injectI18n } from "../../i18n";
import {
  convertBinaryPrefixToBytes,
  formatBytesToString,
  type BinaryPrefixedSize,
} from "../../utils/numbers";
import { OnyxFileUploadSVG } from "../illustrations";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxFileUploadProps } from "./types";

const props = withDefaults(defineProps<OnyxFileUploadProps<TMultiple>>(), {
  accept: () => [],
});

const emit = defineEmits<{
  "update:modelValue": [value: TMultiple extends true ? File[] : File];
}>();

const { t, locale } = injectI18n();
const { densityClass } = useDensity(props);

const currentFiles = computed<File[]>(() => {
  if (!props.modelValue) return [];
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
});

/**
 * Sets the currently selected files by considering all relevant props (e.g. replace etc.).
 */
const setFiles = (files: File[]) => {
  let newFiles: File | File[];

  if (!props.multiple) {
    newFiles = files[0];
  } else if (props.replace) {
    newFiles = files.slice();
  } else {
    newFiles = currentFiles.value.concat(files);
  }

  emit("update:modelValue", newFiles as TMultiple extends true ? File[] : File);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = Array.from(target.files ?? []);
  setFiles(files);
  target.value = "";
};

const formatFileSize = computed(() => {
  return (size: number | BinaryPrefixedSize) => {
    const bytes = typeof size === "number" ? size : convertBinaryPrefixToBytes(size);
    return formatBytesToString(locale.value, bytes);
  };
});

const isDragging = ref(false);

const handleDrop = (event: DragEvent) => {
  if (props.disabled) return;
  isDragging.value = false;
  const files = Array.from(event.dataTransfer?.files ?? []);
  setFiles(files);
};

const handleDragEnter = () => {
  if (props.disabled) return;
  isDragging.value = true;
};
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -- the label is interactive due to the nested input -->
  <label
    :class="[
      'onyx-component',
      'onyx-file-upload',
      densityClass,
      isDragging ? 'onyx-file-upload--dragging' : '',
    ]"
    @dragenter="handleDragEnter"
    @dragleave="isDragging = false"
    @dragover.prevent
    @drop.prevent="handleDrop"
  >
    <OnyxFileUploadSVG :disabled="props.disabled" :active="isDragging" />

    <div class="onyx-file-upload__content">
      <p class="onyx-file-upload__label onyx-text">
        <u>{{ t("fileUpload.clickToUpload") }}</u> {{ t("fileUpload.orDragAndDrop") }}.
      </p>

      <p v-if="props.maxSize || props.maxTotalSize" class="onyx-file-upload__text onyx-text--small">
        {{ t("fileUpload.maxFileSize") }}:

        <template v-if="props.maxSize && props.maxTotalSize">
          {{ formatFileSize(props.maxSize) }} ({{ formatFileSize(props.maxTotalSize) }}
          {{ t("fileUpload.inTotal") }})
        </template>

        <template v-else-if="props.maxSize"> {{ formatFileSize(props.maxSize) }} </template>
        <template v-else-if="props.maxTotalSize">
          {{ formatFileSize(props.maxTotalSize) }} {{ t("fileUpload.inTotal") }}
        </template>
      </p>

      <p v-if="props.multiple && props.maxCount" class="onyx-file-upload__text onyx-text--small">
        {{ t("fileUpload.maxFileCount", { n: props.maxCount }) }}
      </p>

      <p v-if="props.accept.length" class="onyx-file-upload__text onyx-text--small">
        Allowed file types: {{ props.accept.join(", ") }}
      </p>
    </div>

    <OnyxVisuallyHidden>
      <input
        class="onyx-file-upload__input"
        type="file"
        :aria-label="t('fileUpload.label', { n: props.multiple ? 2 : 1 })"
        :accept="props.accept.length ? props.accept.join(',') : undefined"
        :multiple="props.multiple"
        :disabled="props.disabled"
        :name="props.name"
        @change="handleChange"
      />
    </OnyxVisuallyHidden>
  </label>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-file-upload {
  @include layers.component() {
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    border-radius: var(--onyx-radius-md);
    border: var(--onyx-1px-in-rem) dashed var(--onyx-color-component-border-neutral);
    background-color: var(--onyx-color-base-background-blank);
    padding: var(--onyx-density-xl);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100%;

    &--dragging {
      border-color: var(--onyx-color-component-border-primary-hover);
      background-color: var(--onyx-color-base-primary-100);

      * {
        // needed to not emit "dragleave" event when hovering over children (e.g. text)
        pointer-events: none;
      }

      .onyx-file-upload__label {
        color: var(--onyx-color-text-icons-primary-intense);
      }
    }

    > .onyx-file-upload-svg {
      margin-bottom: var(--onyx-density-md);
    }

    &:has(&__input:enabled) {
      cursor: pointer;

      &:hover,
      &:focus-within {
        border-color: var(--onyx-color-component-border-primary-hover);

        .onyx-file-upload__label {
          color: var(--onyx-color-text-icons-primary-intense);
        }
      }

      &:hover {
        > .onyx-file-upload-svg {
          --onyx-file-upload-svg-background-color-bubble: var(--onyx-color-base-primary-800);
        }
      }

      &:focus-within {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
      }

      .onyx-file-upload__text {
        color: var(--onyx-color-text-icons-neutral-medium);
      }
    }

    &:has(&__input:disabled) {
      background-color: var(--onyx-color-base-background-tinted);
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: var(--onyx-density-2xs);
    }
  }
}
</style>
