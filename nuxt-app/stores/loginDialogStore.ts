import { defineStore } from "pinia";

export const useLoginDialogStore = defineStore("loginDialog", () => {
  const isOpen = ref(false);

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  return { isOpen, open, close };
});
