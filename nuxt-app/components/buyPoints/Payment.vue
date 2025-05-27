<script lang="ts" setup>
  import bgImage from "@/assets/images/current-activities-bg.png";

  const router = useRouter();
  const props = defineProps<{
    points: number;
  }>();
  const paymentMethod = ref("newebpay");
  const payment = () => {
    router.push(`/buy-points/callback?status=success&points=${props.points}`);
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
        <p>您此次購買共 {{ props.points }} 點</p>
        <el-radio-group v-model="paymentMethod">
          <el-radio
            value="newebpay"
            size="large"
          >
            信用卡支付
          </el-radio>
        </el-radio-group>
        <p>{{ props.points }} NTD</p>
      </div>
      <el-button
        type="primary"
        size="large"
        class="w-full"
        round
        @click="payment"
      >
        確認購買
      </el-button>
    </div>
  </div>
</template>
