<script lang="ts" setup>
  import { mapNamesToLevels } from "@/constants/shuttlerLevels";
  import {
    Edit,
    WarnTriangleFilled,
    DocumentCopy,
    Delete,
    TopRight
  } from "@element-plus/icons-vue";
  import {
    getActivityParticipants,
    suspendActivity,
    deleteDraftActivity
  } from "@/apis/activity";
  import type { ActivityDetail } from "@/types/activities";
  import type { ActivityParticipant } from "@/types/memberCenter";
  import type { TableColumn } from "@/types/elTable";

  const props = defineProps<{
    data: ActivityDetail[];
  }>();
  const emits = defineEmits(["reloadData"]);
  const displayedColumns = ref<TableColumn[]>([
    { prop: "name", label: "活動名稱", width: "120" },
    { prop: "date", label: "日期", width: "100" },
    { prop: "startTime", label: "時間(起)", width: "80" },
    { prop: "endTime", label: "時間(訖)", width: "80" },
    { prop: "venueName", label: "場館名稱" },
    { prop: "contactName", label: "聯絡人", width: "100" },
    { prop: "level", label: "活動程度", width: "200" }
  ]);
  const displayedParticipantsColumns = ref<TableColumn[]>([
    { prop: "status", label: "狀態" },
    { prop: "name", label: "姓名", fixed: "left" },
    { prop: "registrationCount", label: "人數" },
    { prop: "registrationDate", label: "報名時間" },
    { prop: "cancellationDate", label: "取消時間" }
  ]);
  const editActivityDialogVisible = ref(false);
  const suspendActivityDialogVisible = ref(false);
  const deleteDraftActivityDialogVisible = ref(false);
  const activityParticipantsDialogVisible = ref(false);
  const selectActivity = ref();
  const activityParticipants = ref<ActivityParticipant[]>([]);
  const editActivityDialog = (row: unknown) => {
    editActivityDialogVisible.value = true;
    selectActivity.value = JSON.parse(JSON.stringify(row));
    selectActivity.value.level = mapNamesToLevels(selectActivity.value.level);
  };
  const copyActivityDialog = (row: unknown) => {
    editActivityDialogVisible.value = true;
    selectActivity.value = JSON.parse(JSON.stringify(row));
    delete selectActivity.value.activityId;
    selectActivity.value.status = "copy";
    selectActivity.value.level = mapNamesToLevels(selectActivity.value.level);
  };
  const handleSuspendActivityDialog = (row: unknown) => {
    suspendActivityDialogVisible.value = true;
    selectActivity.value = JSON.parse(JSON.stringify(row));
  };
  const handleDeleteDraftActivityDialog = (row: unknown) => {
    deleteDraftActivityDialogVisible.value = true;
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
    reloadData();
  };
  const handleDeleteDraftActivity = async (activityId: string) => {
    deleteDraftActivityDialogVisible.value = false;
    const { data, error } = await deleteDraftActivity(activityId);
    if (!error.value) {
      ElMessage.success(data.value?.message);
    }
    reloadData();
  };
  const reloadData = () => {
    emits("reloadData");
  };
</script>

<template>
  <div>
    <el-table
      v-if="props.data.length > 0"
      :data="props.data"
      :style="{ height: '320px' }"
      :default-sort="{ prop: 'date', order: 'ascending' }"
    >
      <el-table-column
        v-for="column in displayedColumns"
        :key="column.prop"
        :fixed="column?.fixed ? column?.fixed : false"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        show-overflow-tooltip
      >
        <template
          v-if="column.prop === 'level'"
          #default="scope"
        >
          <ActivityElTags :level="[...scope.row.level]" />
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          props.data[0].status === 'published' ||
          props.data[0].status === 'ended'
        "
        label="報名列表"
        align="center"
        header-align="center"
        width="100"
      >
        <template #default="scope">
          <el-button
            v-if="scope.row.bookedCount"
            type="success"
            rounded
            class="w-full bg-white text-black"
            :disabled="scope.row.bookedCount === 0"
            @click="handleGetActivityParticipants(scope.row.activityId)"
          >
            {{ scope.row.bookedCount }} 人
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          props.data[0].status === 'published' ||
          props.data[0].status === 'ended'
        "
        fixed="right"
        label="詳情"
        align="center"
        header-align="center"
        width="65"
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
        v-if="
          props.data[0].status == 'published' || props.data[0].status == 'draft'
        "
        fixed="right"
        label="編輯"
        align="center"
        header-align="center"
        width="65"
      >
        <template #default="scope">
          <el-button
            class="px-3"
            type="primary"
            :icon="Edit"
            @click="editActivityDialog(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="props.data[0].status === 'published'"
        fixed="right"
        label="停辦"
        align="center"
        header-align="center"
        width="65"
      >
        <template #default="scope">
          <el-button
            class="px-3"
            :icon="WarnTriangleFilled"
            @click="handleSuspendActivityDialog(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="props.data[0].status === 'draft'"
        fixed="right"
        label="捨棄"
        align="center"
        header-align="center"
        width="65"
      >
        <template #default="scope">
          <el-button
            class="px-3"
            :icon="Delete"
            @click="handleDeleteDraftActivityDialog(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          props.data[0].status === 'ended' ||
          props.data[0].status === 'suspended'
        "
        fixed="right"
        label="複製"
        align="center"
        header-align="center"
        width="65"
      >
        <template #default="scope">
          <el-button
            class="px-3"
            type="primary"
            :icon="DocumentCopy"
            @click="copyActivityDialog(scope.row)"
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
      v-model="editActivityDialogVisible"
      fullscreen
      destroy-on-close
      :z-index="1000"
    >
      <div class="flex flex-col items-center">
        <p class="text-2xl mb-4">編輯活動</p>
        <ActivityForm
          :activity-edit-info="selectActivity"
          @close="editActivityDialogVisible = false"
          @reload-data="reloadData"
        />
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
      width="350"
    >
      <p class="text-md py-3">確定要停辦此活動嗎?</p>
      <template #footer>
        <div class="flex">
          <el-button
            class="w-full mr-2"
            round
            @click="handleSuspendActivity(selectActivity.activityId)"
          >
            確定停辦
          </el-button>
          <el-button
            type="primary"
            class="w-full"
            round
            @click="suspendActivityDialogVisible = false"
          >
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="deleteDraftActivityDialogVisible"
      title="捨棄活動草稿"
      width="350"
    >
      <p class="text-md py-3">確定要捨棄此活動草稿嗎?</p>
      <template #footer>
        <div class="flex">
          <el-button
            class="w-full mr-2"
            round
            @click="handleDeleteDraftActivity(selectActivity.activityId)"
          >
            確定捨棄
          </el-button>
          <el-button
            type="primary"
            class="w-full"
            round
            @click="deleteDraftActivityDialogVisible = false"
          >
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="activityParticipantsDialogVisible"
      fullscreen
      class="lg:w-[75vw] lg:h-[85vh] lg:top-1/2 lg:-translate-y-1/2"
    >
      <template #header>報名者名單</template>
      <el-table :data="activityParticipants">
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
