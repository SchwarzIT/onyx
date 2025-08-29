<script lang="ts" setup>
import { iconFile, iconUserGroup, iconUserId } from "@sit-onyx/icons";

definePageMeta({ layout: false });

const { t } = useI18n();

const sidebarItems = computed<SidebarItem[]>(() => [
  {
    label: t("personalData"),
    icon: iconUserId,
    link: "/forms",
  },
  {
    label: t("role", 2),
    icon: iconUserGroup,
    link: "/forms/roles",
  },
  {
    label: t("document", 2),
    icon: iconFile,
    link: "/forms/files",
  },
]);
</script>

<template>
  <NuxtLayout name="sidebar" :sidebar-items>
    <OnyxHeadline is="h1">{{ $t("forms") }}</OnyxHeadline>
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>
