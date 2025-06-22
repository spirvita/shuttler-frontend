<script setup lang="ts">
  import type {
    UploadProps,
    UploadUserFile,
    UploadInstance
  } from "element-plus";

  const props = defineProps<{
    pictures: string[];
    limit: number;
  }>();
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
    ElMessage.warning(`最多只能上傳 ${props.limit} 張圖片`);
  };

  const handleChange: UploadProps["onChange"] = (_uploadFile, uploadFiles) => {
    emits("onChange", uploadFiles);
  };

  watch(
    () => props.pictures,
    () => {
      elementPlusPictureList.value = props.pictures.map((picture, index) => ({
        name: `活動圖片 ${index + 1}`,
        url: picture
      }));
    }
  );

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
    :limit="limit"
    :on-exceed="handleExceed"
    :on-change="handleChange"
    :before-upload="beforeAvatarUpload"
    :auto-upload="true"
  >
    <el-button
      type="primary"
      class="border-0"
      :class="elementPlusPictureList.length === limit ? 'bg-neutral-200' : ''"
      :disabled="elementPlusPictureList.length === limit"
      round
    >
      選擇圖片
    </el-button>
    <template
      v-if="elementPlusPictureList.length !== limit"
      #tip
    >
      <p>最多 {{ limit }} 張圖片，格式為 JPG 或 PNG</p>
    </template>
  </el-upload>
</template>
