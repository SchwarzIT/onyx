<script setup lang="ts">
import { iconCircleContrast, iconTranslate } from "@sit-onyx/icons";
import { extractLinkProps, type ColorSchemeValue, type SelectDialogOption } from "sit-onyx";

const { onyxDocs } = useAppConfig();
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
    :app-area="{ link: localePath('/') }"
    v-bind="onyxDocs.nav"
    @navigate-back="router.back"
  >
    <NavItem
      v-for="item in onyxDocs.nav?.items"
      :key="extractLinkProps(item.link ?? '').href"
      v-bind="item"
    />

    <template #contextArea>
      <template v-if="locales.length > 1">
        <OnyxButton
          :label="currentLocaleLabel"
          :icon="iconTranslate"
          color="neutral"
          mode="plain"
          @click="isLanguageDialogOpen = true"
        />

        <OnyxSelectDialog
          :open="isLanguageDialogOpen"
          :label="$t('onyx.languageSelect.headline')"
          :model-value="locale"
          :options="languageOptions"
          @close="isLanguageDialogOpen = false"
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
    </template>

    <OnyxColorSchemeDialog
      v-model="colorScheme"
      :open="isColorSchemeDialogOpen"
      @close="isColorSchemeDialogOpen = false"
    />
  </OnyxNavBar>
</template>
