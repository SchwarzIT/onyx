<script lang="ts" setup>
import { iconMoreVertical } from "@sit-onyx/icons";
import { OnyxDialog, OnyxHeadline, OnyxSystemButton, OnyxTab, OnyxTabs } from "sit-onyx";
import { ref } from "vue";

const selectedTab = ref("tab-1");
</script>

<template>
  <OnyxDialog class="dialog" label="Help" position="right" alignment="bottom" :sticky="false" open>
    <template #trigger="{ trigger }">
      <OnyxSystemButton label="Show dialog" :icon="iconMoreVertical" v-bind="trigger" />
    </template>

    <div class="dialog__content">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>

      <OnyxTabs v-model="selectedTab" label="Example tabs" size="h3">
        <OnyxTab label="Tab" value="tab-1">
          <OnyxHeadline is="h3">Important</OnyxHeadline>

          <ul>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          </ul>
        </OnyxTab>

        <OnyxTab label="Tab" value="tab-2">Content of tab 2...</OnyxTab>

        <OnyxTab label="Tab" value="tab-3">Content of tab 3...</OnyxTab>
      </OnyxTabs>
    </div>
  </OnyxDialog>
</template>

<style lang="scss" scoped>
.dialog {
  zoom: 0.4;
  height: 100%;
  margin-left: -50%;

  &__content {
    padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-lg);
  }
}
</style>
