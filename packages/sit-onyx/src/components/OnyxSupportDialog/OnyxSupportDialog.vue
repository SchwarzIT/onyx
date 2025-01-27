<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useClickOutside } from "../../composables/useClickOutside";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxSupportDialogProps } from "./types";

defineSlots<{
  /**
   * Used to add header content.
   */
  header(): unknown;
  /**
   * Used to add body content.
   */
  body(): unknown;
  /**
   * Used to add footer content.
   */
  footer(): unknown;
}>();

const props = withDefaults(defineProps<OnyxSupportDialogProps>(), {
  position: "right",
  closable: true,
  closeOnOutsideClick: true,
});

const target = ref(null);
const sidebarParent = (document.querySelector(".overlay") as HTMLElement)?.parentElement;

const emit = defineEmits<{
  close: [];
}>();

onMounted(() => {
  if (sidebarParent) {
    sidebarParent.classList.add("overflow-hidden");
  }
});

onBeforeUnmount(() => {
  if (sidebarParent) {
    sidebarParent.classList.remove("overflow-hidden");
  }
});

useClickOutside(target, () => (props.closeOnOutsideClick ? emit("close") : null));
</script>

<template>
  <div class="onyx-component overlay" data-testid="sidebar-overlay">
    <div ref="target" :class="['sidebar', position]" data-testid="sidebar-position">
      <div class="header">
        <slot name="header">Header slot is empty</slot>
        <span v-if="closable" data-testid="close-icon-button">
          <OnyxIcon class="close" :icon="xSmall" @click="emit('close')" />
        </span>
      </div>
      <div class="body">
        <slot name="body">Body slot is empty</slot>
      </div>
      <div class="footer">
        <div class="footer-body">
          <slot name="footer">Footer slot is empty</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: var(--onyx-z-index-page-overlay);
  background: rgba(0, 0, 0, 0.2);
}

.close {
  cursor: pointer;
}

.sidebar {
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
  width: 29.75rem;
  font-family: var(--onyx-font-family);
  background-color: var(--onyx-color-base-background-blank);
  color: var(--onyx-color-text-icons-neutral-intense);
  z-index: 100;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 767px) {
  .sidebar-overlay {
    width: -moz-available;
    /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available;
    /* Mozilla-based browsers will ignore this. */
  }
}

.sidebar.right {
  right: 0.5rem;
}

.sidebar.left {
  left: 0.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 0 1rem;
}

.sidebar-content {
  position: relative;
  height: 100%;
  padding: 1.25rem;
}

.body {
  margin-top: 1.25rem;
  flex: 1;
  overflow-y: auto;
}

.footer {
  margin-top: 1.25rem;
  display: flex;
  align-items: end;
  justify-content: flex-end;
  border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  padding-top: 0.5rem;
  width: 100%;
}

.footer-body {
  padding: 0 1rem 0.5rem 1rem;
}
</style>
