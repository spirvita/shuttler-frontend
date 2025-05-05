<script setup lang="ts">
  import ElMenuForUser from "~/components/memberCenter/ElMenuForUser.vue";
  import { Money } from "@element-plus/icons-vue";

  const defaultAvator = ref(
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
  );
  const memberInfo = ref({
    name: "Vic",
    avator: "",
    points: 4000
  });
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
            :src="memberInfo.avator || defaultAvator"
          />
          <p class="font-bold py-3">{{ memberInfo.name }}</p>
          <p class="flex justify-center items-center">
            <span class="pr-1">
              {{ memberInfo.points }}
            </span>
            <el-icon><Money /></el-icon>
          </p>
        </section>
        <ElMenuForUser />
      </div>
    </div>
    <NuxtPage class="flex-1" />
  </div>
</template>
