<script lang="ts" setup>
import { iconCode, iconCopy, iconDownload, iconPicture } from "@sit-onyx/icons";
import { useToast } from "sit-onyx";

const props = defineProps<{
  icon: string;
  name: string;
  /**
   * String to copy to import the icon in code.
   */
  codeImport: string;
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
  await copy(props.codeImport);
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
  // 1. Convert the string into a Blob with the correct SVG type
  const blob = new Blob([props.icon], { type: "image/svg+xml" });

  // 2. Create a temporary URL pointing to that Blob
  const url = URL.createObjectURL(blob);

  // 3. Create a temporary hidden link
  const link = document.createElement("a");
  link.href = url;
  link.download = `${props.name}.svg`;

  // 4. Append, click, and remove the link to trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 5. Clean up the URL to prevent memory leaks!
  URL.revokeObjectURL(url);
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
