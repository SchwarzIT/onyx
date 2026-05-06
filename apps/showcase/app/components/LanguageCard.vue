<script lang="ts" setup>
const props = defineProps<{
  /**
   * Language code.
   */
  code: string;
}>();

const { locale } = useI18n();

const intlLocale = computed(() => new Intl.Locale(props.code));

const formatter = computed(() => new Intl.DisplayNames(locale.value, { type: "language" }));
const languageName = computed(() => formatter.value.of(intlLocale.value.language));

const FLAG_IMPORTS = import.meta.glob<string>(
  "../../node_modules/@sit-onyx/flags/dist/src/assets/*.svg",
  {
    import: "default",
    query: "?raw",
  },
);

const { data: flag } = await useAsyncData(
  () => props.code,
  async () => {
    const region = intlLocale.value.region ?? intlLocale.value.language;

    const importFn = Object.entries(FLAG_IMPORTS).find(([key]) => {
      return key.split("/").at(-1)?.replace(".svg", "") === region;
    })?.[1];

    return await importFn?.();
  },
);
</script>

<template>
  <OnyxCard class="card">
    <OnyxIcon v-if="flag" :icon="flag" />
    <OnyxHeadline is="h3">{{ languageName }}</OnyxHeadline>
    <DetailsList :items="[{ label: $t('i18n.code'), value: props.code }]" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  align-items: center;
}
</style>
