<script lang="ts" setup>
import {
  iconEdit,
  iconMoreVertical,
  iconShareIos,
  iconThumbsDown,
  iconThumbsUp,
  iconTrash,
} from "@sit-onyx/icons";
import { OnyxCard } from "sit-onyx";

const likes = ref(12);
const dislikes = ref(1);
</script>

<template>
  <OnyxCard class="card">
    <div class="card__header">
      <OnyxHeadline is="h2"> Lorem ipsum dolor</OnyxHeadline>

      <OnyxFlyoutMenu :label="$t('action', 2)">
        <template #button>
          <OnyxSystemButton :label="$t('action', 2)" :icon="iconMoreVertical" />
        </template>

        <template #options>
          <OnyxMenuItem>
            <OnyxIcon :icon="iconEdit" />
            {{ $t("action") }} 1
          </OnyxMenuItem>

          <OnyxMenuItem>
            <OnyxIcon :icon="iconShareIos" />
            {{ $t("action") }} 2
          </OnyxMenuItem>

          <OnyxMenuItem color="danger">
            <OnyxIcon :icon="iconTrash" />
            {{ $t("action") }} 3
          </OnyxMenuItem>
        </template>
      </OnyxFlyoutMenu>
    </div>

    <p class="card__description">
      Lorem ipsum dolor sit amet consectetur. Enim senectus eu sit ut pellentesque pretium gravida
      elit praesent. Et fringilla tristique purus ligula mauris.
    </p>

    <div class="card__buttons">
      <div class="card__button">
        <OnyxSystemButton label="Like" :icon="iconThumbsUp" @click="likes++" />
        <span class="card__count card__count--success"> {{ likes }} </span>
      </div>

      <div class="card__button">
        <OnyxSystemButton label="Dislike" :icon="iconThumbsDown" @click="dislikes++" />
        <span class="card__count card__count--danger"> {{ dislikes }} </span>
      </div>
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  --onyx-card-gap: var(--onyx-density-md);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--onyx-card-gap);
    width: 100%;
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
    flex-grow: 1;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-xs);
  }

  &__button {
    display: flex;
    align-items: center;
  }

  &__count {
    font-size: var(--onyx-font-size-sm);
    line-height: var(--onyx-font-line-height-sm);

    &--success {
      color: var(--onyx-color-text-icons-success-intense);
    }

    &--danger {
      color: var(--onyx-color-text-icons-danger-intense);
    }
  }
}
</style>
