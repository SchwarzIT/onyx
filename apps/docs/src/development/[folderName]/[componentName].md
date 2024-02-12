---
layout: page
---

<script lang="ts" setup>
import StorybookIFrame from "../../.vitepress/components/StorybookIFrame.vue";
</script>

<StorybookIFrame :component="$params.componentName" :folder-name="$params.folderName"  />
