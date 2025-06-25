<script setup lang="ts">
  import { useLoginDialogStore } from "@/stores/loginDialogStore";

  const loginDialogStore = useLoginDialogStore();
  const { loggedIn } = useUserSession();
  const footerDialogVisible = ref(false);
  const linkTitle = ref("");
  const linkMessage = ref("");
  const linkMessages = ref<Record<string, string>>({
    首次舉辦活動:
      "歡迎使用羽神同行！如果您是第一次舉辦活動，可於會員中心更新個人資料後在舉辦活動中自動帶入資訊。",
    活動上架規範:
      "活動主辦方需確保所提供的活動資訊真實、準確且符合平台規範，平台保留審核及下架不符合規範活動的權利",
    服務條款:
      "本平台僅供羽球愛好者報名活動及相關交流使用，禁止任何形式的非法活動或濫用平台功能。",
    隱私權政策:
      "我們重視您的隱私，所有個人資料僅用於活動報名及平台運營相關用途，未經您的同意，我們不會向第三方披露您的個人資訊。",
    敬請期待: "我們正在努力完善平台，敬請期待更多功能和服務的推出！"
  });
  const handlePushCreateActivity = () => {
    if (!loggedIn.value) {
      loginDialogStore.open();
      return;
    } else {
      navigateTo("/create-activity");
    }
  };
  const handleFooterDialogVisible = (title: string) => {
    linkTitle.value = title;
    linkMessage.value = linkMessages.value[title];
    footerDialogVisible.value = true;
  };
</script>

<template>
  <footer class="bg-primary-accent-50 py-6">
    <div
      class="max-w-screen-xl w-full mx-auto flex flex-col sm:flex-row flex-wrap sm:justify-between items-start gap-y-8 pb-6 px-4"
    >
      <!-- Logo -->
      <div
        class="w-full sm:w-auto flex justify-center sm:justify-start mb-4 sm:mb-0"
      >
        <div class="flex items-center space-x-2">
          <NuxtLink to="/">
            <img
              src="@/assets/images/logo.png"
              alt="logo"
              class="w-[150px] h-[56px]"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- 舉辦活動 -->
      <div
        class="flex flex-col w-full sm:w-auto items-center text-center sm:items-start sm:text-left"
      >
        <h4
          class="mb-4 cursor-pointer"
          @click="handlePushCreateActivity"
        >
          <span class="text-primary-300 text-md font-medium">舉辦活動</span>
        </h4>
        <ul class="flex flex-col space-y-4">
          <li>
            <a
              href="#"
              class="text-secondary-300 text-base"
              @click.prevent="handleFooterDialogVisible('首次舉辦活動')"
            >
              首次舉辦活動
            </a>
          </li>
          <li>
            <a
              href="#"
              class="text-secondary-300 text-base"
              @click.prevent="handleFooterDialogVisible('活動上架規範')"
            >
              活動上架規範
            </a>
          </li>
        </ul>
      </div>

      <!-- 關於我們 -->
      <div
        class="flex flex-col w-full sm:w-auto items-center text-center sm:items-start sm:text-left"
      >
        <h4
          class="mb-4 cursor-pointer"
          @click="$router.push('/about')"
        >
          <span class="text-primary-300 text-md font-medium">關於我們</span>
        </h4>
        <ul class="flex flex-col space-y-4">
          <li>
            <a
              href="#"
              class="text-secondary-300 text-base"
              @click.prevent="handleFooterDialogVisible('服務條款')"
            >
              服務條款
            </a>
          </li>
          <li>
            <a
              href="#"
              class="text-secondary-300 text-base"
              @click.prevent="handleFooterDialogVisible('隱私權政策')"
            >
              隱私權政策
            </a>
          </li>
        </ul>
      </div>

      <!-- 聯絡我們-->
      <div
        class="flex flex-col w-full sm:w-auto items-center text-center sm:items-start sm:text-left"
      >
        <h4 class="mb-4">
          <span class="text-primary-300 text-md font-medium">聯絡我們</span>
        </h4>
        <ul class="flex flex-col space-y-4">
          <li>
            <a
              href="#"
              class="text-secondary-300 text-base"
              @click.prevent="handleFooterDialogVisible('敬請期待')"
            >
              service@spirvita.tw
            </a>
          </li>
        </ul>
        <ClientOnly>
          <div class="flex space-x-4 mt-2">
            <!-- Facebook -->
            <a
              href="#"
              class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-blue-100 transition"
              aria-label="Facebook"
              @click.prevent="handleFooterDialogVisible('敬請期待')"
            >
              <span
                class="iconify text-xl text-gray-500"
                data-icon="mdi:facebook"
              />
            </a>
            <!-- Instagram -->
            <a
              href="#"
              class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-pink-100 transition"
              aria-label="Instagram"
              @click.prevent="handleFooterDialogVisible('敬請期待')"
            >
              <span
                class="iconify text-xl text-gray-500"
                data-icon="mdi:instagram"
              />
            </a>
            <!-- Line -->
            <a
              href="#"
              class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-green-100 transition"
              aria-label="Line"
              @click.prevent="handleFooterDialogVisible('敬請期待')"
            >
              <span
                class="iconify text-xl text-gray-500"
                data-icon="simple-icons:line"
              />
            </a>
          </div>
        </ClientOnly>
      </div>
    </div>

    <!-- 分隔線 -->
    <div class="w-full h-[1px] bg-[#D9D9D9]" />

    <!-- 版權聲明 -->
    <div class="w-full text-center text-secondary-300 text-sm mt-6">
      <p>Copyright © 2025 羽神同行. All rights reserved.</p>
    </div>
    <el-dialog
      v-model="footerDialogVisible"
      :title="linkTitle"
      width="500"
    >
      <p class="py-5 line-clamp-2">{{ linkMessage }}</p>
      <template #footer>
        <div>
          <el-button
            type="primary"
            @click="footerDialogVisible = false"
          >
            確定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </footer>
</template>

<style scoped>
  /* 可加上 hover 效果、動畫等 */
</style>
