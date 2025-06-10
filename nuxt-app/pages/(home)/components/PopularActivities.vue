<script setup lang="ts">
  import bgImage from "@/assets/images/popular-activities-bg.png";

  const popularActivities = ref([
    {
      id: 1,
      name: "週末羽球友誼賽",
      picture:
        "https://images.unsplash.com/photo-1729166241032-5b339506a0d7?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-04-13",
      startTime: "10:00",
      endTime: "16:00",
      city: "台北市",
      level: ["高階"],
      participantCount: 16,
      bookedCount: 15,
      points: 200,
    },
    {
      id: 2,
      name: "週末羽球友誼賽",
      picture:
        "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2883&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-04-13",
      startTime: "10:00",
      endTime: "16:00",
      city: "台北市",
      level: ["高階"],
      participantCount: 16,
      bookedCount: 15,
      points: 200,
    },
    {
      id: 3,
      name: "週末羽球友誼賽",
      picture:
        "https://images.unsplash.com/photo-1659081463572-4c5903a309e6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-04-13",
      startTime: "10:00",
      endTime: "16:00",
      city: "台北市",
      level: ["高階"],
      participantCount: 16,
      bookedCount: 15,
      points: 200,
    },
    {
      id: 4,
      name: "週末羽球友誼賽",
      picture:
        "https://images.unsplash.com/photo-1659081463572-4c5903a309e6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-04-13",
      startTime: "10:00",
      endTime: "16:00",
      city: "台北市",
      level: ["高階"],
      participantCount: 16,
      bookedCount: 15,
      points: 200,
    },
  ]);
</script>

<template>
  <section
    class="bg-cover bg-no-repeat bg-center max-h-[100dvh] py-10"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="container">
      <div class="flex flex-col items-center justify-center">
        <h2 class="text-neutral-800 mb-[40px]">熱門活動</h2>

        <div class="w-full max-w-6xl mx-auto">
          <!-- 使用 CSS Grid 創建兩列等寬佈局 -->
          <div class="grid grid-cols-2 gap-6">
            <!-- 每個活動卡片佔據一個網格單元 -->
            <div
              v-for="activity in popularActivities"
              :key="activity.id"
              class="bg-white rounded-[24px] shadow-md overflow-hidden h-[96px]"
            >
              <div class="flex">
                <img
                  :src="activity.picture"
                  class="w-[128px] h-[96px] object-cover"
                  alt="活動圖片"
                />
                <div class="px-6 py-4 flex-1">
                  <div class="flex justify-between mb-2">
                    <div class="text-sm">{{ activity.name }}</div>
                    <div class="text-sm">
                      {{ activity.bookedCount }} /
                      {{ activity.participantCount }}
                    </div>
                  </div>
                  <div class="flex justify-between mt-auto">
                    <div class="flex items-center gap-2">
                      <div class="text-gray-600 text-sm">
                        <el-tag
                          round
                          class="p-4 border-0 text-base"
                          type="info"
                        >
                          {{ activity.city }}
                        </el-tag>
                      </div>
                      <div class="text-gray-500 text-xs mt-1">
                        <ActivityElTags :level="activity.level" />
                      </div>
                    </div>
                    <div class="text-red-300">{{ activity.points }} 點</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <NuxtLink to="/activities">
          <ElButton
            type="primary"
            class="rounded-2xl mt-10"
          >
            查看更多
          </ElButton>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
