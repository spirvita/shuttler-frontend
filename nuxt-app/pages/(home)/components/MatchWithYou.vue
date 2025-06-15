<script lang="ts" setup>
  import MatchWithYouBg from "@/assets/images/match-with-you-bg.png";

  const organizers = [
    {
      name: "Smash King 羽球俱樂部",
      description:
        "「專業級訓練與友善球友並存，無論新手或進階球友都能找到適合的對手！」",
      image:
        "https://images.unsplash.com/photo-1729166241032-5b339506a0d7?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "新北羽球館",
      description: "「不用再手動整理報名資料，直接在線上管理，省時又方便！」",
      image:
        "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2883&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Power 羽球社",
      description: "「固定開團，適合各種程度的球友，讓你盡情享受羽球樂趣！」",
      image:
        "https://images.unsplash.com/photo-1564769353575-73f33a36d84f?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Swift 羽球學院",
      description:
        "「專業教練指導，新手快速入門，進階選手也能提升技巧，讓你越打越上手！」",
      image:
        "https://images.unsplash.com/photo-1659081463572-4c5903a309e6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];
</script>
<template>
  <section
    class="bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${MatchWithYouBg})` }"
  >
    <div class="container py-10 lg:py-20">
      <h2 class="text-center mb-10">羽你相遇</h2>
      <ul class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-y-10 lg:gap-x-6">
        <li
          v-for="organizer in organizers"
          :key="organizer.name"
          class="bg-neutral-50 rounded-2xl p-6"
        >
          <div class="flex items-center">
            <img
              :src="organizer.image"
              :alt="organizer.name"
              class="w-15 h-15 lg:w-30 lg:h-30 object-cover rounded-full mr-4 lg:mr-10"
            />
            <div>
              <h3 class="text-neutral-800 mb-2 lg:mb-4">
                <span class="text-lg font-bold">{{ organizer.name }}</span>
              </h3>
              <p class="text-md text-gray-800">{{ organizer.description }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
