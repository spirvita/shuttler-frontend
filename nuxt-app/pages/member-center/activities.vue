<script setup lang="ts">
  import type { ActivityDetail } from "@/types/activities";
  import { getUserActivities } from "@/apis/activities";
  import ElTableForUserActivities from "@/components/memberCenter/ElTableForUserActivities.vue";

  const activeName = ref("registered");
  const { data, refresh: refreshUserActivities } = await getUserActivities();
  const userActivities = computed(() => {
    return data.value?.data || [];
  });
  const getActivitiesByStatus = (status: string) => {
    return computed(() =>
      (userActivities.value as ActivityDetail[]).filter(
        (activity: ActivityDetail) => activity.status === status
      )
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
    <h2 class="mb-3">我的活動</h2>
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
