<script lang="ts" setup>
  import type { ActivityDetail } from "@/types/activities";
  import { WarnTriangleFilled, TopRight } from "@element-plus/icons-vue";
  import { cancelActivity } from "@/apis/activity";
  import type { TableColumn } from "@/types/elTable";
  import { useUserStore } from "@/stores/user";

  const props = defineProps<{
    data: ActivityDetail[];
  }>();
  const emits = defineEmits(["reloadData"]);
  const userStore = useUserStore();

  const activity = ref<ActivityDetail>();
  const cancelRegistrationDialogVisible = ref(false);
  const cancellationLimitHours = ref(2);
  const displayedColumns = ref<TableColumn[]>([
    { prop: "name", label: "活動名稱", width: "120" },
    { prop: "date", label: "日期", width: "100", sortable: true },
    { prop: "startTime", label: "時間(起)", width: "80" },
    { prop: "endTime", label: "時間(訖)", width: "80" },
    { prop: "venueName", label: "場館名稱" },
    { prop: "contactName", label: "聯絡人", width: "100" },
    { prop: "level", label: "活動程度", width: "200" }
  ]);
  const isCancelable = computed(() => {
    if (!activity.value?.activityId) return false;
    const activityDateTime = new Date(
      `${activity.value.date}T${activity.value.startTime}`
    );
    const hoursBefore = new Date(
      activityDateTime.getTime() - cancellationLimitHours.value * 60 * 60 * 1000
    );
    return new Date() < hoursBefore;
  });
  const handleCancelDialog = (newActivity: ActivityDetail) => {
    activity.value = newActivity;
    if (!isCancelable.value) {
      ElMessage.error(
        `活動開始前 ${cancellationLimitHours.value} 小時內無法取消報名`
      );
      cancelRegistrationDialogVisible.value = false;
      return;
    }
    cancelRegistrationDialogVisible.value = true;
  };
  const handleCancelActivity = async () => {
    if (!activity.value?.activityId) return;
    const { error } = await cancelActivity(activity.value.activityId);
    if (!error.value) {
      ElMessage.success("取消報名成功");
      cancelRegistrationDialogVisible.value = false;
      await userStore.fetchUserInfo();
      emits("reloadData");
    }
  };
</script>
<template>
  <div>
    <el-table
      v-if="props.data.length > 0"
      :data="props.data"
      :style="{ height: '60vh' }"
      :default-sort="{ prop: 'date', order: 'ascending' }"
      show-overflow-tooltip
    >
      <el-table-column
        v-for="column in displayedColumns"
        :key="column.prop"
        :fixed="column?.fixed ? column?.fixed : false"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :sortable="column.sortable ?? false"
      >
        <template
          v-if="column.prop === 'level'"
          #default="scope"
        >
          <ActivityElTags :level="[...scope.row.level]" />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="詳情"
        align="center"
        header-align="center"
        width="70"
      >
        <template #default="scope">
          <el-button
            type="info"
            class="px-3"
            :icon="TopRight"
            @click="$router.push(`/activities/${scope.row.activityId}`)"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="props.data[0].status === 'registered'"
        fixed="right"
        label="取消"
        align="center"
        header-align="center"
        width="70"
      >
        <template #default="scope">
          <el-button
            class="px-3"
            :icon="WarnTriangleFilled"
            @click="handleCancelDialog(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <p
      v-else
      class="text-center mt-20 text-neutral-500 text-lg"
    >
      暫無資料
    </p>
    <el-dialog
      v-model="cancelRegistrationDialogVisible"
      title="取消確認"
      width="350"
    >
      <p class="text-md my-3">您是否要取消此活動?</p>
      <template #footer>
        <div class="flex">
          <el-button
            class="w-full mr-2"
            round
            @click="handleCancelActivity"
          >
            取消報名
          </el-button>
          <el-button
            type="primary"
            class="w-full"
            round
            @click="cancelRegistrationDialogVisible = false"
          >
            不取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
