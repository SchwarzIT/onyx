<script lang="ts" setup>
import { iconCode, iconToolColorFill } from "@sit-onyx/icons";

defineSlots<{
  /**
   * DEV content.
   */
  dev(): unknown;
  /**
   * UX content.
   */
  ux(): unknown;
}>();

const { t } = useI18n();

const selectedOption = ref<"dev" | "ux">("dev");

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedOption.value = target.value as typeof selectedOption.value;
};

const options = computed(() => {
  return [
    { label: t("roles.devContent"), value: "dev", icon: iconCode },
    { label: t("roles.uxContent"), value: "ux", icon: iconToolColorFill },
  ];
});
</script>

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

    <div v-show="selectedOption === 'dev'">
      <slot name="dev"></slot>
    </div>

    <div v-show="selectedOption === 'ux'">
      <slot name="ux"></slot>
    </div>
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
