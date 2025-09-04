<script lang="ts" setup>
import { iconFile, iconUserGroup, iconUserId } from "@sit-onyx/icons";

definePageMeta({ layout: false });

const { t } = useI18n();
const footer = useTemplateRef("footerRef");
provide(FORM_PAGE_INJECTION_KEY, { footerRef: footer });

const sidebarItems = computed<SidebarItem[]>(() => [
  { label: t("personalData"), icon: iconUserId, link: "/forms" },
  { label: t("roles.role", 2), icon: iconUserGroup, link: "/forms/roles" },
  { label: t("document", 2), icon: iconFile, link: "/forms/documents" },
]);
</script>

<template>
  <NuxtLayout name="sidebar" :sidebar-items footer-alignment="page">
    <div class="page">
      <NuxtPage />
    </div>

    <template #footer>
      <div ref="footerRef"></div>
    </template>
  </NuxtLayout>
</template>
