<script setup lang="ts">
const countStore = useCountStore();
</script>

<template>
  <div>
    Index Page
    <h1>Count: {{ countStore.count }}</h1>
    <button @click="countStore.addCount">Add Count</button>
    <button @click="countStore.subtractCount">Subtract Count</button>
    <button @click="countStore.resetCount">Reset Count</button>
  </div>
</template>

<style scoped></style>
