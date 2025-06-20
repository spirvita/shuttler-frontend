<script lang="ts" setup>
  import type { FormInstance, FormRules } from "element-plus";
  import { verifyResetToken, resetPasswordWithToken } from "@/apis/auth";

  const route = useRoute();
  const token = computed(() => route.query.token as string);
  const { error } = await verifyResetToken(token.value);
  if (error.value) navigateTo("/");

  const memberPw = ref({
    token: token.value,
    newPassword: "",
    checkNewPassword: ""
  });
  const ruleFormRef = ref<FormInstance>();
  const memberPwFormRules = ref<FormRules>({
    newPassword: [
      { required: true, message: "請輸入新密碼", trigger: "blur" },
      {
        pattern: /^(?=.*[A-Za-z])(?=.*\d).{10,}$/,
        message: "密碼至少 10 個字元，且包含 1 個數字和 1 個英文字母",
        trigger: "blur"
      }
    ],
    checkNewPassword: [
      { required: true, message: "請再次輸入新密碼", trigger: "blur" },
      {
        validator: (_rule, value, callback) => {
          if (value !== memberPw.value.newPassword) {
            callback(new Error("兩次輸入的密碼不一致"));
          } else {
            callback();
          }
        },
        trigger: "blur"
      }
    ]
  });

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, _fields) => {
      if (valid) {
        const { error } = await resetPasswordWithToken(memberPw.value);
        if (!error.value) ElMessage.success("重設密碼成功，請重新登入");
        ruleFormRef.value?.resetFields();
        navigateTo("/");
      } else {
        ElMessage({
          message: "提交資料有錯誤喔! 請檢查後再送出",
          type: "error"
        });
      }
    });
  };
</script>
<template>
  <div class="container flex flex-col items-center py-10 lg:py-20 h-[100dvh]">
    <h2 class="text-5xl mb-2 lg:mb-6">重設密碼</h2>
    <el-form
      ref="ruleFormRef"
      label-position="top"
      label-width="auto"
      class="w-full xl:w-1/4"
      :model="memberPw"
      :rules="memberPwFormRules"
    >
      <el-form-item
        label="新密碼"
        prop="newPassword"
        type="password"
        required
      >
        <el-input
          v-model="memberPw.newPassword"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="確認新密碼"
        prop="checkNewPassword"
        type="password"
        required
      >
        <el-input
          v-model="memberPw.checkNewPassword"
          type="password"
        />
      </el-form-item>
      <el-form-item class="flex justify-center">
        <el-button
          type="primary"
          class="mx-auto"
          @click="submitForm(ruleFormRef)"
        >
          送出
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
