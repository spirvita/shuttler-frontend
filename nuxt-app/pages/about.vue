<script setup lang="ts">
  import HonestReviewImage from "@/assets/images/about-1.png";
  import GroupPlayImage from "@/assets/images/about-2.png";
  import PlatformIntegrationImage from "@/assets/images/about-3.png";
  import LogoBall from "@/assets/images/logo-ball.png";
  import AboutBanner from "@/assets/images/about-banner.png";

  useHead({
    title: "關於我們 - 羽神同行",
    meta: [
      {
        name: "description",
        content:
          "了解羽神同行的起源、使命和團隊，探索我們如何讓羽球活動更輕鬆、更有趣！"
      },
      { property: "og:title", content: "關於我們 - 羽神同行" },
      {
        property: "og:description",
        content:
          "了解羽神同行的起源、使命和團隊，探索我們如何讓羽球活動更輕鬆、更有趣！"
      },
      { property: "og:image", content: "/logo.png" },
      { property: "og:image:alt", content: "羽神同行關於我們圖片" },
      { property: "og:url", content: "https://www.spirvita.tw/about" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "羽神同行" }
    ]
  });
  useSeoMeta({
    title: "關於我們 - 羽神同行",
    description:
      "了解羽神同行的起源、使命和團隊，探索我們如何讓羽球活動更輕鬆、更有趣！",
    ogTitle: "關於我們 - 羽神同行",
    ogDescription:
      "了解羽神同行的起源、使命和團隊，探索我們如何讓羽球活動更輕鬆、更有趣！",
    ogImage: "/logo.png",
    ogImageAlt: "羽神同行關於我們圖片",
    ogUrl: "https://www.spirvita.tw/about",
    ogType: "website",
    ogSiteName: "羽神同行"
  });

  const aboutMissions = [
    {
      title: "誠實評價",
      description:
        "我們了解口耳相傳的重要性，鼓勵所有羽人們留下最真實的感受，提供更多資訊給其他羽友們，也協助我們打造更多適合大家喜歡平台。",
      image: HonestReviewImage
    },
    {
      title: "揪團打球",
      description:
        "依球友等級分類，確保實力相近，提升對戰樂趣與公平性，讓揪團打球變得更有趣、比賽更精彩。",
      image: GroupPlayImage
    },
    {
      title: "平台整合",
      description:
        "主辦人可以在同一個平台上，管理活動報名的情況，且可統一透過平台點數機制，省去和羽友收費的問題。",
      image: PlatformIntegrationImage
    }
  ];
  const ourMembers = [
    {
      name: "Vic",
      role: "前端工程師",
      image: LogoBall
    },
    {
      name: "Paul",
      role: "後端工程師",
      image: LogoBall
    },
    {
      name: "Jun",
      role: "後端工程師",
      image: LogoBall
    },
    {
      name: "不好說",
      role: "全端工程師",
      image: LogoBall
    },
    {
      name: "Zoe",
      role: "全端工程師",
      image: LogoBall
    },
    {
      name: "Limitsea",
      role: "全端工程師",
      image: LogoBall
    }
  ];
</script>
<template>
  <div>
    <img
      :src="AboutBanner"
      alt="About Banner"
      class="w-full h-[98px] md:h-[250px] lg:h-[500px] object-cover bg-primary-accent-300 lg:-mt-20"
    />
    <section class="container text-center py-10 lg:py-20">
      <h2 class="text-5xl mb-2 lg:mb-6">羽神源起</h2>
      <p class="text-xl text-secondary-300 mb-6 lg:mb-10">
        Play．Connect．Enjoy
      </p>
      <p class="text-md">
        最初，我們只是一群熱愛羽球的朋友，享受每一次揮拍的瞬間和痛快揮灑汗水，但發現每次想約人打一場球，卻總是面臨相同的困擾，場地難訂，球友難約，揪團收費等問題。
      </p>
      <p class="my-4 lg:my-6">
        有時，好不容易訂到場地，卻苦於找不到合適的球友；有時，想提升球技，卻缺乏穩定的練習夥伴，這些問題不斷困擾著我們，也讓我們開始思考，要如何讓愛打羽球的朋友更輕鬆地找到場地、結識球友，一起享受打羽球的樂趣？
      </p>
      <p>於是，「羽神同行」誕生了。</p>
    </section>
    <section class="py-10 lg:py-20 bg-primary-accent-50">
      <div class="container">
        <h2 class="text-5xl text-center mb-6">羽神使命</h2>
        <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <li
            v-for="mission in aboutMissions"
            :key="mission.title"
            class="text-center flex flex-col items-center"
          >
            <img
              :src="mission.image"
              :alt="mission.title"
              class="mb-6 w-[356px] h-[260px] object-contain"
            />
            <h3 class="mb-4 font-bold">
              <span class="text-2xl text-primary-300">{{ mission.title }}</span>
            </h3>
            <p class="text-md">
              {{ mission.description }}
            </p>
          </li>
        </ul>
      </div>
    </section>
    <section class="container py-10 lg:py-20">
      <div class="text-center mb-6 lg:mb-20">
        <h2 class="text-5xl mb-2 lg:mb-6">羽神團隊</h2>
        <p class="text-xl text-secondary-300 mb-10">Our members!</p>
      </div>
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li
          v-for="(member, index) in ourMembers"
          :key="member.name"
          class="flex flex-col items-center py-10 rounded-2xl"
          :class="index % 2 !== 0 ? 'bg-primary-accent-50' : 'bg-secondary-50'"
        >
          <img
            :src="member.image"
            :alt="member.name"
            class="mb-6"
          />
          <p class="text-2xl font-bold mb-2">{{ member.name }}</p>
          <span class="text-md text-neutral-800">{{ member.role }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
