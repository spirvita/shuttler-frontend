import { ElMessage } from "element-plus";
import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin((_nuxtApp) => {
  // const { session } = useUserSession();
  const authStore = useAuthStore();
  const runtimeConfig = useRuntimeConfig();
  const shuttlerTwAPI = $fetch.create({
    baseURL: runtimeConfig.public.API_BASE_URL,
    onRequest({ request: _request, options }) {
      if (authStore.token) {
        options.headers.set("Authorization", `Bearer ${authStore.token}`);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        // await nuxtApp.runWithContext(() => navigateTo("/login"));
        ElMessage({
          message: response._data?.message || "Unauthorized",
          type: "error"
        });
      }
    }
  });

  return {
    provide: {
      shuttlerTwAPI
    }
  };
});
