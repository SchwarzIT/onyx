<script lang="ts" setup>
import NavBar from "#layers/blueprint/app/components/NavBar.vue";
import {
  iconChart,
  iconFile,
  iconHome,
  iconToolTable,
  iconUserGroup,
  iconUserId,
} from "@sit-onyx/icons";
import { type OnyxNavBarSlots, useVModel } from "sit-onyx";
import logoUrl from "~/assets/images/onyx-logo.svg";
import GlobalSearch from "./GlobalSearch.vue";

defineSlots<Pick<OnyxNavBarSlots, "contextArea">>();
const expanded = ref(false);

const localePath = useLocalePath();
const props = defineProps<{
  isVerticalNavBar?: boolean;
}>();
const emit = defineEmits<{
  "update:isVerticalNavBar": [value: boolean];
}>();
const isVertical = useVModel({ props, emit, key: "isVerticalNavBar", default: false });
const orientation = computed(() => (isVertical.value ? "vertical" : "horizontal"));
</script>

<template>
  <NavBar v-model:expanded="expanded" app-name="onyx demo" :logo-url :orientation="orientation">
    <OnyxNavItem
      :label="$t('overview')"
      :link="localePath('/')"
      :icon="isVertical ? iconHome : undefined"
    />
    <OnyxNavItem
      :label="$t('dataGrid.pageName')"
      :link="localePath('/data-grid')"
      :icon="isVertical ? iconToolTable : undefined"
    />

    <OnyxNavItem
      :label="$t('forms')"
      :link="localePath('/forms')"
      :icon="isVertical ? iconFile : undefined"
    >
      <template #children>
        <OnyxNavItem :label="$t('personalData')" :link="localePath('/forms')">
          <OnyxIcon :icon="iconUserId" />
          {{ $t("personalData") }}
        </OnyxNavItem>

        <OnyxNavItem :label="$t('roles.role', 2)" :link="localePath('/forms/roles')">
          <OnyxIcon :icon="iconUserGroup" />
          {{ $t("roles.role", 2) }}
        </OnyxNavItem>

        <OnyxNavItem :label="$t('documents.document', 2)" :link="localePath('/forms/documents')">
          <OnyxIcon :icon="iconFile" />
          {{ $t("documents.document", 2) }}
        </OnyxNavItem>
      </template>
    </OnyxNavItem>

    <OnyxNavItem
      :label="$t('charts.pageName')"
      :link="localePath('/charts')"
      :icon="isVertical ? iconChart : undefined"
    />

    <template #contextArea>
      <!-- eslint-disable-next-line vue/require-explicit-slots -- slots type is imported from onyx but eslint does not seem to be able to handle this -->
      <slot name="contextArea"></slot>
      <OnyxSwitch
        v-model="isVertical"
        label="Vertical Navbar"
        class="vertical-navbar-switch"
        :hide-label="isVertical && !expanded"
      />
      <ColorSchemeSwitch :hide-label="!isVertical" />
      <DensitySwitch />
      <LocaleSwitch />
      <GlobalSearch />
      <OnyxSeparator v-if="!isVertical" orientation="vertical" />
      <NotificationCenter />

      <UserMenu :position="isVertical ? 'right' : 'auto'" />
    </template>
  </NavBar>
</template>

<style lang="scss">
.vertical-navbar-switch {
  .onyx-switch__click-area,
  .onyx-switch-skeleton__click-area {
    padding-left: 0;
  }
}
</style>
