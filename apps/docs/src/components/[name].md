---
layout: page
---

<script lang="ts" setup>
import { useData } from "vitepress";
import StorybookDocs from "./StorybookDocs.vue";

const { params } = useData();
</script>

<StorybookDocs :component="params.name" />
