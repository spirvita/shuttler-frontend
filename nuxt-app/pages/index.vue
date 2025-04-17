<script setup lang="ts">
const countStore = useCountStore();
</script>

<template>
  <div class="text-center">
    <h1 class="text-2xl mb-5">Index Page</h1>
    <p>Count: {{ countStore.count }}</p>
    <button @click="countStore.addCount">Add Count</button>
    <button @click="countStore.subtractCount">Subtract Count</button>
    <button @click="countStore.resetCount">Reset Count</button>
  </div>
</template>

<style scoped></style>
