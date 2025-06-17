<script setup lang="ts">
  import ElMenuForUser from "@/components/memberCenter/ElMenuForUser.vue";
  import { useUserStore } from "@/stores/user";
  import { Money } from "@element-plus/icons-vue";

  definePageMeta({
    middleware: ["auth"]
  });

  const defaultAvatar = ref(
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
  );
  const userStore = useUserStore();
  await userStore.fetchUserInfo();
  const memberInfo = computed(() => userStore.userInfo);
</script>
<template>
  <div class="container py-10 lg:py-20">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
      <div class="hidden md:block col-span-2">
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
            <div class="flex justify-center items-center">
              <el-icon class="mr-1"><Money /></el-icon>
              <span>{{ memberInfo?.totalPoint }}</span>
            </div>
          </section>
          <ElMenuForUser />
        </div>
      </div>
      <NuxtPage class="col-span-10" />
    </div>
  </div>
</template>
