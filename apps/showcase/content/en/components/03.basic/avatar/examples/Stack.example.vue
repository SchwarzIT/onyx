<script lang="ts" setup>
import { OnyxAvatar, OnyxAvatarStack } from "sit-onyx";
</script>

<template>
  <OnyxAvatarStack>
    <OnyxAvatar full-name="Jane Doe 1" src="https://picsum.photos/id/64/256/256" />
    <OnyxAvatar full-name="Jane Doe 2" src="https://picsum.photos/id/65/256/256" />
    <OnyxAvatar full-name="Jane Doe 3" src="https://picsum.photos/id/91/256/256" />
    <OnyxAvatar full-name="Jane Doe 4" src="https://picsum.photos/id/96/256/256" />
    <OnyxAvatar full-name="Jane Doe 5" src="https://picsum.photos/id/129/256/256" />
    <OnyxAvatar full-name="Jane Doe 6" src="https://picsum.photos/id/237/256/256" />
    <OnyxAvatar full-name="4 more" initials="+4" />
  </OnyxAvatarStack>
</template>
