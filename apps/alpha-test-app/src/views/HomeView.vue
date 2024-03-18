<script lang="ts" setup>
import emojiHappy2 from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import {
  OnyxAppLayout,
  OnyxButton,
  OnyxCheckboxGroup,
  OnyxHeadline,
  OnyxIcon,
  OnyxIconButton,
  OnyxInput,
  OnyxLink,
  OnyxLoadingIndicator,
  OnyxPageLayout,
  OnyxSkeleton,
  OnyxSwitch,
  type SelectionOption,
} from "sit-onyx";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const configOptions: SelectionOption[] = [
  { label: "OnyxButton" },
  // { label: "OnyxCheckbox" }, -> not exported
  { label: "OnyxCheckboxGroup" },
  { label: "OnyxHeadline" },
  { label: "OnyxIcon" },
  { label: "OnyxIconButton" },
  { label: "OnyxInput" },
  { label: "OnyxLink" },
  { label: "OnyxLoadingIndicator" },
  // { label: "OnyxRadioButton" }, -> not exported
  { label: "OnyxRadioButtonGroup" },
  { label: "OnyxSkeleton" },
  { label: "OnyxSwitch" },
].map((option) => ({
  ...option,
  id: option.label,
}));
const activeConfig = ref<string[]>(configOptions.map((option) => option.id));

const show = (componentName: string) => activeConfig.value.includes(componentName);

const switchState = ref(false);
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <div class="nav">
        <OnyxHeadline is="h3">Alpha Test App</OnyxHeadline>

        <OnyxButton mode="plain" label="Open form demo" @click="router.push('/form-demo')" />
        <OnyxButton mode="plain" label="Open layout demo" @click="router.push('/layout-demo')" />
      </div>
    </template>

    <OnyxPageLayout>
      <template #sidebar>
        <div class="sidebar">
          <OnyxCheckboxGroup
            v-model="activeConfig"
            headline="Show example"
            :options="configOptions"
            with-check-all
          />
        </div>
      </template>

      <div class="page">
        <OnyxHeadline is="h1">Component usages</OnyxHeadline>

        <p>Each onyx component should be used at least once in this page.</p>

        <div class="page__examples">
          <OnyxButton v-if="show('OnyxButton')" label="button" />

          <!-- <OnyxCheckboxGroup v-if="show('OnyxCheckboxGroup')" /> -->

          <!-- should "is" have a default value? -->
          <OnyxHeadline is="h1" v-if="show('OnyxHeadline')">Headline</OnyxHeadline>

          <OnyxIcon v-if="show('OnyxIcon')" :icon="emojiHappy2" />

          <!-- required label does not make sense?? -->
          <OnyxIconButton v-if="show('OnyxIconButton')" label="" :icon="emojiHappy2" />

          <OnyxInput v-if="show('OnyxInput')" label="Input" />

          <OnyxLink v-if="show('OnyxLink')" href="#">Link</OnyxLink>

          <OnyxLoadingIndicator v-if="show('OnyxLoadingIndicator')" />

          <!-- <OnyxRadioButtonGroup v-if="show('OnyxRadioButtonGroup')" /> -->

          <!-- invisible but no complaint from lint?? -->
          <OnyxSkeleton v-if="show('OnyxSkeleton')" />

          <OnyxSwitch
            v-if="show('OnyxSwitch')"
            v-model="switchState"
            :label="'Switch is ' + (switchState ? 'on' : 'off')"
          />
        </div>
      </div>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  padding-left: var(--onyx-spacing-xs);
}
.sidebar {
  padding: var(--onyx-spacing-md);
}
.page {
  padding: var(--onyx-spacing-xl);

  &__examples {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-xs);
  }
}
</style>
