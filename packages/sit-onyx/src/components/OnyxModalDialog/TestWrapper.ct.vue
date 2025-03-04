<script lang="ts" setup>
import OnyxModalDialog from "./OnyxModalDialog.vue";

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <OnyxModalDialog label="Example modal dialog" open @close="emit('close')">
    <div class="content">
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      Dialog content... <br />
      <span>end of content</span>
    </div>
    <template #description> This is an example description about the dialog. </template>
  </OnyxModalDialog>
</template>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="scss" scoped>
.content {
  padding: var(--onyx-density-xl) var(--onyx-modal-dialog-padding-inline);
}
</style>
