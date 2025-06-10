

<template>
  <section
    class="max-h-[100dvh] py-10"
  >
    <div class="container">
      <div class="flex flex-col items-center justify-center">
        <h2 class="text-neutral-800 mb-[40px]">舉辦活動</h2>
        <div class="text-md mb-2">
          「告別繁瑣的活動籌備！我們提供一站式解決方案，讓您輕鬆舉辦精彩活動。
        </div>
        <div class="text-md">
          舉辦活動超簡單！三步驟輕鬆搞定：
        </div>

        <div class="w-full flex justify-center items-center bg-[#FFFDF2] rounded-[40px] p-10 my-10">
          <div class="flex flex-1 flex-col items-center justify-center">
            <img src="@/assets/images/hold-activity-1.png" alt="hold-activity-1" height="220" width="306"/>
            <div class="text-md text-red-300">註冊會員</div>
            <div class="text-sm">免費註冊成為羽神</div>
          </div>
          <div>
            <img src="@/assets/images/arrow-right-bold.svg" alt="arrow" />
          </div>
          <div class="flex flex-1 flex-col items-center justify-center">
            <img src="@/assets/images/hold-activity-2.png" alt="hold-activity-2" height="220" width="306"/>
            <div class="text-md text-red-300">舉辦活動</div>
            <div class="text-sm">編輯活動資料 / 選擇活動發佈</div>
          </div>
          <div>
            <img src="@/assets/images/arrow-right-bold.svg" alt="arrow" />
          </div>
          <div class="flex flex-1 flex-col items-center justify-center">
            <img src="@/assets/images/hold-activity-3.png" alt="hold-activity-3" height="220" width="306"/>
            <div class="text-md text-red-300">活動管理</div>
            <div class="text-sm">讓您輕鬆掌握活動狀態</div>
          </div>
        </div>

        <div class="flex justify-center">
        <NuxtLink to="/create-activity">
          <ElButton
            type="primary"
            class="rounded-2xl"
          >
            立刻體驗
          </ElButton>
        </NuxtLink>
      </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const bgImage = ref("https://images.unsplash.com/photo-1659081463572-4c5903a309e6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
</script>