<script lang="ts" setup>
  import { nuxtGoogleLogin } from "@/apis/auth";
  import { useAuthStore } from "@/stores/auth";
  import { useUserStore } from "@/stores/user";

  const authStore = useAuthStore();
  const userStore = useUserStore();
  const route = useRoute();
  const { token, name, email } = route.query;
  const { user, fetch: refreshSession } = useUserSession();
  const handleGoogleLogin = async () => {
    const { error } = await nuxtGoogleLogin({
      token: token as string,
      name: name as string,
      email: email as string
    });
    if (error.value) {
      ElMessage.error(error.value?.data.message);
    }
    if (token) {
      await refreshSession();
      ElMessage.success(`歡迎 ${user.value?.name}`);
      authStore.setToken(token as string);
      setTimeout(async () => {
        await userStore.fetchUserInfo();
      }, 300);
    }
    const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
    localStorage.removeItem("redirectAfterLogin");
    navigateTo(redirectPath);
  };
  onMounted(() => {
    setTimeout(() => {
      handleGoogleLogin();
    }, 300);
  });
</script>
<template>
  <div class="text-center py-20 h-[100dvh]">登入中...</div>
</template>
