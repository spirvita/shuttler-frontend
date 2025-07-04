<script setup lang="ts">
  import { getUserActivities } from "@/apis/activities";
  import ElTableForUserActivities from "@/components/memberCenter/ElTableForUserActivities.vue";

  const activeName = ref("registered");
  const { data, refresh: refreshUserActivities } = await getUserActivities();
  const searchQuery = ref("");
  const userActivities = computed(() => {
    const filterData = (data.value?.data ?? []).filter((item) => {
      return (
        item.name.includes(searchQuery.value) ||
        item.venueName.includes(searchQuery.value) ||
        item.contactName.includes(searchQuery.value)
      );
    });
    return filterData.length > 0 ? filterData : [];
  });
  const getActivitiesByStatus = (status: string) => {
    return computed(() =>
      userActivities.value.filter((activity) => activity.status === status)
    );
  };
  const registeredList = getActivitiesByStatus("registered");
  const endedList = getActivitiesByStatus("ended");
  const suspendedList = getActivitiesByStatus("suspended");
  const cancelledList = getActivitiesByStatus("cancelled");

  const reloadData = () => {
    refreshUserActivities();
  };
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-3">
      <h2>我的活動</h2>
      <el-input
        v-model="searchQuery"
        placeholder="搜尋活動/場館/聯絡人"
        size="large"
        class="w-1/2 md:w-1/4"
        clearable
      />
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="`已報名 (${registeredList.length})`"
        name="registered"
      >
        <ElTableForUserActivities
          :data="registeredList"
          @reload-data="reloadData"
        />
      </el-tab-pane>
      <el-tab-pane
        :label="`已結束 (${endedList.length})`"
        name="ended"
      >
        <ElTableForUserActivities :data="endedList" />
      </el-tab-pane>
      <el-tab-pane
        :label="`已停辦 (${suspendedList.length})`"
        name="suspended"
      >
        <ElTableForUserActivities :data="suspendedList" />
      </el-tab-pane>
      <el-tab-pane
        :label="`已取消報名 (${cancelledList.length})`"
        name="cancelled"
      >
        <ElTableForUserActivities :data="cancelledList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
