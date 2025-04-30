<script setup lang="ts">
  const router = useRouter();
  const event = useRequestEvent();
  if (event) setResponseStatus(event, 404);
  router.push("/");
</script>
<template>
  <div>
    <div class="text-center">沒有這個頁面喔</div>
  </div>
</template>
<style scoped></style>
