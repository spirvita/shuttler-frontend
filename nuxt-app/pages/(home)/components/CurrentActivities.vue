<script setup lang="ts">
  import bgImage from "@/assets/images/current-activities-bg.png";
  import ActivityCard from "./ActivityCard.vue";

  const activities = [
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
      points: 200
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
      points: 200
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
      points: 200
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
          :image-url="activity.picture"
          :activity-name="activity.name"
          :location="activity.city"
          :level="activity.level"
          :date-time="activity.date"
          :booked-count="activity.bookedCount"
          :participants="activity.participantCount"
          :points-required="activity.points"
        />
      </div>
    </div>
  </section>
</template>
