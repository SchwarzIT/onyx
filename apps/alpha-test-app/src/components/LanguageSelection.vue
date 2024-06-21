<script lang="ts" setup>
import { OnyxSelect, useSyncSelectOption, type SelectOption } from "sit-onyx";
import { useI18n } from "vue-i18n";

const locale = defineModel<string | undefined>();

const { t } = useI18n();

const supportedLocales = ["en-US", "de-DE", "ko-KR"];
const options: SelectOption[] = supportedLocales.map((value) => ({ value, label: value }));

const { modelValue, vSyncSelection } = useSyncSelectOption(locale, options);
</script>

<template>
  <OnyxSelect
    v-model="modelValue"
    v-sync-selection
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
