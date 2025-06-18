<script lang="ts" setup>
  import bgImage from "@/assets/images/current-activities-bg.png";
  import { getPointsPurchaseInfo } from "@/apis/buyPoints";
  import type { PointsPurchaseInfo } from "@/types/points";

  const props = defineProps<{
    points: number;
  }>();

  const { loggedIn } = useUserSession();

  const pointsPurchaseByNewebpay = async () => {
    if (!loggedIn.value) {
      ElMessage.error("請先登入");
      return;
    }
    const { data, error: purchaseInfoError } = await getPointsPurchaseInfo(
      props.points
    );
    const purchaseInfo = data.value?.data
      ? data.value.data
      : ({} as PointsPurchaseInfo);
    if (purchaseInfoError.value) return;

    const form = document.createElement("form");
    form.action = "https://ccore.newebpay.com/MPG/mpg_gateway";
    form.method = "POST";

    form.innerHTML = `
      <input type="hidden" name="MerchantID" value="${purchaseInfo.MerchantID}" />
      <input type="hidden" name="TradeInfo" value="${purchaseInfo.TradeInfo}" />
      <input type="hidden" name="TradeSha" value="${purchaseInfo.TradeSha}" />
      <input type="hidden" name="Version" value="${purchaseInfo.Version}" />
    `;

    document.body.appendChild(form);
    form.submit();
  };
</script>
<template>
  <div class="flex">
    <div
      class="flex flex-col justify-between items-center border border-neutral-300 rounded-lg shadow-md py-6 px-16 max-w-[300px] h-[350px] mx-auto"
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
      <div class="text-center">
        <p class="text-2xl mb-6">結帳明細</p>
        <p class="mb-6">您此次購買共 {{ props.points }} 點</p>
        <p>{{ props.points }} NTD</p>
      </div>
      <el-button
        type="primary"
        size="large"
        class="w-full"
        round
        @click="pointsPurchaseByNewebpay"
      >
        確認購買
      </el-button>
    </div>
  </div>
</template>
