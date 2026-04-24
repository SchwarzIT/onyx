<script lang="ts" setup>
import { iconLock, iconLogin } from "@sit-onyx/icons";

const { loggedIn } = useUserSession();
const { login } = useLogin();

defineSlots<{
  /**
   * Content to display if the user is logged in.
   */
  default(): unknown;
}>();
</script>

<template>
  <slot v-if="loggedIn"></slot>

  <OnyxCard v-else class="fallback">
    <div class="fallback__headline">
      <OnyxIcon :icon="iconLock" />
      <OnyxHeadline is="h3">{{ $t("auth.protectedContent") }}</OnyxHeadline>
    </div>

    <p>{{ $t("auth.moreContentAvailable") }}</p>

    <OnyxButton
      :label="$t('auth.login')"
      :icon="iconLogin"
      color="primary"
      mode="outline"
      @click="login"
    />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.fallback {
  align-items: center;
  text-align: center;
  margin-block: var(--onyx-markdown-renderer-margin-block);

  &__headline {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-2xs);
  }
}
</style>
