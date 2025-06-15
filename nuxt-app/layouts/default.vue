<script setup lang="ts">
  import { useAuthStore } from "~/stores/auth";
  import Footer from "~/components/Footer.vue";
  import { Menu, Close, SwitchButton, Setting,
    Clock,
    Calendar,
    Money,
    StarFilled } from "@element-plus/icons-vue";

  const loginDialogVisible = ref(false);
  const authStore = useAuthStore();
  const { loggedIn } = useUserSession();
  const mobileMenuDialogVisible = ref(false);
  const loginOrLogout = () => {
    authStore.isAuthenticated ? authStore.clearToken() : (loginDialogVisible.value = true);
    mobileMenuDialogVisible.value = false;
  }
  const menuItems = [
    { path: "/member-center", label: "帳號設定", icon: Setting },
    {
      path: "/member-center/activities",
      label: "我的活動",
      icon: Clock
    },
    {
      path: "/member-center/organizer-activities",
      label: "活動管理",
      icon: Calendar
    },
    {
      path: "/member-center/favorites",
      label: "活動收藏",
      icon: StarFilled
    },
    {
      path: "/member-center/records",
      label: "點數紀錄",
      icon: Money
    }
  ];
</script>

<template>
  <div>
    <header class="h-18 w-full fixed top-0 left-0 z-50 nav-shadow">
      <div class="container h-full flex items-center justify-between">
        <NuxtLink to="/">
          <img
            src="@/assets/images/logo.png"
            alt="logo"
            class="w-[150px] h-[56px]"
          />
        </NuxtLink>
        <div class="hidden lg:flex lg:justify-end lg:items-center text-black gap-5">
          <NuxtLink to="/activities" class="link-hover">活動列表</NuxtLink>
          <NuxtLink to="/create-activity" class="link-hover">舉辦活動</NuxtLink>
          <NuxtLink to="/buy-points" class="link-hover">購買點數</NuxtLink>
          <NuxtLink to="/about" class="link-hover">關於我們</NuxtLink>
          <NuxtLink
            v-if="loggedIn"
            to="/member-center"
            class="link-hover"
          >
            會員中心
          </NuxtLink>
          <ElButton
            type="primary"
            class="rounded-2xl"
            @click="loginOrLogout"
          >
            {{ authStore.isAuthenticated ? "登出" : "登入 / 註冊" }}
          </ElButton>
        </div>
        <ElButton
          size="large"
          class="lg:hidden text-black hover:text-primary-300 border-0 bg-white"
          @click="mobileMenuDialogVisible = true"
        >
          <el-icon size="24"><Menu /></el-icon>
        </ElButton>
      </div>
    </header>
    <div class="pt-[72px]">
      <slot />
    </div>

    <Footer />

    <LoginSignUpDialog v-model:visible="loginDialogVisible" />
    <el-dialog
      v-model="mobileMenuDialogVisible"
      class="p-3"
      :fullscreen="true"
      :z-index="1000"
      :show-close="false"
    >
      <template #header>
        <div class="flex justify-between items-center border-b border-neutral-300">
          <img src="@/assets/images/logo.png" alt="羽神同行">
          <el-button
            size="large"
            class="border-0 bg-white"
            @click="mobileMenuDialogVisible = false"
          >
            <el-icon size="24"><Close /></el-icon>
          </el-button>
        </div>
      </template>
      <div class="flex flex-col items-center gap-6 px-4 pt-5 pb-10 border-b-3 border-neutral-300">
        <NuxtLink
          to="/activities"
          class="text-lg text-center link-hover w-full"
          @click="mobileMenuDialogVisible = false"
        >
          <span class="pb-2 border-b border-neutral-300">活動列表</span>
        </NuxtLink>
        <NuxtLink
          to="/create-activity"
          class="text-lg text-center link-hover w-full"
          @click="mobileMenuDialogVisible = false"
        >
          <span class="pb-2 border-b border-neutral-300">舉辦活動</span>
        </NuxtLink>
        <NuxtLink
          to="/buy-points"
          class="text-lg text-center link-hover w-full"
          @click="mobileMenuDialogVisible = false"
        >
          <span class="pb-2 border-b border-neutral-300">購買點數</span>
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="text-lg text-center link-hover w-full"
          @click="mobileMenuDialogVisible = false"
        >
          <span class="pb-2 border-b border-neutral-300">關於我們</span>
        </NuxtLink>
        <NuxtLink
          v-if="loggedIn"
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="text-lg text-center link-hover w-full"
          @click="mobileMenuDialogVisible = false"
        >
          <span class="pb-2 border-b border-neutral-300">{{ item.label }}</span>
        </NuxtLink>
      </div>
      <template #footer>
        <ElButton
          size="large"
          class="flex items-center text-lg w-full border-0 bg-white"
          @click="loginOrLogout"
        >
          <el-icon class="mr-2"><SwitchButton /></el-icon>
          {{ authStore.isAuthenticated ? "登出" : "登入 / 註冊" }}
        </ElButton>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
  .link-hover {
    color: var(--el-color-neutral-900);
    transition: color 0.3s ease;
    &:hover {
      color: var(--color-primary-300);
    }
  }
  .nav-shadow {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.75);
  }

  :deep(.el-button--primary) {
    --el-button-text-color: var(--el-color-neutral-900);
    --el-button-bg-color: var(--color-primary-accent-500);
    --el-button-border-color: var(--color-primary-accent-500);
    --el-button-hover-text-color: var(--el-color-white);
    --el-button-hover-link-text-color: var(--el-color-primary-light-5);
    --el-button-hover-bg-color: var(--color-primary-400);
    --el-button-hover-border-color: var(--color-primary-400);
    --el-button-active-text-color: var(--el-color-black);
    --el-button-active-bg-color: var(--color-primary-accent-500);
    --el-button-active-border-color: var(--color-primary-accent-500);
    --el-button-disabled-text-color: var(--el-color-black);
    --el-button-disabled-bg-color: var(--el-color-primary-light-5);
    --el-button-disabled-border-color: var(--el-color-primary-light-5);
  }

  :deep(.el-tabs__item) {
    &.is-active {
      color: var(--el-color-black);
      font-weight: 700;
    }
  }

  :deep(.el-menu-item) {
    &.is-active {
      color: var(--el-color-black);
      font-weight: 700;
    }
  }
</style>
