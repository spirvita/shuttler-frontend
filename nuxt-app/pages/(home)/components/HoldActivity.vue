<script lang="ts" setup>
  import HoldActivity1 from "@/assets/images/hold-activity-1.png";
  import HoldActivity2 from "@/assets/images/hold-activity-2.png";
  import HoldActivity3 from "@/assets/images/hold-activity-3.png";

  const { loggedIn } = useUserSession();
  const holdActivities = [
    {
      image: HoldActivity1,
      title: "註冊會員",
      description: "免費註冊成為羽神"
    },
    {
      image: HoldActivity2,
      title: "舉辦活動",
      description: "編輯活動資料 / 選擇活動發佈"
    },
    {
      image: HoldActivity3,
      title: "活動管理",
      description: "讓您輕鬆掌握活動狀態"
    }
  ];
  const pushToCreateActivity = () => {
    if (!loggedIn.value) {
      ElMessage.error("請先登入");
      return;
    }
    navigateTo("/create-activity");
  }
</script>

<template>
  <section class="container py-10 lg:py-20">
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-neutral-800 mb-[40px]">舉辦活動</h2>
      <div class="text-md mb-2">
        「告別繁瑣的活動籌備！我們提供一站式解決方案，讓您輕鬆舉辦精彩活動。
      </div>
      <div class="text-md">舉辦活動超簡單！三步驟輕鬆搞定：</div>

      <ul
        class="flex flex-col lg:flex-row justify-center items-center bg-primary-accent-50 rounded-[40px] px-[22.5px] lg:px-[55px] py-10 my-10"
      >
        <li
          v-for="(holdActivity, index) in holdActivities"
          :key="holdActivity.title"
          class="flex flex-col lg:flex-row justify-center items-center"
        >
          <div class="flex flex-col items-center">
            <img
              :src="holdActivity.image"
              :alt="holdActivity.title"
              class="w-[306px] h-[220px] object-contain"
            />
            <h3 class="mb-4">
              <span class="text-2xl font-bold text-red-300">
                {{ holdActivity.title }}
              </span>
            </h3>
            <p class="text-md">{{ holdActivity.description }}</p>
          </div>
          <img
            src="@/assets/images/arrow-right-bold.svg"
            alt="arrow"
            class="transform rotate-90 lg:rotate-0 w-[86px] h-[86px] object-contain m-6"
            :class="index === holdActivities.length - 1 ? 'hidden' : ''"
          />
        </li>
      </ul>

      <div class="flex justify-center">
        <NuxtLink to="/create-activity">
          <ElButton
            type="primary"
            size="large"
            round
            @click="pushToCreateActivity"
          >
            立刻體驗
          </ElButton>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
