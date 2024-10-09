<script lang="ts" setup>
import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import circleCheck from "@sit-onyx/icons/circle-check.svg?raw";
import eyeShine from "@sit-onyx/icons/eye-shine.svg?raw";
import forklift from "@sit-onyx/icons/forklift.svg?raw";
import organigramChart2 from "@sit-onyx/icons/organigram-chart-2.svg?raw";
import thumbsUp from "@sit-onyx/icons/thumbs-up.svg?raw";
import triangleWarning from "@sit-onyx/icons/triangle-warning.svg?raw";
import {
  OnyxAvatar,
  OnyxAvatarStack,
  OnyxBadge,
  OnyxCheckboxGroup,
  OnyxIconButton,
  OnyxInfoTooltip,
  OnyxLink,
} from "sit-onyx";
const options = [
  { label: "🍎", value: "option1" },
  { label: "🍉", value: "option2" },
  { label: "🍌", value: "option3" },
];
</script>
<template>
  <div>
    <OnyxAvatarStack>
      <OnyxAvatar label="John Doe 1" />
      <OnyxAvatar label="John Doe 2" />
      <OnyxAvatar label="John Doe 3" />
      <OnyxAvatar label="John Doe 4" />
      <OnyxAvatar label="John Doe 5" />
      <OnyxAvatar label="John Doe 6" />
    </OnyxAvatarStack>
    <OnyxBadge>Badge of Approval</OnyxBadge>
    <OnyxBadge :icon="triangleWarning" :color="'danger'" />
    <OnyxBadge :icon="thumbsUp" :color="'info'" />
    <OnyxBadge :icon="organigramChart2" :color="'neutral'" />
    <OnyxBadge :icon="forklift" :color="'primary'" />
    <OnyxBadge :icon="circleAttention" :color="'warning'" />
    <OnyxBadge :icon="circleCheck" :color="'success'" />
    <OnyxCheckboxGroup with-check-all :options label="Food for thought:" />
    <OnyxIconButton :color="'danger'" :label="'avatar'" :icon="eyeShine" />
    <OnyxIconButton :color="'neutral'" :label="'avatar'" :icon="eyeShine" />
    <OnyxIconButton :color="'primary'" :label="'avatar'" :icon="eyeShine" />
    <OnyxInfoTooltip :text="'test'" />

    <OnyxLink href="https://onyx.schwarz">asdf</OnyxLink>
    <!--  <OnyxButton :label="'avatar'" />
        <OnyxDialog :label="'avatar'" />
        <OnyxInput :label="'avatar'" />
        <OnyxListItem />
        <OnyxLoadingIndicator />
        <OnyxPagination :pages="10" :model-value="2" />
        <OnyxRadioGroup :options :label="'avatar'" />
        <OnyxSelect :options:label="'avatar'" />
        <OnyxSelectOption />
        <OnyxSkeleton />
        <OnyxStepper :label="'awesome'" />
        <OnyxSwitch :label="'awesome'" />
        <OnyxTable />
        <OnyxTag :label="'awesome'" />
        <OnyxTextarea :label="'awesome'" />
        <OnyxToast />
        <OnyxTooltip /> -->
  </div>
</template>
