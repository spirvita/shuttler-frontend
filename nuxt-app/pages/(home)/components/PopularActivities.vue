<script setup lang="ts">
  import bgImage from "@/assets/images/popular-activities-bg.png";
  import { getPopularActivities } from "@/apis/activities";

  const displayCount = 6;
  const { data } = await getPopularActivities();
  const defaultPopularActivities = ref([
    {
      activityId: 1,
      name: "週末羽球友誼賽",
      picture:
        "https://images.unsplash.com/photo-1729166241032-5b339506a0d7?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-04-13",
      startTime: "10:00",
      endTime: "16:00",
      city: "臺北市",
      level: ["初中階"],
      participantCount: 16,
      bookedCount: 10,
      points: 100
    },
    {
      activityId: 2,
      name: "羽球技術提升工作坊",
      picture:
        "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2883&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-04-13",
      startTime: "10:00",
      endTime: "16:00",
      city: "桃園市",
      level: ["高階"],
      participantCount: 4,
      bookedCount: 1,
      points: 250
    },
    {
      activityId: 3,
      name: "羽球雙打戰術講座",
      picture:
        "https://images.unsplash.com/photo-1564769353575-73f33a36d84f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-04-13",
      startTime: "10:00",
      endTime: "16:00",
      city: "新竹市",
      level: ["初中階", "中階"],
      participantCount: 4,
      bookedCount: 2,
      points: 250
    },
    {
      activityId: 4,
      name: "社區羽球交流賽",
      picture:
        "https://images.unsplash.com/photo-1659081463572-4c5903a309e6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-04-13",
      startTime: "10:00",
      endTime: "16:00",
      city: "台北市",
      level: ["初中階", "中階"],
      participantCount: 16,
      bookedCount: 15,
      points: 150
    },
    {
      activityId: 5,
      name: "初學者羽球教學課程",
      picture:
        "https://images.unsplash.com/photo-1733141731755-272381a17c59?q=80&w=2910&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-04-13",
      startTime: "10:00",
      endTime: "16:00",
      city: "桃園市",
      level: ["初階"],
      participantCount: 8,
      bookedCount: 7,
      points: 300
    },
    {
      activityId: 6,
      name: "羽球體能訓練營",
      picture:
        "https://cdn.pixabay.com/photo/2019/04/19/10/13/badminton-4139024_1280.jpg",
      date: "2025-04-13",
      startTime: "10:00",
      endTime: "16:00",
      city: "台北市",
      level: ["中階", "中進階"],
      participantCount: 8,
      bookedCount: 4,
      points: 250
    }
  ]);
  const popularActivities = computed(() => {
    if (data.value?.message === "目前無資料") {
      return defaultPopularActivities.value;
    }
    if (data.value?.data && data.value?.data.length < displayCount) {
      const activities = data.value?.data || [];
      const remainingCount = displayCount - activities.length;
      return [
        ...activities,
        ...defaultPopularActivities.value.slice(0, remainingCount)
      ];
    }
    return defaultPopularActivities.value;
  });
</script>

<template>
  <section
    class="bg-cover bg-no-repeat bg-center py-10 lg:py-20"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="container">
      <h2 class="text-center text-neutral-800 mb-10">熱門活動</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <li
          v-for="activity in popularActivities"
          :key="activity.activityId"
          class="bg-white rounded-3xl shadow-md overflow-hidden"
        >
          <div class="flex">
            <img
              :src="activity.picture"
              class="min-w-[128px] w-[128px] h-[132px] lg:h-[96px] object-cover"
              :alt="activity.name"
            />
            <div
              class="p-4 lg:px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between w-full h-full"
            >
              <div class="flex flex-col mb-2 lg:mb-0">
                <div class="text-md mb-2">{{ activity.name }}</div>
                <div class="flex items-center gap-2">
                  <div class="text-gray-600 text-sm">
                    <el-tag
                      round
                      class="p-4 border-0 text-base text-black bg-neutral-200"
                    >
                      {{ activity.city }}
                    </el-tag>
                  </div>
                  <ActivityElTags :level="activity.level" />
                </div>
              </div>
              <div class="flex lg:flex-col">
                <div class="text-right text-md lg:mb-1.5 flex-1">
                  {{ activity.bookedCount }}/{{ activity.participantCount }}人
                </div>
                <div class="text-xl font-bold text-primary-300">
                  {{ activity.points }} 點
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="flex justify-center">
        <NuxtLink to="/activities">
          <ElButton
            type="primary"
            size="large"
            round
            class="rounded-2xl mt-10"
          >
            查看更多
          </ElButton>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
