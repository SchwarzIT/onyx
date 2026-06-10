<script lang="ts" setup>
import { iconCode, iconCopy, iconDownload, iconPicture } from "@sit-onyx/icons";
import { useToast } from "sit-onyx";

const props = defineProps<{
  /**
   * Icon SVG content.
   */
  icon: string;
  /**
   * Icon name.
   */
  name: string;
  /**
   * Function to get the JavaScript import string for the icon.
   */
  getCodeImport: (name: string) => string;
}>();

defineSlots<{
  /**
   * Optional slot to override the name content.
   */
  default?(): unknown;
}>();

const toast = useToast();
const { t } = useI18n();
const { copy } = useClipboard();

const handleCopyCode = async () => {
  await copy(props.getCodeImport(props.name));
  toast.show({
    headline: t("copiedToClipboard"),
    description: t("icons.copy.code.success", { name: props.name }),
    color: "success",
  });
};

const handleCopyName = async () => {
  await copy(props.name);
  toast.show({
    headline: t("copiedToClipboard"),
    description: t("icons.copy.name.success", { name: props.name }),
    color: "success",
  });
};

const handleCopySVG = async () => {
  await copy(props.icon);
  toast.show({
    headline: t("copiedToClipboard"),
    description: t("icons.copy.svg.success", { name: props.name }),
    color: "success",
  });
};

const handleDownloadSVG = () => {
  downloadFile({
    content: props.icon,
    filename: `${props.name}.svg`,
    type: "image/svg+xml",
  });
};
</script>

<template>
  <OnyxFlyoutMenu
    class="flyout"
    :label="$t('actions')"
    position="auto-inline"
    alignment="top"
    trigger="click"
  >
    <template #button="{ trigger }">
      <OnyxCard v-bind="trigger" class="card" clickable>
        <OnyxIcon :icon="props.icon" />

        <div class="onyx-text--small">
          <slot> {{ props.name }} </slot>
        </div>
      </OnyxCard>
    </template>

    <template #options>
      <OnyxMenuItem :label="$t('icons.copy.code.label')" :icon="iconCode" @click="handleCopyCode" />
      <OnyxMenuItem :label="$t('icons.copy.name.label')" :icon="iconCopy" @click="handleCopyName" />
      <OnyxMenuItem
        :label="$t('icons.copy.svg.label')"
        :icon="iconPicture"
        @click="handleCopySVG"
      />
      <OnyxMenuItem
        :label="$t('icons.copy.download.label')"
        :icon="iconDownload"
        @click="handleDownloadSVG"
      />
    </template>
  </OnyxFlyoutMenu>
</template>

<style lang="scss" scoped>
.flyout {
  width: 100%;
}

.card {
  --onyx-card-gap: var(--onyx-density-sm);
  align-items: center;
  text-align: center;
  flex-grow: 1;

  &:hover {
    background-color: var(--onyx-color-base-neutral-200);
    box-shadow: var(--onyx-shadow-medium-bottom);
  }
}
</style>
