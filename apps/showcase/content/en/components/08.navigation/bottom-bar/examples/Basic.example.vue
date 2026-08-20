<script lang="ts" setup>
import { iconChevronLeftSmall, iconChevronRightSmall } from "@sit-onyx/icons";
import { OnyxAppLayout, OnyxPageLayout, OnyxBottomBar, OnyxButton, OnyxIconButton } from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      Example page content here...

      <template #footer>
        <OnyxBottomBar>
          <template #left>
            <OnyxIconButton label="Previous" :icon="iconChevronLeftSmall" color="neutral" />
            <OnyxIconButton label="Next" :icon="iconChevronRightSmall" color="neutral" />
          </template>

          <OnyxButton label="Cancel" color="neutral" mode="plain" />
          <OnyxButton label="Save" />
        </OnyxBottomBar>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>
