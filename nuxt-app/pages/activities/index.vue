<script setup lang="ts">
  import ActivitiesFilterPanel from "~/components/activities/ActivitiesFilterPanel.vue";
  import ActivitiesNearDatePicker from "~/components/activities/ActivitiesNearDatePicker.vue";
  import { getActivities } from "@/apis/activities";
  import { Location, Clock, Money, TopRight } from "@element-plus/icons-vue";
  import { useParticipantStatus } from "@/composables/useParticipantStatus";

  const { data: activities } = await getActivities();
  const router = useRouter();
  const pushTo = (activityId: string) => {
    router.push(`/activities/${activityId}`);
  };
</script>
<template>
  <div class="py-20">
    <div class="flex flex-col items-center mb-10">
      <h2 class="mb-6">羽神找活動</h2>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item>活動列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <ActivitiesFilterPanel class="col-span-12 xl:col-span-3" />
        <div class="col-span-12 xl:col-span-9">
          <ActivitiesNearDatePicker class="mb-6" />
          <ul class="grid grid-col-1 xl:grid-cols-3 gap-6">
            <li
              v-for="activity in activities?.data"
              :key="activity.activityId"
              class="relative group p-4 border rounded-lg"
              :class="`${useParticipantStatus('border', activity.bookedCount, activity.participantCount)}`"
              @click="pushTo(activity.activityId)"
            >
              <div class="flex items-center mb-2">
                <el-avatar
                  class="mr-2"
                  :size="40"
                  :src="activity.contactAvatar"
                />
                <h3 class="text-xl">{{ activity.name }}</h3>
              </div>
              <p class="flex items-center mb-2">
                <el-icon
                  class="mr-2"
                  size="16"
                >
                  <Location />
                </el-icon>
                {{ activity.venueName }}
              </p>
              <p class="flex items-center mb-2">
                <el-icon
                  class="mr-2"
                  size="16"
                >
                  <Clock />
                </el-icon>
                {{ activity.date }} {{ activity.startTime }} -
                {{ activity.endTime }}
              </p>
              <p class="flex items-center mb-2">
                <el-icon
                  class="mr-2"
                  size="16"
                >
                  <Money />
                </el-icon>
                <span class="text-lg font-bold">{{ activity.points }} 點</span>
              </p>
              <div class="flex items-center">
                <ActivityElTags :level="activity.level" />
                <el-tag
                  round
                  effect="light"
                  class="text-black py-4 border-0"
                  :class="`${useParticipantStatus('bg', activity.bookedCount, activity.participantCount)} ${useParticipantStatus('border', activity.bookedCount, activity.participantCount)}`"
                >
                  {{ activity.bookedCount }}/{{ activity.participantCount }} 人
                </el-tag>
              </div>
              <div
                class="absolute -top-0.25 -left-0.25 -bottom-0.25 -right-0.25 border border-gray-500 bg-gray-500 opacity-20 rounded-lg hidden group-hover:block group-hover:cursor-pointer"
              />
              <el-button
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black hidden group-hover:block"
                :icon="TopRight"
                circle
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
