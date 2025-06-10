import { ElMessage } from "element-plus";
import { useAuthStore } from "~/stores/auth";

const responseErrorMessage: { [key: number]: string } = {
  401: "請先登入",
  403: "您沒有權限",
  404: "找不到該資源",
  408: "請求逾時，請稍後再試",
  409: "請求衝突，請稍後再試",
  500: "伺服器錯誤，請稍後再試",
};

export default defineNuxtPlugin((_nuxtApp) => {
  const authStore = useAuthStore();
  const runtimeConfig = useRuntimeConfig();

  authStore.initializeToken();
  const shuttlerTwAPI = $fetch.create({
    baseURL: runtimeConfig.public.API_BASE_URL,
    onRequest({ request: _request, options }) {
      if (authStore.token) {
        options.headers.set("Authorization", `Bearer ${authStore.token}`);
      }
    },
    onResponseError({ response }) {
      const message =
        response._data?.message || responseErrorMessage[response.status];
      ElMessage({
        message: message,
        type: "error",
      });
    },
  });

  return {
    provide: {
      shuttlerTwAPI,
    },
  };
});
