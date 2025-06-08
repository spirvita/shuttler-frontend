<script lang="ts" setup>
  import { Check, Close, Money } from "@element-plus/icons-vue";

  const router = useRouter();
  const query = useRoute().query;
  const queryInfo = ref({
    userPoints: query.userPoints || 0,
    merchantOrderNo: query.merchantOrderNo || "",
    status: query.status || "error",
    pointsValue: query.pointsValue || 0
  });
</script>

<template>
  <div class="py-20 text-center">
    <h2 class="mb-10">
      <span class="text-5xl">羽神交易結果</span>
    </h2>
    <div class="flex flex-col items-center">
      <el-icon
        size="60"
        class="mb-10"
        :class="
          queryInfo.status === 'success'
            ? 'text-success-500'
            : 'text-danger-500'
        "
      >
        <Check v-if="queryInfo.status === 'success'" />
        <Close v-else />
      </el-icon>
      <template v-if="queryInfo.status === 'success'">
        <p class="mb-5">訂單編號：{{ queryInfo.merchantOrderNo }}</p>
        <p class="mb-5">您已成功購買 {{ queryInfo.pointsValue }} 點數</p>
        <p class="mb-10 flex items-center justify-center">
          <el-icon
            size="24"
            class="mr-1"
          >
            <Money />
          </el-icon>
          {{ queryInfo.userPoints }} 可用
        </p>
      </template>
      <template v-else>
        <p class="mb-10">交易失敗，請重新購買</p>
      </template>
      <el-button
        type="primary"
        class="mb-5"
        @click="
          router.push(
            `${queryInfo.status === 'success' ? '/activities' : '/buy-points'}`
          )
        "
      >
        {{ queryInfo.status === "success" ? "查看活動" : "重新購買" }}
      </el-button>
    </div>
  </div>
</template>
