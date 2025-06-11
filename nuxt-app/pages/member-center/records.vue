<script setup lang="ts">
  import type { TableColumn } from "@/types/elTable";
  import { getUserPointsRecord } from "@/apis/user";

  const { data } = await getUserPointsRecord();
  const recordData = computed(() => {
    return data.value?.data || [];
  })
  const recordType: Record<string, string> = {
    addPoint: "儲值點數",
    applyAct: "報名活動",
    cancelAct: "取消報名",
    suspendAct: "活動停辦"
  }
  const displayedColumns = ref<TableColumn[]>([
    { prop: "createdTime", label: "建立時間", fixed: "left" },
  ]);
</script>
<template>
  <div>
    <h2 class="mb-3">點數紀錄</h2>
    <el-table
      v-if="recordData.length > 0"
      :data="recordData"
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
        prop="points"
      />
      <el-table-column
        label="活動名稱"
        prop="activity"
      >
        <template #default="scope">
          <span>{{ scope.row.activity.name }}</span>
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
