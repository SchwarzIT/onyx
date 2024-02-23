<script lang="ts" setup>
import { FooterDemo } from ".";
defineProps<{
  showFooter: boolean;
}>();
</script>

<template>
  <Teleport to="body">
    <div class="backdrop">
      <div class="demo mobile-fly-in" :class="{ 'mobile-fly-in--split': showFooter }">
        <div class="mobile-fly-in__content">
          <h3>Mobile fly-in</h3>

          <slot></slot>
        </div>
        <FooterDemo v-if="showFooter" />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
