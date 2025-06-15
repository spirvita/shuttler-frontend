<script setup lang="ts">
  import type { FormInstance, FormRules } from "element-plus";
  import { resetPassword } from "@/apis/auth";

  const memberPw = ref({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const ruleFormRef = ref<FormInstance>();
  const memberPwFormRules = ref<FormRules>({
    oldPassword: [{ required: true, message: "請輸入原密碼", trigger: "blur" }],
    newPassword: [
      { required: true, message: "請輸入新密碼", trigger: "blur" },
      {
        pattern: /^(?=.*[A-Za-z])(?=.*\d).{10,}$/,
        message: "密碼至少 10 個字元，且包含 1 個數字和 1 個英文字母",
        trigger: "blur"
      }
    ],
    confirmPassword: [
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
        const { error } = await resetPassword({
          password: memberPw.value.oldPassword,
          newPassword: memberPw.value.newPassword,
          checkNewPassword: memberPw.value.confirmPassword
        });
        if (!error.value) ElMessage.success("修改成功");
        ruleFormRef.value?.resetFields();
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
  <div class="flex justify-center">
    <el-form
      ref="ruleFormRef"
      label-position="top"
      label-width="auto"
      class="w-full xl:w-1/3"
      :model="memberPw"
      :rules="memberPwFormRules"
    >
      <el-form-item
        label="原密碼"
        prop="oldPassword"
        required
      >
        <el-input
          v-model="memberPw.oldPassword"
          type="password"
        />
      </el-form-item>
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
        prop="confirmPassword"
        type="password"
        required
      >
        <el-input
          v-model="memberPw.confirmPassword"
          type="password"
        />
      </el-form-item>
      <el-form-item class="flex justify-center">
        <el-button
          type="primary"
          class="mx-auto"
          @click="submitForm(ruleFormRef)"
        >
          修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped></style>
