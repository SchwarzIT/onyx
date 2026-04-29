<script lang="ts" setup>
import type { OnyxImageProps } from "sit-onyx";

const props = defineProps<Pick<OnyxImageProps, "src" | "alt">>();
</script>

<template>
  <div class="preview">
    <OnyxCard class="card">
      <OnyxImage
        class="card__image"
        :src="props.src"
        :alt="props.alt"
        :width="512"
        :height="256"
        shape="rounded"
      />
    </OnyxCard>

    <div class="onyx-text--small preview__description">{{ props.alt }}</div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  &__image {
    width: 100%;
    height: max-content;

    :deep(.onyx-image__source) {
      background-color: transparent;
      width: inherit;
      height: inherit;
    }
  }
}

.preview {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-2xs);

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
  }
}
</style>
