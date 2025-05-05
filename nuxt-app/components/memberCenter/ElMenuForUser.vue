<script setup lang="ts">
  import {
    Setting,
    Clock,
    Calendar,
    Money,
    StarFilled
  } from "@element-plus/icons-vue";

  const route = useRoute();
  const router = useRouter();
  const menuItems = [
    { path: "/member-center", label: "帳號設定", icon: Setting },
    {
      path: "/member-center/activities",
      label: "我的活動",
      icon: Clock
    },
    {
      path: "/member-center/organizer-activities",
      label: "活動管理",
      icon: Calendar
    },
    {
      path: "/member-center/favorites",
      label: "活動收藏",
      icon: StarFilled
    },
    {
      path: "/member-center/recodes",
      label: "點數紀錄",
      icon: Money
    }
  ];

  const activeIndex = computed(() => {
    const currentIndex = menuItems.findIndex(
      (item) => item.path === route.path
    );
    return currentIndex !== -1 ? String(currentIndex + 1) : "1";
  });

  const elMenuItemsForUser = menuItems.map((item) => ({
    ...item,
    onClick: () => router.push(item.path)
  }));
</script>
<template>
  <el-menu
    :default-active="activeIndex"
    class="border-none"
    aria-label="會員中心選單"
  >
    <el-menu-item
      v-for="(item, index) in elMenuItemsForUser"
      :key="item.path"
      :index="String(index + 1)"
      @click="item.onClick"
    >
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.label }}</span>
    </el-menu-item>
  </el-menu>
</template>
