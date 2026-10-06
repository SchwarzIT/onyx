<script lang="ts" setup>
const { data: contributors, status } = await useLazyAsyncData("contributors", () =>
  $fetch("/api/contributors"),
);
</script>

<template>
  <section class="contributors">
    <OnyxHeadline is="h2" show-as="h1">{{ $t("contributors.headline") }}</OnyxHeadline>

    <OnyxEmpty v-if="status === 'error'"> {{ $t("contributors.error") }} </OnyxEmpty>

    <ul v-else-if="status === 'pending'" class="contributors__list">
      <li v-for="i in 16" :key="i">
        <OnyxSkeleton class="contributors__skeleton" />
      </li>
    </ul>

    <ul v-else class="contributors__list">
      <li v-for="contributor in contributors" :key="contributor.login">
        <OnyxRouterLink :href="contributor.html_url ?? ''">
          <OnyxAvatar
            :full-name="contributor.login ?? $t('contributors.anonymous')"
            :src="contributor.avatar_url"
          />
        </OnyxRouterLink>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.contributors {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);

  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--onyx-density-lg);
  }

  &__skeleton {
    height: 3rem;
    width: 3rem;
    border-radius: var(--onyx-radius-full);
  }
}
</style>
