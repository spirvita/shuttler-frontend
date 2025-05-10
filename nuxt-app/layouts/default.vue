<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth';

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
        <NuxtLink v-if="loggedIn" to="/member-center">會員中心</NuxtLink>
        <ElButton
          type="primary"
          class="text-black rounded-2xl"
          @click="authStore.isAuthenticated ? authStore.clearToken() : loginDialogVisible = true"
        >
          {{ authStore.isAuthenticated ? "登出" : "登入 / 註冊" }}
        </ElButton>
      </div>
    </header>
    <slot />

    <LoginSignUpDialog
      v-model:visible="loginDialogVisible"
    />
  </div>
</template>

<style scoped lang="scss">
  .nav-shadow {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }
</style>
