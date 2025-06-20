<script setup lang="ts">
  import type { ActivityDetail } from "@/types/activities";
  import ElTableForOrganizer from "@/components/memberCenter/ElTableForOrganizer.vue";
  import { getOrganizerActivities } from "@/apis/activities";

  const activeName = ref("published");
  const { data, refresh: refreshOrganizerActivities } =
    await getOrganizerActivities();
  const organizerActivities = computed(() => {
    return data.value?.data || [];
  });
  const getActivitiesByStatus = (status: string) => {
    return computed(() =>
      (organizerActivities.value as ActivityDetail[]).filter(
        (activity: ActivityDetail) => activity.status === status
      )
    );
  };
  const publishedList = getActivitiesByStatus("published");
  const endedList = getActivitiesByStatus("ended");
  const draftList = getActivitiesByStatus("draft");
  const suspendList = getActivitiesByStatus("suspended");
  const reloadData = () => {
    refreshOrganizerActivities();
  };
</script>
<template>
  <div>
    <h2 class="mb-3">活動管理</h2>
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="`已發佈 (${publishedList.length})`"
        name="published"
      >
        <ElTableForOrganizer
          :data="publishedList"
          @reload-data="reloadData"
        />
      </el-tab-pane>
      <el-tab-pane
        :label="`已結束 (${endedList.length})`"
        name="ended"
      >
        <ElTableForOrganizer
          :data="endedList"
          @reload-data="reloadData"
        />
      </el-tab-pane>
      <el-tab-pane
        :label="`已停辦 (${suspendList.length})`"
        name="suspended"
      >
        <ElTableForOrganizer
          :data="suspendList"
          @reload-data="reloadData"
        />
      </el-tab-pane>
      <el-tab-pane
        :label="`草稿 (${draftList.length})`"
        name="draft"
      >
        <ElTableForOrganizer
          :data="draftList"
          @reload-data="reloadData"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped></style>
