<script lang="ts" setup>
import { iconCode, iconToolColorFill } from "@sit-onyx/icons";
import type { SelectOption } from "sit-onyx";
import nuxtIcon from "~/assets/images/nuxt.svg?raw";
import vueIcon from "~/assets/images/vue.svg?raw";

type ContentTabValue = "dev" | "ux" | "vue" | "nuxt";

const slots = defineSlots<{
  [T in ContentTabValue]?: () => unknown;
}>();

const { t } = useI18n();

const availableTabs = computed(() => Object.keys(slots) as ContentTabValue[]);

const selectedOption = ref<ContentTabValue>(availableTabs.value[0] ?? "dev");

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedOption.value = target.value as typeof selectedOption.value;
};

const options = computed(() => {
  const tabs = [
    { label: t("roles.devContent"), value: "dev", icon: iconCode },
    { label: t("roles.uxContent"), value: "ux", icon: iconToolColorFill },
    { label: "Vue", value: "vue", icon: vueIcon },
    { label: "Nuxt", value: "nuxt", icon: nuxtIcon },
  ] satisfies SelectOption<ContentTabValue>[];

  return tabs
    .filter((option) => availableTabs.value.includes(option.value))
    .sort((a, b) => availableTabs.value.indexOf(a.value) - availableTabs.value.indexOf(b.value));
});
</script>

<!-- eslint-disable vue/require-explicit-slots -- false positive, slots are defined by mapped type -->
<template>
  <div>
    <fieldset class="switch" @change="handleChange">
      <label v-for="option in options" :key="option.value" class="switch__option">
        <OnyxCard class="switch__card">
          <OnyxIcon v-if="option.icon" :icon="option.icon" class="switch__icon" />

          <div>
            <OnyxVisuallyHidden is="div">
              <input
                type="radio"
                name="role"
                :value="option.value"
                :checked="selectedOption === option.value"
                :aria-label="option.label"
                required
              />
            </OnyxVisuallyHidden>

            <span class="switch__label"> {{ option.label }} </span>
          </div>
        </OnyxCard>
      </label>
    </fieldset>

    <template v-for="(slot, slotName) in slots" :key="slotName">
      <div v-show="selectedOption === slotName">
        <component :is="slot" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.switch {
  --switch-background: var(--onyx-color-base-background-blank);
  --switch-background-hover: var(--onyx-color-base-neutral-200);
  --switch-border-color: var(--onyx-color-component-border-neutral);
  --switch-color: var(--onyx-color-text-icons-neutral-intense);
  --switch-icon-color: var(--onyx-color-text-icons-primary-intense);
  list-style: none;
  padding: 0;
  border: none;

  display: flex;
  align-items: center;
  gap: var(--onyx-density-sm);
  flex-wrap: wrap;
  margin-block: var(--onyx-markdown-renderer-margin-block);

  &__option {
    display: contents;
  }

  &__icon {
    color: var(--switch-icon-color);
  }

  &__card {
    flex-grow: 1;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;
    background-color: var(--switch-background);
    border-color: var(--switch-border-color);
    color: var(--switch-color);

    &:hover {
      background-color: var(--switch-background-hover);
    }

    &:has(input:checked) {
      --switch-background: var(--onyx-color-base-primary-100);
      --switch-background-hover: var(--onyx-color-base-primary-200);
      --switch-border-color: var(--onyx-color-component-border-primary);
      --switch-color: var(--onyx-color-text-icons-primary-bold);
      --switch-icon-color: var(--switch-color);
    }
  }
}
</style>
