<script setup lang="ts">
  import bgImage from "@/assets/images/popular-activities-bg.png";
</script>

<template>
  <section
    class="bg-cover bg-no-repeat bg-center h-[100dvh]"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="container">
      <div class="flex flex-col items-center justify-center">
        <h2 class="text-neutral-800 mt-[5%] mb-[40px]">熱門活動</h2>
      </div>
    </div>
  </section>
</template>
