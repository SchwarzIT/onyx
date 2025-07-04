<script lang="ts" setup>
import emojiHappy2 from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import { useStorage } from "@vueuse/core";
import {
  DENSITIES,
  OnyxAccordion,
  OnyxAccordionItem,
  OnyxAvatar,
  OnyxBadge,
  OnyxBottomBar,
  OnyxBreadcrumb,
  OnyxBreadcrumbItem,
  OnyxButton,
  OnyxCard,
  OnyxCheckboxGroup,
  OnyxDatePicker,
  OnyxDialog,
  OnyxEmpty,
  OnyxFilterTag,
  OnyxHeadline,
  OnyxIcon,
  OnyxIconButton,
  OnyxImage,
  OnyxInfoCard,
  OnyxInput,
  OnyxLink,
  OnyxLoadingIndicator,
  OnyxPageLayout,
  OnyxPagination,
  OnyxProgressSteps,
  OnyxRadioGroup,
  OnyxSelect,
  OnyxSidebar,
  OnyxSkeleton,
  OnyxStepper,
  OnyxSwitch,
  OnyxTab,
  OnyxTable,
  OnyxTabs,
  OnyxTag,
  OnyxTextarea,
  OnyxTimer,
  OnyxTooltip,
  useToast,
  type DateValue,
  type SelectOption,
} from "sit-onyx";
import { capitalize, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSelection from "../components/LanguageSelection.vue";
import SelectDemo from "../components/SelectDemo.vue";

const { locale } = useI18n();

const COMPONENTS = [
  "OnyxAccordion",
  "OnyxAvatar",
  "OnyxBadge",
  "OnyxBreadcrumb",
  "OnyxButton",
  "OnyxCard",
  "OnyxCheckboxGroup",
  "OnyxDatePicker",
  "OnyxEmpty",
  "OnyxHeadline",
  "OnyxIcon",
  "OnyxIconButton",
  "OnyxImage",
  "OnyxInfoCard",
  "OnyxInput",
  "OnyxLink",
  "OnyxSelect",
  "OnyxLoadingIndicator",
  "OnyxPagination",
  "OnyxProgressSteps",
  "OnyxRadioGroup",
  "OnyxSkeleton",
  "OnyxStepper",
  "OnyxSwitch",
  "OnyxTable",
  "OnyxTabs",
  "OnyxTag",
  "OnyxTextarea",
  "OnyxTimer",
  "OnyxToast",
  "OnyxTooltip",
  "OnyxDialog",
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
  return (componentName: (typeof COMPONENTS)[number]) => {
    return componentsToShow.value.includes(componentName);
  };
});

const densityOptions = DENSITIES.map((value: string) => ({
  value,
  label: capitalize(value),
  skeleton: false,
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
].map((option) => ({ value: option.toLowerCase(), label: option }));

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
const currentPage = ref(1);
const selectedTab = ref("tab-1");
const selectedDate = ref<DateValue>();
const isDialogOpen = ref(false);
const openAccordionItems = ref<string[]>([]);
const currentProgressStep = ref(3);
</script>

<template>
  <OnyxPageLayout :skeleton="useSkeleton">
    <template #sidebar>
      <OnyxSidebar label="Settings">
        <div class="sidebar__content">
          <OnyxRadioGroup v-model="activeDensityOption" label="Density" :options="densityOptions" />
          <LanguageSelection v-model="locale" />

          <OnyxSwitch v-model="useSkeleton" label="All as Skeleton" :skeleton="false" />

          <!-- eslint-disable vue/prefer-true-attribute-shorthand -- shorthand does not work here, see: https://github.com/SchwarzIT/onyx/issues/2741 -->
          <OnyxSelect
            v-model="componentsToShow"
            :options="configOptions"
            label="Visible examples"
            list-label="Available components"
            text-mode="preview"
            :multiple="true"
            :with-check-all="true"
            with-search
          />
          <!-- eslint-enable vue/prefer-true-attribute-shorthand -->
        </div>
      </OnyxSidebar>
    </template>

    <div :class="`onyx-density-${activeDensityOption}`">
      <section class="page__intro">
        <OnyxHeadline is="h1" :skeleton="false">Component usages</OnyxHeadline>
        <p>Each onyx component should be used at least once in this page.</p>
      </section>

      <div class="page__examples">
        <OnyxAccordion v-if="show('OnyxAccordion')" v-model="openAccordionItems">
          <OnyxAccordionItem value="item-1">
            <template #header> Header 1 </template>
            <p>Hidden Content 1</p>
          </OnyxAccordionItem>
          <OnyxAccordionItem value="item-2">
            <template #header> Header 2 </template>
            <p>Hidden Content 2</p>
          </OnyxAccordionItem>
          <OnyxAccordionItem value="item-3">
            <template #header> Header 3 </template>
            <p>Hidden Content 3</p>
          </OnyxAccordionItem>
        </OnyxAccordion>

        <OnyxAvatar v-if="show('OnyxAvatar')" full-name="John Doe" />

        <OnyxBadge v-if="show('OnyxBadge')">Badge</OnyxBadge>

        <OnyxBreadcrumb v-if="show('OnyxBreadcrumb')">
          <OnyxBreadcrumbItem href="/foo">Foo</OnyxBreadcrumbItem>
          <OnyxBreadcrumbItem href="/foo/bar">Bar</OnyxBreadcrumbItem>
          <OnyxBreadcrumbItem href="/foo/bar/baz">Baz</OnyxBreadcrumbItem>
        </OnyxBreadcrumb>

        <OnyxButton v-if="show('OnyxButton')" label="Button" />

        <OnyxCard v-if="show('OnyxCard')"> Card content... </OnyxCard>

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

        <OnyxDatePicker v-if="show('OnyxDatePicker')" v-model="selectedDate" label="Date picker" />

        <OnyxEmpty v-if="show('OnyxEmpty')">No data available</OnyxEmpty>

        <OnyxHeadline is="h1" v-if="show('OnyxHeadline')" hash="headline">Headline</OnyxHeadline>

        <OnyxIcon v-if="show('OnyxIcon')" :icon="emojiHappy2" />

        <OnyxIconButton v-if="show('OnyxIconButton')" label="Happy Emoji" :icon="emojiHappy2" />

        <OnyxButton
          v-if="show('OnyxDialog')"
          label="Open Dialog"
          @click="
            () => {
              isDialogOpen = true;
            }
          "
        />
        <OnyxDialog label="Dialog" :open="isDialogOpen" modal @close="isDialogOpen = false">
          Dialog Content
        </OnyxDialog>
        <OnyxImage
          v-if="show('OnyxImage')"
          src="https://picsum.photos/512/256"
          :width="512"
          :height="256"
          alt="Example image"
          shape="rounded"
        />

        <OnyxInfoCard v-if="show('OnyxInfoCard')" headline="Example headline" closable>
          Lorem ipsum dolor sit amet consectetur. Felis euismod sit amet nulla nulla amet libero
          sed.

          <template #buttons>
            <OnyxButton label="Button" color="neutral" />
            <OnyxButton label="Button" color="neutral" />
          </template>
        </OnyxInfoCard>

        <OnyxInput
          v-if="show('OnyxInput')"
          label="Input"
          label-tooltip="More information tooltip"
        />

        <template v-if="show('OnyxLink')">
          <OnyxLink href="https://onyx.schwarz">External link</OnyxLink>
          <OnyxLink href="/demos/form">
            Internal link (should be navigated with Vue Router)
          </OnyxLink>
        </template>

        <SelectDemo
          v-if="show('OnyxSelect')"
          :select-options="selectOptions"
          :use-skeleton="useSkeleton"
        />

        <OnyxLoadingIndicator v-if="show('OnyxLoadingIndicator')" />

        <OnyxPagination v-if="show('OnyxPagination')" v-model="currentPage" :pages="42" />

        <OnyxProgressSteps
          v-if="show('OnyxProgressSteps')"
          v-model="currentProgressStep"
          :steps="[
            { label: 'Cart' },
            { label: 'Shipping' },
            { label: 'Payment' },
            { label: 'Checkout' },
          ]"
        />

        <template v-if="show('OnyxRadioGroup')">
          <OnyxRadioGroup
            v-model="radioState"
            label="Radio group"
            :options="minimalSelectOptions"
            :skeleton="skeletonNumber"
          />
          <div v-if="!useSkeleton" class="onyx-text--small state-info">
            OnyxRadioGroup state: {{ radioState ?? "-" }}
          </div>
        </template>

        <OnyxSkeleton v-if="show('OnyxSkeleton')" class="skeleton" />

        <OnyxStepper
          v-if="show('OnyxStepper')"
          v-model="stepperValue"
          label="Stepper"
          placeholder="0"
        />

        <OnyxSwitch
          v-if="show('OnyxSwitch')"
          v-model="switchState"
          :label="'Switch is ' + (switchState ? 'on' : 'off')"
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

        <OnyxTabs v-if="show('OnyxTabs')" v-model="selectedTab" label="Example tabs">
          <OnyxTab label="Tab 1" value="tab-1">Tab panel content 1...</OnyxTab>
          <OnyxTab value="tab-2">
            Tab panel content 2...

            <template #tab>
              Tab 2
              <OnyxBadge color="warning" dot />
            </template>
          </OnyxTab>
          <OnyxTab label="Tab 3" value="tab-3">Tab panel content 3...</OnyxTab>
        </OnyxTabs>

        <OnyxTag v-if="show('OnyxTag')" label="Example tag" :icon="emojiHappy2" color="primary" />
        <OnyxTag v-if="show('OnyxTag')" label="Example interactive tag" clickable="clickable" />
        <OnyxFilterTag
          v-if="show('OnyxTag')"
          label="Example filter tag"
          clickable="remove Filter"
        />

        <OnyxTextarea
          v-if="show('OnyxTextarea')"
          label="Example textarea"
          label-tooltip="More information tooltip"
        />

        <OnyxTimer v-if="show('OnyxTimer')" label="Timer" :end-time="timerEndDate" />

        <OnyxButton
          v-if="show('OnyxToast')"
          label="Show toast"
          @click="toast.show({ headline: 'Example toast', color: 'success' })"
        />

        <template v-if="show('OnyxTooltip')">
          <OnyxHeadline is="h2">Tooltip (auto alignment)</OnyxHeadline>

          <div class="tooltip-container">
            <OnyxTooltip text="Example tooltip text">
              <template #default="{ trigger }">
                <OnyxButton label="Left" v-bind="trigger" />
              </template>
            </OnyxTooltip>
            <OnyxTooltip text="Example tooltip text">
              <template #default="{ trigger }">
                <OnyxButton label="Center" v-bind="trigger" />
              </template>
            </OnyxTooltip>
            <OnyxTooltip text="Example tooltip text">
              <template #default="{ trigger }">
                <OnyxButton label="Center" v-bind="trigger" />
              </template>
            </OnyxTooltip>
            <OnyxTooltip text="Example tooltip text">
              <template #default="{ trigger }">
                <OnyxButton label="Right" v-bind="trigger" />
              </template>
            </OnyxTooltip>
          </div>
        </template>

        <!-- Add new components alphabetically. -->
      </div>
    </div>

    <template #footer>
      <OnyxBottomBar>
        <OnyxButton label="Button" mode="plain" color="neutral"></OnyxButton>
        <OnyxButton label="Button"></OnyxButton>
      </OnyxBottomBar>
    </template>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.sidebar {
  &__content {
    padding: var(--onyx-sidebar-padding);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-md);
  }
}

.page {
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

.tooltip-container {
  display: flex;
  justify-content: space-between;
  width: 101%;
  margin-top: 2rem;
}
</style>
