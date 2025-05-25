<script setup lang="ts">
const {
  imageUrl,
  activityName,
  location,
  level,
  dateTime,
  participants,
  pointsRequired,
} = defineProps<{
  imageUrl: string;
  activityName: string;
  location: string;
  level: string;
  dateTime: string;
  participants: number;
  pointsRequired: number;
}>();
</script>

<template>
  <div class="activity-card rounded-3xl overflow-hidden shadow-lg">
    <div
      class="activity-card-image h-48 bg-cover bg-center"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    ></div>
    <div class="activity-card-content p-4">
      <h3 class="text-lg font-bold mb-2">{{ activityName }}</h3>
      <p class="text-sm text-gray-600 mb-1">地點: {{ location }}</p>
      <p class="text-sm text-gray-600 mb-1">程度: {{ level }}</p>
      <p class="text-sm text-gray-600 mb-1">日期時間: {{ dateTime }}</p>
      <p class="text-sm text-gray-600 mb-1">人數: {{ participants }}</p>
      <p class="text-sm text-gray-600 mb-3">需求點數: {{ pointsRequired }}</p>
      <el-button type="primary" class="w-full">立刻報名</el-button>
    </div>
  </div>
</template>

<style scoped>
.activity-card {
  width: 30%;
  max-width: 416px;
  box-shadow:
    0px 1px 3px 1px #00000026,
    0px 1px 2px 0px #0000004d;
}

.activity-card-image {
  background-color: #f0f0f0;
}
</style>
