<script setup lang="ts">
  import { useAuthStore } from "~/stores/auth";

  const authStore = useAuthStore();

  onMounted(() => {
    authStore.initializeToken();
  });
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
