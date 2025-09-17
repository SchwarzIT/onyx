<script lang="ts" setup>
import NavBar from "#layers/blueprint/app/components/NavBar.vue";
import { iconFile, iconUserGroup, iconUserId } from "@sit-onyx/icons";
import type { OnyxNavBarSlots } from "sit-onyx";
import logoUrl from "~/assets/images/onyx-logo.svg";

defineSlots<Pick<OnyxNavBarSlots, "contextArea">>();

const localePath = useLocalePath();
</script>

<template>
  <NavBar app-name="onyx demo" :logo-url>
    <OnyxNavItem :label="$t('overview')" :link="localePath('/')" />
    <OnyxNavItem :label="$t('dataGrid.pageName')" :link="localePath('/data-grid')" />

    <OnyxNavItem :label="$t('forms')" :link="localePath('/forms')">
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

    <OnyxNavItem :label="$t('charts.pageName')" :link="localePath('/charts')" />

    <template #contextArea>
      <!-- eslint-disable-next-line vue/require-explicit-slots -- slots type is imported from onyx but eslint does not seem to be able to handle this -->
      <slot name="contextArea"></slot>

      <ColorSchemeSwitch />
      <DensitySwitch />
      <LocaleSwitch />
      <NotificationCenter />
      <OnyxSeparator orientation="vertical" />

      <UserMenu />
    </template>
  </NavBar>
</template>
