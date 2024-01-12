<script lang="ts" setup>
const props = defineProps<{
  name: string;
  comingSoon?: boolean;
}>();
</script>

<template>
  <div class="card">
    <article class="card__content">
      <Badge v-if="props.comingSoon" class="card__badge" text="Coming Soon" type="info" />
      <h4 class="card__title">{{ props.name }}</h4>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition:
    border-color 0.25s,
    background-color 0.25s;

  &__content {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    height: 100%;
  }

  &__title {
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-weight: 700;
  }

  &__badge {
    width: max-content;
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
