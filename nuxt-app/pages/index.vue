<script setup lang="ts">
const countStore = useCountStore();
</script>

<template>
  <div class="text-center">
    <h1 class="text-2xl mb-5">Index Page</h1>
    <p>Count: {{ countStore.count }}</p>
    <ElButton type="primary" class="text-black" @click="countStore.addCount" >Add Count</ElButton>
    <ElButton type="success" @click="countStore.subtractCount">Subtract Count</ElButton>
    <ElButton type="danger" @click="countStore.resetCount">Reset Count</ElButton>
  </div>
</template>

<style scoped></style>
