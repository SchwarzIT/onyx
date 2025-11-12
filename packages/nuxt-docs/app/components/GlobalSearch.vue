<script lang="ts" setup>
import {
  iconCircleContrast,
  iconFile,
  iconSearch,
  iconToolText,
  iconTranslate,
} from "@sit-onyx/icons";
import { mergeVueProps, normalizedIncludes, type OnyxGlobalSearchOptionProps } from "sit-onyx";

type SearchGroup = {
  label: string;
  options: OnyxGlobalSearchOptionProps[];
};

const { t, locale } = useI18n();
const localePath = useLocalePath();

const isOpen = ref(false);
const searchTerm = ref("");
watch(isOpen, (open) => {
  if (!open) searchTerm.value = "";
});

const { data, status } = await useLazyAsyncData(
  () => `search-sections-${locale.value}`,
  () => {
    const collection = `content_${locale.value}` as const;
    return queryCollectionSearchSections(collection);
  },
);

const searchResults = computed<SearchGroup[]>(() => {
  const map = new Map<string, OnyxGlobalSearchOptionProps[]>();

  data.value?.forEach((section) => {
    const parent =
      section.level === 1
        ? section.title
        : (section.titles.at(0) ?? t("onyx.globalSearch.searchResults"));
    const options = map.get(parent) ?? [];

    let icon = iconToolText;
    if (section.level === 1) icon = iconFile;

    const option: OnyxGlobalSearchOptionProps = {
      label: section.content ? `${section.title} > ${section.content}` : section.title,
      value: section.id,
      link: localePath(section.id),
      icon,
    };

    // prevent duplicates
    if (options.find((o) => o.value === option.value) || (section.level === 1 && options.length))
      return;

    options.push(option);
    map.set(parent, options);
  });

  const groups = map
    .entries()
    .toArray()
    .map<SearchGroup>(([label, options]) => ({ label, options }));

  // add custom system wide actions
  groups.push({
    label: t("onyx.globalSearch.system"),
    options: [
      { label: t("onyx.languageSelect.headline"), value: "locale", icon: iconTranslate },
      { label: t("onyx.colorScheme.headline"), value: "colorScheme", icon: iconCircleContrast },
    ],
  });

  return groups;
});

const filteredSearchResults = computed(() => {
  // if no search term is entered, we want to show all results so the search is never empty
  if (!searchTerm.value) return searchResults.value;

  return searchResults.value
    .map<SearchGroup>((group) => {
      return {
        ...group,
        options: group.options.filter((option) =>
          normalizedIncludes(option.label, searchTerm.value),
        ),
      };
    })
    .filter((group) => group.options.length);
});
</script>

<template>
  <OnyxIconButton
    :label="$t('onyx.globalSearch.label')"
    :icon="iconSearch"
    color="neutral"
    @click="isOpen = true"
  />

  <OnyxUnstableGlobalSearch
    v-model="searchTerm"
    v-model:open="isOpen"
    :loading="status === 'pending'"
  >
    <template v-if="filteredSearchResults.length" #default>
      <OnyxUnstableGlobalSearchGroup
        v-for="group in filteredSearchResults"
        :key="group.label"
        :label="group.label"
        :skeleton="status === 'pending'"
      >
        <template v-for="option in group.options" :key="option.value">
          <LocaleSwitch v-if="option.value === 'locale'">
            <template #default="{ trigger }">
              <OnyxUnstableGlobalSearchOption v-bind="mergeVueProps(trigger, option)" />
            </template>
          </LocaleSwitch>

          <ColorSchemeSwitch v-else-if="option.value === 'colorScheme'">
            <template #default="{ trigger }">
              <OnyxUnstableGlobalSearchOption v-bind="mergeVueProps(trigger, option)" />
            </template>
          </ColorSchemeSwitch>

          <OnyxUnstableGlobalSearchOption v-else v-bind="option" @click="isOpen = false" />
        </template>
      </OnyxUnstableGlobalSearchGroup>
    </template>
  </OnyxUnstableGlobalSearch>
</template>
