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
  OnyxListbox,
  OnyxLoadingIndicator,
  OnyxPageLayout,
  OnyxRadioButtonGroup,
  OnyxSelectInput,
  OnyxSkeleton,
  OnyxSwitch,
  OnyxTable,
  OnyxTag,
  OnyxTextarea,
  OnyxTimer,
  OnyxTooltip,
  type ListboxOption,
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
  "OnyxListbox",
  "OnyxLoadingIndicator",
  "OnyxRadioButtonGroup",
  "OnyxSelectInput",
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
const activeConfig = ref(configOptions.map((option) => option.value));

const show = computed(() => {
  return (componentName: (typeof COMPONENTS)[number]) => activeConfig.value.includes(componentName);
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

const listboxState = ref<string>();
const groupedListboxState = ref<string>();
const multiselectListboxState = ref<string[]>();

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

const groupedListboxOptions: ListboxOption[] = [
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

const multiSelectState = ref(selectOptions.slice(0, 5));
const singleSelectState = ref(selectOptions[0]);

const timerEndDate = new Date();
timerEndDate.setHours(timerEndDate.getHours() + 2);
</script>

<template>
  <OnyxPageLayout>
    <template #sidebar>
      <div class="sidebar">
        <OnyxRadioButtonGroup
          v-model="activeDensityOption"
          headline="Density"
          :options="densityOptions"
        />
        <LanguageSelection v-model="locale" />

        <OnyxSwitch v-model="useSkeleton" label="All as Skeleton" />

        <OnyxCheckboxGroup
          v-model="activeConfig"
          headline="Examples to show"
          :options="configOptions"
          with-check-all
        />
      </div>
    </template>

    <div class="page" :class="[`onyx-density-${activeDensityOption}`]">
      <OnyxHeadline is="h1">Component usages</OnyxHeadline>

      <p>Each onyx component should be used at least once in this page.</p>

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
          info-label="More information tooltip"
        />

        <OnyxLink v-if="show('OnyxLink')" href="#" :skeleton="useSkeleton">Link</OnyxLink>

        <template v-if="show('OnyxListbox')">
          <div style="display: flex; gap: var(--onyx-spacing-xs)">
            <OnyxListbox v-model="listboxState" label="Example listbox" :options="selectOptions" />
            <OnyxListbox
              v-model="groupedListboxState"
              label="Example grouped listbox"
              :options="groupedListboxOptions"
            />
            <OnyxListbox
              v-model="multiselectListboxState"
              label="Example multiselect listbox"
              :multiple="true"
              :with-check-all="true"
              :options="selectOptions"
            />
          </div>

          <div class="onyx-text--small state-info">
            <div>OnyxListbox single state: {{ listboxState ?? "–" }}</div>
            <div>OnyxListbox single grouped state: {{ groupedListboxState ?? "–" }}</div>
            <div>OnyxListbox multiselect state: {{ multiselectListboxState ?? "–" }}</div>
          </div>
        </template>

        <OnyxLoadingIndicator v-if="show('OnyxLoadingIndicator')" />

        <template v-if="show('OnyxRadioButtonGroup')">
          <OnyxRadioButtonGroup
            v-model="radioState"
            headline="Radio Button Group"
            :options="minimalSelectOptions"
            :skeleton="skeletonNumber"
          />
          <div v-if="!useSkeleton" class="onyx-text--small state-info">
            OnyxRadioButtonGroup state: {{ radioState ?? "–" }}
          </div>
        </template>

        <template v-if="show('OnyxSelectInput')">
          <OnyxSelectInput
            v-model="singleSelectState"
            label="Single Select"
            placeholder="Select your fruits"
            :skeleton="useSkeleton"
            :options="selectOptions"
          />
          <div v-if="!useSkeleton" class="onyx-text--small state-info">
            OnyxSelectInput single state: {{ singleSelectState ?? "–" }}
          </div>
          <OnyxSelectInput
            v-model="multiSelectState"
            label="Multiple Select"
            placeholder="Select your fruits"
            multiple
            :skeleton="useSkeleton"
            :options="selectOptions"
          />
          <div v-if="!useSkeleton" class="onyx-text--small state-info">
            OnyxSelectInput multiple state: {{ multiSelectState ?? "–" }}
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
          info-label="More information tooltip"
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
}
.page {
  padding: var(--onyx-spacing-xl);

  &__examples {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-xs);
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
