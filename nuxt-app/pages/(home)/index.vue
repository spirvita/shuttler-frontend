<script setup lang="ts">
  import HeroSection from "./components/HeroSection.vue";
  import CurrentActivities from "./components/CurrentActivities.vue";
  import PopularActivities from "./components/PopularActivities.vue";
  import HoldActivity from "./components/HoldActivity.vue";
  import MatchWithYou from "./components/MatchWithYou.vue";
  import AboutUs from "./components/AboutUs.vue";
  useHead({
    title: "羽神同行",
    meta: [
      {
        name: "description",
        content:
          "羽神同行是台灣領先的羽球活動票務與管理平台，為羽球賽事主辦方和球友提供流暢的報名與購票體驗。"
      },
      { property: "og:title", content: "羽神同行" },
      {
        property: "og:description",
        content:
          "羽神同行是台灣領先的羽球活動票務與管理平台，為羽球賽事主辦方和球友提供流暢的報名與購票體驗。"
      },
      { property: "og:image", content: "/logo.png" },
      { property: "og:image:alt", content: "羽神同行首頁橫幅圖片" },
      { property: "og:url", content: "https://www.spirvita.tw" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "羽神同行" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "羽神同行" },
      {
        name: "twitter:description",
        content:
          "羽神同行是台灣領先的羽球活動票務與管理平台，為羽球賽事主辦方和球友提供流暢的報名與購票體驗。"
      },
      { name: "twitter:image", content: "/logo.png" }
    ],
    link: [{ rel: "canonical", href: "https://www.spirvita.tw" }]
  });
  useSeoMeta({
    title: "羽神同行",
    description:
      "羽神同行是台灣領先的羽球活動票務與管理平台，為羽球賽事主辦方和球友提供流暢的報名與購票體驗。",
    ogTitle: "羽神同行",
    ogDescription:
      "羽神同行是台灣領先的羽球活動票務與管理平台，為羽球賽事主辦方和球友提供流暢的報名與購票體驗。",
    ogImage: "/logo.png",
    ogImageAlt: "羽神同行首頁橫幅圖片",
    ogUrl: "https://www.spirvita.tw",
    ogType: "website",
    ogSiteName: "羽神同行",
    twitterCard: "summary_large_image",
    twitterTitle: "羽神同行",
    twitterDescription:
      "羽神同行是台灣領先的羽球活動票務與管理平台，為羽球賽事主辦方和球友提供流暢的報名與購票體驗。",
    twitterImage: "/logo.png"
  });
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
