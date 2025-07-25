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
import cloudArrowUp from "@sit-onyx/icons/cloud-arrow-up.svg?raw";

import { computed, ref, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { useFileSize } from "../../composables/useFileSize.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
  type SkeletonInjected,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useRootAttrs } from "../../utils/attrs.js";
import { asArray } from "../../utils/objects.js";
import { OnyxFileUploadSVG } from "../illustrations/index.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxFileUploadProps } from "./types.js";

defineOptions({ inheritAttrs: false });

const props: OnyxFileUploadProps<TMultiple> = withDefaults(
  defineProps<OnyxFileUploadProps<TMultiple>>(),
  {
    accept: () => [],
    size: "large",
    disabled: FORM_INJECTED_SYMBOL,
    skeleton: SKELETON_INJECTED_SYMBOL,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: TModelValue];
}>();

const skeleton = useSkeletonContext(props as { skeleton: SkeletonInjected });
const { disabled } = useFormContext(props);

const { t } = injectI18n();
const { densityClass } = useDensity(props);
const { restAttrs, rootAttrs } = useRootAttrs();
const { formatFileSize } = useFileSize();

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

const showDetails = computed(() => {
  return (
    props.size === "large" ||
    ((props.maxSize || props.maxTotalSize || props.maxCount || props.accept?.length) &&
      props.size !== "small")
  );
});

const isDragging = ref(false);

const handleDrop = (event: DragEvent) => {
  if (disabled.value) return;
  isDragging.value = false;
  const files = Array.from(event.dataTransfer?.files ?? []);
  setFiles(files);
};

const handleDragEnter = () => {
  if (disabled.value) return;
  isDragging.value = true;
};
</script>

<template>
  <OnyxSkeleton
    v-if="skeleton"
    :class="['onyx-file-upload-skeleton', `onyx-file-upload-skeleton--${props.size}`, densityClass]"
  />
  <div
    v-else
    :class="['onyx-component', 'onyx-file-upload-wrapper', densityClass]"
    v-bind="rootAttrs"
  >
    <button
      type="button"
      :class="[
        'onyx-file-upload',
        `onyx-file-upload--${props.size}`,
        isDragging ? 'onyx-file-upload--dragging' : '',
      ]"
      :disabled="disabled"
      @dragenter="handleDragEnter"
      @dragleave="isDragging = false"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="input?.click()"
    >
      <OnyxFileUploadSVG v-if="props.size === 'large'" :disabled="disabled" :active="isDragging" />
      <div v-else class="onyx-file-upload__icon">
        <OnyxIcon :icon="cloudArrowUp" />
        <span> {{ t("fileUpload.select") }}</span>
      </div>

      <div v-if="showDetails" class="onyx-file-upload__content">
        <p v-if="props.size === 'large'" class="onyx-file-upload__label onyx-text">
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
      :disabled="disabled"
      :name="props.name"
      v-bind="restAttrs"
      @change="handleChange"
    />
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

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

      &--medium {
        padding: var(--onyx-density-xs);
        gap: var(--onyx-density-xs);
      }
      &--small {
        padding: var(--onyx-density-sm);
        border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-200);
      }

      &__icon {
        display: flex;
        gap: var(--onyx-density-2xs);
        color: var(--onyx-color-text-icons-neutral-intense);
        font-family: var(--onyx-font-family-h3);
        font-size: var(--onyx-font-size-md);
        font-weight: var(--onyx-font-weight-semibold);
        line-height: var(--onyx-font-line-height-md);
      }

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

      &--small {
        padding: var(--onyx-density-sm);
        border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-200);
        &:hover {
          background-color: var(--onyx-background-color-hover);
          border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-400);
        }
        &:focus-within {
          border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-400);
          outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-neutral);
        }
      }
      &--small.onyx-file-upload--dragging {
        border: var(--onyx-1px-in-rem) dashed var(--onyx-color-component-border-primary-hover);
        .onyx-file-upload__icon {
          color: var(--onyx-color-text-icons-primary-bold);
        }
      }
    }

    &:has(.onyx-file-upload-input:disabled) .onyx-file-upload {
      background-color: var(--onyx-color-base-background-tinted);
      color: var(--onyx-color-text-icons-neutral-soft);
      .onyx-file-upload__icon {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
  }
  .onyx-file-upload-skeleton {
    height: 7.5rem;
    width: 20rem;
    box-sizing: initial;
    padding: var(--onyx-density-xl);

    &--medium {
      padding: var(--onyx-density-xs);
      height: 3.125rem;
      width: 16rem;
    }

    &--small {
      padding: var(--onyx-density-sm);
      height: 1.5rem;
      width: 6rem;
    }
  }
}
</style>
