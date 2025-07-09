<script
  lang="ts"
  setup
  generic="
    TMultiple extends boolean = false,
    TModelValue extends TMultiple extends true ? File[] : File = TMultiple extends true
      ? File[]
      : File
  "
>
import { computed, ref, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useRootAttrs } from "../../utils/attrs.js";
import {
  convertBinaryPrefixToBytes,
  formatBytesToString,
  type BinaryPrefixedSize,
} from "../../utils/numbers.js";
import { asArray } from "../../utils/objects.js";
import { OnyxFileUploadSVG } from "../illustrations/index.js";
import type { OnyxFileUploadProps } from "./types.js";

const props: OnyxFileUploadProps<TMultiple> = withDefaults(
  defineProps<OnyxFileUploadProps<TMultiple>>(),
  {
    accept: () => [],
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: TModelValue];
}>();

defineOptions({ inheritAttrs: false });

const { t, locale } = injectI18n();
const { densityClass } = useDensity(props);
const { restAttrs, rootAttrs } = useRootAttrs();
const modelValue = useVModel<TModelValue, "modelValue", typeof props, undefined>({
  props,
  emit,
  key: "modelValue",
});

const input = useTemplateRef<HTMLInputElement>("inputRef");

const currentFiles = computed<File[]>(() => asArray(modelValue.value));

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

  modelValue.value = newFiles as TModelValue;
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
  <div :class="['onyx-component', 'onyx-file-upload-wrapper', densityClass]" v-bind="rootAttrs">
    <button
      type="button"
      :class="['onyx-file-upload', isDragging ? 'onyx-file-upload--dragging' : '']"
      :disabled="props.disabled"
      @dragenter="handleDragEnter"
      @dragleave="isDragging = false"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="input?.click()"
    >
      <OnyxFileUploadSVG :disabled="props.disabled" :active="isDragging" />

      <div class="onyx-file-upload__content">
        <p class="onyx-file-upload__label onyx-text">
          <u>{{ t("fileUpload.clickToUpload") }}</u> {{ t("fileUpload.orDragAndDrop") }}.
        </p>

        <p
          v-if="props.maxSize || props.maxTotalSize"
          class="onyx-file-upload__text onyx-text--small"
        >
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

        <p v-if="props.accept?.length" class="onyx-file-upload__text onyx-text--small">
          {{ t("fileUpload.allowedFileTypes", { types: props.accept.join(", ") }) }}
        </p>
      </div>
    </button>
    <input
      ref="inputRef"
      aria-hidden="true"
      tabindex="-1"
      class="onyx-file-upload-input"
      type="file"
      :accept="props.accept?.length ? props.accept.join(',') : undefined"
      :multiple="props.multiple"
      :disabled="props.disabled"
      :name="props.name"
      v-bind="restAttrs"
      @change="handleChange"
    />
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

@include layers.component() {
  .onyx-file-upload-wrapper {
    display: grid;

    .onyx-file-upload-input {
      display: none;
    }

    .onyx-file-upload {
      all: unset;
      grid-area: 1/1;
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

      .onyx-file-upload-svg {
        margin-bottom: var(--onyx-density-md);
      }

      &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--onyx-density-2xs);
      }
    }

    &:has(.onyx-file-upload-input:enabled) .onyx-file-upload {
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

    &:has(.onyx-file-upload-input:disabled) .onyx-file-upload {
      background-color: var(--onyx-color-base-background-tinted);
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
