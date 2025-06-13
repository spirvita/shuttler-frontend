<script lang="ts" setup>
  import AboutUs from "@/assets/images/aboutUs.png";

</script>
<template>
  <section class="bg-danger-300 py-10 lg:py-0">
    <div class="container flex flex-col-reverse lg:flex-row items-center">
      <img :src="AboutUs" alt="關於我們" class="w-full lg:w-1/2 mr-6">
      <div class="w-full lg:w-1/2">
        <h2 class="mb-6 lg:mb-10">
          <span class="text-neutral-900">關於我們</span>
        </h2>
        <p class="mb-6 lg:mb-10 text-md text-neutral-900">羽神同行成立於2025年，是台灣領先的羽球活動票務與管理平台。我們專注於為羽球賽事主辦方和球友打造流暢的報名與購票體驗。無論是大型賽事、友誼對抗賽，還是羽球訓練營，我們都提供全方位的支持，讓每場比賽順利進行，讓更多羽球愛好者輕鬆參與。</p>
        <div class="flex mb-6 lg:mb-0">
          <el-button type="primary" class="ml-auto text-md bg-primary-accent-300 hover:text-primary-300" size="large" round @click="$router.push('/about')">瞭解更多</el-button>
        </div>
      </div>
    </div>
  </section>
</template>
