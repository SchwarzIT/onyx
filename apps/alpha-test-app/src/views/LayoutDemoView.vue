<script lang="ts" setup>
import { OnyxAppLayout } from "sit-onyx";
import { ref } from "vue";
import {
  FlyoutDemo,
  LayoutSettings,
  NavBarDemo,
  TooltipDemo,
  type SettingsSections,
} from "../components/layout-demo";

const settings = ref<SettingsSections>({
  content: { showLongPageContent: true },
  sidebar: { showSidebar: true },
  footer: { showDetailFooter: true },
  overlay: { none: true },
});

const navBarLeft = ref(false);
</script>

<template>
  <OnyxAppLayout :nav-bar-alignment="navBarLeft ? 'left' : 'top'">
    <template #navBar>
      <NavBarDemo v-model="navBarLeft">
        <FlyoutDemo v-model="settings.content.showFlyout" :small="navBarLeft">
          <LayoutSettings v-model="settings" :show="['content']" />
        </FlyoutDemo>
        |
        <TooltipDemo :force-tooltip="settings.content.forceTooltip" style="display: inline-block" />
      </NavBarDemo>
    </template>
    <div>Page</div>
  </OnyxAppLayout>
</template>

<style lang="scss">
body {
  margin: 0;
}
</style>
