<script setup lang="ts">
const loginDialogVisible = ref(false);
const isSignUp = ref(false);
</script>

<template>
  <header class="h-18 bg-white opacity-75 p-5 nav-shadow">
    <div class="flex text-black gap-5 justify-end items-center">
      <NuxtLink to="/activities">活動列表</NuxtLink>
      <NuxtLink to="/create-activity">舉辦活動</NuxtLink>
      <NuxtLink to="/buy-point">購買點數</NuxtLink>
      <NuxtLink to="/about">關於我們</NuxtLink>
      <ElButton
        type="primary"
        class="text-black rounded-2xl"
        @click="loginDialogVisible = true"
      >
        登入 / 註冊
      </ElButton>
    </div>
  </header>
  <slot />

  <div class="flex justify-center items-center mt-5">
    <el-switch
      v-model="isSignUp"
      size="large"
      active-text="註冊"
      inactive-text="登入"
    />
  </div>

  <LoginSignUpDialog v-model:visible="loginDialogVisible" :is-sign-up="isSignUp" />
</template>

<style scoped lang="scss">
.nav-shadow {
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
}
</style>
