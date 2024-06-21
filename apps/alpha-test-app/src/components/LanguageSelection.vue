<script lang="ts" setup>
import { OnyxSelect, type SelectOption } from "sit-onyx";
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const locale = defineModel<string | undefined>();
const { t } = useI18n();

const supportedLocales = ["en-US", "de-DE", "ko-KR"];
const options: SelectOption[] = supportedLocales.map((value) => ({ value, label: value }));

const selectValue = ref({ value: locale.value, label: locale.value });

watchEffect(() => {
  locale.value = selectValue.value?.value;
});
</script>

<template>
  <OnyxSelect
    v-model="selectValue"
    class="language"
    label="Select language"
    list-label="List label"
    :options="options"
    :message="`Preview: ${t('message')} in ${locale}`"
  />
</template>

<style lang="scss" scoped>
.language {
  margin-bottom: var(--onyx-spacing-sm);
  max-width: 15rem;
}
</style>
