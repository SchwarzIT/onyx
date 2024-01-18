<script lang="ts" setup>
import { ScuInfoTile } from '@scu/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const ERROR_REASONS = ['unauthorized', 'not-found'] as const;
type ErrorReason = (typeof ERROR_REASONS)[number];

const { t } = useI18n();
const route = useRoute();
const path = computed(() => route.query.path);

const reason = computed(() => {
  const query = Array.isArray(route.query.reason) ? route.query.reason[0] : route.query.reason;
  if (!query || !ERROR_REASONS.includes(query as any)) return;
  return query as ErrorReason;
});
</script>

<template>
  <ScuInfoTile status="error">
    <div slot="header">{{ t('pages.error.error') }}</div>
    <div slot="content">
      <span v-if="reason === 'unauthorized'">{{ t('pages.error.unauthorized', { path }) }}</span>
      <span v-else-if="reason === 'not-found'">{{ t('pages.error.notFound', { path }) }}</span>
      <span v-else>{{ t('pages.error.unknown') }}</span>
    </div>
  </ScuInfoTile>
</template>
