<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { onMounted } from "vue";
import { useHead } from "#app"; // Nuxt 3 提供的 Composable

const authStore = useAuthStore();

onMounted(() => {
  authStore.initializeToken();
});

// 加入 Iconify CDN script
useHead({
  script: [
    {
      src: "https://code.iconify.design/3/3.1.1/iconify.min.js",
      defer: true,
    },
  ],
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
