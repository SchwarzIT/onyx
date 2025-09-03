<script lang="ts" setup>
import type { OnyxCheckboxProps } from "sit-onyx";

const { t } = useI18n();

const selectedRoles = ref(new Set<string>(["manager", "productOwner"]));

const roles = computed(() => {
  return [
    "manager",
    "assistant",
    "deputy",
    "employee",
    "productOwner",
    "productManager",
    "engineeringLead",
    "designLead",
  ].map<OnyxCheckboxProps<string>>((role) => ({
    label: t(`roles.${role}`),
    value: role,
  }));
});

const updateRoleSelection = (checked: boolean, role: string) => {
  if (checked) selectedRoles.value.add(role);
  else selectedRoles.value.delete(role);
};
</script>

<template>
  <div class="page">
    <OnyxHeadline is="h1">{{ $t("roles.role", 2) }}</OnyxHeadline>

    <div class="onyx-grid">
      <UserRoleCard
        v-for="role in roles"
        :key="role.value"
        v-bind="role"
        :model-value="selectedRoles.has(role.value)"
        class="onyx-grid-span-4"
        @update:model-value="updateRoleSelection($event, role.value)"
      />
    </div>
  </div>
</template>
