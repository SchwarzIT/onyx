<script lang="ts" setup>
const { data: members } = await useAsyncData("team", () => $fetch("/api/team"));
</script>

<template>
  <section class="team">
    <div class="onyx-grid">
      <!-- Intro column -->
      <div class="onyx-grid-span-8 onyx-grid-md-span-4 team__intro">
        <OnyxHeadline is="h2" show-as="h1">{{ $t("team.headline") }}</OnyxHeadline>
        <p class="onyx-text--large">{{ $t("team.description") }}</p>
      </div>

      <!-- Members column -->
      <div class="onyx-grid-span-8 team__members">
        <div class="onyx-grid">
          <GradientCard
            v-for="member in members"
            :key="member.name"
            class="member onyx-grid-span-4"
          >
            <OnyxAvatar :full-name="member.name" :src="member.avatar_url" size="64px" />
            <div class="member__info">
              <OnyxHeadline is="h3">{{ member.name }}</OnyxHeadline>
              <p class="member__role onyx-text--small">{{ member.role }}</p>
            </div>
          </GradientCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.team {
  &__intro {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-md);
  }

  &__members {
    container-type: inline-size;
  }
}

.member {
  flex-direction: row;
  align-items: center;

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
  }

  &__role {
    color: var(--onyx-color-text-icons-neutral-medium);
  }
}
</style>
