<script setup lang="ts">
  import { useAuthStore } from "~/stores/auth";
  import Footer from "~/components/Footer.vue";

  const loginDialogVisible = ref(false);
  const authStore = useAuthStore();
  const { loggedIn } = useUserSession();
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
        <div class="flex text-black gap-5 justify-end items-center">
          <NuxtLink to="/activities">活動列表</NuxtLink>
          <NuxtLink to="/create-activity">舉辦活動</NuxtLink>
          <NuxtLink to="/buy-points">購買點數</NuxtLink>
          <NuxtLink to="/about">關於我們</NuxtLink>
          <NuxtLink
            v-if="loggedIn"
            to="/member-center"
          >
            會員中心
          </NuxtLink>
          <ElButton
            type="primary"
            class="rounded-2xl"
            @click="
              authStore.isAuthenticated
                ? authStore.clearToken()
                : (loginDialogVisible = true)
            "
          >
            {{ authStore.isAuthenticated ? "登出" : "登入 / 註冊" }}
          </ElButton>
        </div>
      </div>
    </header>
    <div class="pt-[72px]">
      <slot />
    </div>

    <Footer />

    <LoginSignUpDialog v-model:visible="loginDialogVisible" />
  </div>
</template>

<style scoped lang="scss">
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
