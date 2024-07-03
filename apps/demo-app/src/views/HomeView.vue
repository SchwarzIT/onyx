<script lang="ts" setup>
import emojiHappy2 from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import {
  DENSITIES,
  OnyxAvatar,
  OnyxBadge,
  OnyxButton,
  OnyxCheckboxGroup,
  OnyxEmpty,
  OnyxHeadline,
  OnyxIcon,
  OnyxIconButton,
  OnyxInput,
  OnyxLink,
  OnyxLoadingIndicator,
  OnyxPageLayout,
  OnyxRadioGroup,
  OnyxSelect,
  OnyxSkeleton,
  OnyxSwitch,
  OnyxTable,
  OnyxTag,
  OnyxTextarea,
  OnyxTimer,
  OnyxTooltip,
  normalizedIncludes,
  type SelectOption,
} from "sit-onyx";
import { capitalize, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSelection from "../components/LanguageSelection.vue";

const { locale } = useI18n();

const COMPONENTS = [
  "OnyxAvatar",
  "OnyxBadge",
  "OnyxButton",
  "OnyxCheckboxGroup",
  "OnyxEmpty",
  "OnyxHeadline",
  "OnyxIcon",
  "OnyxIconButton",
  "OnyxInput",
  "OnyxLink",
  "OnyxSelect",
  "OnyxLoadingIndicator",
  "OnyxRadioGroup",
  "OnyxSkeleton",
  "OnyxSwitch",
  "OnyxTable",
  "OnyxTag",
  "OnyxTextarea",
  "OnyxTimer",
  "OnyxTooltip",
] as const;

/* Config data to regulate which components will be shown */
const configOptions = COMPONENTS.map((component) => ({
  label: component,
  value: component,
})) satisfies SelectOption[];
const searchTerm = ref("");
const filteredConfigOptions = computed(() =>
  searchTerm.value
    ? configOptions.filter(({ label }) => normalizedIncludes(label, searchTerm.value))
    : configOptions,
);
const componentsToShow = ref([...configOptions]);
const componentNamesToShow = computed(() => componentsToShow.value.map((option) => option.value));
const show = computed(() => {
  return (componentName: (typeof COMPONENTS)[number]) =>
    componentNamesToShow.value.includes(componentName);
});

const densityOptions = DENSITIES.map((value) => ({
  value,
  label: capitalize(value),
})) satisfies SelectOption[];

const activeDensityOption = ref(densityOptions[1].value);

const useSkeleton = ref(false);
const skeletonNumber = computed(() => (useSkeleton.value ? 3 : undefined));

const switchState = ref(false);
const checkboxState = ref<string[]>([]);
const radioState = ref<string>();

const selectState = ref<SelectOption>();
const groupedSelectState = ref<SelectOption>();
const multiselectState = ref<SelectOption[]>();

const selectOptions = [
  "Apple",
  "Banana",
  "Mango",
  "Kiwi",
  "Orange",
  "Papaya",
  "Apricot",
  "Lemon",
  "Cranberry",
  "Avocado",
  "Cherry",
  "Coconut",
  "Lychee",
  "Melon",
  "Raspberry",
  "Strawberry",
].map<SelectOption>((option) => ({ value: option.toLowerCase(), label: option }));

const minimalSelectOptions = selectOptions.slice(0, 3);

const groupedSelectOptions: SelectOption[] = [
  { value: "cat", label: "Cat", group: "Land" },
  { value: "dog", label: "Dog", group: "Land" },
  { value: "tiger", label: "Tiger", group: "Land" },
  { value: "reindeer", label: "Reindeer", group: "Land" },
  { value: "racoon", label: "Racoon", group: "Land" },
  { value: "dolphin", label: "Dolphin", group: "Water" },
  { value: "flounder", label: "Flounder", group: "Water" },
  { value: "eel", label: "Eel", group: "Water" },
  { value: "falcon", label: "Falcon", group: "Air" },
  { value: "owl", label: "Owl", group: "Air" },
];

const timerEndDate = new Date();
timerEndDate.setHours(timerEndDate.getHours() + 2);
</script>

<template>
  <OnyxPageLayout>
    <template #sidebar>
      <div class="sidebar">
        <OnyxRadioGroup
          v-model="activeDensityOption"
          headline="Density"
          :options="densityOptions"
        />
        <LanguageSelection v-model="locale" />

        <OnyxSwitch v-model="useSkeleton" label="All as Skeleton" />

        <OnyxSelect
          v-model="componentsToShow"
          v-model:search-term="searchTerm"
          :options="filteredConfigOptions"
          label="Visible examples"
          list-label="Available components"
          text-mode="preview"
          multiple
          with-check-all
          with-search
        />
      </div>
    </template>

    <div class="page" :class="[`onyx-density-${activeDensityOption}`]">
      <section class="page__intro">
        <OnyxHeadline is="h1">Component usages</OnyxHeadline>
        <p>Each onyx component should be used at least once in this page.</p>
      </section>

      <div class="page__examples">
        <OnyxAvatar v-if="show('OnyxAvatar')" label="John Doe" />

        <OnyxBadge v-if="show('OnyxBadge')">Badge</OnyxBadge>
        <OnyxButton v-if="show('OnyxButton')" label="Button" :skeleton="useSkeleton" />

        <template v-if="show('OnyxCheckboxGroup')">
          <OnyxCheckboxGroup
            v-model="checkboxState"
            headline="Checkbox Group"
            :options="minimalSelectOptions"
            :skeleton="skeletonNumber"
          />
          <div v-if="!useSkeleton" class="onyx-text--small state-info">
            OnyxCheckboxGroup state: {{ checkboxState }}
          </div>
        </template>

        <OnyxEmpty v-if="show('OnyxEmpty')">No data available</OnyxEmpty>

        <OnyxHeadline is="h1" v-if="show('OnyxHeadline')">Headline</OnyxHeadline>

        <OnyxIcon v-if="show('OnyxIcon')" :icon="emojiHappy2" />

        <OnyxIconButton
          v-if="show('OnyxIconButton')"
          label="Happy Emoji"
          :icon="emojiHappy2"
          :skeleton="useSkeleton"
        />

        <OnyxInput
          v-if="show('OnyxInput')"
          label="Input"
          :skeleton="useSkeleton"
          label-tooltip="More information tooltip"
        />

        <OnyxLink v-if="show('OnyxLink')" href="#" :skeleton="useSkeleton">Link</OnyxLink>

        <template v-if="show('OnyxSelect')">
          <div style="display: flex; gap: var(--onyx-spacing-xs)">
            <OnyxSelect
              v-model="selectState"
              label="Example select"
              list-label="Example listbox list"
              :options="selectOptions"
              :skeleton="useSkeleton"
            />
            <OnyxSelect
              v-model="groupedSelectState"
              label="Example grouped select"
              list-label="Example listbox list"
              :options="groupedSelectOptions"
              :skeleton="useSkeleton"
            />
            <OnyxSelect
              v-model="multiselectState"
              label="Example multiselect"
              list-label="Example listbox list"
              :multiple="true"
              :with-check-all="true"
              :options="selectOptions"
              :skeleton="useSkeleton"
            />
          </div>

          <div v-if="!useSkeleton" class="onyx-text--small state-info">
            <div>OnyxSelect single state: {{ selectState ?? "–" }}</div>
            <div>OnyxSelect single grouped state: {{ groupedSelectState ?? "–" }}</div>
            <div>OnyxSelect multiselect state: {{ multiselectState ?? "–" }}</div>
          </div>
        </template>

        <OnyxLoadingIndicator v-if="show('OnyxLoadingIndicator')" />

        <template v-if="show('OnyxRadioGroup')">
          <OnyxRadioGroup
            v-model="radioState"
            headline="Radio group"
            :options="minimalSelectOptions"
            :skeleton="skeletonNumber"
          />
          <div v-if="!useSkeleton" class="onyx-text--small state-info">
            OnyxRadioGroup state: {{ radioState ?? "–" }}
          </div>
        </template>

        <OnyxSkeleton v-if="show('OnyxSkeleton')" class="skeleton" />

        <OnyxSwitch
          v-if="show('OnyxSwitch')"
          v-model="switchState"
          :label="'Switch is ' + (switchState ? 'on' : 'off')"
          :skeleton="useSkeleton"
        />

        <OnyxTable v-if="show('OnyxTable')">
          <thead>
            <tr>
              <th>Fruit</th>
              <th>Price (€/kg)</th>
              <th>Inventory (kg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Strawberry</td>
              <td>4.50</td>
              <td>200</td>
            </tr>
            <tr>
              <td>Apple</td>
              <td>1.99</td>
              <td>3000</td>
            </tr>
            <tr>
              <td>Banana</td>
              <td>3.75</td>
              <td>18000</td>
            </tr>
          </tbody>
        </OnyxTable>

        <OnyxTag v-if="show('OnyxTag')" label="Example tag" :icon="emojiHappy2" />

        <OnyxTextarea
          v-if="show('OnyxTextarea')"
          label="Example textarea"
          label-tooltip="More information tooltip"
          :skeleton="useSkeleton"
        />

        <OnyxTimer v-if="show('OnyxTimer')" label="Timer" :end-time="timerEndDate" />

        <OnyxTooltip v-if="show('OnyxTooltip')" text="Example tooltip text">
          Hover me to show tooltip
        </OnyxTooltip>

        <!-- Add new components alphabetically. -->
      </div>
    </div>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-md);
  padding: var(--onyx-spacing-md);
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
  height: calc(100% - var(--onyx-spacing-xl));
  width: 16rem;
}
.page {
  padding: var(--onyx-spacing-xl);

  &__intro {
    margin-bottom: var(--onyx-spacing-lg);
  }
  &__examples {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-md);
    align-items: flex-start;
  }
}
.skeleton {
  height: 2rem;
  width: 8rem;
}
.state-info {
  color: var(--onyx-color-text-icons-neutral-soft);
}
</style>
