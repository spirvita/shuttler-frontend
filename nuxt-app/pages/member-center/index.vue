<script setup lang="ts">
  import ChangeMemberInfo from "~/components/memberCenter/ChangeMemberInfo.vue";
  import ChangePassword from "~/components/memberCenter/ChangePassword.vue";

  const activeName = ref("memberInfo");
  const memberInfo = ref({
    name: "Vic",
    avator: "",
    email: "abc123@gmail.com",
    registerDate: "2025-05-01",
    level: [1],
    points: 1000,
    attendCount: 12
  });
</script>
<template>
  <div>
    <h2 class="mb-3">帳號設定</h2>
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="會員資料"
        name="memberInfo"
      >
        <ChangeMemberInfo :member-info="memberInfo" />
      </el-tab-pane>
      <el-tab-pane
        label="修改密碼"
        name="changePassword"
      >
        <ChangePassword />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped></style>
