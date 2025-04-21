<script lang="ts" setup>
  const router = useRoute();
</script>
<template>
  <div>
    <h2>{{ router.fullPath }}</h2>
  </div>
</template>
