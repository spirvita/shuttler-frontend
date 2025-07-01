<script setup lang="ts">
  import type { ActivityDetail } from "@/types/activities";
  import ElTableForOrganizer from "@/components/memberCenter/ElTableForOrganizer.vue";
  import { getOrganizerActivities } from "@/apis/activities";

  const activeName = ref("published");
  const { data, refresh: refreshOrganizerActivities } =
    await getOrganizerActivities();
  const organizerActivities = computed(() => {
    const filterData = (data.value?.data ?? []).filter((item) => {
      return (
        item.name.includes(searchQuery.value) ||
        item.venueName.includes(searchQuery.value) ||
        item.contactName.includes(searchQuery.value)
      );
    });
    return filterData.length > 0 ? filterData : [];
  });
  const searchQuery = ref("");
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
    <div class="flex justify-between items-center mb-3">
      <h2>活動管理</h2>
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
