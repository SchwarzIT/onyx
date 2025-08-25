<script lang="ts" setup>
import { ref } from "vue";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import OnyxTab from "../../OnyxTab/OnyxTab.vue";
import OnyxTabs from "../../OnyxTabs/OnyxTabs.vue";
import OnyxDialog from "../OnyxDialog.vue";

const isOpen = ref(false);
const modelValue = ref("tab-1");
</script>

<template>
  <div>
    <OnyxDialog v-model:open="isOpen" label="Help" button-text="Open Dialog">
      <div class="main">
        <OnyxHeadline is="h1">Title</OnyxHeadline>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ut voluptatibus
          laboriosam dolor repudiandae nam, porro sapiente magni officia quibusdam tempore, quasi
          neque possimus repellat iste dolorem totam optio est.
        </p>
        <br />

        <OnyxTabs v-model="modelValue" label="Example tabs" size="h3">
          <OnyxTab label="Computer" value="tab-1">
            <OnyxHeadline is="h3"> Important</OnyxHeadline>
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

            <br />
            <OnyxHeadline is="h3"> Others</OnyxHeadline>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias consequuntur nostrum
              eius sapiente earum expedita laudantium repellendus numquam itaque neque ullam magni a
              dolorum quibusdam veniam, autem illum debitis animi?
            </p>
          </OnyxTab>
          <OnyxTab label="MDE" value="tab-2">Panel content 2...</OnyxTab>
          <OnyxTab label="Store" value="tab-3"> Panel content 3... </OnyxTab>
        </OnyxTabs>
      </div>
    </OnyxDialog>
  </div>
</template>

<style lang="scss" scoped>
.onyx-dialog {
  float: inline-end;
}
.main {
  padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);
  max-width: 20rem;
}
</style>
