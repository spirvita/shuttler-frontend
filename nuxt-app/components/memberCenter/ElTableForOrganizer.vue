<script lang="ts" setup>
  import { mapNamesToLevels } from "@/constants/shuttlerLevels";
  import { Edit, WarnTriangleFilled } from "@element-plus/icons-vue";
  import { getActivityParticipants, suspendActivity } from "@/apis/activity";
  import type { ActivityDetail } from "@/types/activities";
  import type { ActivityParticipant } from "@/types/memberCenter";

  interface TableColumn {
    prop: string;
    label: string;
    width?: string;
    minWidth?: string;
    fixed?: string;
  }

  const props = defineProps<{
    data: ActivityDetail[];
  }>();
  const emits = defineEmits(["reloadData"]);
  const noDateMessage = ref("目前無資料");
  const displayedColumns = ref<TableColumn[]>([
    { prop: "date", label: "日期", width: "100", fixed: "left" },
    { prop: "startTime", label: "開始時間", width: "100" },
    { prop: "endTime", label: "結束時間", width: "100" },
    { prop: "city", label: "縣市", width: "80" },
    { prop: "district", label: "區域", width: "80" },
    { prop: "level", label: "活動程度", width: "200" },
    { prop: "contactName", label: "聯絡人", width: "100" }
  ]);
  const displayedParticipantsColumns = ref<TableColumn[]>([
    { prop: "status", label: "狀態" },
    { prop: "name", label: "姓名", width: "150", fixed: "left" },
    { prop: "registrationCount", label: "人數", width: "80" },
    { prop: "registrationDate", label: "報名時間" },
    { prop: "cancellationDate", label: "取消時間" }
  ]);
  const editActivityDialogVisible = ref(false);
  const suspendActivityDialogVisible = ref(false);
  const activityParticipantsDialogVisible = ref(false);
  const selectActivity = ref();
  const activityParticipants = ref<ActivityParticipant[]>([]);
  const editActivityDialog = (row: unknown) => {
    editActivityDialogVisible.value = true;
    selectActivity.value = JSON.parse(JSON.stringify(row));
    selectActivity.value.level = mapNamesToLevels(selectActivity.value.level);
  };
  const handleSuspendActivityDialog = (row: unknown) => {
    suspendActivityDialogVisible.value = true;
    selectActivity.value = JSON.parse(JSON.stringify(row));
  };
  const handleGetActivityParticipants = async (activityId: string) => {
    const { data, error } = await getActivityParticipants(activityId);
    if (!error.value) {
      activityParticipants.value = data.value?.data || [];
      activityParticipantsDialogVisible.value = true;
    }
  };
  const handleSuspendActivity = async (activityId: string) => {
    suspendActivityDialogVisible.value = false;
    const { data, error } = await suspendActivity(activityId);
    if (!error.value) {
      ElMessage.success(data.value?.message);
    }
    emits("reloadData", true);
  };
</script>

<template>
  <div>
    <el-table
      v-if="props.data.length > 0"
      :data="props.data"
      :style="{ height: '320px' }"
    >
      <el-table-column
        v-for="column in displayedColumns"
        :key="column.prop"
        :fixed="column?.fixed ? column?.fixed : false"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
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
        label="報名者"
        width=""
      >
        <template #default="scope">
          <el-button
            v-if="scope.row.bookedCount"
            type="info"
            :disabled="scope.row.bookedCount === 0"
            @click="handleGetActivityParticipants(scope.row.activityId)"
          >
            {{ scope.row.bookedCount }} 人
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!(props.data[0].status === 'ended')"
        fixed="right"
        label="操作"
        width="160"
      >
        <template #default="scope">
          <el-button-group>
            <el-button
              type="primary"
              :icon="Edit"
              @click="editActivityDialog(scope.row)"
            />
            <el-button
              :icon="WarnTriangleFilled"
              @click="handleSuspendActivityDialog(scope.row)"
            />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <p
      v-else
      class="text-center mt-20"
    >
      {{ noDateMessage }}
    </p>
    <el-dialog
      v-model="editActivityDialogVisible"
      fullscreen
    >
      <div class="flex flex-col items-center">
        <p class="text-2xl mb-4">編輯活動</p>
        <ActivityForm :activity-edit-info="selectActivity" />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editActivityDialogVisible = false">
            取消編輯
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="suspendActivityDialogVisible"
      title="停辦活動"
      width="500"
    >
      <span>確定要停辦此活動嗎?</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleSuspendActivity(selectActivity.activityId)">
            確定停辦
          </el-button>
          <el-button
            type="primary"
            @click="suspendActivityDialogVisible = false"
          >
            不停辦
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="activityParticipantsDialogVisible"
      class="w-[65vw] max-w-[800px]"
    >
      <template #header>報名者名單</template>
      <el-table
        :data="activityParticipants"
        :style="{ height: '320px' }"
      >
        <el-table-column
          v-for="column in displayedParticipantsColumns"
          :key="column.prop"
          :fixed="column?.fixed ? column?.fixed : false"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
        />
      </el-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="activityParticipantsDialogVisible = false">
            確定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
