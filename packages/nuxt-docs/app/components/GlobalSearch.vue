<script lang="ts" setup>
import type { Collections } from "@nuxt/content";
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

const props = defineProps<{
  /**
   * Options to use when generating the search sections.
   *
   * @see https://content.nuxt.com/docs/utils/query-collection-search-sections#api
   */
  options?: Parameters<typeof queryCollectionSearchSections>[1];
  /**
   * List of collections to include in the search.
   *
   * @default "content_{locale}" where `{locale}` is replaced with the current i18n locale.
   */
  collections?: (keyof Collections)[];
}>();

const { t, locale, locales } = useI18n();
const localePath = useLocalePath();

const isOpen = ref(false);
const searchTerm = ref("");
watch(isOpen, (open) => {
  if (!open) searchTerm.value = "";
});

const collections = computed<(keyof Collections)[]>(() => {
  if (props.collections) return props.collections;
  return [`content_${locale.value}` as keyof Collections];
});

const { data, status } = await useLazyAsyncData(
  () => `search-sections-${collections.value.join("-")}-${props.options}`,
  async () => {
    const sections = await Promise.all(
      collections.value.map((collection) => {
        return queryCollectionSearchSections(collection, props.options);
      }),
    );

    return sections.flatMap((section) => section);
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
  const systemOptions: OnyxGlobalSearchOptionProps[] = [
    { label: t("onyx.colorScheme.headline"), value: "colorScheme", icon: iconCircleContrast },
  ];

  if (locales.value.length > 1) {
    systemOptions.unshift({
      label: t("onyx.languageSelect.headline"),
      value: "locale",
      icon: iconTranslate,
    });
  }

  groups.push({
    label: t("onyx.globalSearch.system"),
    options: systemOptions,
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
  <OnyxUnstableNavButton
    :label="$t('onyx.globalSearch.label')"
    :icon="iconSearch"
    hide-label
    @click="isOpen = true"
  />

  <OnyxGlobalSearch v-model="searchTerm" v-model:open="isOpen" :loading="status === 'pending'">
    <template v-if="filteredSearchResults.length" #default>
      <OnyxGlobalSearchGroup
        v-for="group in filteredSearchResults"
        :key="group.label"
        :label="group.label"
        :skeleton="status === 'pending'"
      >
        <template v-for="option in group.options" :key="option.value">
          <LazyLocaleSwitch v-if="option.value === 'locale'">
            <template #default="{ trigger }">
              <OnyxGlobalSearchOption v-bind="mergeVueProps(trigger, option)" />
            </template>
          </LazyLocaleSwitch>

          <ColorSchemeSwitch v-else-if="option.value === 'colorScheme'">
            <template #default="{ trigger }">
              <OnyxGlobalSearchOption v-bind="mergeVueProps(trigger, option)" />
            </template>
          </ColorSchemeSwitch>

          <OnyxGlobalSearchOption v-else v-bind="option" @click="isOpen = false" />
        </template>
      </OnyxGlobalSearchGroup>
    </template>
  </OnyxGlobalSearch>
</template>
