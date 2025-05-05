<script setup lang="ts">
  import type { FormInstance, FormRules } from "element-plus";
  import type { MemberInfo } from "~/types/memberCenter";
  import { ElMessage } from "element-plus";

  const props = defineProps<{ memberInfo: MemberInfo }>();
  const memberInfoFormData = ref({ ...props.memberInfo });
  const memberInfoFormRules = ref<FormRules<MemberInfo>>({
    name: [
      { required: true, message: "請輸入名稱", trigger: "blur" },
      {
        min: 2,
        max: 10,
        message: "名稱長度應在 2 到 10 個字之間",
        trigger: "blur"
      }
    ]
  });
  const ruleFormRef = ref<FormInstance>();

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, _fields) => {
      if (valid) {
        ElMessage({
          message: "修改成功",
          type: "success"
        });
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
      :model="memberInfoFormData"
      :rules="memberInfoFormRules"
    >
      <el-form-item
        label="姓名"
        prop="name"
        required
      >
        <el-input v-model="memberInfoFormData.name" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(ruleFormRef)"
        >
          Create
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped></style>
