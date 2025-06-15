<script setup lang="ts">
  import bgImage from "@/assets/images/current-activities-bg.png";
  import ActivityCard from "./ActivityCard.vue";
  import { getUpcomingActivities } from "@/apis/activities";

  const displayCount = 6;
  const { data } = await getUpcomingActivities();
  const defaultUpcomingActivities = ref([
    {
      activityId: "template1",
      name: "週末羽球友誼賽",
      picture:
        "https://images.unsplash.com/photo-1729166241032-5b339506a0d7?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-06-22",
      startTime: "8:00",
      endTime: "11:00",
      city: "台北市",
      level: ["初階", "中階"],
      participantCount: 16,
      bookedCount: 10,
      points: 100
    },
    {
      activityId: "template2",
      name: "羽球技術提升工作坊",
      picture:
        "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2883&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-06-23",
      startTime: "10:00",
      endTime: "12:00",
      city: "桃園市",
      level: ["高階"],
      participantCount: 4,
      bookedCount: 1,
      points: 250
    },
    {
      activityId: "template3",
      name: "羽球雙打戰術講座",
      picture:
        "https://images.unsplash.com/photo-1564769353575-73f33a36d84f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-06-24",
      startTime: "18:00",
      endTime: "20:00",
      city: "新竹市",
      level: ["初中階", "中階"],
      participantCount: 4,
      bookedCount: 2,
      points: 250
    },
    {
      activityId: "template4",
      name: "社區羽球交流賽",
      picture:
        "https://images.unsplash.com/photo-1659081463572-4c5903a309e6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2025-06-24",
      startTime: "18:00",
      endTime: "20:00",
      city: "台北市",
      level: ["初中階", "中階"],
      participantCount: 16,
      bookedCount: 15,
      points: 150
    }
  ]);
  const upcomingActivities = computed(() => {
    if (data.value?.message === "目前無資料") {
      return defaultUpcomingActivities.value;
    }
    if (data.value?.data && data.value?.data.length < displayCount) {
      const activities = data.value?.data || [];
      const remainingCount = displayCount - activities.length;
      return [...activities, ...defaultUpcomingActivities.value.slice(0, remainingCount)];
    }
    return defaultUpcomingActivities.value;
  })

  const containerRef = ref(null);
  const swiper = useSwiper(containerRef, {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1280: {
        slidesPerView: 3,
        spaceBetween: 24,
      }
    },
  })

  const formatDateTime = (date: string, startTime: string, endTime: string) => {
    return `${date.replace(/-/g, "/")}（${new Date(date).toLocaleDateString("zh-TW", { weekday: "short" })}）${startTime} - ${endTime}`;
  };

  onMounted(() => {
    console.log(`Swiper instance:`, swiper.instance);
  })
</script>
<template>
  <section
    class="bg-cover bg-no-repeat bg-center py-10 lg:py-20"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="container">
      <h2 class="text-center text-neutral-800 mb-10">近期活動</h2>
      <ClientOnly>
        <swiper-container ref="containerRef">
          <swiper-slide
            v-for="activity in upcomingActivities"
            :key="activity.activityId"
          >
            <ActivityCard
              :activity-id="activity.activityId"
              :image-url="activity.picture"
              :activity-name="activity.name"
              :location="activity.city"
              :level="activity.level"
              :date-time="formatDateTime(activity.date, activity.startTime, activity.endTime)"
              :booked-count="activity.bookedCount"
              :participants="activity.participantCount"
              :points-required="activity.points"
            />
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </div>
  </section>
</template>
<style lang="scss">
  swiper-container span.swiper-pagination-bullet-active {
    background: var(--color-primary-500) !important;
  }
  swiper-slide {
    padding-bottom: 40px;
  }
</style>
