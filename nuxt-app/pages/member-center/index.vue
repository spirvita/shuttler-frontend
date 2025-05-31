<script setup lang="ts">
  import EditMemberInfo from "~/components/memberCenter/EditMemberInfo.vue";
  import EditPassword from "@/components/memberCenter/EditPassword.vue";

  const activeName = ref("memberInfo");
</script>
<template>
  <div>
    <h2 class="mb-3">帳號設定</h2>
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="會員資料"
        name="memberInfo"
      >
        <EditMemberInfo />
      </el-tab-pane>
      <el-tab-pane
        label="修改密碼"
        name="EditPassword"
      >
        <EditPassword />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped></style>
