<script lang="ts" setup>
  import { Check, Close } from "@element-plus/icons-vue";
  import bgImage from "@/assets/images/current-activities-bg.png";

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
    <div
      class="flex flex-col justify-between items-center border border-neutral-300 rounded-lg shadow-md py-6 px-10 max-w-[300px] mx-auto"
      :style="{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom'
      }"
    >
      <img
        src="@/assets/images/logo.png"
        alt="logo"
        class="w-[150px] h-[56px]"
      />
      <p class="text-2xl my-6">交易明細</p>
      <template v-if="queryInfo.status === 'success'">
        <div class="mb-6 w-full text-left">
          <p class="mb-6">訂單編號：{{ queryInfo.merchantOrderNo }}</p>
          <p>成功購買：{{ queryInfo.pointsValue }} 點數</p>
        </div>
        <p class="flex items-center mb-10 w-full text-left">
          可用點數：{{ queryInfo.userPoints }} 點數
        </p>
      </template>
      <template v-else>
        <p class="mb-10">交易失敗，請重新購買</p>
      </template>
      <el-button
        type="primary"
        size="large"
        class="w-full"
        round
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
