<script setup lang="ts">
import HeroSection from "./components/HeroSection.vue";
import CurrentActivities from "./components/CurrentActivities.vue";
import PopularActivities from "./components/PopularActivities.vue";
import HoldActivity from "./components/HoldActivity.vue";
import { getUpcomingActivities, getPopularActivities } from "@/apis/activities";

const { data: upcomingActivities } = await getUpcomingActivities();
const { data: popularActivities } = await getPopularActivities();

console.log(upcomingActivities.value);
console.log(popularActivities.value);

</script>

<template>
  <div>
    <HeroSection />
    <CurrentActivities />
    <PopularActivities />
    <HoldActivity />
  </div>
</template>

<style scoped></style>
