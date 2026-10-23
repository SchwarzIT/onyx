<script lang="ts" setup>
import { iconChevronLeftSmall, iconChevronRightSmall } from "@sit-onyx/icons";
import { OnyxAppLayout, OnyxPageLayout, OnyxBottomBar, OnyxButton, OnyxIconButton } from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #footer>
        <OnyxBottomBar>
          <template #left>
            <OnyxIconButton label="Previous" :icon="iconChevronLeftSmall" color="neutral" />
            <OnyxIconButton label="Next" :icon="iconChevronRightSmall" color="neutral" />
          </template>

          <OnyxButton label="Button" color="neutral" mode="plain" />
          <OnyxButton label="Button" />
        </OnyxBottomBar>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.onyx-app {
  zoom: 0.5;
}
</style>
