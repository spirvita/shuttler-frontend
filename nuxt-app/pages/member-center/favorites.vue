<script setup lang="ts">
  import type { TableColumn } from "@/types/elTable";
  import { getUserFavorites } from "@/apis/user";
  import { removeActivityFromFavorites } from "@/apis/activity";
  import { TopRight } from "@element-plus/icons-vue";

  const { data, refresh } = await getUserFavorites();
  const userFavorites = computed(() => data.value?.data || []);
  const activityId = ref<string>("");
  const removeFavoriteDialogVisible = ref(false);
  const displayedColumns = ref<TableColumn[]>([
    { prop: "name", label: "活動名稱", width: "100px" },
    { prop: "date", label: "活動日期", width: "100px" },
    { prop: "startTime", label: "時間(起)", width: "80px" },
    { prop: "endTime", label: "時間(訖)", width: "80px" },
    { prop: "venueName", label: "場館名稱", width: "150px" },
    { prop: "contactName", label: "聯絡人姓名" },
    { prop: "contactPhone", label: "聯絡人手機" },
    { prop: "contactLine", label: "聯絡人 Line" }
  ]);
  const removeFavorite = async (activityId: string) => {
    const { error } = await removeActivityFromFavorites(activityId);
    if (!error.value) ElMessage.success("已取消收藏");
    removeFavoriteDialogVisible.value = false;
    refresh();
  };
</script>
<template>
  <div>
    <h2 class="mb-3">活動收藏</h2>
    <el-table
      v-if="userFavorites.length > 0"
      :data="userFavorites"
      :style="{ height: '320px' }"
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
        align="center"
        header-align="center"
        label="詳情"
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
        fixed="right"
        label="取消收藏"
        align="center"
        header-align="center"
        width="80"
      >
        <template #default="scope">
          <el-button
            class="px-3"
            @click="
            removeFavoriteDialogVisible = true;
              activityId = scope.row.activityId;
            "
          >
            <Icon name="ic:baseline-bookmark" />
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
    <el-dialog
      v-model="removeFavoriteDialogVisible"
      title="移除收藏確認"
      width="350"
    >
      <p class="text-md my-3">您是否要移除收藏此活動?</p>
      <template #footer>
        <div class="flex">
          <el-button
            class="w-full mr-2"
            round
            @click="() => removeFavorite(activityId)"
          >
            移除收藏
          </el-button>
          <el-button
            type="primary"
            class="w-full"
            round
            @click="removeFavoriteDialogVisible = false"
          >
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped></style>
