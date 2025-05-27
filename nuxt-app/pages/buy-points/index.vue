<script setup lang="ts">
  import bgImage from "@/assets/images/current-activities-bg.png";
  import { Money } from "@element-plus/icons-vue";
  import Payment from "@/components/buyPoints/Payment.vue";

  const selectedPoints = ref<number>(0);
  const buyPoints = (points: number) => {
    selectedPoints.value = points;
  };
  const pointsCard = ref([
    {
      points: 100,
      onClick: buyPoints
    },
    {
      points: 300,
      onClick: buyPoints
    },
    {
      points: 500,
      onClick: buyPoints
    },
    {
      points: 1000,
      onClick: buyPoints
    }
  ]);
  const resetPoints = () => {
    selectedPoints.value = 0;
  };
</script>
<template>
  <div class="py-20">
    <div class="flex flex-col items-center mb-10">
      <h2 class="mb-6">
        <span class="text-5xl">羽神買點數</span>
      </h2>
      <el-breadcrumb
        separator="/"
        class="mb-6"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item>購買點數</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div
      v-if="selectedPoints > 0"
      class="container"
    >
      <el-button
        type="info"
        class="mb-6"
        @click="resetPoints"
      >
        返回點數購買
      </el-button>
      <Payment :points="selectedPoints" />
    </div>
    <ul
      v-else
      class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <li
        v-for="card in pointsCard"
        :key="card.points"
        :style="{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom'
        }"
        class="p-6 flex flex-col justify-between items-center mx-auto w-full max-w-[300px] h-[350px] border border-neutral-300 rounded-xl"
      >
        <div>
          <img
            src="@/assets/images/logo.png"
            alt="logo"
            class="w-[150px] h-[56px]"
          />
          <p class="text-lg text-center text-neutral-500">點數卡</p>
        </div>
        <p class="flex items-center">
          <el-icon
            class="mr-2 text-neutral-400"
            size="16"
          >
            <Money />
          </el-icon>
          <span class="text-2xl text-primary-300">{{ card.points }} 點</span>
        </p>
        <el-button
          type="primary"
          class="w-full py-5 text-md border-0"
          round
          @click="card.onClick(card.points)"
        >
          {{ card.points }} NTD
        </el-button>
      </li>
    </ul>
  </div>
</template>
<style scoped></style>
