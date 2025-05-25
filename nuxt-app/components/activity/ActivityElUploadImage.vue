<script setup lang="ts">
  import type {
    UploadProps,
    UploadUserFile,
    UploadInstance
  } from "element-plus";

  const emits = defineEmits(["onChange", "emitElUploadRef"]);
  const elementPlusPictureList = ref<UploadUserFile[]>([]);
  const uploadRef = ref<UploadInstance>();

  const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
    const type = rawFile.type;
    if (type !== "image/jpeg" && type !== "image/png" && type !== "image/jpg") {
      ElMessage.error("圖片格式請使用 JPG 或 PNG");
      return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error("圖片大小為 2MB內");
      return false;
    }
    return true;
  };

  const handleExceed = () => {
    ElMessage.warning("最多只能上傳 5 張圖片");
  };

  const handleChange: UploadProps["onChange"] = (_uploadFile, uploadFiles) => {
    emits("onChange", uploadFiles);
  };

  onMounted(() => {
    emits("emitElUploadRef", uploadRef.value);
  });
</script>

<template>
  <el-upload
    ref="uploadRef"
    v-model:file-list="elementPlusPictureList"
    class="w-full"
    action="#"
    multiple
    list-type="picture"
    :limit="5"
    :on-exceed="handleExceed"
    :on-change="handleChange"
    :before-upload="beforeAvatarUpload"
    :auto-upload="true"
  >
    <el-button
      type="primary"
      :disabled="elementPlusPictureList.length === 5"
      round
    >
      {{
        elementPlusPictureList.length === 5 ? "已達圖片上限" : "選擇活動圖片"
      }}
    </el-button>
    <template #tip>
      <p>最多五張圖片，格式為 JPG 或 PNG</p>
    </template>
  </el-upload>
</template>
