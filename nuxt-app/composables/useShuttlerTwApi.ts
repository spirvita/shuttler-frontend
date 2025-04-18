import type { UseFetchOptions } from "nuxt/app";

export function useShuttlerTwAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$shuttlerTwAPI as typeof $fetch
  });
}

// 封裝 RESTful API
useShuttlerTwAPI.get = function <T>(
  url: string | (() => string),
  params?: Record<string, unknown>,
  options?: UseFetchOptions<T>
) {
  return useShuttlerTwAPI<T>(url, {
    ...options,
    method: "GET",
    params
  });
};

useShuttlerTwAPI.post = function <T>(
  url: string | (() => string),
  body?: Record<string, unknown>,
  options?: UseFetchOptions<T>
) {
  return useShuttlerTwAPI<T>(url, {
    ...options,
    method: "POST",
    body
  });
};

useShuttlerTwAPI.put = function <T>(
  url: string | (() => string),
  body?: Record<string, unknown>,
  options?: UseFetchOptions<T>
) {
  return useShuttlerTwAPI<T>(url, {
    ...options,
    method: "PUT",
    body
  });
};

useShuttlerTwAPI.patch = function <T>(
  url: string | (() => string),
  body?: Record<string, unknown>,
  options?: UseFetchOptions<T>
) {
  return useShuttlerTwAPI<T>(url, {
    ...options,
    method: "PATCH",
    body
  });
};

useShuttlerTwAPI.delete = function <T>(
  url: string | (() => string),
  params?: Record<string, unknown>,
  options?: UseFetchOptions<T>
) {
  return useShuttlerTwAPI<T>(url, {
    ...options,
    method: "DELETE",
    params
  });
};
