import { ElMessage } from "element-plus";

export default defineNuxtPlugin((_nuxtApp) => {
  const { session } = useUserSession();
  const runtimeConfig = useRuntimeConfig();
  const shuttlerTwAPI = $fetch.create({
    baseURL: runtimeConfig.public.SHUTTLER_TW_API_BASE_URL,
    onRequest({ request: _request, options }) {
      if (session?.value?.token) {
        options.headers.set("Authorization", `Bearer ${session.value?.token}`);
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
