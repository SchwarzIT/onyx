<!-- eslint-disable sitOnyx/require-root-class -->
<!-- eslint-disable vue/no-static-inline-styles -->
<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";
import { useAnchorPositionPolyfill, type AnchorPosition } from "./useAnchorPositionPolyfill";
import type { OpenAlignment } from "./useOpenAlignment";

const positionedRef = useTemplateRef("positioned");
const targetRef = useTemplateRef("target");
const positionArea = ref<AnchorPosition>("top");
const alignment = ref<OpenAlignment>("center");
const alignsWithEdge = ref(false);
const fitParent = ref(false);

const { leftPosition, topPosition, updateAnchorPositionPolyfill } = useAnchorPositionPolyfill({
  positionedRef,
  targetRef,
  positionArea,
  alignment,
  alignsWithEdge,
  fitParent,
});

onMounted(() => {
  if (targetRef.value && positionedRef.value) {
    updateAnchorPositionPolyfill();
  }
});
</script>

<template>
  <div class="wrapper onyx-component">
    <div ref="target" class="target">Target</div>
    <div
      ref="positioned"
      class="positioned"
      :style="{
        left: leftPosition,
        top: topPosition,
      }"
    >
      Positioned
    </div>
  </div>
</template>

<style>
.wrapper {
  height: 2000px;
  .target,
  .positioned {
    width: 100px;
    height: 100px;
    background-color: red;
    color: white;
    text-align: center;
    line-height: 100px;
  }
  .target {
    margin-left: 16rem;
    margin-top: 16rem;
  }
  .positioned {
    position: absolute;
    background-color: blue;
  }
}
</style>
