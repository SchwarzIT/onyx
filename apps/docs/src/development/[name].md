---
layout: page
---

<script lang="ts" setup>
import { useData } from "vitepress";
import StorybookIFrame from "../.vitepress/components/StorybookIFrame.vue";

const { params } = useData();
</script>

<StorybookIFrame :component="params.name" />
