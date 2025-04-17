import { defineStore } from "pinia";

export const useCountStore = defineStore("count", () => {
  const count = ref(0);
  const addCount = () => {
    count.value++;
  };
  const resetCount = () => {
    count.value = 0;
  };
  const subtractCount = () => {
    count.value--;
  };
  return { count, addCount, resetCount, subtractCount };
});
