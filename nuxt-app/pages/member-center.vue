<script setup lang="ts">
  import ElMenuForUser from "@/components/memberCenter/ElMenuForUser.vue";
  import { useUserStore } from "@/stores/user";

  definePageMeta({
    middleware: ["auth"]
  })

  const defaultAvatar = ref(
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
  );
  const userStore = useUserStore();
  await userStore.fetchUserInfo()
  const memberInfo = computed(() => userStore.userInfo);
</script>
<template>
  <div class="container flex py-10">
    <div class="hidden md:block">
      <div class="flex flex-col items-center">
        <section
          class="mb-3 text-center"
          aria-label="會員資訊"
        >
          <el-avatar
            :size="80"
            :src="memberInfo?.avatar || defaultAvatar"

          />
          <p class="font-bold py-3">{{ memberInfo?.name }}</p>
        </section>
        <ElMenuForUser />
      </div>
    </div>
    <NuxtPage class="flex-1" />
  </div>
</template>
