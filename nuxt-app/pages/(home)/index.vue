<script setup lang="ts">
  import HeroSection from "./components/HeroSection.vue";
  import CurrentActivities from "./components/CurrentActivities.vue";
  import PopularActivities from "./components/PopularActivities.vue";
  import HoldActivity from "./components/HoldActivity.vue";
  import MatchWithYou from "./components/MatchWithYou.vue";
  import AboutUs from "./components/AboutUs.vue";
</script>

<template>
  <div>
    <HeroSection />
    <CurrentActivities />
    <PopularActivities />
    <HoldActivity />
    <MatchWithYou />
    <AboutUs />
  </div>
</template>

<style scoped></style>
