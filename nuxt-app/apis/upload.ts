import type { UploadFiles } from "element-plus";

export const uploadImages = async (
  uploadFiles: UploadFiles,
  uploadType: "activity" | "avatar"
) => {
  const runtimeConfig = useRuntimeConfig();
  const formData = new FormData();
  formData.append("uploadType", uploadType);
  uploadFiles.forEach((file) => {
    if (file.raw) {
      formData.append("file", file.raw);
    }
  });
  const { data, error } = await useFetch<{
    message: string;
    data: { photo: string[] };
  }>(`${runtimeConfig.public.API_BASE_URL}/upload-image`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${useCookie("token").value}`
    }
  });
  if (error.value) {
    ElMessage.error("圖片上傳失敗，請稍後再試");
    return;
  }
  return data.value?.data.photo;
};
