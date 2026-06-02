<script lang="ts" setup>
import { iconFileCopy, iconMail, iconPhone } from "@sit-onyx/icons";
import {
  OnyxAvatar,
  OnyxCard,
  OnyxFlyoutMenu,
  OnyxHeadline,
  OnyxIcon,
  OnyxMenuItem,
  OnyxSystemButton,
  OnyxTag,
} from "sit-onyx";

const user = {
  name: "Jane Doe",
  role: "Software Engineer",
  email: "jane.doe@example.com",
  phone: "+49 1234 56789",
};
</script>

<template>
  <OnyxCard class="card">
    <div class="card__header">
      <OnyxAvatar :full-name="user.name" />

      <div class="card__content">
        <div class="card__headline">
          <OnyxHeadline is="h3">{{ user.name }}</OnyxHeadline>

          <OnyxFlyoutMenu label="Actions">
            <template #options>
              <OnyxMenuItem label="Action 1" />
              <OnyxMenuItem label="Action 2" />
              <OnyxMenuItem label="Action 3" />
            </template>
          </OnyxFlyoutMenu>
        </div>

        <OnyxTag :label="user.role" color="primary" density="compact" />
      </div>
    </div>

    <div class="card__details">
      <div class="detail">
        <OnyxIcon :icon="iconMail" color="neutral" />
        <span>{{ user.email }}</span>
        <OnyxSystemButton label="Copy" :icon="iconFileCopy" />
      </div>

      <div class="detail">
        <OnyxIcon :icon="iconPhone" color="neutral" />
        <span>{{ user.phone }}</span>
        <OnyxSystemButton label="Copy" :icon="iconFileCopy" />
      </div>
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  padding: 0;
  gap: 0;

  &__header {
    display: flex;
    align-items: center;
    gap: var(--onyx-card-gap);
    flex-wrap: wrap;
    padding: var(--onyx-card-padding);
    background-color: var(--onyx-color-base-background-tinted);
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  &__headline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--onyx-card-gap);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
    flex-grow: 1;
  }

  &__details {
    padding: var(--onyx-card-padding);
    border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-card-gap);
  }
}

.detail {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--onyx-card-gap);
  color: var(--onyx-color-text-icons-neutral-medium);
}
</style>
