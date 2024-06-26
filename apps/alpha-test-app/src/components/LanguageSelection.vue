<script lang="ts" setup>
import { OnyxSelect, type SelectOption } from "sit-onyx";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const locale = defineModel<string | undefined>();

const { t } = useI18n();
const supportedLocales = ["en-US", "de-DE", "ko-KR"];
const options: SelectOption<string>[] = supportedLocales.map((value) => ({ value, label: value }));

const selectModel = computed({
  get: () => options.find((option) => option.value === locale.value),
  set: (newLocale) => (locale.value = newLocale?.value),
});
</script>

<template>
  <OnyxSelect
    v-model="selectModel"
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
