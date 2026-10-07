<script lang="ts" setup>
import { OnyxButton, OnyxDialog, OnyxHeadline, OnyxTab, OnyxTabs } from "sit-onyx";
import { ref } from "vue";

const selectedTab = ref("tab-1");
</script>

<template>
  <OnyxDialog class="dialog" label="Help">
    <template #trigger="{ trigger }">
      <OnyxButton label="Show dialog" v-bind="trigger" />
    </template>

    <div class="dialog__content">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ut voluptatibus
        laboriosam dolor repudiandae nam, porro sapiente magni officia quibusdam tempore, quasi
        neque possimus repellat iste dolorem totam optio est.
      </p>

      <OnyxTabs v-model="selectedTab" label="Example tabs" size="h3">
        <OnyxTab label="Tab 1" value="tab-1">
          <OnyxHeadline is="h3">Important</OnyxHeadline>

          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem odit explicabo quia
              modi dolores eos, dolor optio eligendi.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non praesentium, amet
              reiciendis eum, autem eveniet cum nam, commodi minima temporibus nihil.
            </li>
          </ul>
        </OnyxTab>

        <OnyxTab label="Tab 2" value="tab-2">Content of tab 2...</OnyxTab>

        <OnyxTab label="Tab 3" value="tab-3">Content of tab 3...</OnyxTab>
      </OnyxTabs>
    </div>
  </OnyxDialog>
</template>

<style lang="scss" scoped>
.dialog {
  &__content {
    padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-lg);
  }
}
</style>
