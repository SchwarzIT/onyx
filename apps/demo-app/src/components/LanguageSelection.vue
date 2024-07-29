<script lang="ts" setup>
import { OnyxSelect, type SelectOption } from "sit-onyx";
import { useI18n } from "vue-i18n";

const locale = defineModel<string | undefined>();

const { t } = useI18n();
const supportedLocales = ["en-US", "de-DE", "ko-KR"];
const options: SelectOption<string>[] = supportedLocales.map((value) => ({ value, label: value }));
</script>

<template>
  <OnyxSelect
    v-model="locale"
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
