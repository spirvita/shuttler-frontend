<script setup lang="ts">
// 如果有需要可以加 props 或 emit，這裡先不寫
</script>

<template>
  <footer class="bg-[#fdfde8] py-6">
    <div class="max-w-screen-xl w-full mx-auto flex flex-col sm:flex-row flex-wrap sm:justify-between items-start gap-y-8 pb-6 px-4">

      <!-- Logo -->
      <div class="w-full sm:w-auto flex justify-center sm:justify-start mb-4 sm:mb-0">
        <div class="flex items-center space-x-2">
          <!-- 圖片 -->
          <img src="./images/logo.png" alt="Shuttler Logo" class="w-10 h-auto">

          <!-- 文字 -->
          <span class="text-[#EB5756] text-2xl font-bold">羽神同行</span>
        </div>
      </div>

      <!-- 舉辦活動 -->
      <div class="flex flex-col w-full sm:w-auto items-center text-center sm:items-start sm:text-left">
        <h4 class="text-[#F98770] text-base font-bold mb-4">舉辦活動</h4>
        <ul class="flex flex-col space-y-4">
          <li><a href="#" class="text-[#767999] text-base">常見問題</a></li>
          <li><a href="#" class="text-[#767999] text-base">首次舉辦活動</a></li>
          <li><a href="#" class="text-[#767999] text-base">活動上架規範</a></li>
        </ul>
      </div>

      <!-- 關於我們 -->
      <div class="flex flex-col w-full sm:w-auto items-center text-center sm:items-start sm:text-left">
        <h4 class="text-[#F98770] text-base font-bold mb-4">關於我們</h4>
        <ul class="flex flex-col space-y-4">
          <li><a href="#" class="text-[#767999] text-base">服務條款</a></li>
          <li><a href="#" class="text-[#767999] text-base">隱私權政策</a></li>
        </ul>
      </div>

      <!-- 聯絡我們-->
      <div class="flex flex-col w-full sm:w-auto items-center text-center sm:items-start sm:text-left">
        <h4 class="text-[#F98770] text-base font-bold mb-4">聯絡我們</h4>
        <ul class="flex flex-col space-y-4">
          <li><a href="#" class="text-[#767999] text-base">service@shuttler.tw</a></li>
        </ul>
        <div class="flex space-x-4 mt-2">
          <!-- Facebook -->
          <a href="#" class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-blue-100 transition" aria-label="Facebook">
            <span class="iconify text-xl text-gray-500" data-icon="mdi:facebook"></span>
          </a>
          <!-- Instagram -->
          <a href="#" class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-pink-100 transition" aria-label="Instagram">
            <span class="iconify text-xl text-gray-500" data-icon="mdi:instagram"></span>
          </a>
          <!-- Line -->
          <a href="#" class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-green-100 transition" aria-label="Line">
            <span class="iconify text-xl text-gray-500" data-icon="simple-icons:line"></span>
          </a>
        </div>

      </div>

    </div>

    <!-- 分隔線 -->
    <div class="w-full h-[1px] bg-[#D9D9D9] mx-auto"></div>

    <!-- 版權聲明 -->
    <div class="w-full text-center text-[#767999] text-sm mt-6">
      <p>Copyright © 2025 羽神同行. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
/* 可加上 hover 效果、動畫等 */
</style>