<script lang="ts" setup>
import emojiHappy2 from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import { useStorage } from "@vueuse/core";
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
  OnyxStepper,
  OnyxSwitch,
  OnyxTable,
  OnyxTag,
  OnyxTextarea,
  OnyxTimer,
  OnyxTooltip,
  useToast,
  type SelectOption,
} from "sit-onyx";
import { capitalize, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSelection from "../components/LanguageSelection.vue";
import SelectDemo from "../components/SelectDemo.vue";

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
  "OnyxStepper",
  "OnyxSwitch",
  "OnyxTable",
  "OnyxTag",
  "OnyxTextarea",
  "OnyxTimer",
  "OnyxToast",
  "OnyxTooltip",
] as const;

/* Config data to regulate which components will be shown */
const configOptions = COMPONENTS.map((component) => ({
  label: component,
  value: component,
})) satisfies SelectOption[];
const componentsToShow = useStorage(
  "components-to-show",
  configOptions.map(({ value }) => value),
);
const show = computed(() => {
  return (componentName: (typeof COMPONENTS)[number]) =>
    componentsToShow.value.includes(componentName);
});

const densityOptions = DENSITIES.map((value: string) => ({
  value,
  label: capitalize(value),
})) satisfies SelectOption[];

const activeDensityOption = ref(densityOptions[1].value);

const useSkeleton = ref(false);
const skeletonNumber = computed(() => (useSkeleton.value ? 3 : undefined));

const switchState = ref(false);
const checkboxState = ref<string[]>([]);
const radioState = ref<string>();
const stepperValue = ref<number>();

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

const timerEndDate = new Date();
timerEndDate.setHours(timerEndDate.getHours() + 2);

const toast = useToast();

const tableColumns = ["Fruit", "Price (€/kg)", "Inventory (kg)"];
const tableData = [
  { fruit: "Strawberry", price: "4.50", inventory: 200 },
  { fruit: "Apple", price: "1.99", inventory: 3000 },
  { fruit: "Banana", price: "3.75", inventory: 18000 },
];
</script>

<template>
  <OnyxPageLayout>
    <template #sidebar>
      <div class="sidebar">
        <OnyxRadioGroup v-model="activeDensityOption" label="Density" :options="densityOptions" />
        <LanguageSelection v-model="locale" />

        <OnyxSwitch v-model="useSkeleton" label="All as Skeleton" />

        <OnyxSelect
          v-model="componentsToShow"
          :options="configOptions"
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
            label="Checkbox Group"
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

        <SelectDemo
          v-if="show('OnyxSelect')"
          :select-options="selectOptions"
          :use-skeleton="useSkeleton"
        />

        <OnyxLoadingIndicator v-if="show('OnyxLoadingIndicator')" />

        <template v-if="show('OnyxRadioGroup')">
          <OnyxRadioGroup
            v-model="radioState"
            label="Radio group"
            :options="minimalSelectOptions"
            :skeleton="skeletonNumber"
          />
          <div v-if="!useSkeleton" class="onyx-text--small state-info">
            OnyxRadioGroup state: {{ radioState ?? "–" }}
          </div>
        </template>

        <OnyxSkeleton v-if="show('OnyxSkeleton')" class="skeleton" />

        <OnyxStepper
          v-if="show('OnyxStepper')"
          v-model="stepperValue"
          label="Stepper"
          placeholder="0"
          :skeleton="useSkeleton"
        />

        <OnyxSwitch
          v-if="show('OnyxSwitch')"
          v-model="switchState"
          :label="'Switch is ' + (switchState ? 'on' : 'off')"
          :skeleton="useSkeleton"
        />

        <template v-if="show('OnyxTable')">
          <OnyxTable with-page-scrolling>
            <template #head>
              <tr>
                <th v-for="col in tableColumns" :key="col">{{ col }}</th>
              </tr>
            </template>
            <tr v-for="{ fruit, price, inventory } in tableData" :key="fruit">
              <td>{{ fruit }}</td>
              <td>{{ price }}</td>
              <td>{{ inventory }}</td>
            </tr>
          </OnyxTable>

          <OnyxTable>
            <template #head>
              <tr>
                <th>Empty</th>
                <th>Table</th>
                <th>Example</th>
              </tr>
            </template>

            <!-- this demonstrates that the empty state works even when v-for is used -->
            <tr v-for="(_row, index) in []" :key="index"></tr>
          </OnyxTable>
        </template>

        <OnyxTag v-if="show('OnyxTag')" label="Example tag" :icon="emojiHappy2" />

        <OnyxTextarea
          v-if="show('OnyxTextarea')"
          label="Example textarea"
          label-tooltip="More information tooltip"
          :skeleton="useSkeleton"
        />

        <OnyxTimer v-if="show('OnyxTimer')" label="Timer" :end-time="timerEndDate" />

        <OnyxButton
          v-if="show('OnyxToast')"
          label="Show toast"
          @click="toast.show({ headline: 'Example toast', color: 'success' })"
        />
        <OnyxHeadline is="h2">Tooltip (auto alignment)</OnyxHeadline>

        <div
          :style="{
            display: 'flex',
            justifyContent: 'space-between',
            width: '101%',
            marginTop: '2rem',
          }"
        >
          <OnyxTooltip v-if="show('OnyxTooltip')" text="Example tooltip text">
            <template #default="{ trigger }">
              <OnyxButton label="Left" v-bind="trigger" />
            </template>
          </OnyxTooltip>
          <OnyxTooltip v-if="show('OnyxTooltip')" text="Example tooltip text">
            <template #default="{ trigger }">
              <OnyxButton label="Center" v-bind="trigger" />
            </template>
          </OnyxTooltip>
          <OnyxTooltip v-if="show('OnyxTooltip')" text="Example tooltip text">
            <template #default="{ trigger }">
              <OnyxButton label="Center" v-bind="trigger" />
            </template>
          </OnyxTooltip>
          <OnyxTooltip v-if="show('OnyxTooltip')" text="Example tooltip text">
            <template #default="{ trigger }">
              <OnyxButton label="Right" v-bind="trigger" />
            </template>
          </OnyxTooltip>
        </div>

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
  height: calc(100%);
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
