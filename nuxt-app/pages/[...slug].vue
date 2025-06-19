<script setup lang="ts">
  definePageMeta({
    middleware: ["slug"]
  });
  const router = useRouter();
  const event = useRequestEvent();
  if (event) setResponseStatus(event, 404);
  router.push("/");
</script>
<template>
  <div>
    <p class="text-center py-20">沒有這個頁面喔</p>
  </div>
</template>
