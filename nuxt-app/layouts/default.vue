<script setup lang="ts">
  import { useAuthStore } from "~/stores/auth";

  const loginDialogVisible = ref(false);
  const authStore = useAuthStore();
  const { loggedIn } = useUserSession();
</script>

<template>
  <div>
    <header class="h-18 bg-white opacity-75 p-5 nav-shadow">
      <div class="flex text-black gap-5 justify-end items-center">
        <NuxtLink to="/activities">活動列表</NuxtLink>
        <NuxtLink to="/create-activity">舉辦活動</NuxtLink>
        <NuxtLink to="/buy-point">購買點數</NuxtLink>
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
    </header>
    <slot />

    <LoginSignUpDialog v-model:visible="loginDialogVisible" />
  </div>
</template>

<style scoped lang="scss">
  .nav-shadow {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  :deep(.el-button--primary) {
    --el-button-text-color: var(--el-color-black);
    --el-button-hover-text-color: var(--el-color-white);
    --el-button-hover-link-text-color: var(--el-color-primary-light-5);
    --el-button-hover-bg-color: var(--color-primary-accent);
    --el-button-hover-border-color: var(--color-primary-accent);
    --el-button-active-text-color: var(--el-color-black);
    --el-button-active-bg-color: var(--color-primary-dark);
    --el-button-active-border-color: var(--color-primary-dark);
    --el-button-disabled-text-color: var(--el-color-black);
    --el-button-disabled-bg-color: var(--el-color-primary-light-5);
    --el-button-disabled-border-color: var(--el-color-primary-light-5);
  }

  :deep(.el-tabs__item) {
    &:hover {
      color: var(--color-primary-accent);
    }
    &.is-active {
      color: var(--el-color-black);
      font-weight: 700;
    }
  }

  :deep(.el-tabs__active-bar) {
    background-color: var(--color-primary-accent);
  }

  :deep(.el-menu-item) {
    &:hover {
      color: var(--color-primary-accent);
    }
    &.is-active {
      color: var(--el-color-black);
      font-weight: 700;
    }
  }
</style>
