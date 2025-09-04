<script lang="ts" setup>
import * as ALL_FLAGS from "@sit-onyx/flags";
import { FLAG_METADATA, getFlagImportName } from "@sit-onyx/flags/utils";
import { iconMail, iconTrash } from "@sit-onyx/icons";
import { useToast, type RadioButtonOption, type SelectOption } from "sit-onyx";

type User = {
  name: string;
  email: string;
  age?: number;
  country?: string;
  phone?: string;
  newsletter?: boolean;
  notes?: string;
  gender?: Gender;
};

type Gender = "f" | "m" | "d";

definePageMeta({ layout: false });

const { t } = useI18n();
const toast = useToast();
const formId = useId();
const pageContext = inject(FORM_PAGE_INJECTION_KEY);

const state = ref<User>({
  name: "Jane Doe",
  email: "jane.doe@example.com",
});

const handleSubmit = () => {
  toast.show({
    headline: t("user.toasts.save.success"),
    description: t("noDemoDataUpdated"),
    color: "success",
  });
};

const handleReset = () => {
  state.value = { name: "Jane Doe", email: "jane.doe@example.com" };
};

const countryOptions = computed(() => {
  return Object.entries(FLAG_METADATA).map(([countryCode, metadata]) => {
    return {
      label: metadata.internationalName,
      value: countryCode,
      group: metadata.continent,
      icon: ALL_FLAGS[getFlagImportName(countryCode) as keyof typeof ALL_FLAGS],
    } satisfies SelectOption;
  });
});

const phoneAreaCodeOptions = Array.from({ length: 99 }, (_, index) => {
  const value = index + 1;
  return {
    label: `+${value.toFixed().padStart(2, "0")}`,
    value,
  } satisfies SelectOption;
});

const phoneAreaCode = ref(phoneAreaCodeOptions[0]?.value);

const genderOptions = computed<RadioButtonOption<Gender>[]>(() => [
  { label: t("user.genders.female"), value: "f" },
  { label: t("user.genders.male"), value: "m" },
  { label: t("user.genders.diverse"), value: "d" },
]);

const isDeleteModalOpen = ref(false);

const handleDelete = () => {
  toast.show({
    headline: t("user.toasts.delete.error"),
    description: t("noDemoDataUpdated"),
    color: "danger",
  });
  isDeleteModalOpen.value = false;
};
</script>

<template>
  <OnyxForm :id="formId" class="page" @submit.prevent="handleSubmit" @reset="handleReset">
    <div class="page__headline">
      <OnyxHeadline is="h1">{{ $t("personalData") }}</OnyxHeadline>
      <OnyxButton
        :label="$t('delete')"
        color="danger"
        :icon="iconTrash"
        @click="isDeleteModalOpen = true"
      />

      <OnyxAlertModal v-model:open="isDeleteModalOpen" :label="$t('user.confirmDelete.headline')">
        {{ $t("user.confirmDelete.description") }}

        <template #actions>
          <OnyxButton
            :label="$t('cancel')"
            color="neutral"
            mode="plain"
            autofocus
            @click="isDeleteModalOpen = false"
          />
          <OnyxButton :label="$t('delete')" color="danger" @click="handleDelete" />
        </template>
      </OnyxAlertModal>
    </div>

    <div class="page__avatar">
      <OnyxAvatar size="96px" full-name="Jane Doe" />
      <div>
        <OnyxHeadline is="h2">Jane Doe</OnyxHeadline>
        <OnyxHeadline is="h2" class="page__email">jane.doe@example.com</OnyxHeadline>
      </div>
    </div>

    <div class="onyx-grid">
      <OnyxInput
        v-model="state.name"
        :label="$t('user.fullName')"
        class="onyx-grid-span-4"
        required
      />

      <OnyxSelect
        v-model="state.country"
        class="onyx-grid-span-4"
        :label="$t('user.country')"
        :list-label="$t('user.availableCountries')"
        :placeholder="$t('user.countryOfResidence')"
        :options="countryOptions"
        truncation="multiline"
        with-search
      />

      <OnyxRadioGroup
        v-model="state.gender"
        class="onyx-grid-span-4"
        :label="$t('user.gender')"
        :options="genderOptions"
        orientation="horizontal"
      />

      <OnyxInput
        v-model="state.email"
        :label="$t('user.email')"
        class="onyx-grid-span-4"
        type="email"
        required
      >
        <template #leading>
          <OnyxIcon :icon="iconMail" />
        </template>
      </OnyxInput>

      <OnyxInput
        v-model="state.phone"
        class="onyx-grid-span-4 page__phone"
        :label="$t('user.phone')"
        type="tel"
        :minlength="4"
      >
        <template #leading>
          <OnyxSelect
            v-model="phoneAreaCode"
            label="Area code"
            list-label="Available area codes"
            :options="phoneAreaCodeOptions"
            hide-label
            density="compact"
          />
        </template>
      </OnyxInput>

      <OnyxDatePicker class="onyx-grid-span-2" :label="$t('user.birthday')" />

      <OnyxStepper
        v-model="state.age"
        placeholder="42"
        class="onyx-grid-span-2"
        label="Age"
        :min="0"
        :max="200"
      />

      <OnyxTextarea
        :label="$t('user.notes')"
        class="onyx-grid-span-full"
        :maxlength="2048"
        with-counter
      />

      <OnyxSwitch
        v-model="state.newsletter"
        class="onyx-grid-span-full"
        :label="$t('user.subscribeNewsletter')"
      />
    </div>
  </OnyxForm>

  <Teleport v-if="pageContext?.footerRef.value" :to="pageContext?.footerRef.value">
    <OnyxBottomBar>
      <OnyxButton :label="$t('reset')" type="reset" color="neutral" mode="plain" :form="formId" />
      <OnyxButton :label="$t('save')" type="submit" :form="formId" />
    </OnyxBottomBar>
  </Teleport>
</template>

<style lang="scss" scoped>
.page {
  &__headline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--onyx-density-sm);
  }

  &__avatar {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-lg);
    flex-wrap: wrap;
  }

  &__email {
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  &__phone {
    :deep(.onyx-input__wrapper) {
      padding-left: 0;
      gap: 0;
    }

    :deep(.onyx-input__native) {
      padding: var(--onyx-input-padding-vertical) var(--onyx-density-sm);
    }

    :deep(.onyx-select-input__wrapper) {
      border: none;

      .onyx-select-input__native {
        width: 6ch;
      }
    }
  }
}
</style>
