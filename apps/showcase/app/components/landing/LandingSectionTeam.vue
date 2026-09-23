<script lang="ts" setup>
type TeamMember = {
  name: string;
  githubName: string;
  role: string;
};

const members: TeamMember[] = [
  { name: "Martin Hofmann", githubName: "mj-hof", role: "Product Owner" },
  { name: "Jonathan Leo Carle", githubName: "JoCa96", role: "Technical Lead" },
  { name: "Jonas Gramling", githubName: "Jonas-Gramling-UX", role: "UX Expert" },
  { name: "Lars Rickert", githubName: "larsrickert", role: "DEV Expert" },
  { name: "Christian Busshof", githubName: "ChristianBusshoff", role: "DEV Expert" },
  { name: "Nadine Baranzew", githubName: "Guergchen", role: "UX Expert" },
  { name: "Marko Kordic", githubName: "Marko-Kordic", role: "UX Expert" },
].sort((a, b) => {
  return getLastName(a.name).localeCompare(getLastName(b.name));
});

function getLastName(fullName: string): string {
  return fullName.trim().split(/\s+/).at(-1) ?? fullName;
}
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
            <OnyxAvatar
              :full-name="member.name"
              :src="`https://github.com/${member.githubName}.png`"
              size="64px"
            />
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
