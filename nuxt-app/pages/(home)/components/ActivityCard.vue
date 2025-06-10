<script setup lang="ts">
  import { Clock, User, Money } from "@element-plus/icons-vue";

  const {
    imageUrl,
    activityName,
    location,
    level,
    dateTime,
    participants,
    bookedCount,
    pointsRequired,
  } = defineProps<{
    imageUrl: string;
    activityName: string;
    location: string;
    level: string[];
    dateTime: string;
    participants: number;
    bookedCount: number;
    pointsRequired: number;
  }>();
</script>

<template>
  <div class="activity-card rounded-3xl overflow-hidden shadow-lg">
    <div
      class="activity-card-image h-48 bg-cover bg-center"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    />
    <div class="activity-card-content p-4 flex flex-col gap-2 bg-white">
      <h3 class="mb-2">
        <span class="text-xl">{{ activityName }}</span>
      </h3>
      <div class="flex items-center gap-2">
        <el-tag
          round
          class="p-4 border-0 text-base"
          type="info"
        >
          {{ location }}
        </el-tag>
        <ActivityElTags :level="level" />
      </div>
      <div class="text-sm text-gray-600 mb-1 flex items-center">
        <el-icon class="text-neutral-400 mr-2" size="16">
          <Clock />
        </el-icon>
        {{ dateTime }}
      </div>
      <div class="text-sm text-gray-600 mb-1 flex items-center">
        <el-icon class="text-neutral-400 mr-2" size="16">
          <User />
        </el-icon>
        {{ bookedCount }} / {{ participants }} 人
      </div>
      <div class="text-sm text-red-300 mb-1 flex items-center">
        <el-icon class="text-neutral-400 mr-2" size="16">
          <Money />
        </el-icon>
        {{ pointsRequired }} 點
      </div>
      <el-button type="primary" class="w-full rounded-[20px]">
        立刻報名
      </el-button>
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
