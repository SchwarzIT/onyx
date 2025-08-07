<script setup lang="ts">
import { iconCircleContrast, iconTranslate } from "@sit-onyx/icons";
import { type ColorSchemeValue, type OnyxNavBarProps, type OnyxNavBarSlots } from "sit-onyx";

const props = withDefaults(defineProps<OnyxNavBarProps>(), {
  appName: "Documentation",
});

const slots = defineSlots<OnyxNavBarSlots>();

const router = useRouter();
const colorMode = useColorMode();

const isColorSchemeDialogOpen = ref(false);

const colorScheme = computed({
  get: () => {
    return colorMode.preference === "system" ? "auto" : (colorMode.preference as ColorSchemeValue);
  },
  set: (newValue) => {
    colorMode.preference = newValue === "auto" ? "system" : newValue;
  },
});

const { locale, setLocale, locales } = useI18n();
const localePath = useLocalePath();
const isLanguageDialogOpen = ref(false);

const languageOptions = computed(() => {
  return locales.value.map((locale) => {
    return {
      label: locale.name ?? locale.code,
      value: locale.code,
    } satisfies SelectDialogOption;
  });
});

const currentLocaleLabel = computed(() => {
  // using "!" here is safe since splitting a string will always return at least one string in the returned array
  return locale.value.split("-")[0]!.split("_")[0]!.toUpperCase();
});
</script>

<template>
  <OnyxNavBar
    v-bind="props"
    :app-area="props.appArea ?? { link: localePath('/') }"
    @navigate-back="router.back"
  >
    <template v-if="slots.appArea" #appArea>
      <slot name="appArea"></slot>
    </template>

    <slot></slot>

    <template v-if="slots.globalContextArea" #globalContextArea>
      <slot name="globalContextArea"></slot>
    </template>

    <template v-if="slots.mobileActivePage" #mobileActivePage>
      <slot name="mobileActivePage"></slot>
    </template>

    <template #contextArea>
      <slot name="contextArea"></slot>

      <template v-if="locales.length > 1">
        <OnyxButton
          :label="currentLocaleLabel"
          :icon="iconTranslate"
          color="neutral"
          mode="plain"
          @click="isLanguageDialogOpen = true"
        />

        <OnyxSelectDialog
          v-model:open="isLanguageDialogOpen"
          :label="$t('onyx.languageSelect.headline')"
          :model-value="locale"
          :options="languageOptions"
          @update:model-value="setLocale($event)"
        >
          <template #description> {{ $t("onyx.languageSelect.subtitle") }} </template>
        </OnyxSelectDialog>
      </template>

      <OnyxIconButton
        label="Toggle color scheme"
        :icon="iconCircleContrast"
        color="neutral"
        @click="isColorSchemeDialogOpen = true"
      />

      <OnyxColorSchemeDialog v-model="colorScheme" v-model:open="isColorSchemeDialogOpen" />
    </template>
  </OnyxNavBar>
</template>
