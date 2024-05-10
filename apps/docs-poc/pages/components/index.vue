<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
</script>

<template>
  <div>
    <OnyxHeadline is="h1">
      {{ $t("components.pageName") }}
    </OnyxHeadline>
  </div>
</template>
