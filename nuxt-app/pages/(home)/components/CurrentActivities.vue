<script setup lang="ts">
  import bgImage from "@/assets/images/current-activities-bg.png";
  import ActivityCard from "./ActivityCard.vue";

  const activities = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1729166241032-5b339506a0d7?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      activityName: "活動名稱",
      location: "台北市",
      level: "初級",
      dateTime: "2024-01-01 10:00",
      participants: 10,
      pointsRequired: 10
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2883&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      activityName: "活動名稱",
      location: "台北市",
      level: "初級",
      dateTime: "2024-01-01 10:00",
      participants: 10,
      pointsRequired: 10
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1659081463572-4c5903a309e6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      activityName: "活動名稱",
      location: "台北市",
      level: "初級",
      dateTime: "2024-01-01 10:00",
      participants: 10,
      pointsRequired: 10
    }
  ];
</script>
<template>
  <section
    class="bg-cover bg-no-repeat bg-center h-[100dvh]"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="container">
      <div class="flex flex-col items-center justify-center">
        <h2 class="text-neutral-800 mt-[10%] mb-[40px]">近期活動</h2>
      </div>

      <div class="max-w-[70%] mx-auto flex items-center justify-center gap-6">
        <ActivityCard
          v-for="activity in activities"
          :key="activity.id"
          :image-url="activity.imageUrl"
          :activity-name="activity.activityName"
          :location="activity.location"
          :level="activity.level"
          :date-time="activity.dateTime"
          :participants="activity.participants"
          :points-required="activity.pointsRequired"
        />
      </div>
    </div>
  </section>
</template>
