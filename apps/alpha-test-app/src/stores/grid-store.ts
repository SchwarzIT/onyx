import { defineStore } from "pinia";
import { ref } from "vue";

export const useGridStore = defineStore("grid", () => {
  const isMaxWidth = ref(true);
  const isCentered = ref(true);

  return { isMaxWidth, isCentered };
});
