<script setup lang="ts">
  const activeName = ref("first");
  const circleUrl = ref("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png");
  const userInfo = ref({
    name: "王曉明",
    signUpDate: "2025-04-26",
    skillLevel: "新手",
    points: 1250,
  })
</script>
<template>
  <div>
    <section class="container mx-auto flex items-center my-10">
      <el-avatar :size="80" :src="circleUrl" class="mr-5" />
      <div class="mr-10">
        <p class="font-bold">{{ userInfo.name }}</p>
        <p>{{ userInfo.signUpDate }}</p>
      </div>
      <div class="flex flex-col text-center text-white border border-gray-100">
        <span class="bg-green-500 py-1 px-2">羽球程度</span>
        <span class="text-green-500 py-1 px-2">{{ userInfo.skillLevel }}</span>
      </div>
      <div class="flex flex-col text-center text-white border border-gray-100 mx-3">
        <span class="bg-red-500 py-1 px-2">帳戶點數</span>
        <span class="text-red-500 py-1 px-2">{{ userInfo.points }}</span>
      </div>
      <div class="flex flex-col text-center text-white border border-gray-100">
        <span class="bg-sky-500 py-1 px-2">參與次數</span>
        <span class="text-sky-500 py-1 px-2">12</span>
      </div>
    </section>
    <section>

    </section>
    <section class="container mx-auto">
      <el-tabs v-model="activeName" >
        <el-tab-pane label="會員資料" name="first">會員資料</el-tab-pane>
        <el-tab-pane label="修改密碼" name="second">修改密碼</el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>
<style scoped></style>
