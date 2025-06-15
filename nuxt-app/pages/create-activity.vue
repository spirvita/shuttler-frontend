<script setup lang="ts">
  import ActivityForm from "~/components/activity/ActivityForm.vue";

  const { loggedIn } = useUserSession();
  if (!loggedIn.value) {
    ElMessage.error("請先登入");
    navigateTo("/");
  }
</script>
<template>
  <div class="py-20">
    <div class="flex flex-col items-center mb-10">
      <h2 class="mb-6">
        <span class="text-5xl">羽神辦活動</span>
      </h2>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item>舉辦活動</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container flex justify-center">
      <ActivityForm />
    </div>
  </div>
</template>
<style scoped></style>
