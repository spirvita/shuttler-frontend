<script lang="ts" setup>
  import { Check, Close, Money } from "@element-plus/icons-vue";

  const router = useRouter();
  const query = router.currentRoute.value.query;
  const status = query.status;
  const points = query.points || 0;
  const statusMessage = {
    success: "購買成功",
    cancel: "交易取消",
    error: "交易錯誤，請稍後再試"
  };

  const paymentMessage = ref("");
  if (status === "success") {
    paymentMessage.value = statusMessage.success;
  } else if (status === "cancel") {
    paymentMessage.value = statusMessage.cancel;
  } else {
    paymentMessage.value = statusMessage.error;
  }
</script>

<template>
  <div class="py-20 text-center">
    <h2 class="mb-10">
      <span class="text-5xl">羽神交易結果</span>
    </h2>
    <p class="text-3xl mb-10">{{ paymentMessage }}</p>
    <template v-if="status !== 'success'">
      <div class="flex flex-col items-center">
        <el-icon
          size="60"
          class="text-danger-500 mb-10"
        >
          <Close />
        </el-icon>
        <el-button
          type="primary"
          class=""
          @click="router.push('/buy-points')"
        >
          點此重新購買
        </el-button>
      </div>
    </template>
    <template v-else>
      <el-icon
        size="60"
        class="text-success-500 mb-10"
      >
        <Check />
      </el-icon>
      <p class="mb-3">您已購買 {{ points }} 點數</p>
      <p class="mb-10">
        共
        <el-icon><Money /></el-icon>
        1580 點數可使用
      </p>
      <el-button
        type="primary"
        class="mb-3"
        @click="router.push('/activities')"
      >
        點此回到活動列表
      </el-button>
    </template>
  </div>
</template>
