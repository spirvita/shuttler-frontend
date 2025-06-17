<script setup lang="ts">
  import type { TableColumn } from "@/types/elTable";
  import { getUserPointsRecord } from "@/apis/user";

  const { data } = await getUserPointsRecord();
  const recordData = computed(() => {
    return data.value?.data || [];
  });
  const recordType: Record<string, string> = {
    addPoint: "儲值點數",
    applyAct: "報名活動",
    cancelAct: "取消報名",
    suspendAct: "活動停辦"
  };
  const displayedColumns = ref<TableColumn[]>([
    { prop: "createTime", label: "建立時間" }
  ]);
</script>
<template>
  <div>
    <h2 class="mb-3">點數紀錄</h2>
    <el-table
      v-if="recordData.length > 0"
      :data="recordData"
      :style="{ height: '380px' }"
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
      />
      <el-table-column
        label="異動類型"
        prop="recordType"
      >
        <template #default="scope">
          <span>{{ recordType[scope.row.recordType] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="點數"
        align="center"
        header-align="center"
        prop="pointsChange"
      >
        <template #default="scope">
          <span
            :class="
              scope.row.pointsChange < 0
                ? 'text-success-500'
                : 'text-primary-300'
            "
          >
            {{ scope.row.pointsChange < 0 ? "使用" : "增加" }}
            {{ Math.abs(scope.row.pointsChange) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="點數來源"
        align="center"
        header-align="center"
        prop="activity"
      >
        <template #default="scope">
          <el-button
            v-if="scope.row.activity"
            type="info"
            @click="
              $router.push(`/activities/${scope.row.activity.activityId}`)
            "
          >
            活動
          </el-button>
          <el-button
            v-else
            type="danger"
            @click="$router.push('/buy-points')"
          >
            儲值
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <p
      v-else
      class="text-center mt-20 text-neutral-500 text-lg"
    >
      暫無資料
    </p>
  </div>
</template>
