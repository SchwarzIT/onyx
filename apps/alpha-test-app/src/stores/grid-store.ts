import { defineStore } from "pinia";
import { ref } from "vue";

export const useGridStore = defineStore("grid", () => {
  const isMaxWidth = ref(false);
  const isCentered = ref(false);

  return { isMaxWidth, isCentered };
});
