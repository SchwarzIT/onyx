<script lang="ts" setup>
import { ref } from "vue";
import OnyxBasicPopover from "../OnyxBasicPopover/OnyxBasicPopover.vue";

// const props = withDefaults(defineProps<{}>(), {});

const open = ref(false);
const onToggle = () => {
  open.value = !open.value;
};
</script>

<template>
  <OnyxBasicPopover label="test" position="bottom" alignment="center" :open="open">
    <template #default>
      <!-- <OnyxSelectInput :show-focus="open" @input-click="onToggle" /> -->
      <button type="button" @click="onToggle">Toggle Time Picker</button>
    </template>
    <template #content>
      <div v-scroll-end class="onyx-select__wrapper" tabindex="-1">hallo</div>
    </template>
  </OnyxBasicPopover>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-timepicker {
  @include layers.component() {
  }
}
</style>
