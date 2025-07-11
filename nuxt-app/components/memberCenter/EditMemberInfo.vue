<script setup lang="ts">
  import type { FormInstance, FormRules, UploadFiles } from "element-plus";
  import type { MemberInfo } from "@/types/memberCenter";
  import { ElMessage } from "element-plus";
  import { useShuttlerLevelOptions } from "@/composables/useShuttlerLevelOptions";
  import { useTwLocationState } from "@/composables/useTwLocationState";
  import { useUserStore } from "@/stores/user";
  import { updateUserInfo } from "@/apis/user";
  import { uploadImages } from "@/apis/upload";
  import { InfoFilled } from "@element-plus/icons-vue";

  const userStore = useUserStore();

  const shuttlerLevelOptions = useShuttlerLevelOptions();
  const {
    twCitiesOptions,
    twDistrictsOptions,
    twCity,
    twDistrict,
    initLocationByZip
  } = useTwLocationState();
  const memberInfo = ref<MemberInfo>(
    JSON.parse(JSON.stringify(userStore.userInfo))
  );

  initLocationByZip(memberInfo.value?.preferredLocation?.[0] ?? "");

  const memberInfoFormRules = ref<FormRules<MemberInfo>>({
    name: [
      { required: true, message: "請輸入名稱", trigger: "blur" },
      {
        min: 2,
        max: 10,
        message: "名稱長度應在 2 到 10 個字之間",
        trigger: "blur"
      }
    ],
    level: [{ required: true, message: "請選擇羽球程度", trigger: "change" }]
  });
  const ruleFormRef = ref<FormInstance>();
  const uploadImageFiles = ref<UploadFiles>([]);

  const handleUpdateUserInfo = async () => {
    if (uploadImageFiles.value.length > 0) {
      const photo = await handleUploadImages();
      if (photo && photo.length > 0) {
        memberInfo.value.avatar = photo as string;
      } else {
        return;
      }
    } else {
      memberInfo.value.avatar = "";
    }
    const { error } = await updateUserInfo(memberInfo.value);
    if (!error.value) {
      userStore.setUserInfo(memberInfo.value);
      ElMessage({
        message: "修改成功",
        type: "success"
      });
    }
  };

  const handleChange = (uploadFiles: UploadFiles) => {
    uploadImageFiles.value = uploadFiles;
    memberInfo.value.avatar = "";
  };

  const handleUploadImages = async () => {
    return await uploadImages(uploadImageFiles.value, "avatar");
  };

  const hasNotPreferredLocation = computed(() => {
    return (
      !memberInfo.value.preferredLocation ||
      memberInfo.value.preferredLocation.length === 0 ||
      memberInfo.value.preferredLocation.includes("")
    );
  });

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, _fields) => {
      if (hasNotPreferredLocation.value) {
        ElMessage.error("請選擇縣市和區域");
      } else if (valid) {
        await handleUpdateUserInfo();
      } else {
        ElMessage({
          message: "提交資料有錯誤喔! 請檢查後再送出",
          type: "error"
        });
      }
    });
  };

  watch(
    () => twDistrict.value,
    (newVal) => {
      memberInfo.value.preferredLocation = [newVal];
    }
  );
</script>
<template>
  <div class="flex justify-center">
    <el-form
      ref="ruleFormRef"
      label-position="top"
      label-width="auto"
      class="w-full xl:w-1/3"
      :model="memberInfo"
      :rules="memberInfoFormRules"
    >
      <el-form-item
        label="姓名"
        prop="name"
        required
      >
        <el-input v-model="memberInfo.name" />
      </el-form-item>
      <el-form-item
        label="頭像"
        prop="avatar"
      >
        <ElUploadImage
          :pictures="memberInfo.avatar ? [memberInfo.avatar] : []"
          :limit="1"
          @on-change="handleChange"
        />
        <el-input
          v-model="memberInfo.avatar"
          hidden
        />
      </el-form-item>
      <el-form-item
        label="羽球程度"
        prop="level"
        required
      >
        <el-select
          v-model="memberInfo.level"
          placeholder="請選擇羽球程度"
        >
          <el-option
            v-for="item in shuttlerLevelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="縣市"
        prop=""
        required
      >
        <el-select
          v-model="twCity"
          placeholder="請選擇縣市"
        >
          <el-option
            v-for="item in twCitiesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="區域"
        prop=""
        required
      >
        <el-select
          v-model="twDistrict"
          placeholder="請選擇區域"
        >
          <el-option
            v-for="item in twDistrictsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="常用主辦單位名稱"
        prop="organization"
      >
        <el-input v-model="memberInfo.organization" />
      </el-form-item>
      <el-form-item
        label="常用連絡人電話"
        prop="organization"
      >
        <el-input v-model="memberInfo.phone" />
      </el-form-item>
      <el-form-item
        label=""
        prop=""
      >
        <p class="flex items-center text-xs text-neutral-500">
          <el-icon class="mr-1"><InfoFilled /></el-icon>
          填寫完整資料可在舉辦活動時自動帶入喔!
        </p>
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
