<script lang="ts" setup>
import { iconFile, iconSearch, iconToolText } from "@sit-onyx/icons";
import { normalizedIncludes, type OnyxGlobalSearchOptionProps } from "sit-onyx";

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

const allGroups = computed<SearchGroup[]>(() => {
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

  return map
    .entries()
    .toArray()
    .map<SearchGroup>(([label, options]) => ({ label, options }));
});

const filteredGroups = computed(() => {
  if (!searchTerm.value) return [];

  return allGroups.value
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
    <OnyxUnstableGlobalSearchGroup
      v-for="group in filteredGroups"
      :key="group.label"
      :label="group.label"
      :skeleton="status === 'pending'"
    >
      <OnyxUnstableGlobalSearchOption
        v-for="option in group.options"
        :key="option.value"
        v-bind="option"
        @click="isOpen = false"
      />
    </OnyxUnstableGlobalSearchGroup>

    <!-- custom fixed system-wide actions that are always visible -->
    <OnyxUnstableGlobalSearchGroup :label="$t('onyx.globalSearch.system')">
      <LocaleSwitch type="globalSearch" />
      <ColorSchemeSwitch type="globalSearch" />
    </OnyxUnstableGlobalSearchGroup>
  </OnyxUnstableGlobalSearch>
</template>
