<script setup lang="ts">
import { iconSync } from "@sit-onyx/icons";
import {
  OnyxAppLayout,
  OnyxBottomBar,
  OnyxButton,
  OnyxForm,
  OnyxHeadline,
  OnyxInput,
  OnyxLink,
  OnyxPageLayout,
} from "sit-onyx";
import { onMounted, ref, useId } from "vue";
import manifest from "../manifest.json";
import { postPluginMessage, usePluginMessage } from "./composables/usePluginMessage.js";

const accessToken = ref("");
const formId = useId();
const isLoading = ref(false);

usePluginMessage<{ accessToken: string }>({
  type: "set-stored-data",
  onMessage: (data) => {
    accessToken.value = data.accessToken;
  },
});

onMounted(() => {
  postPluginMessage({ type: "get-stored-data" });
});

const handleSubmit = () => {
  isLoading.value = true;
  postPluginMessage({
    type: "save-and-run",
    data: { accessToken: accessToken.value },
  });
};
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <div class="content">
        <OnyxHeadline is="h1">{{ manifest.name }}</OnyxHeadline>

        <div>
          This plugins syncs all icons from the
          <OnyxLink
            href="https://www.figma.com/design/ZtlUPkO9ATUCV42Wkg7P0o/Icon-Library---UX-Schwarz-IT?node-id=3270-179&p=f&t=73ej3zMQDnmbQiMw-0"
            target="_blank"
          >
            UX Schwarz IT icon library
          </OnyxLink>
          to the onyx icon library.
        </div>

        <OnyxForm :id="formId" :disabled="isLoading" @submit.prevent="handleSubmit">
          <OnyxInput
            v-model="accessToken"
            label="Figma access token"
            type="password"
            placeholder="figd_..."
            required
          />

          <div class="description onyx-text--small">
            Check out the
            <OnyxLink href="https://www.figma.com/developers/api#access-tokens" target="_blank"
              >Figma access token documentation</OnyxLink
            >
            on how to get an access token. It must at least include the
            <strong>"file_content:read"</strong>
            permission.
          </div>
        </OnyxForm>
      </div>

      <template #footer>
        <OnyxBottomBar>
          <OnyxButton
            label="Sync icons"
            type="submit"
            :form="formId"
            :icon="iconSync"
            :loading="isLoading"
          />
        </OnyxBottomBar>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-lg);
}

.description {
  color: var(--onyx-color-text-icons-neutral-medium);
  margin-top: var(--onyx-density-xs);
}

:deep(.onyx-grid-layout) {
  padding-block: var(--onyx-grid-margin);
}
</style>
