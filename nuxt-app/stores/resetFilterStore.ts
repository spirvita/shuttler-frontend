import { defineStore } from "pinia";

export const useResetFilterStore = defineStore("resetFilter", () => {
  const isReset = ref(false);

  function reset() {
    isReset.value = true;
  }
  function clear() {
    isReset.value = false;
  }
  return { isReset, reset, clear };
});
