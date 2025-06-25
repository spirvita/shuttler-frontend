import type { UploadFiles } from "element-plus";

export const uploadImages = async (
  uploadFiles: UploadFiles,
  uploadType: "activity" | "avatar"
) => {
  const runtimeConfig = useRuntimeConfig();
  const formData = new FormData();
  const existingUrls: string[] = [];
  formData.append("uploadType", uploadType);
  uploadFiles.forEach((file) => {
    if (file.raw) {
      formData.append("file", file.raw);
    } else if (file.url) {
      existingUrls.push(file.url);
    }
  });
  if (formData.get("file") === null) return existingUrls;
  const { data, error } = await useFetch<{
    message: string;
    data: { photo: string[] | string };
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
  if (uploadType === "avatar") return data.value?.data.photo as string;
  const uploadedUrls = data.value?.data.photo || [];
  return [...existingUrls, ...uploadedUrls];
};
