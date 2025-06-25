<script setup lang="ts">
  import { Clock, User, Money } from "@element-plus/icons-vue";

  const {
    activityId,
    imageUrl,
    activityName,
    location,
    level,
    dateTime,
    participants,
    bookedCount,
    pointsRequired
  } = defineProps<{
    activityId: string;
    imageUrl: string;
    activityName: string;
    location: string;
    level: string[];
    dateTime: string;
    participants: number;
    bookedCount: number;
    pointsRequired: number;
  }>();

  const pushTo = (activityId: string) => {
    const { $router } = useNuxtApp();
    if (activityId.includes("template")) {
      ElMessage.warning("此為範例活動");
      return;
    }
    $router.push(`/activities/${activityId}`);
  };
</script>

<template>
  <div
    class="activity-card mx-0.5 rounded-3xl overflow-hidden"
  >
    <img
      :src="imageUrl"
      :alt="activityName"
      class="h-[220px] w-full block object-cover"
    />
    <div class="flex flex-col p-4 gap-2">
      <h3>
        <span class="text-xl line-clamp-1">{{ activityName }}</span>
      </h3>
      <div class="flex items-center">
        <el-tag
          round
          class="p-4 border-0 text-black text-base bg-neutral-200 mr-2"
        >
          {{ location }}
        </el-tag>
        <ActivityElTags :level="level" />
      </div>
      <div class="text-md text-neutral-800 flex items-center">
        <el-icon
          class="text-neutral-400 mr-2"
          size="16"
        >
          <Clock />
        </el-icon>
        {{ dateTime }}
      </div>
      <div class="text-md text-neutral-800 flex items-center">
        <el-icon
          class="text-neutral-400 mr-2"
          size="16"
        >
          <User />
        </el-icon>
        {{ bookedCount }}/{{ participants }}人
      </div>
      <div class="text-xl font-bold text-primary-300 flex items-center">
        <el-icon
          class="text-neutral-400 mr-2"
          size="16"
        >
          <Money />
        </el-icon>
        {{ pointsRequired }} 點
      </div>
      <el-button
        type="primary"
        size="large"
        class="w-full rounded-[20px]"
        @click="pushTo(activityId)"
      >
        立刻報名
      </el-button>
    </div>
  </div>
</template>

<style scoped>
  .activity-card {
    box-shadow:
      0px 1px 3px 1px #00000026,
      0px 1px 2px 0px #0000004d;
  }
</style>
